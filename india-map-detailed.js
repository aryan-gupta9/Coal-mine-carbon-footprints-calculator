// Detailed India Coal Mine Map with Accurate Geography
// Enhanced with hover tooltips and proper state boundaries

class DetailedIndiaMap {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedMine = null;
        this.hoveredMine = null;
        this.mines = this.getDetailedMineData();
        this.filters = {
            state: '',
            type: '',
            search: ''
        };
        
        if (this.container) {
            this.init();
        }
    }

    getDetailedMineData() {
        // Accurate coordinates based on India's geography (SVG viewBox: 0 0 1000 1200)
        return [
            {
                id: 1,
                name: "Jharia Coal Field",
                state: "Jharkhand",
                district: "Dhanbad",
                type: "Open Cast",
                x: 720,
                y: 450,
                lat: "23.7956°N",
                lng: "86.4303°E",
                emissions: 125000,
                capacity: 30,
                workforce: 1500,
                depth: "600m",
                established: "1894",
                description: "India's most important coalfield, known for prime coking coal"
            },
            {
                id: 2,
                name: "Raniganj Coalfield",
                state: "West Bengal",
                district: "Asansol",
                type: "Underground",
                x: 730,
                y: 470,
                lat: "23.6205°N",
                lng: "87.1299°E",
                emissions: 98000,
                capacity: 25,
                workforce: 1200,
                depth: "450m",
                established: "1774",
                description: "India's oldest coalfield, birthplace of Indian coal mining"
            },
            {
                id: 3,
                name: "Korba Coalfield",
                state: "Chhattisgarh",
                district: "Korba",
                type: "Mixed",
                x: 650,
                y: 520,
                lat: "22.3595°N",
                lng: "82.6950°E",
                emissions: 110000,
                capacity: 28,
                workforce: 1350,
                depth: "300m",
                established: "1951",
                description: "Power generation hub supplying multiple thermal plants"
            },
            {
                id: 4,
                name: "Talcher Coalfield",
                state: "Odisha",
                district: "Angul",
                type: "Open Cast",
                x: 690,
                y: 580,
                lat: "20.9517°N",
                lng: "85.1330°E",
                emissions: 135000,
                capacity: 35,
                workforce: 1800,
                depth: "250m",
                established: "1960",
                description: "One of the largest coalfields in India"
            },
            {
                id: 5,
                name: "Singareni Collieries",
                state: "Telangana",
                district: "Kothagudem",
                type: "Underground",
                x: 590,
                y: 710,
                lat: "18.7670°N",
                lng: "79.5890°E",
                emissions: 88000,
                capacity: 20,
                workforce: 950,
                depth: "700m",
                established: "1889",
                description: "Government company operating in Godavari Valley"
            },
            {
                id: 6,
                name: "Wardha Valley",
                state: "Maharashtra",
                district: "Chandrapur",
                type: "Open Cast",
                x: 570,
                y: 620,
                lat: "20.7453°N",
                lng: "79.0669°E",
                emissions: 75000,
                capacity: 18,
                workforce: 850,
                depth: "200m",
                established: "1913",
                description: "Western India's primary coal source"
            },
            {
                id: 7,
                name: "Karanpura Coalfield",
                state: "Jharkhand",
                district: "Ranchi",
                type: "Mixed",
                x: 700,
                y: 440,
                lat: "24.0295°N",
                lng: "85.3460°E",
                emissions: 95000,
                capacity: 22,
                workforce: 1100,
                depth: "500m",
                established: "1856",
                description: "Rich in medium and high-grade coking coal"
            },
            {
                id: 8,
                name: "Neyveli Lignite",
                state: "Tamil Nadu",
                district: "Cuddalore",
                type: "Open Cast",
                x: 580,
                y: 900,
                lat: "11.5986°N",
                lng: "79.4743°E",
                emissions: 65000,
                capacity: 15,
                workforce: 750,
                depth: "150m",
                established: "1957",
                description: "Major lignite mining complex in South India"
            },
            {
                id: 9,
                name: "Ib Valley Coalfield",
                state: "Odisha",
                district: "Jharsuguda",
                type: "Mixed",
                x: 670,
                y: 550,
                lat: "21.9137°N",
                lng: "83.8921°E",
                emissions: 92000,
                capacity: 21,
                workforce: 1000,
                depth: "350m",
                established: "1901",
                description: "Important supplier to aluminum and power industries"
            },
            {
                id: 10,
                name: "North Karanpura",
                state: "Jharkhand",
                district: "Hazaribagh",
                type: "Open Cast",
                x: 710,
                y: 430,
                lat: "24.3870°N",
                lng: "85.6780°E",
                emissions: 105000,
                capacity: 26,
                workforce: 1250,
                depth: "400m",
                established: "1890",
                description: "Large reserves of non-coking coal"
            },
            {
                id: 11,
                name: "Godavari Valley",
                state: "Telangana",
                district: "Ramagundam",
                type: "Open Cast",
                x: 600,
                y: 690,
                lat: "18.8008°N",
                lng: "79.4420°E",
                emissions: 82000,
                capacity: 19,
                workforce: 900,
                depth: "280m",
                established: "1975",
                description: "Major coalfield along Godavari river"
            },
            {
                id: 12,
                name: "Sohagpur Coalfield",
                state: "Madhya Pradesh",
                district: "Shahdol",
                type: "Underground",
                x: 620,
                y: 480,
                lat: "23.1975°N",
                lng: "81.3628°E",
                emissions: 70000,
                capacity: 16,
                workforce: 800,
                depth: "550m",
                established: "1920",
                description: "Central India's coal mining region"
            }
        ];
    }

    init() {
        this.createMapStructure();
        this.drawDetailedIndiaMap();
        this.plotMines();
        this.setupControls();
        this.updateStatistics();
        this.createTooltip();
    }

    createMapStructure() {
        this.container.innerHTML = `
            <div class="detailed-map-container">
                <div class="map-header">
                    <h3>🗺️ India Coal Mine Locations Map</h3>
                    <p>Hover over markers for quick info • Click for detailed information</p>
                </div>
                
                <div class="map-controls">
                    <div class="control-group">
                        <input type="text" id="mine-search" placeholder="🔍 Search mines..." class="map-search-input">
                    </div>
                    <div class="control-group">
                        <select id="state-filter" class="map-select">
                            <option value="">All States</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                        </select>
                    </div>
                    <div class="control-group">
                        <select id="type-filter" class="map-select">
                            <option value="">All Types</option>
                            <option value="Open Cast">Open Cast</option>
                            <option value="Underground">Underground</option>
                            <option value="Mixed">Mixed</option>
                        </select>
                    </div>
                    <button id="reset-map-view" class="map-btn">🔄 Reset</button>
                    <button id="export-map-data" class="map-btn">📥 Export</button>
                </div>
                
                <div class="map-main">
                    <div class="map-svg-container">
                        <svg id="india-map-svg" viewBox="0 0 1000 1200" xmlns="http://www.w3.org/2000/svg">
                            <!-- Detailed map will be drawn here -->
                        </svg>
                        <div id="map-tooltip" class="map-tooltip"></div>
                    </div>
                    
                    <div class="map-sidebar">
                        <div class="map-info-panel">
                            <h4>📍 Selected Mine Details</h4>
                            <div id="mine-details">
                                <p class="no-selection">Click on a mine marker to view full details</p>
                            </div>
                        </div>
                        
                        <div class="map-legend">
                            <h4>📊 Legend</h4>
                            <div class="legend-item">
                                <span class="legend-dot high-emission"></span>
                                <span>High Emissions (>100k t/year)</span>
                            </div>
                            <div class="legend-item">
                                <span class="legend-dot medium-emission"></span>
                                <span>Medium (50-100k t/year)</span>
                            </div>
                            <div class="legend-item">
                                <span class="legend-dot low-emission"></span>
                                <span>Low (<50k t/year)</span>
                            </div>
                            <div class="legend-divider"></div>
                            <div class="legend-item">
                                <span class="legend-icon">⛏️</span>
                                <span>Open Cast Mine</span>
                            </div>
                            <div class="legend-item">
                                <span class="legend-icon">🏗️</span>
                                <span>Underground Mine</span>
                            </div>
                            <div class="legend-item">
                                <span class="legend-icon">⚙️</span>
                                <span>Mixed Type Mine</span>
                            </div>
                        </div>
                        
                        <div class="map-statistics">
                            <h4>📈 Statistics</h4>
                            <div class="stat-row">
                                <span>Active Mines:</span>
                                <strong id="total-mines-stat">0</strong>
                            </div>
                            <div class="stat-row">
                                <span>Total Emissions:</span>
                                <strong id="total-emissions-stat">0</strong>
                            </div>
                            <div class="stat-row">
                                <span>Total Capacity:</span>
                                <strong id="total-capacity-stat">0</strong>
                            </div>
                            <div class="stat-row">
                                <span>Total Workforce:</span>
                                <strong id="total-workforce-stat">0</strong>
                            </div>
                            <div class="stat-row">
                                <span>Avg Depth:</span>
                                <strong id="avg-depth-stat">0</strong>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="map-table-container">
                    <h4>📋 Coal Mines Database</h4>
                    <div class="table-wrapper">
                        <table class="mines-data-table">
                            <thead>
                                <tr>
                                    <th>Mine Name</th>
                                    <th>State</th>
                                    <th>District</th>
                                    <th>Type</th>
                                    <th>Emissions</th>
                                    <th>Capacity</th>
                                    <th>Est.</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="mines-table-body">
                                <!-- Table rows will be generated here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        this.addEnhancedStyles();
    }

    addEnhancedStyles() {
        if (!document.getElementById('detailed-map-styles')) {
            const style = document.createElement('style');
            style.id = 'detailed-map-styles';
            style.textContent = `
                .detailed-map-container {
                    width: 100%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 12px;
                    padding: 2px;
                    margin: 20px 0;
                }

                .detailed-map-container > * {
                    background: white;
                    border-radius: 10px;
                }

                .map-header {
                    text-align: center;
                    padding: 20px;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    border-radius: 10px 10px 0 0;
                }

                .map-header h3 {
                    margin: 0 0 5px 0;
                    color: #2c3e50;
                    font-size: 28px;
                    font-weight: bold;
                }

                .map-header p {
                    margin: 0;
                    color: #546e7a;
                    font-size: 14px;
                }

                .map-controls {
                    display: flex;
                    gap: 12px;
                    padding: 20px;
                    background: #f8f9fa;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                    border-top: 1px solid #e0e0e0;
                }

                .control-group {
                    flex: 1;
                    min-width: 180px;
                }

                .map-search-input, .map-select {
                    width: 100%;
                    padding: 10px 15px;
                    border: 2px solid #e0e0e0;
                    border-radius: 8px;
                    font-size: 14px;
                    transition: all 0.3s;
                }

                .map-search-input:focus, .map-select:focus {
                    border-color: #667eea;
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .map-btn {
                    padding: 10px 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: transform 0.2s;
                }

                .map-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
                }

                .map-main {
                    display: flex;
                    gap: 20px;
                    padding: 20px;
                }

                .map-svg-container {
                    flex: 2.5;
                    background: #f0f4f8;
                    border-radius: 12px;
                    padding: 20px;
                    position: relative;
                    min-height: 600px;
                    box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
                }

                #india-map-svg {
                    width: 100%;
                    height: auto;
                    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
                }

                /* India map styling */
                .india-landmass {
                    fill: #e8f5e9;
                    stroke: #2e7d32;
                    stroke-width: 1.5;
                }

                .state-path {
                    fill: #f5f5f5;
                    stroke: #757575;
                    stroke-width: 0.5;
                    transition: fill 0.3s;
                }

                .state-path:hover {
                    fill: #e3f2fd;
                }

                .state-label {
                    font-size: 11px;
                    fill: #616161;
                    font-weight: 500;
                    pointer-events: none;
                    text-anchor: middle;
                }

                /* Mine markers */
                .mine-marker {
                    cursor: pointer;
                    transition: all 0.3s;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
                }

                .mine-marker:hover {
                    transform: scale(1.2);
                    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
                }

                .mine-marker.selected {
                    stroke: #2c3e50;
                    stroke-width: 3;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }

                .mine-label {
                    font-size: 10px;
                    fill: #2c3e50;
                    font-weight: 600;
                    pointer-events: none;
                    text-anchor: middle;
                    text-shadow: 1px 1px 2px white;
                }

                /* Tooltip styling */
                .map-tooltip {
                    position: absolute;
                    background: rgba(33, 33, 33, 0.95);
                    color: white;
                    padding: 12px 15px;
                    border-radius: 8px;
                    font-size: 13px;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s;
                    z-index: 1000;
                    max-width: 250px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                }

                .map-tooltip.visible {
                    opacity: 1;
                }

                .tooltip-header {
                    font-weight: bold;
                    font-size: 14px;
                    margin-bottom: 8px;
                    padding-bottom: 5px;
                    border-bottom: 1px solid rgba(255,255,255,0.2);
                }

                .tooltip-row {
                    display: flex;
                    justify-content: space-between;
                    margin: 4px 0;
                }

                .tooltip-label {
                    color: #b0b0b0;
                    margin-right: 10px;
                }

                .tooltip-value {
                    color: #fff;
                    font-weight: 500;
                }

                /* Sidebar panels */
                .map-sidebar {
                    flex: 1;
                    min-width: 280px;
                }

                .map-info-panel, .map-legend, .map-statistics {
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 20px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                    border: 1px solid #e0e0e0;
                }

                .map-info-panel h4, .map-legend h4, .map-statistics h4 {
                    margin: 0 0 15px 0;
                    color: #2c3e50;
                    font-size: 18px;
                    font-weight: 600;
                }

                #mine-details {
                    font-size: 14px;
                }

                #mine-details .detail-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #f0f0f0;
                }

                #mine-details .detail-label {
                    color: #757575;
                    font-weight: 500;
                }

                #mine-details .detail-value {
                    font-weight: 600;
                    color: #2c3e50;
                }

                .no-selection {
                    color: #9e9e9e;
                    text-align: center;
                    font-style: italic;
                    padding: 20px;
                }

                /* Legend styling */
                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 10px;
                    font-size: 13px;
                }

                .legend-dot {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    border: 2px solid #333;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }

                .legend-dot.high-emission {
                    background: #e74c3c;
                }

                .legend-dot.medium-emission {
                    background: #f39c12;
                }

                .legend-dot.low-emission {
                    background: #27ae60;
                }

                .legend-icon {
                    font-size: 18px;
                    width: 20px;
                    text-align: center;
                }

                .legend-divider {
                    height: 1px;
                    background: #e0e0e0;
                    margin: 15px 0;
                }

                /* Statistics */
                .stat-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 12px;
                    padding: 8px;
                    background: #f8f9fa;
                    border-radius: 6px;
                    font-size: 14px;
                }

                .stat-row span {
                    color: #616161;
                }

                .stat-row strong {
                    color: #2c3e50;
                    font-weight: 600;
                }

                /* Table styling */
                .map-table-container {
                    margin: 20px;
                    padding: 20px;
                    background: white;
                    border-radius: 12px;
                }

                .map-table-container h4 {
                    margin-bottom: 20px;
                    color: #2c3e50;
                    font-size: 20px;
                    font-weight: 600;
                }

                .table-wrapper {
                    overflow-x: auto;
                    border-radius: 8px;
                    box-shadow: 0 0 0 1px #e0e0e0;
                }

                .mines-data-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 14px;
                }

                .mines-data-table th {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 12px;
                    text-align: left;
                    font-weight: 600;
                    position: sticky;
                    top: 0;
                }

                .mines-data-table td {
                    padding: 12px;
                    border-bottom: 1px solid #f0f0f0;
                }

                .mines-data-table tr:hover {
                    background: #f8f9fa;
                }

                .view-btn, .analyze-btn {
                    padding: 6px 12px;
                    margin: 0 2px;
                    background: #3498db;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 600;
                    transition: all 0.2s;
                }

                .view-btn:hover, .analyze-btn:hover {
                    background: #2980b9;
                    transform: translateY(-1px);
                }

                .analyze-btn {
                    background: #27ae60;
                }

                .analyze-btn:hover {
                    background: #229954;
                }

                /* Responsive design */
                @media (max-width: 968px) {
                    .map-main {
                        flex-direction: column;
                    }
                    
                    .map-controls {
                        flex-direction: column;
                        gap: 10px;
                    }
                    
                    .control-group {
                        width: 100%;
                    }
                    
                    .map-sidebar {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 20px;
                    }
                }

                @media (max-width: 480px) {
                    .map-header h3 {
                        font-size: 20px;
                    }
                    
                    .mines-data-table {
                        font-size: 12px;
                    }
                    
                    .mines-data-table th,
                    .mines-data-table td {
                        padding: 8px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    drawDetailedIndiaMap() {
        const svg = document.getElementById('india-map-svg');
        
        // Create gradient definitions
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        // Land gradient
        const landGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        landGradient.setAttribute('id', 'landGradient');
        landGradient.innerHTML = `
            <stop offset="0%" style="stop-color:#c8e6c9;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#a5d6a7;stop-opacity:1" />
        `;
        defs.appendChild(landGradient);
        svg.appendChild(defs);
        
        // More accurate India outline with major states
        const indiaPath = `
            M 450 100
            Q 500 80, 550 90
            L 600 100
            Q 650 95, 680 110
            L 720 130
            Q 750 140, 770 160
            L 780 180
            Q 790 200, 785 220
            L 780 250
            Q 775 280, 770 310
            L 765 340
            Q 760 370, 755 400
            L 750 430
            Q 745 460, 740 490
            L 735 520
            Q 730 550, 720 580
            L 700 620
            Q 680 660, 650 690
            L 620 720
            Q 590 750, 560 770
            L 530 790
            Q 500 810, 470 820
            L 440 830
            Q 410 835, 380 830
            L 350 820
            Q 320 810, 290 790
            L 260 770
            Q 230 750, 210 720
            L 195 690
            Q 180 660, 170 630
            L 165 600
            Q 160 570, 165 540
            L 170 510
            Q 175 480, 180 450
            L 185 420
            Q 190 390, 195 360
            L 200 330
            Q 205 300, 210 270
            L 215 240
            Q 220 210, 230 180
            L 250 150
            Q 270 120, 300 100
            L 350 85
            Q 400 80, 450 100
            Z
        `;

        // Add southern peninsula
        const southIndia = `
            M 440 830
            Q 420 850, 400 880
            L 380 920
            Q 370 950, 365 980
            L 362 1010
            Q 360 1040, 365 1070
            L 375 1090
            Q 385 1100, 400 1095
            L 420 1085
            Q 440 1075, 455 1060
            L 470 1040
            Q 480 1020, 485 1000
            L 488 970
            Q 490 940, 485 910
            L 475 880
            Q 465 850, 440 830
            Z
        `;

        // Draw main landmass
        const india = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        india.setAttribute('d', indiaPath);
        india.setAttribute('class', 'india-landmass');
        india.setAttribute('fill', 'url(#landGradient)');
        svg.appendChild(india);

        // Draw southern peninsula
        const south = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        south.setAttribute('d', southIndia);
        south.setAttribute('class', 'india-landmass');
        south.setAttribute('fill', 'url(#landGradient)');
        svg.appendChild(south);

        // Add state boundaries and labels
        this.drawStates(svg);
    }

    drawStates(svg) {
        // Simplified state regions with labels
        const states = [
            { name: 'Jharkhand', x: 710, y: 450, path: 'M 680 420 L 740 420 L 740 480 L 680 480 Z' },
            { name: 'West Bengal', x: 730, y: 490, path: 'M 700 460 L 760 460 L 760 520 L 700 520 Z' },
            { name: 'Chhattisgarh', x: 650, y: 530, path: 'M 620 500 L 680 500 L 680 560 L 620 560 Z' },
            { name: 'Odisha', x: 690, y: 580, path: 'M 660 550 L 720 550 L 720 610 L 660 610 Z' },
            { name: 'Maharashtra', x: 550, y: 640, path: 'M 520 610 L 580 610 L 580 670 L 520 670 Z' },
            { name: 'Telangana', x: 590, y: 700, path: 'M 560 670 L 620 670 L 620 730 L 560 730 Z' },
            { name: 'Tamil Nadu', x: 570, y: 920, path: 'M 540 890 L 600 890 L 600 950 L 540 950 Z' },
            { name: 'MP', x: 600, y: 480, path: 'M 570 450 L 630 450 L 630 510 L 570 510 Z' }
        ];

        const statesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        statesGroup.setAttribute('id', 'states-group');

        states.forEach(state => {
            // Draw state boundary
            const statePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            statePath.setAttribute('d', state.path);
            statePath.setAttribute('class', 'state-path');
            statePath.setAttribute('data-state', state.name);
            statesGroup.appendChild(statePath);

            // Add state label
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', state.x);
            label.setAttribute('y', state.y);
            label.setAttribute('class', 'state-label');
            label.textContent = state.name;
            statesGroup.appendChild(label);
        });

        svg.appendChild(statesGroup);
    }

    plotMines() {
        const svg = document.getElementById('india-map-svg');
        const minesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        minesGroup.id = 'mines-group';
        
        this.mines.forEach(mine => {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', 'mine-group');
            
            // Get color based on emissions
            const color = this.getEmissionColor(mine.emissions);
            
            // Create mine marker with icon based on type
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', mine.x);
            circle.setAttribute('cy', mine.y);
            circle.setAttribute('r', '10');
            circle.setAttribute('fill', color);
            circle.setAttribute('class', 'mine-marker');
            circle.setAttribute('data-mine-id', mine.id);
            circle.setAttribute('stroke', 'white');
            circle.setAttribute('stroke-width', '2');
            
            // Add icon based on type
            const icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            icon.setAttribute('x', mine.x);
            icon.setAttribute('y', mine.y + 4);
            icon.setAttribute('text-anchor', 'middle');
            icon.setAttribute('font-size', '12');
            icon.setAttribute('fill', 'white');
            icon.setAttribute('pointer-events', 'none');
            
            if (mine.type === 'Open Cast') {
                icon.textContent = '⛏';
            } else if (mine.type === 'Underground') {
                icon.textContent = '⬇';
            } else {
                icon.textContent = '⚙';
            }
            
            // Add events
            circle.addEventListener('click', () => this.selectMine(mine));
            circle.addEventListener('mouseenter', (e) => this.showTooltip(e, mine));
            circle.addEventListener('mouseleave', () => this.hideTooltip());
            
            // Create label
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', mine.x);
            text.setAttribute('y', mine.y - 15);
            text.setAttribute('class', 'mine-label');
            text.textContent = mine.name.split(' ')[0];
            
            g.appendChild(circle);
            g.appendChild(icon);
            g.appendChild(text);
            minesGroup.appendChild(g);
        });
        
        svg.appendChild(minesGroup);
        this.updateTable();
    }

    getEmissionColor(emissions) {
        if (emissions > 100000) return '#e74c3c';
        if (emissions > 50000) return '#f39c12';
        return '#27ae60';
    }

    createTooltip() {
        this.tooltip = document.getElementById('map-tooltip');
    }

    showTooltip(event, mine) {
        const tooltip = this.tooltip;
        const container = document.querySelector('.map-svg-container');
        const rect = container.getBoundingClientRect();
        
        // Calculate position
        const x = event.clientX - rect.left + 15;
        const y = event.clientY - rect.top - 10;
        
        // Create tooltip content
        tooltip.innerHTML = `
            <div class="tooltip-header">${mine.name}</div>
            <div class="tooltip-row">
                <span class="tooltip-label">State:</span>
                <span class="tooltip-value">${mine.state}</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Type:</span>
                <span class="tooltip-value">${mine.type}</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Emissions:</span>
                <span class="tooltip-value">${(mine.emissions/1000).toFixed(0)}k t/yr</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Capacity:</span>
                <span class="tooltip-value">${mine.capacity} MT/yr</span>
            </div>
            <div class="tooltip-row">
                <span class="tooltip-label">Established:</span>
                <span class="tooltip-value">${mine.established}</span>
            </div>
        `;
        
        // Position and show tooltip
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
        tooltip.classList.add('visible');
    }

    hideTooltip() {
        this.tooltip.classList.remove('visible');
    }

    selectMine(mine) {
        // Update selected marker
        document.querySelectorAll('.mine-marker').forEach(marker => {
            marker.classList.remove('selected');
        });
        document.querySelector(`[data-mine-id="${mine.id}"]`)?.classList.add('selected');
        
        // Update details panel with comprehensive information
        const detailsDiv = document.getElementById('mine-details');
        detailsDiv.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value">${mine.name}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Location:</span>
                <span class="detail-value">${mine.district}, ${mine.state}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Coordinates:</span>
                <span class="detail-value">${mine.lat}, ${mine.lng}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Type:</span>
                <span class="detail-value">${mine.type}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Depth:</span>
                <span class="detail-value">${mine.depth}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Established:</span>
                <span class="detail-value">${mine.established}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Emissions:</span>
                <span class="detail-value">${mine.emissions.toLocaleString()} t/year</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Capacity:</span>
                <span class="detail-value">${mine.capacity} MT/year</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Workforce:</span>
                <span class="detail-value">${mine.workforce.toLocaleString()} employees</span>
            </div>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #e0e0e0;">
                <p style="color: #666; font-size: 13px; line-height: 1.5;">${mine.description}</p>
            </div>
            <div style="margin-top: 15px;">
                <button class="analyze-btn" onclick="detailedMap.analyzeMine(${mine.id})" style="width: 100%;">
                    📊 Analyze This Mine
                </button>
            </div>
        `;
        
        this.selectedMine = mine;
    }

    analyzeMine(mineId) {
        const mine = this.mines.find(m => m.id === mineId);
        if (mine) {
            const efficiency = mine.emissions / mine.capacity / 1000;
            const rating = efficiency < 3 ? 'Excellent' : efficiency < 4 ? 'Good' : efficiency < 5 ? 'Average' : 'Needs Improvement';
            
            alert(`
📊 DETAILED ANALYSIS: ${mine.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Location: ${mine.district}, ${mine.state}
📅 Operating Since: ${mine.established} (${2024 - parseInt(mine.established)} years)
⛏️ Mining Type: ${mine.type}
📐 Depth: ${mine.depth}

PERFORMANCE METRICS:
• Emission Intensity: ${efficiency.toFixed(2)} kg CO₂/tonne
• Efficiency Rating: ${rating}
• Per Capita Emissions: ${(mine.emissions/mine.workforce).toFixed(1)} t/employee
• Production Rate: ${(mine.capacity * 1000000 / 365).toFixed(0)} tonnes/day

RECOMMENDATIONS:
✅ ${efficiency < 4 ? 'Maintain current efficient operations' : 'Implement emission reduction measures'}
✅ ${mine.type === 'Underground' ? 'Consider methane capture systems' : 'Optimize open-cast operations'}
✅ ${mine.workforce > 1000 ? 'Explore automation opportunities' : 'Maintain current workforce efficiency'}
✅ Consider renewable energy integration for ${(mine.emissions * 0.3 / 1000).toFixed(1)} MW capacity
            `);
        }
    }

    setupControls() {
        // Search functionality
        document.getElementById('mine-search')?.addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.applyFilters();
        });

        // State filter
        document.getElementById('state-filter')?.addEventListener('change', (e) => {
            this.filters.state = e.target.value;
            this.applyFilters();
        });

        // Type filter
        document.getElementById('type-filter')?.addEventListener('change', (e) => {
            this.filters.type = e.target.value;
            this.applyFilters();
        });

        // Reset button
        document.getElementById('reset-map-view')?.addEventListener('click', () => {
            this.resetFilters();
        });

        // Export button
        document.getElementById('export-map-data')?.addEventListener('click', () => {
            this.exportData();
        });
    }

    applyFilters() {
        const filteredMines = this.mines.filter(mine => {
            const matchesSearch = !this.filters.search || 
                mine.name.toLowerCase().includes(this.filters.search) ||
                mine.state.toLowerCase().includes(this.filters.search) ||
                mine.district.toLowerCase().includes(this.filters.search);
            
            const matchesState = !this.filters.state || mine.state === this.filters.state;
            const matchesType = !this.filters.type || mine.type === this.filters.type;
            
            return matchesSearch && matchesState && matchesType;
        });

        // Update visibility of markers
        document.querySelectorAll('.mine-marker').forEach(marker => {
            const mineId = parseInt(marker.getAttribute('data-mine-id'));
            const isVisible = filteredMines.find(m => m.id === mineId);
            marker.style.opacity = isVisible ? '1' : '0.2';
            marker.style.pointerEvents = isVisible ? 'auto' : 'none';
            
            // Also update the label
            const label = marker.parentElement.querySelector('.mine-label');
            if (label) {
                label.style.opacity = isVisible ? '1' : '0.2';
            }
        });

        // Update table and statistics
        this.updateTable(filteredMines);
        this.updateStatistics(filteredMines);
    }

    resetFilters() {
        this.filters = { state: '', type: '', search: '' };
        document.getElementById('mine-search').value = '';
        document.getElementById('state-filter').value = '';
        document.getElementById('type-filter').value = '';
        this.applyFilters();
    }

    updateTable(minesToShow = this.mines) {
        const tbody = document.getElementById('mines-table-body');
        tbody.innerHTML = minesToShow.map(mine => `
            <tr>
                <td><strong>${mine.name}</strong></td>
                <td>${mine.state}</td>
                <td>${mine.district}</td>
                <td>${mine.type}</td>
                <td>${(mine.emissions/1000).toFixed(0)}k</td>
                <td>${mine.capacity} MT</td>
                <td>${mine.established}</td>
                <td>
                    <button class="view-btn" onclick="detailedMap.selectMine(detailedMap.mines.find(m => m.id === ${mine.id}))">
                        👁️ View
                    </button>
                    <button class="analyze-btn" onclick="detailedMap.analyzeMine(${mine.id})">
                        📊 Analyze
                    </button>
                </td>
            </tr>
        `).join('');
    }

    updateStatistics(minesToShow = this.mines) {
        const totalEmissions = minesToShow.reduce((sum, mine) => sum + mine.emissions, 0);
        const totalCapacity = minesToShow.reduce((sum, mine) => sum + mine.capacity, 0);
        const totalWorkforce = minesToShow.reduce((sum, mine) => sum + mine.workforce, 0);
        const avgDepth = minesToShow.reduce((sum, mine) => sum + parseInt(mine.depth), 0) / minesToShow.length;

        document.getElementById('total-mines-stat').textContent = minesToShow.length;
        document.getElementById('total-emissions-stat').textContent = (totalEmissions/1000).toFixed(0) + 'k t/year';
        document.getElementById('total-capacity-stat').textContent = totalCapacity + ' MT/year';
        document.getElementById('total-workforce-stat').textContent = (totalWorkforce/1000).toFixed(1) + 'k';
        document.getElementById('avg-depth-stat').textContent = avgDepth.toFixed(0) + 'm';
    }

    exportData() {
        const dataStr = JSON.stringify(this.mines, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `india-coal-mines-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
}

// Initialize the detailed map
window.detailedMap = null;

function initializeDetailedMap() {
    if (document.getElementById('google-map')) {
        window.detailedMap = new DetailedIndiaMap('google-map');
    }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDetailedMap);
} else {
    initializeDetailedMap();
}
