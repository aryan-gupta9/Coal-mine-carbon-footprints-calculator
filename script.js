// Coal Mine Carbon Footprint Calculator - Main JavaScript
// Ministry of Coal - Central Mine Planning & Design Institute Limited

class CarbonFootprintCalculator {
    constructor() {
        this.data = {
            mineInfo: {},
            emissions: {
                transportation: 0,
                equipment: 0,
                energy: 0,
                total: 0
            },
            carbonSinks: {
                current: 0,
                required: 0,
                treesNeeded: 0,
                landRequired: 0
            },
            pathwayResults: {}
        };
        
        this.charts = {};
        this.emissionFactors = this.getEmissionFactors();
        this.stateAfforestationRates = this.getStateAfforestationRates();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeCharts();
        this.loadSampleData();
        this.updateDashboard();
    }

    // Emission Factors (in kg CO2eq per unit)
    getEmissionFactors() {
        return {
            diesel: 2.68, // kg CO2eq per liter
            electricity: 0.82, // kg CO2eq per kWh (India grid average)
            excavatorHour: 45.2, // kg CO2eq per hour
            drillHour: 38.5, // kg CO2eq per hour
            crusherHour: 52.3, // kg CO2eq per hour
            coalProcessing: 0.045, // kg CO2eq per tonne
            methaneFactors: {
                low: 0.5,    // m³/tonne
                medium: 1.0, // m³/tonne
                high: 2.0    // m³/tonne
            },
            methaneGWP: 25, // Global Warming Potential of methane
            transportKm: 0.12, // kg CO2eq per km per vehicle
            mineTypeFactors: {
                'open-cast': 1.0,
                'underground': 1.3,
                'mixed': 1.15
            }
        };
    }

    // State-specific afforestation rates (tonnes CO2 per hectare per year)
    getStateAfforestationRates() {
        return {
            jharkhand: 13.5,
            chhattisgarh: 12.0,
            odisha: 13.5,
            telangana: 11.5,
            'west-bengal': 15.0,
            bihar: 12.5,
            maharashtra: 10.5,
            other: 12.0
        };
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(link.dataset.section);
            });
        });

        // Emission Calculator
        document.getElementById('calculate-emissions')?.addEventListener('click', () => {
            this.calculateEmissions();
        });

        document.getElementById('reset-calculator')?.addEventListener('click', () => {
            this.resetCalculator();
        });

        // Carbon Sinks Calculator
        document.getElementById('calculate-sinks')?.addEventListener('click', () => {
            this.calculateCarbonSinks();
        });

        // Pathways Simulator
        document.getElementById('simulate-pathways')?.addEventListener('click', () => {
            this.simulatePathways();
        });

        document.getElementById('reset-simulation')?.addEventListener('click', () => {
            this.resetSimulation();
        });

        // Range sliders
        this.setupRangeSliders();

        // Visualization controls
        document.getElementById('update-charts')?.addEventListener('click', () => {
            this.updateVisualizationCharts();
        });

        // Reports
        document.getElementById('generate-report')?.addEventListener('click', () => {
            this.generateReport();
        });

        document.getElementById('save-data')?.addEventListener('click', () => {
            this.saveData();
        });

        document.getElementById('load-data')?.addEventListener('click', () => {
            this.loadData();
        });

        // Smart Calculator
        document.getElementById('analyze-mine')?.addEventListener('click', () => {
            this.analyzeMine();
        });

        document.getElementById('get-recommendations')?.addEventListener('click', () => {
            this.generateRecommendations();
        });

        document.getElementById('run-optimization')?.addEventListener('click', () => {
            this.runOptimization();
        });

        document.getElementById('compare-scenarios')?.addEventListener('click', () => {
            this.compareScenarios();
        });

        document.getElementById('run-prediction')?.addEventListener('click', () => {
            this.runPredictiveModeling();
        });

        // Prediction years slider
        document.getElementById('prediction-years')?.addEventListener('input', (e) => {
            document.getElementById('prediction-years-value').textContent = `${e.target.value} years`;
        });
    }

    setupRangeSliders() {
        const ranges = [
            { slider: 'electric-vehicles', display: 'ev-value' },
            { slider: 'methane-capture', display: 'methane-value' },
            { slider: 'energy-efficiency', display: 'efficiency-value' },
            { slider: 'renewable-percentage', display: 'renewable-value' }
        ];

        ranges.forEach(({ slider, display }) => {
            const sliderElement = document.getElementById(slider);
            const displayElement = document.getElementById(display);
            
            if (sliderElement && displayElement) {
                sliderElement.addEventListener('input', (e) => {
                    displayElement.textContent = `${e.target.value}%`;
                });
            }
        });
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Remove active from nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Add active to clicked nav link
        document.querySelector(`[data-section="${sectionId}"]`)?.classList.add('active');
    }

    calculateEmissions() {
        try {
            // Get form data
            const formData = this.getFormData();
            this.data.mineInfo = formData.mineInfo;

            // Calculate transportation emissions
            const transportEmissions = this.calculateTransportationEmissions(formData);
            
            // Calculate equipment emissions
            const equipmentEmissions = this.calculateEquipmentEmissions(formData);
            
            // Calculate energy emissions
            const energyEmissions = this.calculateEnergyEmissions(formData);

            // Apply mine type factor
            const mineTypeFactor = this.emissionFactors.mineTypeFactors[formData.mineInfo.mineType] || 1.0;
            
            // Store results
            this.data.emissions = {
                transportation: transportEmissions * mineTypeFactor,
                equipment: equipmentEmissions * mineTypeFactor,
                energy: energyEmissions * mineTypeFactor,
                total: (transportEmissions + equipmentEmissions + energyEmissions) * mineTypeFactor
            };

            // Display results
            this.displayEmissionResults();
            this.updateDashboard();
            this.updateEmissionCharts();

            this.showNotification('Emissions calculated successfully!', 'success');
        } catch (error) {
            console.error('Error calculating emissions:', error);
            this.showNotification('Error calculating emissions. Please check your inputs.', 'error');
        }
    }

    calculateTransportationEmissions(formData) {
        const { dieselConsumption, transportDistance, vehicleCount } = formData;
        
        // Diesel emissions (monthly to annual)
        const dieselEmissions = (dieselConsumption * 12) * this.emissionFactors.diesel;
        
        // Transport distance emissions (daily to annual)
        const distanceEmissions = (transportDistance * vehicleCount * 365) * this.emissionFactors.transportKm;
        
        return (dieselEmissions + distanceEmissions) / 1000; // Convert to tonnes
    }

    calculateEquipmentEmissions(formData) {
        const { excavatorHours, drillHours, crusherHours } = formData;
        
        // Equipment emissions (monthly to annual)
        const excavatorEmissions = (excavatorHours * 12) * this.emissionFactors.excavatorHour;
        const drillEmissions = (drillHours * 12) * this.emissionFactors.drillHour;
        const crusherEmissions = (crusherHours * 12) * this.emissionFactors.crusherHour;
        
        return (excavatorEmissions + drillEmissions + crusherEmissions) / 1000; // Convert to tonnes
    }

    calculateEnergyEmissions(formData) {
        const { electricityConsumption, coalProcessing, methaneEmission } = formData;
        
        // Electricity emissions (monthly to annual)
        const electricityEmissions = (electricityConsumption * 12) * this.emissionFactors.electricity;
        
        // Coal processing emissions (monthly to annual)
        const processingEmissions = (coalProcessing * 12) * this.emissionFactors.coalProcessing;
        
        // Methane emissions
        const methaneRate = this.emissionFactors.methaneFactors[methaneEmission];
        const methaneEmissions = (coalProcessing * 12) * methaneRate * this.emissionFactors.methaneGWP * (44/16); // Convert CH4 to CO2eq
        
        return (electricityEmissions + processingEmissions + methaneEmissions) / 1000; // Convert to tonnes
    }

    getFormData() {
        return {
            mineInfo: {
                mineName: document.getElementById('mine-name')?.value || '',
                mineType: document.getElementById('mine-type')?.value || '',
                capacity: parseFloat(document.getElementById('mine-capacity')?.value) || 0,
                workforce: parseInt(document.getElementById('workforce')?.value) || 0,
                state: document.getElementById('state')?.value || ''
            },
            dieselConsumption: parseFloat(document.getElementById('diesel-consumption')?.value) || 0,
            transportDistance: parseFloat(document.getElementById('transport-distance')?.value) || 0,
            vehicleCount: parseInt(document.getElementById('vehicle-count')?.value) || 0,
            excavatorHours: parseFloat(document.getElementById('excavator-hours')?.value) || 0,
            drillHours: parseFloat(document.getElementById('drill-hours')?.value) || 0,
            crusherHours: parseFloat(document.getElementById('crusher-hours')?.value) || 0,
            electricityConsumption: parseFloat(document.getElementById('electricity-consumption')?.value) || 0,
            coalProcessing: parseFloat(document.getElementById('coal-processing')?.value) || 0,
            methaneEmission: document.getElementById('methane-emission')?.value || 'medium'
        };
    }

    displayEmissionResults() {
        const elements = {
            'transport-emissions': this.data.emissions.transportation.toFixed(1),
            'equipment-emissions': this.data.emissions.equipment.toFixed(1),
            'energy-emissions': this.data.emissions.energy.toFixed(1),
            'total-calculated-emissions': this.data.emissions.total.toFixed(1)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });

        // Show results section
        const resultsSection = document.getElementById('emission-results');
        if (resultsSection) {
            resultsSection.style.display = 'block';
        }
    }

    calculateCarbonSinks() {
        try {
            const formData = this.getCarbonSinksFormData();
            
            // Calculate current sequestration based on forest area and species
            const speciesFactors = {
                eucalyptus: 22, // tonnes CO2 per hectare per year
                teak: 18,
                sal: 15,
                bamboo: 35,
                mixed: 20
            };

            const speciesFactor = speciesFactors[formData.treeSpecies] || 20;
            const ageFactor = Math.min(formData.treeAge / 10, 1); // Trees reach full capacity after 10 years
            
            const forestSequestration = formData.forestArea * speciesFactor * ageFactor;
            const plantationSequestration = formData.plantationArea * speciesFactor * ageFactor * 0.8; // 80% efficiency for plantations
            
            const currentSequestration = forestSequestration + plantationSequestration;
            
            // Calculate required additional sequestration
            const totalEmissions = this.data.emissions.total || 0;
            const requiredSequestration = Math.max(0, totalEmissions - currentSequestration);
            
            // Calculate trees needed (assuming average tree sequesters 22 kg CO2 per year)
            const treesNeeded = Math.ceil(requiredSequestration * 1000 / 22);
            
            // Calculate land required (assuming 400 trees per hectare)
            const landRequired = Math.ceil(treesNeeded / 400);

            this.data.carbonSinks = {
                current: currentSequestration,
                required: requiredSequestration,
                treesNeeded: treesNeeded,
                landRequired: landRequired
            };

            this.displayCarbonSinksResults();
            this.updateDashboard();

            this.showNotification('Carbon sinks calculated successfully!', 'success');
        } catch (error) {
            console.error('Error calculating carbon sinks:', error);
            this.showNotification('Error calculating carbon sinks. Please check your inputs.', 'error');
        }
    }

    getCarbonSinksFormData() {
        return {
            forestArea: parseFloat(document.getElementById('forest-area')?.value) || 0,
            plantationArea: parseFloat(document.getElementById('plantation-area')?.value) || 0,
            treeAge: parseInt(document.getElementById('tree-age')?.value) || 1,
            treeSpecies: document.getElementById('tree-species')?.value || 'mixed'
        };
    }

    displayCarbonSinksResults() {
        const elements = {
            'current-sequestration': this.data.carbonSinks.current.toFixed(1),
            'required-sequestration': this.data.carbonSinks.required.toFixed(1),
            'trees-needed': this.data.carbonSinks.treesNeeded.toLocaleString(),
            'land-required': this.data.carbonSinks.landRequired.toFixed(1)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });

        // Show results section
        const resultsSection = document.getElementById('sinks-results');
        if (resultsSection) {
            resultsSection.style.display = 'block';
        }
    }

    simulatePathways() {
        try {
            const pathwayData = this.getPathwayFormData();
            const baselineEmissions = this.data.emissions.total || 0;
            
            if (baselineEmissions === 0) {
                this.showNotification('Please calculate emissions first before simulating pathways.', 'warning');
                return;
            }

            // Calculate emission reductions
            const evReduction = baselineEmissions * 0.3 * (pathwayData.electricVehicles / 100); // 30% reduction potential
            const methaneReduction = baselineEmissions * 0.15 * (pathwayData.methaneCapture / 100); // 15% reduction potential
            const efficiencyReduction = baselineEmissions * 0.25 * (pathwayData.energyEfficiency / 100); // 25% reduction potential
            
            // Renewable energy reduction
            const renewableReduction = baselineEmissions * 0.4 * (pathwayData.renewablePercentage / 100); // 40% reduction potential
            
            const totalReduction = evReduction + methaneReduction + efficiencyReduction + renewableReduction;
            const reductionPercentage = (totalReduction / baselineEmissions) * 100;
            
            // Calculate costs (rough estimates in crores INR)
            const implementationCost = this.calculateImplementationCost(pathwayData);
            
            // Calculate carbon credit earnings
            const creditEarnings = this.calculateCarbonCreditEarnings(totalReduction, pathwayData.creditPrice);
            
            // Calculate time to neutrality
            const netEmissions = baselineEmissions - totalReduction - (pathwayData.carbonCredits || 0);
            const neutralityTimeline = netEmissions <= 0 ? 'Achieved' : 
                this.data.carbonSinks.current > 0 ? 
                Math.ceil(netEmissions / this.data.carbonSinks.current) : '∞';

            this.data.pathwayResults = {
                emissionReduction: totalReduction,
                reductionPercentage: reductionPercentage,
                implementationCost: implementationCost,
                creditEarnings: creditEarnings,
                neutralityTimeline: neutralityTimeline
            };

            this.displayPathwayResults();
            this.updatePathwayChart();

            this.showNotification('Pathway simulation completed successfully!', 'success');
        } catch (error) {
            console.error('Error simulating pathways:', error);
            this.showNotification('Error in pathway simulation. Please check your inputs.', 'error');
        }
    }

    getPathwayFormData() {
        return {
            electricVehicles: parseInt(document.getElementById('electric-vehicles')?.value) || 0,
            methaneCapture: parseInt(document.getElementById('methane-capture')?.value) || 0,
            energyEfficiency: parseInt(document.getElementById('energy-efficiency')?.value) || 0,
            solarCapacity: parseFloat(document.getElementById('solar-capacity')?.value) || 0,
            windCapacity: parseFloat(document.getElementById('wind-capacity')?.value) || 0,
            renewablePercentage: parseInt(document.getElementById('renewable-percentage')?.value) || 0,
            carbonCredits: parseFloat(document.getElementById('carbon-credits')?.value) || 0,
            creditPrice: parseFloat(document.getElementById('credit-price')?.value) || 1000
        };
    }

    calculateImplementationCost(pathwayData) {
        // Cost estimates in crores INR
        const costs = {
            ev: pathwayData.electricVehicles * 0.5, // ₹50L per % of fleet
            methane: pathwayData.methaneCapture * 0.8, // ₹80L per % efficiency
            efficiency: pathwayData.energyEfficiency * 0.3, // ₹30L per % improvement
            solar: pathwayData.solarCapacity * 4.5, // ₹4.5Cr per MW
            wind: pathwayData.windCapacity * 6.2 // ₹6.2Cr per MW
        };
        
        return Object.values(costs).reduce((sum, cost) => sum + cost, 0);
    }

    calculateCarbonCreditEarnings(reductionTonnes, pricePerTonne) {
        return (reductionTonnes * pricePerTonne) / 100000; // Convert to lakhs
    }

    displayPathwayResults() {
        const elements = {
            'emission-reduction': this.data.pathwayResults.emissionReduction.toFixed(1),
            'reduction-percentage': this.data.pathwayResults.reductionPercentage.toFixed(1) + '%',
            'implementation-cost': '₹' + this.data.pathwayResults.implementationCost.toFixed(1),
            'credit-earnings': '₹' + this.data.pathwayResults.creditEarnings.toFixed(1),
            'neutrality-timeline': this.data.pathwayResults.neutralityTimeline
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });

        // Show results section
        const resultsSection = document.getElementById('pathway-results');
        if (resultsSection) {
            resultsSection.style.display = 'block';
        }
    }

    updateDashboard() {
        // Update dashboard metrics
        const elements = {
            'total-emissions': (this.data.emissions.total || 0).toFixed(1),
            'per-capita-emissions': this.data.mineInfo.workforce > 0 ? 
                ((this.data.emissions.total || 0) / this.data.mineInfo.workforce).toFixed(2) : '0',
            'total-sinks': (this.data.carbonSinks.current || 0).toFixed(1),
            'net-emissions': ((this.data.emissions.total || 0) - (this.data.carbonSinks.current || 0)).toFixed(1)
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });

        // Update neutrality progress
        this.updateNeutralityProgress();
    }

    updateNeutralityProgress() {
        const totalEmissions = this.data.emissions.total || 0;
        const totalSinks = this.data.carbonSinks.current || 0;
        const netEmissions = totalEmissions - totalSinks;
        
        let progressPercentage = 0;
        if (totalEmissions > 0) {
            progressPercentage = Math.max(0, Math.min(100, ((totalSinks / totalEmissions) * 100)));
        }

        const progressFill = document.getElementById('neutrality-progress');
        const progressText = document.getElementById('neutrality-percentage');
        
        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
        }
        
        if (progressText) {
            if (netEmissions <= 0) {
                progressText.textContent = 'Carbon Neutral Achieved!';
                progressText.style.color = '#27ae60';
            } else {
                progressText.textContent = `${progressPercentage.toFixed(1)}% to neutrality`;
                progressText.style.color = '#7f8c8d';
            }
        }
    }

    initializeCharts() {
        this.initializeDashboardCharts();
        this.initializeVisualizationCharts();
    }

    initializeDashboardCharts() {
        // Emission Breakdown Chart
        const breakdownCtx = document.getElementById('emission-breakdown-chart');
        if (breakdownCtx) {
            this.charts.breakdown = new Chart(breakdownCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Transportation', 'Equipment', 'Energy'],
                    datasets: [{
                        data: [0, 0, 0],
                        backgroundColor: ['#e74c3c', '#f39c12', '#3498db'],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // Emission Trends Chart
        const trendsCtx = document.getElementById('emission-trends-chart');
        if (trendsCtx) {
            this.charts.trends = new Chart(trendsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Monthly Emissions (tonnes CO₂eq)',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        borderColor: '#27ae60',
                        backgroundColor: 'rgba(39, 174, 96, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    initializeVisualizationCharts() {
        // Primary Chart
        const primaryCtx = document.getElementById('primary-chart');
        if (primaryCtx) {
            this.charts.primary = new Chart(primaryCtx, {
                type: 'bar',
                data: {
                    labels: ['Baseline', 'With Clean Tech', 'With Renewables', 'Net Zero Target'],
                    datasets: [{
                        label: 'Emissions (tonnes CO₂eq)',
                        data: [0, 0, 0, 0],
                        backgroundColor: ['#e74c3c', '#f39c12', '#27ae60', '#2ecc71']
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Intensity Chart
        const intensityCtx = document.getElementById('intensity-chart');
        if (intensityCtx) {
            this.charts.intensity = new Chart(intensityCtx, {
                type: 'radar',
                data: {
                    labels: ['Transport', 'Equipment', 'Energy', 'Processing', 'Methane'],
                    datasets: [{
                        label: 'Emission Intensity',
                        data: [0, 0, 0, 0, 0],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.2)'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        r: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Progress Chart
        const progressCtx = document.getElementById('progress-chart');
        if (progressCtx) {
            this.charts.progress = new Chart(progressCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Achieved', 'Remaining'],
                    datasets: [{
                        data: [0, 100],
                        backgroundColor: ['#27ae60', '#ecf0f1'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    updateEmissionCharts() {
        // Update breakdown chart
        if (this.charts.breakdown) {
            this.charts.breakdown.data.datasets[0].data = [
                this.data.emissions.transportation,
                this.data.emissions.equipment,
                this.data.emissions.energy
            ];
            this.charts.breakdown.update();
        }

        // Update trends chart with sample monthly data
        if (this.charts.trends) {
            const monthlyEmissions = this.generateMonthlyEmissions();
            this.charts.trends.data.datasets[0].data = monthlyEmissions;
            this.charts.trends.update();
        }
    }

    generateMonthlyEmissions() {
        const baseMonthly = (this.data.emissions.total || 0) / 12;
        return Array.from({ length: 12 }, () => 
            baseMonthly * (0.8 + Math.random() * 0.4) // Variation of ±20%
        );
    }

    updatePathwayChart() {
        const pathwayCtx = document.getElementById('pathway-comparison-chart');
        if (pathwayCtx && !this.charts.pathway) {
            this.charts.pathway = new Chart(pathwayCtx, {
                type: 'bar',
                data: {
                    labels: ['Current Emissions', 'After Clean Tech', 'After Renewables', 'Net Emissions'],
                    datasets: [{
                        label: 'Emissions (tonnes CO₂eq)',
                        data: [
                            this.data.emissions.total || 0,
                            (this.data.emissions.total || 0) - (this.data.pathwayResults.emissionReduction * 0.6 || 0),
                            (this.data.emissions.total || 0) - (this.data.pathwayResults.emissionReduction || 0),
                            Math.max(0, (this.data.emissions.total || 0) - (this.data.pathwayResults.emissionReduction || 0) - (this.data.carbonSinks.current || 0))
                        ],
                        backgroundColor: ['#e74c3c', '#f39c12', '#27ae60', '#2ecc71']
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else if (this.charts.pathway) {
            this.charts.pathway.data.datasets[0].data = [
                this.data.emissions.total || 0,
                (this.data.emissions.total || 0) - (this.data.pathwayResults.emissionReduction * 0.6 || 0),
                (this.data.emissions.total || 0) - (this.data.pathwayResults.emissionReduction || 0),
                Math.max(0, (this.data.emissions.total || 0) - (this.data.pathwayResults.emissionReduction || 0) - (this.data.carbonSinks.current || 0))
            ];
            this.charts.pathway.update();
        }
    }

    updateVisualizationCharts() {
        const chartType = document.getElementById('chart-type')?.value;
        
        // Update primary chart based on selected type
        if (this.charts.primary && chartType) {
            this.updatePrimaryChart(chartType);
        }
    }

    updatePrimaryChart(type) {
        let chartData = {};
        
        switch (type) {
            case 'emissions-trend':
                chartData = {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Monthly Emissions',
                        data: this.generateMonthlyEmissions(),
                        borderColor: '#27ae60',
                        backgroundColor: 'rgba(39, 174, 96, 0.1)',
                        type: 'line'
                    }]
                };
                break;
            case 'activity-breakdown':
                chartData = {
                    labels: ['Transportation', 'Equipment', 'Energy'],
                    datasets: [{
                        label: 'Emissions by Activity',
                        data: [this.data.emissions.transportation, this.data.emissions.equipment, this.data.emissions.energy],
                        backgroundColor: ['#e74c3c', '#f39c12', '#3498db']
                    }]
                };
                break;
            case 'reduction-progress':
                const reductionAchieved = this.data.pathwayResults.emissionReduction || 0;
                const totalEmissions = this.data.emissions.total || 0;
                chartData = {
                    labels: ['Reduced', 'Remaining'],
                    datasets: [{
                        label: 'Reduction Progress',
                        data: [reductionAchieved, totalEmissions - reductionAchieved],
                        backgroundColor: ['#27ae60', '#ecf0f1']
                    }]
                };
                break;
            default:
                return;
        }
        
        this.charts.primary.data = chartData;
        this.charts.primary.update();
    }

    resetCalculator() {
        // Reset form fields
        document.querySelectorAll('#emission-calculator input, #emission-calculator select').forEach(field => {
            if (field.type === 'number' || field.type === 'text') {
                field.value = '';
            } else if (field.type === 'select-one') {
                field.selectedIndex = 0;
            }
        });

        // Hide results
        const resultsSection = document.getElementById('emission-results');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }

        // Reset data
        this.data.emissions = { transportation: 0, equipment: 0, energy: 0, total: 0 };
        this.updateDashboard();
        
        this.showNotification('Calculator reset successfully', 'success');
    }

    resetSimulation() {
        // Reset range sliders
        document.getElementById('electric-vehicles').value = 0;
        document.getElementById('methane-capture').value = 0;
        document.getElementById('energy-efficiency').value = 0;
        document.getElementById('renewable-percentage').value = 0;
        
        // Update displays
        document.getElementById('ev-value').textContent = '0%';
        document.getElementById('methane-value').textContent = '0%';
        document.getElementById('efficiency-value').textContent = '0%';
        document.getElementById('renewable-value').textContent = '0%';
        
        // Reset other inputs
        document.getElementById('solar-capacity').value = '';
        document.getElementById('wind-capacity').value = '';
        document.getElementById('carbon-credits').value = '';
        document.getElementById('credit-price').value = '1000';
        
        // Hide results
        const resultsSection = document.getElementById('pathway-results');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
        
        this.showNotification('Simulation reset successfully', 'success');
    }

    generateReport() {
        const reportType = document.getElementById('report-type')?.value;
        const reportFormat = document.getElementById('report-format')?.value;
        
        // Simulate report generation
        this.showNotification(`Generating ${reportType} report in ${reportFormat} format...`, 'success');
        
        // In a real application, this would generate and download a file
        setTimeout(() => {
            this.showNotification(`Report generated successfully! Download will start shortly.`, 'success');
        }, 2000);
    }

    saveData() {
        try {
            const dataToSave = {
                mineInfo: this.data.mineInfo,
                emissions: this.data.emissions,
                carbonSinks: this.data.carbonSinks,
                pathwayResults: this.data.pathwayResults,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('coalMineData', JSON.stringify(dataToSave));
            this.showNotification('Data saved successfully!', 'success');
        } catch (error) {
            console.error('Error saving data:', error);
            this.showNotification('Error saving data', 'error');
        }
    }

    loadData() {
        try {
            const savedData = localStorage.getItem('coalMineData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                this.data = { ...this.data, ...parsedData };
                this.updateDashboard();
                this.updateEmissionCharts();
                this.showNotification('Data loaded successfully!', 'success');
            } else {
                this.showNotification('No saved data found', 'warning');
            }
        } catch (error) {
            console.error('Error loading data:', error);
            this.showNotification('Error loading data', 'error');
        }
    }

    loadSampleData() {
        // Load sample data for demonstration
        this.data.emissions = {
            transportation: 850.5,
            equipment: 642.3,
            energy: 1247.8,
            total: 2740.6
        };
        
        this.data.carbonSinks = {
            current: 456.2,
            required: 2284.4,
            treesNeeded: 103845,
            landRequired: 260
        };
        
        this.data.mineInfo = {
            mineName: 'Sample Coal Mine',
            mineType: 'open-cast',
            capacity: 5.2,
            workforce: 1250,
            state: 'jharkhand'
        };
        
        // Update mines count
        const totalMinesElement = document.getElementById('total-mines');
        if (totalMinesElement) {
            totalMinesElement.textContent = '1';
        }
    }

    // Smart Calculator Methods
    analyzeMine() {
        try {
            const statusElement = document.getElementById('smart-status');
            statusElement.innerHTML = '<div class="status-indicator loading"><i class="fas fa-spinner fa-spin"></i> Analyzing your mine data...</div>';
            
            setTimeout(() => {
                this.performMineAnalysis();
                this.calculateEfficiencyScore();
                this.generateSmartInsights();
                this.showNotification('Mine analysis completed successfully!', 'success');
            }, 2000);
        } catch (error) {
            console.error('Error analyzing mine:', error);
            this.showNotification('Error during mine analysis', 'error');
        }
    }

    performMineAnalysis() {
        const totalEmissions = this.data.emissions.total || 0;
        const carbonSinks = this.data.carbonSinks.current || 0;
        const workforce = this.data.mineInfo.workforce || 1;
        const capacity = this.data.mineInfo.capacity || 1;
        
        // Determine mine efficiency status
        const emissionIntensity = totalEmissions / capacity; // tonnes CO2/MT capacity
        const perCapitaEmissions = totalEmissions / workforce;
        const carbonNeutrality = (carbonSinks / totalEmissions) * 100;
        
        let status, statusClass, recommendations;
        
        if (emissionIntensity < 100) {
            status = '🌟 Excellent Performance';
            statusClass = 'status-excellent';
            recommendations = 'Your mine is performing exceptionally well in terms of carbon efficiency.';
        } else if (emissionIntensity < 200) {
            status = '✅ Good Performance';
            statusClass = 'status-good';
            recommendations = 'Your mine shows good carbon management with room for optimization.';
        } else if (emissionIntensity < 300) {
            status = '⚠️ Moderate Performance';
            statusClass = 'status-moderate';
            recommendations = 'There are significant opportunities for emission reduction.';
        } else {
            status = '🔴 Needs Improvement';
            statusClass = 'status-poor';
            recommendations = 'Urgent action required to reduce carbon footprint.';
        }
        
        const statusElement = document.getElementById('smart-status');
        statusElement.innerHTML = `
            <div class="analysis-result ${statusClass}">
                <h4>${status}</h4>
                <div class="analysis-metrics">
                    <div class="metric-row">
                        <span>Emission Intensity:</span>
                        <span><strong>${emissionIntensity.toFixed(1)} tonnes CO₂/MT</strong></span>
                    </div>
                    <div class="metric-row">
                        <span>Per Capita Emissions:</span>
                        <span><strong>${perCapitaEmissions.toFixed(2)} tonnes CO₂/person</strong></span>
                    </div>
                    <div class="metric-row">
                        <span>Carbon Neutrality:</span>
                        <span><strong>${carbonNeutrality.toFixed(1)}%</strong></span>
                    </div>
                </div>
                <p class="analysis-recommendation">${recommendations}</p>
            </div>
        `;
    }

    calculateEfficiencyScore() {
        const totalEmissions = this.data.emissions.total || 0;
        const carbonSinks = this.data.carbonSinks.current || 0;
        const capacity = this.data.mineInfo.capacity || 1;
        
        // Calculate individual scores (0-25 each, total 100)
        const transportScore = this.calculateTransportationScore();
        const equipmentScore = this.calculateEquipmentScore();
        const energyScore = this.calculateEnergyScore();
        const sinksScore = this.calculateSinksScore();
        
        const totalScore = transportScore + equipmentScore + energyScore + sinksScore;
        
        // Update UI
        this.updateEfficiencyScoreDisplay(totalScore, {
            transport: transportScore,
            equipment: equipmentScore,
            energy: energyScore,
            sinks: sinksScore
        });
    }

    calculateTransportationScore() {
        const transportEmissions = this.data.emissions.transportation || 0;
        const totalEmissions = this.data.emissions.total || 1;
        const transportRatio = transportEmissions / totalEmissions;
        
        // Lower transport ratio = higher score
        if (transportRatio < 0.2) return 25;
        if (transportRatio < 0.3) return 20;
        if (transportRatio < 0.4) return 15;
        if (transportRatio < 0.5) return 10;
        return 5;
    }

    calculateEquipmentScore() {
        const equipmentEmissions = this.data.emissions.equipment || 0;
        const totalEmissions = this.data.emissions.total || 1;
        const equipmentRatio = equipmentEmissions / totalEmissions;
        
        if (equipmentRatio < 0.25) return 25;
        if (equipmentRatio < 0.35) return 20;
        if (equipmentRatio < 0.45) return 15;
        if (equipmentRatio < 0.55) return 10;
        return 5;
    }

    calculateEnergyScore() {
        const energyEmissions = this.data.emissions.energy || 0;
        const totalEmissions = this.data.emissions.total || 1;
        const energyRatio = energyEmissions / totalEmissions;
        
        if (energyRatio < 0.3) return 25;
        if (energyRatio < 0.4) return 20;
        if (energyRatio < 0.5) return 15;
        if (energyRatio < 0.6) return 10;
        return 5;
    }

    calculateSinksScore() {
        const carbonSinks = this.data.carbonSinks.current || 0;
        const totalEmissions = this.data.emissions.total || 1;
        const neutralityRatio = carbonSinks / totalEmissions;
        
        if (neutralityRatio >= 1.0) return 25; // Carbon neutral or negative
        if (neutralityRatio >= 0.8) return 20;
        if (neutralityRatio >= 0.5) return 15;
        if (neutralityRatio >= 0.2) return 10;
        return 5;
    }

    updateEfficiencyScoreDisplay(totalScore, scores) {
        // Update main score
        document.getElementById('efficiency-value').textContent = totalScore;
        
        // Update score circle (conic gradient)
        const scoreCircle = document.querySelector('.score-circle');
        const percentage = totalScore;
        scoreCircle.style.background = `conic-gradient(#27ae60 ${percentage * 3.6}deg, rgba(255,255,255,0.2) ${percentage * 3.6}deg)`;
        
        // Update individual score bars
        this.updateScoreBar('transport-score', scores.transport, 25);
        this.updateScoreBar('equipment-score', scores.equipment, 25);
        this.updateScoreBar('energy-score', scores.energy, 25);
        this.updateScoreBar('sinks-score', scores.sinks, 25);
        
        // Update score text
        document.querySelector('.score-item:nth-child(1) .score-points').textContent = `${scores.transport}/25`;
        document.querySelector('.score-item:nth-child(2) .score-points').textContent = `${scores.equipment}/25`;
        document.querySelector('.score-item:nth-child(3) .score-points').textContent = `${scores.energy}/25`;
        document.querySelector('.score-item:nth-child(4) .score-points').textContent = `${scores.sinks}/25`;
    }

    updateScoreBar(className, score, maxScore) {
        const scoreBar = document.querySelector(`.${className}`);
        const percentage = (score / maxScore) * 100;
        scoreBar.style.width = `${percentage}%`;
    }

    generateRecommendations() {
        try {
            const recommendations = this.analyzeAndGenerateRecommendations();
            this.displayRecommendations(recommendations);
            
            // Show recommendations panel
            document.getElementById('recommendations-panel').style.display = 'block';
            document.getElementById('recommendations-panel').scrollIntoView({ behavior: 'smooth' });
            
            this.showNotification('Smart recommendations generated!', 'success');
        } catch (error) {
            console.error('Error generating recommendations:', error);
            this.showNotification('Error generating recommendations', 'error');
        }
    }

    analyzeAndGenerateRecommendations() {
        const recommendations = [];
        const totalEmissions = this.data.emissions.total || 0;
        
        if (totalEmissions === 0) {
            return [{
                title: 'Calculate Emissions First',
                description: 'Please calculate your mine\'s emissions first to get personalized recommendations.',
                priority: 'high',
                icon: 'calculator',
                metrics: { reduction: 0, cost: 0, timeline: 0 },
                actions: ['Go to Emission Calculator']
            }];
        }
        
        // Transportation recommendations
        if (this.data.emissions.transportation > totalEmissions * 0.3) {
            recommendations.push({
                title: 'Optimize Transportation Fleet',
                description: 'Your transportation emissions are high. Consider electric vehicles and route optimization.',
                priority: 'high',
                icon: 'truck',
                metrics: {
                    reduction: Math.round(this.data.emissions.transportation * 0.4),
                    cost: 25,
                    timeline: 18
                },
                actions: ['Implement Electric Vehicle Program', 'Optimize Routes', 'Upgrade to BS-VI Vehicles']
            });
        }
        
        // Equipment recommendations
        if (this.data.emissions.equipment > totalEmissions * 0.35) {
            recommendations.push({
                title: 'Upgrade Mining Equipment',
                description: 'Modernize equipment with fuel-efficient and electric alternatives.',
                priority: 'medium',
                icon: 'cogs',
                metrics: {
                    reduction: Math.round(this.data.emissions.equipment * 0.3),
                    cost: 40,
                    timeline: 24
                },
                actions: ['Equipment Efficiency Audit', 'Preventive Maintenance', 'Electric Equipment Upgrade']
            });
        }
        
        // Energy recommendations
        if (this.data.emissions.energy > totalEmissions * 0.4) {
            recommendations.push({
                title: 'Implement Renewable Energy',
                description: 'Transition to solar and wind power to reduce grid dependency.',
                priority: 'high',
                icon: 'solar-panel',
                metrics: {
                    reduction: Math.round(this.data.emissions.energy * 0.6),
                    cost: 35,
                    timeline: 12
                },
                actions: ['Solar Panel Installation', 'Wind Power Assessment', 'Energy Storage System']
            });
        }
        
        // Carbon sinks recommendations
        const neutralityGap = totalEmissions - (this.data.carbonSinks.current || 0);
        if (neutralityGap > totalEmissions * 0.5) {
            recommendations.push({
                title: 'Expand Carbon Sequestration',
                description: 'Implement large-scale afforestation to offset remaining emissions.',
                priority: 'medium',
                icon: 'tree',
                metrics: {
                    reduction: Math.round(neutralityGap * 0.7),
                    cost: 20,
                    timeline: 36
                },
                actions: ['Afforestation Program', 'Wetland Restoration', 'Carbon Credit Projects']
            });
        }
        
        // Methane capture recommendation
        if (this.data.mineInfo.mineType === 'underground') {
            recommendations.push({
                title: 'Implement Methane Capture',
                description: 'Capture and utilize methane emissions from underground operations.',
                priority: 'high',
                icon: 'industry',
                metrics: {
                    reduction: Math.round(totalEmissions * 0.15),
                    cost: 45,
                    timeline: 30
                },
                actions: ['Methane Assessment', 'Capture System Design', 'Energy Recovery']
            });
        }
        
        // Technology recommendation
        recommendations.push({
            title: 'Deploy Smart Mining Technologies',
            description: 'Implement IoT sensors and AI for real-time emission monitoring and optimization.',
            priority: 'low',
            icon: 'microchip',
            metrics: {
                reduction: Math.round(totalEmissions * 0.1),
                cost: 15,
                timeline: 6
            },
            actions: ['IoT Sensor Network', 'AI Optimization', 'Digital Twin']
        });
        
        return recommendations.slice(0, 6); // Return top 6 recommendations
    }

    displayRecommendations(recommendations) {
        const grid = document.getElementById('recommendations-grid');
        grid.innerHTML = '';
        
        recommendations.forEach(rec => {
            const card = document.createElement('div');
            card.className = 'recommendation-card fade-in';
            
            card.innerHTML = `
                <div class="recommendation-header">
                    <div class="recommendation-icon">
                        <i class="fas fa-${rec.icon}"></i>
                    </div>
                    <div class="recommendation-title">${rec.title}</div>
                    <div class="recommendation-priority priority-${rec.priority}">${rec.priority.toUpperCase()}</div>
                </div>
                <div class="recommendation-content">
                    <p>${rec.description}</p>
                </div>
                <div class="recommendation-metrics">
                    <div class="recommendation-metric">
                        <span class="metric-number">${rec.metrics.reduction}</span>
                        <span class="metric-name">tonnes CO₂/yr</span>
                    </div>
                    <div class="recommendation-metric">
                        <span class="metric-number">₹${rec.metrics.cost}</span>
                        <span class="metric-name">Crores</span>
                    </div>
                    <div class="recommendation-metric">
                        <span class="metric-number">${rec.metrics.timeline}</span>
                        <span class="metric-name">months</span>
                    </div>
                </div>
                <div class="recommendation-actions">
                    ${rec.actions.map(action => `<button class="btn btn-sm btn-outline">${action}</button>`).join('')}
                </div>
            `;
            
            grid.appendChild(card);
        });
    }

    runOptimization() {
        try {
            const goal = document.getElementById('optimization-goal').value;
            const budget = parseFloat(document.getElementById('budget-constraint').value) || 100;
            const timeline = parseInt(document.getElementById('timeline-constraint').value) || 10;
            const priorities = Array.from(document.getElementById('priority-areas').selectedOptions).map(opt => opt.value);
            
            this.showNotification('Running optimization algorithm...', 'success');
            
            setTimeout(() => {
                const solution = this.calculateOptimalSolution(goal, budget, timeline, priorities);
                this.displayOptimizationResults(solution);
                document.getElementById('optimization-results').style.display = 'block';
                document.getElementById('optimization-results').scrollIntoView({ behavior: 'smooth' });
            }, 3000);
            
        } catch (error) {
            console.error('Error running optimization:', error);
            this.showNotification('Error running optimization', 'error');
        }
    }

    calculateOptimalSolution(goal, budget, timeline, priorities) {
        const totalEmissions = this.data.emissions.total || 0;
        const solutions = {
            'cost-effective': this.generateCostEffectiveSolution(budget, timeline),
            'maximum-reduction': this.generateMaxReductionSolution(budget, timeline),
            'fastest-neutrality': this.generateFastestSolution(budget, timeline),
            'balanced': this.generateBalancedSolution(budget, timeline)
        };
        
        return solutions[goal] || solutions['balanced'];
    }

    generateCostEffectiveSolution(budget, timeline) {
        const totalEmissions = this.data.emissions.total || 0;
        
        return {
            strategy: 'Cost-Optimized Carbon Reduction',
            description: 'Prioritizes low-cost, high-impact interventions for maximum ROI',
            totalInvestment: Math.min(budget * 0.8, 60),
            annualSavings: 8.5,
            emissionReduction: totalEmissions * 0.45,
            paybackPeriod: 5.2,
            roi: 18.5,
            interventions: [
                { name: 'Energy Efficiency Upgrades', cost: 15, reduction: totalEmissions * 0.15 },
                { name: 'Route Optimization', cost: 5, reduction: totalEmissions * 0.08 },
                { name: 'Preventive Maintenance', cost: 8, reduction: totalEmissions * 0.12 },
                { name: 'LED Lighting & Smart Controls', cost: 3, reduction: totalEmissions * 0.05 },
                { name: 'Afforestation (Phase 1)', cost: 12, reduction: totalEmissions * 0.05 }
            ]
        };
    }

    generateMaxReductionSolution(budget, timeline) {
        const totalEmissions = this.data.emissions.total || 0;
        
        return {
            strategy: 'Maximum Emission Reduction',
            description: 'Aggressive approach targeting highest possible emission cuts',
            totalInvestment: budget * 0.95,
            annualSavings: 12.8,
            emissionReduction: totalEmissions * 0.75,
            paybackPeriod: 6.8,
            roi: 15.2,
            interventions: [
                { name: 'Complete Fleet Electrification', cost: 45, reduction: totalEmissions * 0.25 },
                { name: 'Renewable Energy (50MW Solar+Wind)', cost: 35, reduction: totalEmissions * 0.30 },
                { name: 'Methane Capture & Utilization', cost: 25, reduction: totalEmissions * 0.12 },
                { name: 'Electric Mining Equipment', cost: 40, reduction: totalEmissions * 0.08 }
            ]
        };
    }

    generateFastestSolution(budget, timeline) {
        const totalEmissions = this.data.emissions.total || 0;
        
        return {
            strategy: 'Rapid Implementation Plan',
            description: 'Quick wins and fast-deployment technologies for immediate impact',
            totalInvestment: budget * 0.7,
            annualSavings: 7.2,
            emissionReduction: totalEmissions * 0.35,
            paybackPeriod: 4.1,
            roi: 22.3,
            interventions: [
                { name: 'Immediate Energy Efficiency', cost: 12, reduction: totalEmissions * 0.12 },
                { name: 'Solar PV (Quick Install)', cost: 20, reduction: totalEmissions * 0.15 },
                { name: 'Carbon Credits Purchase', cost: 15, reduction: totalEmissions * 0.08 }
            ]
        };
    }

    generateBalancedSolution(budget, timeline) {
        const totalEmissions = this.data.emissions.total || 0;
        
        return {
            strategy: 'Balanced Optimization Approach',
            description: 'Optimal balance of cost, impact, and implementation speed',
            totalInvestment: budget * 0.85,
            annualSavings: 10.2,
            emissionReduction: totalEmissions * 0.58,
            paybackPeriod: 5.8,
            roi: 19.1,
            interventions: [
                { name: 'Hybrid Fleet Upgrade (50%)', cost: 28, reduction: totalEmissions * 0.18 },
                { name: 'Solar + Battery Storage', cost: 30, reduction: totalEmissions * 0.22 },
                { name: 'Equipment Modernization', cost: 25, reduction: totalEmissions * 0.10 },
                { name: 'Smart Afforestation Program', cost: 18, reduction: totalEmissions * 0.08 }
            ]
        };
    }

    displayOptimizationResults(solution) {
        document.getElementById('recommended-strategy').textContent = solution.strategy;
        document.getElementById('total-investment').textContent = `₹${solution.totalInvestment.toFixed(1)} Cr`;
        document.getElementById('annual-savings').textContent = `₹${solution.annualSavings.toFixed(1)} Cr/yr`;
        document.getElementById('emission-reduction-opt').textContent = `${solution.emissionReduction.toFixed(0)} tonnes CO₂eq/yr`;
        document.getElementById('payback-period').textContent = `${solution.paybackPeriod.toFixed(1)} years`;
        document.getElementById('roi-percentage').textContent = `${solution.roi.toFixed(1)}%`;
        
        // Generate implementation roadmap
        this.generateImplementationRoadmap(solution.interventions);
    }

    generateImplementationRoadmap(interventions) {
        const roadmapContainer = document.getElementById('roadmap-timeline');
        roadmapContainer.innerHTML = '';
        
        interventions.forEach((intervention, index) => {
            const phase = index + 1;
            const timeframe = `${phase * 6}-${(phase + 1) * 6} months`;
            
            const roadmapItem = document.createElement('div');
            roadmapItem.className = 'roadmap-item slide-up';
            roadmapItem.style.animationDelay = `${index * 0.2}s`;
            
            roadmapItem.innerHTML = `
                <div class="roadmap-phase">${phase}</div>
                <div class="roadmap-content">
                    <div class="roadmap-title">${intervention.name}</div>
                    <div class="roadmap-details">
                        Investment: ₹${intervention.cost} Cr | 
                        Reduction: ${intervention.reduction.toFixed(0)} tonnes CO₂eq/yr
                    </div>
                </div>
                <div class="roadmap-timeline-label">${timeframe}</div>
            `;
            
            roadmapContainer.appendChild(roadmapItem);
        });
    }

    compareScenarios() {
        try {
            const scenarios = this.generateComparisonScenarios();
            this.displayScenarioComparison(scenarios);
            this.createComparisonCharts(scenarios);
            
            document.getElementById('scenario-comparison').style.display = 'block';
            document.getElementById('scenario-comparison').scrollIntoView({ behavior: 'smooth' });
            
            this.showNotification('Scenario comparison generated!', 'success');
        } catch (error) {
            console.error('Error comparing scenarios:', error);
            this.showNotification('Error comparing scenarios', 'error');
        }
    }

    generateComparisonScenarios() {
        const baseline = this.data.emissions.total || 0;
        
        return {
            current: {
                name: 'Current State',
                emissions: baseline,
                cost: 0,
                timeline: 0,
                roi: 0,
                risk: 'High'
            },
            scenarioA: {
                name: 'Conservative',
                emissions: baseline * 0.8,
                cost: 25,
                timeline: 24,
                roi: 12.5,
                risk: 'Low'
            },
            scenarioB: {
                name: 'Moderate',
                emissions: baseline * 0.6,
                cost: 55,
                timeline: 18,
                roi: 18.2,
                risk: 'Medium'
            },
            scenarioC: {
                name: 'Aggressive',
                emissions: baseline * 0.3,
                cost: 95,
                timeline: 12,
                roi: 15.8,
                risk: 'High'
            },
            recommended: {
                name: 'AI-Optimized',
                emissions: baseline * 0.42,
                cost: 68,
                timeline: 15,
                roi: 19.1,
                risk: 'Medium'
            }
        };
    }

    displayScenarioComparison(scenarios) {
        const tbody = document.getElementById('comparison-body');
        tbody.innerHTML = '';
        
        const criteria = [
            { label: 'Annual Emissions (tonnes CO₂)', key: 'emissions', format: (v) => v.toFixed(0) },
            { label: 'Implementation Cost (₹ Cr)', key: 'cost', format: (v) => v.toFixed(1) },
            { label: 'Timeline (months)', key: 'timeline', format: (v) => v.toString() },
            { label: 'ROI (%)', key: 'roi', format: (v) => v.toFixed(1) },
            { label: 'Risk Level', key: 'risk', format: (v) => v }
        ];
        
        criteria.forEach(criterion => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${criterion.label}</strong></td>
                <td>${criterion.format(scenarios.current[criterion.key])}</td>
                <td>${criterion.format(scenarios.scenarioA[criterion.key])}</td>
                <td>${criterion.format(scenarios.scenarioB[criterion.key])}</td>
                <td>${criterion.format(scenarios.scenarioC[criterion.key])}</td>
                <td class="recommended-cell">${criterion.format(scenarios.recommended[criterion.key])}</td>
            `;
            tbody.appendChild(row);
        });
    }

    createComparisonCharts(scenarios) {
        // Cost vs Reduction Chart
        const costReductionCtx = document.getElementById('cost-reduction-chart');
        if (costReductionCtx) {
            new Chart(costReductionCtx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Scenarios',
                        data: Object.values(scenarios).map(s => ({
                            x: s.cost,
                            y: (scenarios.current.emissions - s.emissions),
                            label: s.name
                        })),
                        backgroundColor: ['#e74c3c', '#f39c12', '#3498db', '#9b59b6', '#27ae60']
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: { title: { display: true, text: 'Cost (₹ Crores)' } },
                        y: { title: { display: true, text: 'Emission Reduction (tonnes CO₂)' } }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (context) => {
                                    const point = context.parsed;
                                    return `${context.dataset.data[context.dataIndex].label}: Cost ₹${point.x}Cr, Reduction ${point.y.toFixed(0)} tonnes`;
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Timeline Comparison Chart
        const timelineCtx = document.getElementById('timeline-comparison-chart');
        if (timelineCtx) {
            new Chart(timelineCtx, {
                type: 'bar',
                data: {
                    labels: Object.values(scenarios).map(s => s.name),
                    datasets: [{
                        label: 'Implementation Timeline (months)',
                        data: Object.values(scenarios).map(s => s.timeline),
                        backgroundColor: ['#e74c3c', '#f39c12', '#3498db', '#9b59b6', '#27ae60']
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { 
                            beginAtZero: true,
                            title: { display: true, text: 'Timeline (months)' }
                        }
                    }
                }
            });
        }
    }

    generateSmartInsights() {
        const totalEmissions = this.data.emissions.total || 0;
        const capacity = this.data.mineInfo.capacity || 1;
        const workforce = this.data.mineInfo.workforce || 1;
        
        // Industry Benchmark
        const industryAverage = 250; // tonnes CO2 per MT capacity
        const myIntensity = totalEmissions / capacity;
        const benchmarkComparison = ((industryAverage - myIntensity) / industryAverage) * 100;
        
        document.getElementById('industry-benchmark').textContent = 
            benchmarkComparison > 0 ? 
            `Performing ${benchmarkComparison.toFixed(1)}% better than industry average (${industryAverage} t CO₂/MT)` :
            `Performing ${Math.abs(benchmarkComparison).toFixed(1)}% below industry average. Improvement needed.`;
        
        // Performance Trend
        document.getElementById('performance-trend').textContent = 
            'Based on current data, implementing recommended actions could improve efficiency by 35-60% within 18 months.';
        
        // Achievement Potential
        const neutralityYears = totalEmissions / Math.max(this.data.carbonSinks.current || 1, 100);
        document.getElementById('achievement-potential').textContent = 
            neutralityYears < 10 ? 
            `High potential to achieve carbon neutrality within ${neutralityYears.toFixed(1)} years with proper investment.` :
            `Carbon neutrality achievable in ${neutralityYears.toFixed(1)} years. Consider aggressive intervention strategies.`;
        
        // Risk Assessment
        const riskLevel = this.assessImplementationRisk();
        document.getElementById('risk-assessment').textContent = riskLevel;
    }

    assessImplementationRisk() {
        const totalEmissions = this.data.emissions.total || 0;
        const mineType = this.data.mineInfo.mineType || 'open-cast';
        
        if (totalEmissions < 1000) {
            return 'Low risk: Small scale operations with manageable transition requirements.';
        } else if (totalEmissions < 3000) {
            return 'Medium risk: Moderate scale requiring phased implementation and careful planning.';
        } else {
            return 'High risk: Large scale operations requiring substantial investment and regulatory coordination.';
        }
    }

    runPredictiveModeling() {
        try {
            const years = parseInt(document.getElementById('prediction-years').value);
            const scenario = document.getElementById('growth-scenario').value;
            
            this.showNotification('Generating predictive models...', 'success');
            
            setTimeout(() => {
                const predictions = this.generatePredictions(years, scenario);
                this.displayPredictions(predictions);
                this.createPredictionChart(predictions);
                
                document.getElementById('prediction-results').style.display = 'block';
                document.getElementById('prediction-results').scrollIntoView({ behavior: 'smooth' });
            }, 2000);
            
        } catch (error) {
            console.error('Error in predictive modeling:', error);
            this.showNotification('Error in predictive modeling', 'error');
        }
    }

    generatePredictions(years, scenario) {
        const baseEmissions = this.data.emissions.total || 0;
        const growthRates = {
            conservative: 0.02, // 2% annual growth
            moderate: 0.05,     // 5% annual growth
            aggressive: 0.08    // 8% annual growth
        };
        
        const growthRate = growthRates[scenario] || 0.05;
        const predictions = [];
        
        for (let year = 0; year <= years; year++) {
            const businessAsUsual = baseEmissions * Math.pow(1 + growthRate, year);
            const withInterventions = businessAsUsual * Math.pow(0.95, year); // 5% annual reduction with interventions
            const neutralityTarget = Math.max(0, baseEmissions * Math.pow(0.85, year)); // Aggressive reduction target
            
            predictions.push({
                year: 2024 + year,
                businessAsUsual,
                withInterventions,
                neutralityTarget,
                gap: withInterventions - neutralityTarget
            });
        }
        
        return predictions;
    }

    displayPredictions(predictions) {
        const finalYear = predictions[predictions.length - 1];
        const metricsContainer = document.getElementById('prediction-metrics');
        
        const metrics = [
            {
                title: `Emissions in ${finalYear.year}`,
                value: finalYear.withInterventions.toFixed(0),
                unit: 'tonnes CO₂eq',
                change: `vs ${predictions[0].businessAsUsual.toFixed(0)} without action`
            },
            {
                title: 'Potential Savings',
                value: (finalYear.businessAsUsual - finalYear.withInterventions).toFixed(0),
                unit: 'tonnes CO₂eq',
                change: 'cumulative reduction'
            },
            {
                title: 'Investment Needed',
                value: (predictions.length * 8.5).toFixed(0),
                unit: '₹ Crores',
                change: 'total over period'
            },
            {
                title: 'Carbon Neutrality',
                value: this.calculateNeutralityYear(predictions),
                unit: 'Year',
                change: 'projected achievement'
            }
        ];
        
        metricsContainer.innerHTML = metrics.map(metric => `
            <div class="prediction-metric">
                <h5>${metric.title}</h5>
                <div class="prediction-value">${metric.value}</div>
                <div class="prediction-unit">${metric.unit}</div>
                <div class="prediction-change">${metric.change}</div>
            </div>
        `).join('');
    }

    calculateNeutralityYear(predictions) {
        for (let prediction of predictions) {
            if (prediction.withInterventions <= 0) {
                return prediction.year;
            }
        }
        return 'Beyond ' + predictions[predictions.length - 1].year;
    }

    createPredictionChart(predictions) {
        const predictionCtx = document.getElementById('prediction-chart');
        if (predictionCtx) {
            new Chart(predictionCtx, {
                type: 'line',
                data: {
                    labels: predictions.map(p => p.year),
                    datasets: [
                        {
                            label: 'Business as Usual',
                            data: predictions.map(p => p.businessAsUsual),
                            borderColor: '#e74c3c',
                            backgroundColor: 'rgba(231, 76, 60, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'With Interventions',
                            data: predictions.map(p => p.withInterventions),
                            borderColor: '#f39c12',
                            backgroundColor: 'rgba(243, 156, 18, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Neutrality Target',
                            data: predictions.map(p => p.neutralityTarget),
                            borderColor: '#27ae60',
                            backgroundColor: 'rgba(39, 174, 96, 0.1)',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: { display: true, text: 'Year' }
                        },
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Emissions (tonnes CO₂eq)' }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Emission Projections & Scenarios'
                        }
                    }
                }
            });
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Hide notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.coalMineCalculator = new CarbonFootprintCalculator();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CarbonFootprintCalculator;
}
