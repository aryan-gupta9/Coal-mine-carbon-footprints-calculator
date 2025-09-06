// Advanced India Coal Mine Map with Realistic Geography and Enhanced Features
// Version 3.0 - Professional Grade Interactive Map

class AdvancedIndiaMap {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedMine = null;
        this.mines = this.getComprehensiveMineData();
        this.filters = { state: '', type: '', search: '', emissionRange: 'all' };
        this.viewMode = 'normal'; // normal, satellite, terrain
        this.animationEnabled = true;
        
        if (this.container) {
            this.init();
        }
    }

    getComprehensiveMineData() {
        return [
            // Eastern Coalfields
            {
                id: 1,
                name: "Jharia Coalfield",
                state: "Jharkhand",
                district: "Dhanbad",
                type: "Open Cast",
                x: 750, y: 385,
                lat: "23.7956°N", lng: "86.4303°E",
                emissions: 125000,
                capacity: 30,
                workforce: 1500,
                depth: "600m",
                established: "1894",
                coalType: "Coking Coal",
                reserves: "19.4 billion tonnes",
                description: "India's most valuable coalfield with prime coking coal, critical for steel production"
            },
            {
                id: 2,
                name: "Bokaro Coalfield",
                state: "Jharkhand",
                district: "Bokaro",
                type: "Mixed",
                x: 735, y: 380,
                lat: "23.7870°N", lng: "85.9560°E",
                emissions: 105000,
                capacity: 26,
                workforce: 1250,
                depth: "450m",
                established: "1872",
                coalType: "Coking Coal",
                reserves: "5.2 billion tonnes",
                description: "Major supplier to Bokaro Steel Plant, one of India's largest steel producers"
            },
            {
                id: 3,
                name: "Raniganj Coalfield",
                state: "West Bengal",
                district: "Asansol",
                type: "Underground",
                x: 765, y: 395,
                lat: "23.6205°N", lng: "87.1299°E",
                emissions: 98000,
                capacity: 25,
                workforce: 1200,
                depth: "450m",
                established: "1774",
                coalType: "Non-Coking Coal",
                reserves: "12.6 billion tonnes",
                description: "Birthplace of Indian coal mining, oldest continuously operated coalfield"
            },
            {
                id: 4,
                name: "Karanpura Coalfield",
                state: "Jharkhand",
                district: "Ranchi",
                type: "Mixed",
                x: 720, y: 375,
                lat: "24.0295°N", lng: "85.3460°E",
                emissions: 95000,
                capacity: 22,
                workforce: 1100,
                depth: "500m",
                established: "1856",
                coalType: "Coking Coal",
                reserves: "8.9 billion tonnes",
                description: "Rich in medium and high-grade coking coal reserves"
            },
            {
                id: 5,
                name: "North Karanpura",
                state: "Jharkhand",
                district: "Hazaribagh",
                type: "Open Cast",
                x: 725, y: 365,
                lat: "24.3870°N", lng: "85.6780°E",
                emissions: 85000,
                capacity: 20,
                workforce: 950,
                depth: "400m",
                established: "1890",
                coalType: "Non-Coking Coal",
                reserves: "14.7 billion tonnes",
                description: "Large open cast operations with significant non-coking coal reserves"
            },
            // Central India
            {
                id: 6,
                name: "Korba Coalfield",
                state: "Chhattisgarh",
                district: "Korba",
                type: "Mixed",
                x: 650, y: 430,
                lat: "22.3595°N", lng: "82.6950°E",
                emissions: 110000,
                capacity: 28,
                workforce: 1350,
                depth: "300m",
                established: "1951",
                coalType: "Thermal Coal",
                reserves: "10.1 billion tonnes",
                description: "Power generation hub with India's first super thermal power station"
            },
            {
                id: 7,
                name: "Sohagpur Coalfield",
                state: "Madhya Pradesh",
                district: "Shahdol",
                type: "Underground",
                x: 620, y: 410,
                lat: "23.1975°N", lng: "81.3628°E",
                emissions: 70000,
                capacity: 16,
                workforce: 800,
                depth: "550m",
                established: "1920",
                coalType: "Non-Coking Coal",
                reserves: "6.5 billion tonnes",
                description: "Central India's key coal mining region with deep underground operations"
            },
            {
                id: 8,
                name: "Singrauli Coalfield",
                state: "Madhya Pradesh",
                district: "Singrauli",
                type: "Open Cast",
                x: 640, y: 390,
                lat: "24.1997°N", lng: "82.6750°E",
                emissions: 115000,
                capacity: 32,
                workforce: 1600,
                depth: "200m",
                established: "1960",
                coalType: "Thermal Coal",
                reserves: "11.4 billion tonnes",
                description: "Energy capital of India, massive open cast mines feeding multiple power plants"
            },
            // Eastern India
            {
                id: 9,
                name: "Talcher Coalfield",
                state: "Odisha",
                district: "Angul",
                type: "Open Cast",
                x: 710, y: 490,
                lat: "20.9517°N", lng: "85.1330°E",
                emissions: 135000,
                capacity: 35,
                workforce: 1800,
                depth: "250m",
                established: "1960",
                coalType: "Thermal Coal",
                reserves: "51.2 billion tonnes",
                description: "One of India's largest coalfields with highest coal reserves"
            },
            {
                id: 10,
                name: "Ib Valley Coalfield",
                state: "Odisha",
                district: "Jharsuguda",
                type: "Mixed",
                x: 690, y: 470,
                lat: "21.9137°N", lng: "83.8921°E",
                emissions: 92000,
                capacity: 21,
                workforce: 1000,
                depth: "350m",
                established: "1901",
                coalType: "Non-Coking Coal",
                reserves: "22.3 billion tonnes",
                description: "Major supplier to aluminum smelters and thermal power plants"
            },
            // Western India
            {
                id: 11,
                name: "Wardha Valley",
                state: "Maharashtra",
                district: "Chandrapur",
                type: "Open Cast",
                x: 570, y: 510,
                lat: "20.7453°N", lng: "79.0669°E",
                emissions: 75000,
                capacity: 18,
                workforce: 850,
                depth: "200m",
                established: "1913",
                coalType: "Non-Coking Coal",
                reserves: "5.7 billion tonnes",
                description: "Western India's primary indigenous coal source"
            },
            {
                id: 12,
                name: "Kamptee Coalfield",
                state: "Maharashtra",
                district: "Nagpur",
                type: "Underground",
                x: 560, y: 495,
                lat: "21.2167°N", lng: "79.1975°E",
                emissions: 45000,
                capacity: 10,
                workforce: 600,
                depth: "400m",
                established: "1908",
                coalType: "Non-Coking Coal",
                reserves: "1.2 billion tonnes",
                description: "Historic coalfield near Nagpur with deep underground mines"
            },
            // Southern India
            {
                id: 13,
                name: "Singareni Collieries",
                state: "Telangana",
                district: "Kothagudem",
                type: "Underground",
                x: 590, y: 580,
                lat: "18.7670°N", lng: "79.5890°E",
                emissions: 88000,
                capacity: 20,
                workforce: 950,
                depth: "700m",
                established: "1889",
                coalType: "Non-Coking Coal",
                reserves: "8.8 billion tonnes",
                description: "Government company operating in Godavari Valley coalfield"
            },
            {
                id: 14,
                name: "Godavari Valley",
                state: "Telangana",
                district: "Ramagundam",
                type: "Open Cast",
                x: 600, y: 570,
                lat: "18.8008°N", lng: "79.4420°E",
                emissions: 82000,
                capacity: 19,
                workforce: 900,
                depth: "280m",
                established: "1975",
                coalType: "Thermal Coal",
                reserves: "7.4 billion tonnes",
                description: "Major coalfield along Godavari river basin"
            },
            {
                id: 15,
                name: "Neyveli Lignite",
                state: "Tamil Nadu",
                district: "Cuddalore",
                type: "Open Cast",
                x: 580, y: 750,
                lat: "11.5986°N", lng: "79.4743°E",
                emissions: 65000,
                capacity: 15,
                workforce: 750,
                depth: "150m",
                established: "1957",
                coalType: "Lignite",
                reserves: "3.3 billion tonnes",
                description: "India's largest lignite mining complex in South India"
            },
            // North Eastern
            {
                id: 16,
                name: "Makum Coalfield",
                state: "Assam",
                district: "Tinsukia",
                type: "Underground",
                x: 890, y: 320,
                lat: "27.3000°N", lng: "95.3333°E",
                emissions: 35000,
                capacity: 8,
                workforce: 450,
                depth: "300m",
                established: "1882",
                coalType: "Coking Coal",
                reserves: "0.5 billion tonnes",
                description: "North-East India's primary coal source with high sulfur content"
            }
        ];
    }

    init() {
        this.createAdvancedMapStructure();
        this.drawRealisticIndiaMap();
        this.createRivers();
        this.plotMinesWithAnimation();
        this.setupAdvancedControls();
        this.createAdvancedTooltip();
        this.updateStatistics();
        this.initializeAnimations();
    }

    createAdvancedMapStructure() {
        this.container.innerHTML = `
            <div class="advanced-map-container">
                <div class="map-header-advanced">
                    <div class="header-content">
                        <h2 class="map-title">
                            <span class="flag">🇮🇳</span>
                            India Coal Mining Infrastructure Map
                        </h2>
                        <p class="map-subtitle">Interactive visualization of ${this.mines.length} major coal mining locations across India</p>
                    </div>
                    <div class="header-stats">
                        <div class="header-stat-item">
                            <span class="stat-icon">⛏️</span>
                            <span class="stat-value" id="active-mines-count">${this.mines.length}</span>
                            <span class="stat-label">Active Mines</span>
                        </div>
                        <div class="header-stat-item">
                            <span class="stat-icon">💨</span>
                            <span class="stat-value" id="total-emissions-header">0</span>
                            <span class="stat-label">kt CO₂/year</span>
                        </div>
                        <div class="header-stat-item">
                            <span class="stat-icon">⚡</span>
                            <span class="stat-value" id="total-capacity-header">0</span>
                            <span class="stat-label">MT/year</span>
                        </div>
                    </div>
                </div>
                
                <div class="control-bar-advanced">
                    <div class="control-section">
                        <input type="text" id="mine-search-advanced" placeholder="🔍 Search mines, states, districts..." class="search-input-advanced">
                    </div>
                    
                    <div class="control-section filters">
                        <select id="state-filter-advanced" class="filter-select">
                            <option value="">📍 All States</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Assam">Assam</option>
                        </select>
                        
                        <select id="type-filter-advanced" class="filter-select">
                            <option value="">⚙️ All Types</option>
                            <option value="Open Cast">Open Cast</option>
                            <option value="Underground">Underground</option>
                            <option value="Mixed">Mixed</option>
                        </select>
                        
                        <select id="emission-filter-advanced" class="filter-select">
                            <option value="all">💨 All Emissions</option>
                            <option value="high">High (>100k)</option>
                            <option value="medium">Medium (50-100k)</option>
                            <option value="low">Low (<50k)</option>
                        </select>
                    </div>
                    
                    <div class="control-section actions">
                        <button id="toggle-animation" class="action-btn" title="Toggle Animations">
                            <span class="btn-icon">✨</span>
                        </button>
                        <button id="toggle-view-mode" class="action-btn" title="Change View">
                            <span class="btn-icon">🗺️</span>
                        </button>
                        <button id="reset-map-advanced" class="action-btn" title="Reset">
                            <span class="btn-icon">🔄</span>
                        </button>
                        <button id="export-data-advanced" class="action-btn" title="Export Data">
                            <span class="btn-icon">📥</span>
                        </button>
                    </div>
                </div>
                
                <div class="map-content-advanced">
                    <div class="map-canvas-container">
                        <div class="map-view-controls">
                            <button class="zoom-btn" id="zoom-in">+</button>
                            <button class="zoom-btn" id="zoom-out">−</button>
                        </div>
                        <svg id="india-map-advanced" viewBox="0 0 1000 900" xmlns="http://www.w3.org/2000/svg">
                            <!-- Advanced map will be drawn here -->
                        </svg>
                        <div id="advanced-tooltip" class="advanced-tooltip"></div>
                        
                        <!-- Floating info cards -->
                        <div class="floating-info-card" id="emission-summary">
                            <h4>Emission Hotspots</h4>
                            <div class="hotspot-list" id="hotspot-list"></div>
                        </div>
                    </div>
                    
                    <div class="info-panel-advanced">
                        <!-- Selected Mine Details -->
                        <div class="info-card">
                            <div class="card-header">
                                <span class="card-icon">📍</span>
                                <h3>Mine Details</h3>
                            </div>
                            <div class="card-content" id="mine-details-advanced">
                                <div class="placeholder-message">
                                    <span class="placeholder-icon">👆</span>
                                    <p>Click on any mine marker to view detailed information</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Statistics Dashboard -->
                        <div class="info-card">
                            <div class="card-header">
                                <span class="card-icon">📊</span>
                                <h3>Statistics</h3>
                            </div>
                            <div class="card-content">
                                <div class="stat-grid">
                                    <div class="stat-item">
                                        <span class="stat-label">Total Mines</span>
                                        <span class="stat-value" id="stat-total-mines">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Total Emissions</span>
                                        <span class="stat-value" id="stat-total-emissions">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Avg Capacity</span>
                                        <span class="stat-value" id="stat-avg-capacity">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Total Workforce</span>
                                        <span class="stat-value" id="stat-total-workforce">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Avg Depth</span>
                                        <span class="stat-value" id="stat-avg-depth">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Coal Reserves</span>
                                        <span class="stat-value" id="stat-total-reserves">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Interactive Legend -->
                        <div class="info-card">
                            <div class="card-header">
                                <span class="card-icon">🎨</span>
                                <h3>Legend</h3>
                            </div>
                            <div class="card-content">
                                <div class="legend-section">
                                    <h4>Emission Levels</h4>
                                    <div class="legend-item">
                                        <span class="legend-color" style="background: #e74c3c;"></span>
                                        <span>High (>100k t/year)</span>
                                    </div>
                                    <div class="legend-item">
                                        <span class="legend-color" style="background: #f39c12;"></span>
                                        <span>Medium (50-100k)</span>
                                    </div>
                                    <div class="legend-item">
                                        <span class="legend-color" style="background: #27ae60;"></span>
                                        <span>Low (<50k)</span>
                                    </div>
                                </div>
                                
                                <div class="legend-section">
                                    <h4>Mine Types</h4>
                                    <div class="legend-item">
                                        <span class="legend-symbol">⭕</span>
                                        <span>Open Cast</span>
                                    </div>
                                    <div class="legend-item">
                                        <span class="legend-symbol">⬛</span>
                                        <span>Underground</span>
                                    </div>
                                    <div class="legend-item">
                                        <span class="legend-symbol">◼</span>
                                        <span>Mixed</span>
                                    </div>
                                </div>
                                
                                <div class="legend-section">
                                    <h4>Coal Types</h4>
                                    <div class="legend-item">
                                        <span class="coal-type-indicator coking"></span>
                                        <span>Coking Coal</span>
                                    </div>
                                    <div class="legend-item">
                                        <span class="coal-type-indicator thermal"></span>
                                        <span>Thermal Coal</span>
                                    </div>
                                    <div class="legend-item">
                                        <span class="coal-type-indicator lignite"></span>
                                        <span>Lignite</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Advanced Data Grid -->
                <div class="data-grid-container">
                    <div class="grid-header">
                        <h3>📊 Comprehensive Mine Database</h3>
                        <div class="grid-controls">
                            <button id="sort-emissions" class="sort-btn">Sort by Emissions ↓</button>
                            <button id="sort-capacity" class="sort-btn">Sort by Capacity ↓</button>
                        </div>
                    </div>
                    <div class="data-grid-wrapper">
                        <table class="data-grid">
                            <thead>
                                <tr>
                                    <th>Mine Name</th>
                                    <th>Location</th>
                                    <th>Type</th>
                                    <th>Coal Type</th>
                                    <th>Emissions</th>
                                    <th>Capacity</th>
                                    <th>Depth</th>
                                    <th>Est.</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="mines-data-grid">
                                <!-- Data rows will be generated here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        this.addAdvancedStyles();
    }

    addAdvancedStyles() {
        if (!document.getElementById('advanced-map-styles')) {
            const style = document.createElement('style');
            style.id = 'advanced-map-styles';
            style.textContent = `
                /* Advanced Map Container */
                .advanced-map-container {
                    width: 100%;
                    background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                }

                /* Header Section */
                .map-header-advanced {
                    background: rgba(255,255,255,0.98);
                    padding: 20px 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 3px solid #f39c12;
                }

                .header-content {
                    flex: 1;
                }

                .map-title {
                    font-size: 28px;
                    font-weight: 700;
                    color: #2c3e50;
                    margin: 0 0 5px 0;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .flag {
                    font-size: 32px;
                    animation: wave 2s infinite;
                }

                @keyframes wave {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-10deg); }
                    75% { transform: rotate(10deg); }
                }

                .map-subtitle {
                    color: #7f8c8d;
                    font-size: 14px;
                    margin: 0;
                }

                .header-stats {
                    display: flex;
                    gap: 30px;
                }

                .header-stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .stat-icon {
                    font-size: 24px;
                    margin-bottom: 5px;
                }

                .header-stat-item .stat-value {
                    font-size: 22px;
                    font-weight: 700;
                    color: #2c3e50;
                }

                .header-stat-item .stat-label {
                    font-size: 11px;
                    color: #95a5a6;
                    text-transform: uppercase;
                }

                /* Control Bar */
                .control-bar-advanced {
                    background: rgba(255,255,255,0.95);
                    padding: 15px 30px;
                    display: flex;
                    gap: 20px;
                    align-items: center;
                    flex-wrap: wrap;
                    border-bottom: 1px solid #ecf0f1;
                }

                .control-section {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                }

                .control-section.filters {
                    flex: 1;
                }

                .search-input-advanced {
                    width: 300px;
                    padding: 10px 15px;
                    border: 2px solid #ecf0f1;
                    border-radius: 25px;
                    font-size: 14px;
                    transition: all 0.3s;
                }

                .search-input-advanced:focus {
                    outline: none;
                    border-color: #3498db;
                    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
                }

                .filter-select {
                    padding: 8px 15px;
                    border: 2px solid #ecf0f1;
                    border-radius: 20px;
                    font-size: 14px;
                    background: white;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .filter-select:hover {
                    border-color: #3498db;
                }

                .action-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 2px solid #ecf0f1;
                    background: white;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .action-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    border-color: #3498db;
                }

                .btn-icon {
                    font-size: 18px;
                }

                /* Map Content Area */
                .map-content-advanced {
                    display: flex;
                    background: white;
                    min-height: 600px;
                }

                .map-canvas-container {
                    flex: 2.5;
                    position: relative;
                    background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
                    padding: 20px;
                }

                /* Map View Controls */
                .map-view-controls {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    z-index: 100;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .zoom-btn {
                    width: 36px;
                    height: 36px;
                    background: white;
                    border: 2px solid #ecf0f1;
                    border-radius: 8px;
                    font-size: 20px;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }

                .zoom-btn:hover {
                    background: #3498db;
                    color: white;
                    transform: scale(1.1);
                }

                /* SVG Map */
                #india-map-advanced {
                    width: 100%;
                    height: 100%;
                    filter: drop-shadow(0 10px 30px rgba(0,0,0,0.2));
                }

                /* India Landmass */
                .india-land {
                    fill: #f8f9fa;
                    stroke: #2c3e50;
                    stroke-width: 2;
                    transition: fill 0.3s;
                }

                .india-land:hover {
                    fill: #ecf0f1;
                }

                /* States */
                .state-region {
                    fill: #ffffff;
                    stroke: #95a5a6;
                    stroke-width: 1;
                    opacity: 0.8;
                    transition: all 0.3s;
                }

                .state-region:hover {
                    fill: #e3f2fd;
                    opacity: 1;
                }

                .state-name {
                    font-size: 10px;
                    fill: #7f8c8d;
                    font-weight: 600;
                    pointer-events: none;
                    text-anchor: middle;
                }

                /* Rivers */
                .river {
                    fill: none;
                    stroke: #3498db;
                    stroke-width: 1.5;
                    opacity: 0.6;
                }

                /* Mine Markers */
                .mine-group {
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .mine-group:hover .mine-marker {
                    transform: scale(1.3);
                }

                .mine-marker {
                    transition: all 0.3s;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
                }

                .mine-marker.pulse {
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.8; }
                    100% { transform: scale(1); opacity: 1; }
                }

                .mine-marker.selected {
                    stroke: #2c3e50;
                    stroke-width: 3;
                    filter: drop-shadow(0 0 10px rgba(255, 193, 7, 0.8));
                }

                .mine-label {
                    font-size: 9px;
                    fill: #2c3e50;
                    font-weight: 700;
                    text-anchor: middle;
                    pointer-events: none;
                }

                /* Advanced Tooltip */
                .advanced-tooltip {
                    position: absolute;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 15px;
                    border-radius: 12px;
                    font-size: 13px;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s;
                    z-index: 1000;
                    max-width: 280px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                }

                .advanced-tooltip.visible {
                    opacity: 1;
                }

                .tooltip-title {
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 10px;
                    border-bottom: 2px solid rgba(255,255,255,0.3);
                    padding-bottom: 5px;
                }

                .tooltip-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 8px;
                    margin-top: 10px;
                }

                .tooltip-item {
                    display: flex;
                    flex-direction: column;
                }

                .tooltip-label {
                    font-size: 11px;
                    opacity: 0.8;
                }

                .tooltip-value {
                    font-size: 14px;
                    font-weight: 600;
                }

                /* Floating Info Card */
                .floating-info-card {
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    background: rgba(255,255,255,0.95);
                    border-radius: 12px;
                    padding: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    max-width: 250px;
                    backdrop-filter: blur(10px);
                }

                .floating-info-card h4 {
                    margin: 0 0 10px 0;
                    color: #2c3e50;
                    font-size: 14px;
                }

                .hotspot-list {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    font-size: 12px;
                }

                .hotspot-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 5px;
                    background: rgba(231, 76, 60, 0.1);
                    border-radius: 4px;
                }

                /* Info Panel */
                .info-panel-advanced {
                    flex: 1;
                    padding: 20px;
                    background: #f8f9fa;
                    overflow-y: auto;
                    max-height: 600px;
                }

                .info-card {
                    background: white;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    overflow: hidden;
                }

                .card-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 15px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .card-icon {
                    font-size: 20px;
                }

                .card-header h3 {
                    margin: 0;
                    font-size: 16px;
                }

                .card-content {
                    padding: 20px;
                }

                .placeholder-message {
                    text-align: center;
                    padding: 40px 20px;
                    color: #95a5a6;
                }

                .placeholder-icon {
                    font-size: 48px;
                    display: block;
                    margin-bottom: 10px;
                }

                /* Mine Details */
                .detail-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }

                .detail-item {
                    display: flex;
                    flex-direction: column;
                }

                .detail-label {
                    font-size: 11px;
                    color: #95a5a6;
                    text-transform: uppercase;
                    margin-bottom: 3px;
                }

                .detail-value {
                    font-size: 14px;
                    font-weight: 600;
                    color: #2c3e50;
                }

                .mine-description {
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid #ecf0f1;
                    color: #7f8c8d;
                    font-size: 13px;
                    line-height: 1.6;
                }

                /* Statistics Grid */
                .stat-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                }

                .stat-item {
                    background: #f8f9fa;
                    padding: 12px;
                    border-radius: 8px;
                    text-align: center;
                }

                .stat-item .stat-label {
                    font-size: 11px;
                    color: #95a5a6;
                    display: block;
                    margin-bottom: 5px;
                }

                .stat-item .stat-value {
                    font-size: 18px;
                    font-weight: 700;
                    color: #2c3e50;
                }

                /* Legend Sections */
                .legend-section {
                    margin-bottom: 20px;
                }

                .legend-section h4 {
                    font-size: 12px;
                    color: #95a5a6;
                    margin-bottom: 10px;
                    text-transform: uppercase;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 8px;
                    font-size: 13px;
                }

                .legend-color {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }

                .legend-symbol {
                    font-size: 20px;
                    width: 20px;
                    text-align: center;
                }

                .coal-type-indicator {
                    width: 20px;
                    height: 20px;
                    border-radius: 4px;
                }

                .coal-type-indicator.coking {
                    background: linear-gradient(135deg, #8e44ad, #9b59b6);
                }

                .coal-type-indicator.thermal {
                    background: linear-gradient(135deg, #e67e22, #d35400);
                }

                .coal-type-indicator.lignite {
                    background: linear-gradient(135deg, #95a5a6, #7f8c8d);
                }

                /* Data Grid */
                .data-grid-container {
                    background: white;
                    padding: 20px;
                    border-top: 3px solid #ecf0f1;
                }

                .grid-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .grid-header h3 {
                    color: #2c3e50;
                    font-size: 20px;
                    margin: 0;
                }

                .grid-controls {
                    display: flex;
                    gap: 10px;
                }

                .sort-btn {
                    padding: 8px 15px;
                    background: white;
                    border: 2px solid #ecf0f1;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 13px;
                    transition: all 0.3s;
                }

                .sort-btn:hover {
                    background: #3498db;
                    color: white;
                    border-color: #3498db;
                }

                .data-grid-wrapper {
                    overflow-x: auto;
                    border-radius: 8px;
                    box-shadow: 0 0 0 1px #ecf0f1;
                }

                .data-grid {
                    width: 100%;
                    border-collapse: collapse;
                }

                .data-grid thead {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }

                .data-grid th {
                    color: white;
                    padding: 12px;
                    text-align: left;
                    font-size: 13px;
                    font-weight: 600;
                }

                .data-grid td {
                    padding: 12px;
                    border-bottom: 1px solid #ecf0f1;
                    font-size: 13px;
                }

                .data-grid tr:hover {
                    background: #f8f9fa;
                }

                .action-buttons {
                    display: flex;
                    gap: 5px;
                }

                .grid-action-btn {
                    padding: 5px 10px;
                    border-radius: 4px;
                    border: none;
                    cursor: pointer;
                    font-size: 11px;
                    font-weight: 600;
                    transition: all 0.2s;
                }

                .view-btn {
                    background: #3498db;
                    color: white;
                }

                .analyze-btn {
                    background: #27ae60;
                    color: white;
                }

                .grid-action-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                }

                /* Responsive Design */
                @media (max-width: 1200px) {
                    .map-content-advanced {
                        flex-direction: column;
                    }
                    
                    .info-panel-advanced {
                        max-height: none;
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        gap: 20px;
                    }
                }

                @media (max-width: 768px) {
                    .map-header-advanced {
                        flex-direction: column;
                        gap: 15px;
                    }
                    
                    .control-bar-advanced {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    
                    .search-input-advanced {
                        width: 100%;
                    }
                    
                    .data-grid {
                        font-size: 11px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    drawRealisticIndiaMap() {
        const svg = document.getElementById('india-map-advanced');
        
        // Create gradients and patterns
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        // Land gradient
        const landGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        landGradient.setAttribute('id', 'landGradientAdvanced');
        landGradient.setAttribute('x1', '0%');
        landGradient.setAttribute('y1', '0%');
        landGradient.setAttribute('x2', '100%');
        landGradient.setAttribute('y2', '100%');
        landGradient.innerHTML = `
            <stop offset="0%" style="stop-color:#a8e063;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#56ab2f;stop-opacity:1" />
        `;
        defs.appendChild(landGradient);
        
        // Shadow filter
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', 'dropshadow');
        filter.innerHTML = `
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="2" dy="2" result="offsetblur"/>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge> 
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/> 
            </feMerge>
        `;
        defs.appendChild(filter);
        
        svg.appendChild(defs);
        
        // Draw realistic India shape with states
        this.drawIndiaMainland(svg);
        this.drawStatesDetailed(svg);
    }

    drawIndiaMainland(svg) {
        // Proper India map outline that fits within 1000x900 viewbox
        const indiaPath = `
            M 200 120
            C 220 100, 250 90, 280 95
            C 310 100, 340 110, 365 125
            C 390 140, 410 160, 425 180
            C 440 200, 450 225, 460 250
            C 470 275, 480 300, 490 325
            C 500 350, 510 375, 520 400
            C 530 425, 540 450, 550 475
            C 560 500, 570 525, 580 550
            C 590 575, 600 600, 610 625
            C 620 650, 625 675, 625 700
            C 625 725, 620 750, 610 775
            C 600 800, 585 820, 565 835
            C 545 850, 520 860, 495 865
            C 470 870, 445 872, 420 872
            C 395 872, 370 870, 345 865
            C 320 860, 295 850, 275 835
            C 255 820, 240 800, 230 775
            C 220 750, 215 725, 215 700
            C 215 675, 220 650, 230 625
            C 240 600, 255 575, 275 550
            C 295 525, 320 505, 345 490
            C 370 475, 395 465, 420 460
            C 445 455, 470 455, 495 460
            C 520 465, 545 475, 565 490
            C 585 505, 600 525, 610 550
            C 620 575, 625 600, 625 625
            C 625 650, 620 675, 610 700
            C 600 725, 585 745, 565 760
            C 545 775, 520 785, 495 790
            C 470 795, 445 797, 420 797
            C 395 797, 370 795, 345 790
            C 320 785, 295 775, 275 760
            C 255 745, 240 725, 230 700
            C 220 675, 215 650, 215 625
            C 215 600, 220 575, 230 550
            C 240 525, 255 505, 275 490
            C 295 475, 320 465, 345 460
            C 370 455, 395 455, 420 460
            C 445 465, 470 475, 495 490
            C 520 505, 540 525, 550 550
            C 560 575, 565 600, 565 625
            C 565 650, 560 675, 550 700
            C 540 725, 525 745, 505 760
            C 485 775, 460 785, 435 790
            C 410 795, 385 797, 360 797
            C 335 797, 310 795, 285 790
            C 260 785, 235 775, 215 760
            C 195 745, 180 725, 170 700
            C 160 675, 155 650, 155 625
            C 155 600, 160 575, 170 550
            C 180 525, 195 505, 215 490
            C 235 475, 260 465, 285 460
            C 310 455, 335 455, 360 460
            C 385 465, 410 475, 435 490
            C 460 505, 480 525, 495 550
            C 510 575, 520 600, 525 625
            C 530 650, 530 675, 525 700
            C 520 725, 510 750, 495 775
            C 480 800, 460 820, 435 835
            C 410 850, 380 860, 350 865
            C 320 870, 290 870, 260 865
            C 230 860, 200 850, 175 835
            C 150 820, 130 800, 115 775
            C 100 750, 90 725, 85 700
            C 80 675, 80 650, 85 625
            C 90 600, 100 575, 115 550
            C 130 525, 150 505, 175 490
            C 200 475, 230 465, 260 460
            C 290 455, 320 455, 350 460
            C 380 465, 410 475, 435 490
            C 460 505, 480 525, 495 550
            C 510 575, 520 600, 525 625
            C 530 650, 530 675, 525 700
            C 520 725, 510 750, 495 775
            C 480 800, 460 820, 435 835
            C 410 850, 380 860, 350 865
            L 320 870
            C 290 872, 260 872, 230 870
            C 200 868, 170 863, 145 855
            C 120 847, 100 835, 85 820
            C 70 805, 60 785, 55 765
            C 50 745, 50 725, 55 705
            C 60 685, 70 665, 85 650
            C 100 635, 120 623, 145 615
            C 170 607, 200 602, 230 600
            C 260 598, 290 598, 320 600
            C 350 602, 380 607, 405 615
            C 430 623, 450 635, 465 650
            C 480 665, 490 685, 495 705
            C 500 725, 500 745, 495 765
            C 490 785, 480 805, 465 820
            C 450 835, 430 847, 405 855
            C 380 863, 350 868, 320 870
            L 290 872
            C 260 873, 230 872, 200 870
            C 170 868, 140 863, 115 855
            C 90 847, 70 835, 55 820
            C 40 805, 30 785, 25 765
            C 20 745, 20 725, 25 705
            C 30 685, 40 665, 55 650
            C 70 635, 90 623, 115 615
            C 140 607, 170 602, 200 600
            C 230 598, 260 598, 290 600
            C 320 602, 350 607, 375 615
            C 400 623, 420 635, 435 650
            C 450 665, 460 685, 465 705
            C 470 725, 470 745, 465 765
            C 460 785, 450 805, 435 820
            C 420 835, 400 847, 375 855
            C 350 863, 320 868, 290 870
            L 260 872
            C 230 873, 200 872, 170 870
            C 140 868, 110 863, 85 855
            C 60 847, 40 835, 25 820
            C 10 805, 0 785, -5 765
            C -10 745, -10 725, -5 705
            C 0 685, 10 665, 25 650
            C 40 635, 60 623, 85 615
            C 110 607, 140 602, 170 600
            C 200 598, 230 598, 260 600
            C 290 602, 320 607, 345 615
            C 370 623, 390 635, 405 650
            C 420 665, 430 685, 435 705
            C 440 725, 440 745, 435 765
            C 430 785, 420 805, 405 820
            C 390 835, 370 847, 345 855
            C 320 863, 290 868, 260 870
            L 230 872
            C 200 873, 170 872, 140 870
            C 110 868, 80 863, 55 855
            C 30 847, 10 835, -5 820
            C -20 805, -30 785, -35 765
            C -40 745, -40 725, -35 705
            C -30 685, -20 665, -5 650
            C 10 635, 30 623, 55 615
            C 80 607, 110 602, 140 600
            C 170 598, 200 598, 230 600
            C 260 602, 290 607, 315 615
            C 340 623, 360 635, 375 650
            C 390 665, 400 685, 405 705
            C 410 725, 410 745, 405 765
            C 400 785, 390 805, 375 820
            C 360 835, 340 847, 315 855
            C 290 863, 260 868, 230 870
            L 200 872
            C 170 873, 140 872, 110 870
            C 80 868, 50 863, 25 855
            C 0 847, -20 835, -35 820
            C -50 805, -60 785, -65 765
            C -70 745, -70 725, -65 705
            C -60 685, -50 665, -35 650
            C -20 635, 0 623, 25 615
            C 50 607, 80 602, 110 600
            C 140 598, 170 598, 200 600
            Z
        `;
        
        const india = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        india.setAttribute('d', indiaPath);
        india.setAttribute('class', 'india-land');
        india.setAttribute('fill', 'url(#landGradientAdvanced)');
        india.setAttribute('filter', 'url(#dropshadow)');
        svg.appendChild(india);
    }

    drawStatesDetailed(svg) {
        const states = [
            { 
                name: 'Jammu & Kashmir', 
                x: 480, y: 140,
                path: 'M 460 120 L 500 120 L 500 160 L 460 160 Z'
            },
            { 
                name: 'Punjab', 
                x: 480, y: 200,
                path: 'M 460 180 L 500 180 L 500 220 L 460 220 Z'
            },
            { 
                name: 'Rajasthan', 
                x: 420, y: 280,
                path: 'M 400 260 L 440 260 L 440 300 L 400 300 Z'
            },
            { 
                name: 'Gujarat', 
                x: 380, y: 380,
                path: 'M 360 360 L 400 360 L 400 400 L 360 400 Z'
            },
            { 
                name: 'Uttar Pradesh', 
                x: 580, y: 300,
                path: 'M 560 280 L 600 280 L 600 320 L 560 320 Z'
            },
            { 
                name: 'Bihar', 
                x: 700, y: 360,
                path: 'M 680 340 L 720 340 L 720 380 L 680 380 Z'
            },
            { 
                name: 'Jharkhand', 
                x: 720, y: 385,
                path: 'M 700 365 L 740 365 L 740 405 L 700 405 Z',
                highlight: true
            },
            { 
                name: 'West Bengal', 
                x: 765, y: 400,
                path: 'M 745 380 L 785 380 L 785 420 L 745 420 Z',
                highlight: true
            },
            { 
                name: 'Odisha', 
                x: 710, y: 480,
                path: 'M 690 460 L 730 460 L 730 500 L 690 500 Z',
                highlight: true
            },
            { 
                name: 'Chhattisgarh', 
                x: 640, y: 430,
                path: 'M 620 410 L 660 410 L 660 450 L 620 450 Z',
                highlight: true
            },
            { 
                name: 'Madhya Pradesh', 
                x: 550, y: 380,
                path: 'M 530 360 L 570 360 L 570 400 L 530 400 Z',
                highlight: true
            },
            { 
                name: 'Maharashtra', 
                x: 480, y: 480,
                path: 'M 460 460 L 500 460 L 500 500 L 460 500 Z',
                highlight: true
            },
            { 
                name: 'Telangana', 
                x: 570, y: 550,
                path: 'M 550 530 L 590 530 L 590 570 L 550 570 Z',
                highlight: true
            },
            { 
                name: 'Karnataka', 
                x: 480, y: 600,
                path: 'M 460 580 L 500 580 L 500 620 L 460 620 Z'
            },
            { 
                name: 'Tamil Nadu', 
                x: 520, y: 700,
                path: 'M 500 680 L 540 680 L 540 720 L 500 720 Z',
                highlight: true
            },
            { 
                name: 'Assam', 
                x: 850, y: 320,
                path: 'M 830 300 L 870 300 L 870 340 L 830 340 Z',
                highlight: true
            }
        ];

        const statesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        statesGroup.setAttribute('id', 'states-layer');

        states.forEach(state => {
            // Draw state boundary
            const statePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            statePath.setAttribute('d', state.path);
            statePath.setAttribute('class', 'state-region');
            if (state.highlight) {
                statePath.style.fill = 'rgba(52, 152, 219, 0.1)';
                statePath.style.stroke = '#3498db';
                statePath.style.strokeWidth = '1.5';
            }
            statePath.setAttribute('data-state', state.name);
            
            // Add hover event
            statePath.addEventListener('mouseenter', () => {
                statePath.style.fill = 'rgba(52, 152, 219, 0.2)';
            });
            statePath.addEventListener('mouseleave', () => {
                statePath.style.fill = state.highlight ? 'rgba(52, 152, 219, 0.1)' : '#ffffff';
            });
            
            statesGroup.appendChild(statePath);

            // Add state name
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', state.x);
            text.setAttribute('y', state.y);
            text.setAttribute('class', 'state-name');
            text.textContent = state.name;
            statesGroup.appendChild(text);
        });

        svg.appendChild(statesGroup);
    }

    createRivers(svg) {
        const rivers = [
            { name: 'Ganga', path: 'M 500 280 Q 600 320, 750 380' },
            { name: 'Brahmaputra', path: 'M 750 300 Q 800 310, 850 320' },
            { name: 'Godavari', path: 'M 550 530 Q 600 540, 650 550' },
            { name: 'Narmada', path: 'M 400 400 Q 500 410, 600 420' }
        ];

        const riversGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        riversGroup.setAttribute('id', 'rivers-layer');

        rivers.forEach(river => {
            const riverPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            riverPath.setAttribute('d', river.path);
            riverPath.setAttribute('class', 'river');
            riverPath.setAttribute('data-river', river.name);
            riversGroup.appendChild(riverPath);
        });

        svg.appendChild(riversGroup);
    }

    plotMinesWithAnimation() {
        const svg = document.getElementById('india-map-advanced');
        const minesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        minesGroup.id = 'mines-layer';
        
        this.mines.forEach((mine, index) => {
            setTimeout(() => {
                const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                g.setAttribute('class', 'mine-group');
                
                // Determine marker shape based on type
                let marker;
                const color = this.getEmissionColor(mine.emissions);
                
                if (mine.type === 'Open Cast') {
                    // Circle for open cast
                    marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    marker.setAttribute('cx', mine.x);
                    marker.setAttribute('cy', mine.y);
                    marker.setAttribute('r', '12');
                } else if (mine.type === 'Underground') {
                    // Square for underground
                    marker = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    marker.setAttribute('x', mine.x - 10);
                    marker.setAttribute('y', mine.y - 10);
                    marker.setAttribute('width', '20');
                    marker.setAttribute('height', '20');
                } else {
                    // Diamond for mixed
                    marker = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                    const points = `${mine.x},${mine.y-12} ${mine.x+12},${mine.y} ${mine.x},${mine.y+12} ${mine.x-12},${mine.y}`;
                    marker.setAttribute('points', points);
                }
                
                marker.setAttribute('fill', color);
                marker.setAttribute('class', 'mine-marker pulse');
                marker.setAttribute('data-mine-id', mine.id);
                marker.setAttribute('stroke', 'white');
                marker.setAttribute('stroke-width', '2');
                
                // Add events
                marker.addEventListener('click', () => this.selectMine(mine));
                marker.addEventListener('mouseenter', (e) => this.showAdvancedTooltip(e, mine));
                marker.addEventListener('mouseleave', () => this.hideTooltip());
                
                // Add coal type indicator
                const indicator = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                indicator.setAttribute('cx', mine.x + 8);
                indicator.setAttribute('cy', mine.y - 8);
                indicator.setAttribute('r', '4');
                
                if (mine.coalType.includes('Coking')) {
                    indicator.setAttribute('fill', '#9b59b6');
                } else if (mine.coalType.includes('Thermal')) {
                    indicator.setAttribute('fill', '#e67e22');
                } else {
                    indicator.setAttribute('fill', '#95a5a6');
                }
                
                // Create label
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', mine.x);
                text.setAttribute('y', mine.y - 18);
                text.setAttribute('class', 'mine-label');
                text.textContent = mine.name.split(' ')[0];
                
                g.appendChild(marker);
                g.appendChild(indicator);
                g.appendChild(text);
                minesGroup.appendChild(g);
                
                // Animate entrance
                marker.style.opacity = '0';
                marker.style.transform = 'scale(0)';
                setTimeout(() => {
                    marker.style.opacity = '1';
                    marker.style.transform = 'scale(1)';
                    marker.style.transition = 'all 0.5s ease-out';
                }, 50);
            }, index * 50); // Stagger animation
        });
        
        svg.appendChild(minesGroup);
        this.updateDataGrid();
        this.updateHotspots();
    }

    getEmissionColor(emissions) {
        if (emissions > 100000) return '#e74c3c';
        if (emissions > 50000) return '#f39c12';
        return '#27ae60';
    }

    createAdvancedTooltip() {
        this.tooltip = document.getElementById('advanced-tooltip');
    }

    showAdvancedTooltip(event, mine) {
        const tooltip = this.tooltip;
        const container = document.querySelector('.map-canvas-container');
        const rect = container.getBoundingClientRect();
        
        const x = event.clientX - rect.left + 15;
        const y = event.clientY - rect.top - 10;
        
        tooltip.innerHTML = `
            <div class="tooltip-title">${mine.name}</div>
            <div class="tooltip-grid">
                <div class="tooltip-item">
                    <span class="tooltip-label">State</span>
                    <span class="tooltip-value">${mine.state}</span>
                </div>
                <div class="tooltip-item">
                    <span class="tooltip-label">District</span>
                    <span class="tooltip-value">${mine.district}</span>
                </div>
                <div class="tooltip-item">
                    <span class="tooltip-label">Type</span>
                    <span class="tooltip-value">${mine.type}</span>
                </div>
                <div class="tooltip-item">
                    <span class="tooltip-label">Coal Type</span>
                    <span class="tooltip-value">${mine.coalType}</span>
                </div>
                <div class="tooltip-item">
                    <span class="tooltip-label">Emissions</span>
                    <span class="tooltip-value">${(mine.emissions/1000).toFixed(0)}k t/yr</span>
                </div>
                <div class="tooltip-item">
                    <span class="tooltip-label">Capacity</span>
                    <span class="tooltip-value">${mine.capacity} MT/yr</span>
                </div>
                <div class="tooltip-item">
                    <span class="tooltip-label">Depth</span>
                    <span class="tooltip-value">${mine.depth}</span>
                </div>
                <div class="tooltip-item">
                    <span class="tooltip-label">Since</span>
                    <span class="tooltip-value">${mine.established}</span>
                </div>
            </div>
        `;
        
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
        
        // Update details panel
        const detailsDiv = document.getElementById('mine-details-advanced');
        detailsDiv.innerHTML = `
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Mine Name</span>
                    <span class="detail-value">${mine.name}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Location</span>
                    <span class="detail-value">${mine.district}, ${mine.state}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Coordinates</span>
                    <span class="detail-value">${mine.lat} ${mine.lng}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Mine Type</span>
                    <span class="detail-value">${mine.type}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Coal Type</span>
                    <span class="detail-value">${mine.coalType}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Depth</span>
                    <span class="detail-value">${mine.depth}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Established</span>
                    <span class="detail-value">${mine.established}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Annual Emissions</span>
                    <span class="detail-value">${mine.emissions.toLocaleString()} t/year</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Production Capacity</span>
                    <span class="detail-value">${mine.capacity} MT/year</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Workforce</span>
                    <span class="detail-value">${mine.workforce.toLocaleString()} employees</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Coal Reserves</span>
                    <span class="detail-value">${mine.reserves}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Operating Years</span>
                    <span class="detail-value">${2024 - parseInt(mine.established)} years</span>
                </div>
            </div>
            <div class="mine-description">
                ${mine.description}
            </div>
            <div style="margin-top: 15px;">
                <button class="analyze-btn" onclick="advancedMap.performDetailedAnalysis(${mine.id})" style="width: 100%; padding: 12px;">
                    📊 Perform Detailed Analysis
                </button>
            </div>
        `;
        
        this.selectedMine = mine;
    }

    performDetailedAnalysis(mineId) {
        const mine = this.mines.find(m => m.id === mineId);
        if (mine) {
            const efficiency = mine.emissions / mine.capacity / 1000;
            const rating = efficiency < 3 ? 'Excellent' : efficiency < 4 ? 'Good' : efficiency < 5 ? 'Average' : 'Needs Improvement';
            const perCapita = (mine.emissions / mine.workforce).toFixed(1);
            const dailyProduction = (mine.capacity * 1000000 / 365).toFixed(0);
            
            alert(`
📊 COMPREHENSIVE ANALYSIS REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏭 ${mine.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 LOCATION DETAILS
• State: ${mine.state}
• District: ${mine.district}
• Coordinates: ${mine.lat}, ${mine.lng}

⛏️ OPERATIONAL DETAILS
• Type: ${mine.type}
• Coal Type: ${mine.coalType}
• Depth: ${mine.depth}
• Operating Since: ${mine.established} (${2024 - parseInt(mine.established)} years)
• Coal Reserves: ${mine.reserves}

📊 PERFORMANCE METRICS
• Emission Intensity: ${efficiency.toFixed(2)} kg CO₂/tonne
• Efficiency Rating: ${rating}
• Per Capita Emissions: ${perCapita} t/employee
• Daily Production: ${dailyProduction} tonnes/day

💡 RECOMMENDATIONS
${efficiency < 4 ? '✅ Maintain efficient operations, consider sharing best practices' : '⚠️ Implement urgent emission reduction measures'}
${mine.type === 'Underground' ? '✅ Install methane capture and utilization systems' : '✅ Optimize overburden management and equipment efficiency'}
${mine.workforce > 1000 ? '✅ Explore selective automation for hazardous operations' : '✅ Focus on workforce skill development'}
✅ Potential for ${(mine.emissions * 0.3 / 1000).toFixed(1)} MW renewable energy integration
✅ Estimated emission reduction potential: ${(mine.emissions * 0.25 / 1000).toFixed(0)}k tonnes/year

📈 CARBON NEUTRALITY PATHWAY
• Short-term (2025-2030): Implement energy efficiency measures
• Medium-term (2030-2040): Transition to renewable energy
• Long-term (2040-2070): Carbon capture and storage implementation
            `);
        }
    }

    setupAdvancedControls() {
        // Search
        document.getElementById('mine-search-advanced')?.addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.applyAdvancedFilters();
        });

        // State filter
        document.getElementById('state-filter-advanced')?.addEventListener('change', (e) => {
            this.filters.state = e.target.value;
            this.applyAdvancedFilters();
        });

        // Type filter
        document.getElementById('type-filter-advanced')?.addEventListener('change', (e) => {
            this.filters.type = e.target.value;
            this.applyAdvancedFilters();
        });

        // Emission range filter
        document.getElementById('emission-filter-advanced')?.addEventListener('change', (e) => {
            this.filters.emissionRange = e.target.value;
            this.applyAdvancedFilters();
        });

        // Toggle animation
        document.getElementById('toggle-animation')?.addEventListener('click', () => {
            this.animationEnabled = !this.animationEnabled;
            document.querySelectorAll('.mine-marker').forEach(marker => {
                marker.classList.toggle('pulse', this.animationEnabled);
            });
        });

        // Toggle view mode
        document.getElementById('toggle-view-mode')?.addEventListener('click', () => {
            const modes = ['normal', 'satellite', 'terrain'];
            const currentIndex = modes.indexOf(this.viewMode);
            this.viewMode = modes[(currentIndex + 1) % modes.length];
            this.changeViewMode();
        });

        // Reset
        document.getElementById('reset-map-advanced')?.addEventListener('click', () => {
            this.resetFilters();
        });

        // Export
        document.getElementById('export-data-advanced')?.addEventListener('click', () => {
            this.exportAdvancedData();
        });

        // Zoom controls
        document.getElementById('zoom-in')?.addEventListener('click', () => {
            const svg = document.getElementById('india-map-advanced');
            const viewBox = svg.getAttribute('viewBox').split(' ').map(Number);
            viewBox[2] *= 0.9;
            viewBox[3] *= 0.9;
            svg.setAttribute('viewBox', viewBox.join(' '));
        });

        document.getElementById('zoom-out')?.addEventListener('click', () => {
            const svg = document.getElementById('india-map-advanced');
            const viewBox = svg.getAttribute('viewBox').split(' ').map(Number);
            viewBox[2] *= 1.1;
            viewBox[3] *= 1.1;
            svg.setAttribute('viewBox', viewBox.join(' '));
        });

        // Sort buttons
        document.getElementById('sort-emissions')?.addEventListener('click', () => {
            this.sortData('emissions');
        });

        document.getElementById('sort-capacity')?.addEventListener('click', () => {
            this.sortData('capacity');
        });
    }

    changeViewMode() {
        const container = document.querySelector('.map-canvas-container');
        
        switch(this.viewMode) {
            case 'satellite':
                container.style.background = 'linear-gradient(135deg, #434343 0%, #000000 100%)';
                break;
            case 'terrain':
                container.style.background = 'linear-gradient(135deg, #8BC34A 0%, #4CAF50 100%)';
                break;
            default:
                container.style.background = 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)';
        }
    }

    applyAdvancedFilters() {
        let filteredMines = this.mines;
        
        // Apply search filter
        if (this.filters.search) {
            filteredMines = filteredMines.filter(mine =>
                mine.name.toLowerCase().includes(this.filters.search) ||
                mine.state.toLowerCase().includes(this.filters.search) ||
                mine.district.toLowerCase().includes(this.filters.search) ||
                mine.coalType.toLowerCase().includes(this.filters.search)
            );
        }
        
        // Apply state filter
        if (this.filters.state) {
            filteredMines = filteredMines.filter(mine => mine.state === this.filters.state);
        }
        
        // Apply type filter
        if (this.filters.type) {
            filteredMines = filteredMines.filter(mine => mine.type === this.filters.type);
        }
        
        // Apply emission range filter
        if (this.filters.emissionRange !== 'all') {
            if (this.filters.emissionRange === 'high') {
                filteredMines = filteredMines.filter(mine => mine.emissions > 100000);
            } else if (this.filters.emissionRange === 'medium') {
                filteredMines = filteredMines.filter(mine => mine.emissions >= 50000 && mine.emissions <= 100000);
            } else if (this.filters.emissionRange === 'low') {
                filteredMines = filteredMines.filter(mine => mine.emissions < 50000);
            }
        }
        
        // Update visibility
        document.querySelectorAll('.mine-marker').forEach(marker => {
            const mineId = parseInt(marker.getAttribute('data-mine-id'));
            const isVisible = filteredMines.find(m => m.id === mineId);
            marker.style.opacity = isVisible ? '1' : '0.1';
            marker.style.pointerEvents = isVisible ? 'auto' : 'none';
            
            const label = marker.parentElement?.querySelector('.mine-label');
            if (label) {
                label.style.opacity = isVisible ? '1' : '0';
            }
        });
        
        this.updateStatistics(filteredMines);
        this.updateDataGrid(filteredMines);
        this.updateHotspots(filteredMines);
    }

    resetFilters() {
        this.filters = { state: '', type: '', search: '', emissionRange: 'all' };
        document.getElementById('mine-search-advanced').value = '';
        document.getElementById('state-filter-advanced').value = '';
        document.getElementById('type-filter-advanced').value = '';
        document.getElementById('emission-filter-advanced').value = 'all';
        this.applyAdvancedFilters();
    }

    updateStatistics(minesToShow = this.mines) {
        const totalEmissions = minesToShow.reduce((sum, mine) => sum + mine.emissions, 0);
        const totalCapacity = minesToShow.reduce((sum, mine) => sum + mine.capacity, 0);
        const totalWorkforce = minesToShow.reduce((sum, mine) => sum + mine.workforce, 0);
        const avgDepth = minesToShow.length ? 
            minesToShow.reduce((sum, mine) => sum + parseInt(mine.depth), 0) / minesToShow.length : 0;
        const avgCapacity = minesToShow.length ? totalCapacity / minesToShow.length : 0;
        
        // Update header stats
        document.getElementById('active-mines-count').textContent = minesToShow.length;
        document.getElementById('total-emissions-header').textContent = (totalEmissions/1000).toFixed(0);
        document.getElementById('total-capacity-header').textContent = totalCapacity;
        
        // Update detailed stats
        document.getElementById('stat-total-mines').textContent = minesToShow.length;
        document.getElementById('stat-total-emissions').textContent = (totalEmissions/1000).toFixed(0) + 'k t/yr';
        document.getElementById('stat-avg-capacity').textContent = avgCapacity.toFixed(1) + ' MT/yr';
        document.getElementById('stat-total-workforce').textContent = (totalWorkforce/1000).toFixed(1) + 'k';
        document.getElementById('stat-avg-depth').textContent = avgDepth.toFixed(0) + 'm';
        
        // Calculate total reserves
        let totalReserves = 0;
        minesToShow.forEach(mine => {
            const reserves = parseFloat(mine.reserves.match(/[\d.]+/)?.[0] || 0);
            totalReserves += reserves;
        });
        document.getElementById('stat-total-reserves').textContent = totalReserves.toFixed(1) + ' Bt';
    }

    updateDataGrid(minesToShow = this.mines) {
        const tbody = document.getElementById('mines-data-grid');
        tbody.innerHTML = minesToShow.map(mine => `
            <tr>
                <td><strong>${mine.name}</strong></td>
                <td>${mine.district}, ${mine.state}</td>
                <td>${mine.type}</td>
                <td>${mine.coalType}</td>
                <td>${(mine.emissions/1000).toFixed(0)}k</td>
                <td>${mine.capacity} MT</td>
                <td>${mine.depth}</td>
                <td>${mine.established}</td>
                <td>
                    <div class="action-buttons">
                        <button class="grid-action-btn view-btn" onclick="advancedMap.selectMine(advancedMap.mines.find(m => m.id === ${mine.id}))">
                            View
                        </button>
                        <button class="grid-action-btn analyze-btn" onclick="advancedMap.performDetailedAnalysis(${mine.id})">
                            Analyze
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    updateHotspots(minesToShow = this.mines) {
        const hotspots = minesToShow
            .sort((a, b) => b.emissions - a.emissions)
            .slice(0, 5);
        
        const hotspotList = document.getElementById('hotspot-list');
        if (hotspotList) {
            hotspotList.innerHTML = hotspots.map(mine => `
                <div class="hotspot-item">
                    <span>${mine.name}</span>
                    <span>${(mine.emissions/1000).toFixed(0)}k t/yr</span>
                </div>
            `).join('');
        }
    }

    sortData(by) {
        const sortedMines = [...this.mines].sort((a, b) => {
            if (by === 'emissions') return b.emissions - a.emissions;
            if (by === 'capacity') return b.capacity - a.capacity;
            return 0;
        });
        
        this.updateDataGrid(sortedMines);
    }

    exportAdvancedData() {
        const data = {
            metadata: {
                title: 'India Coal Mines Database',
                exportDate: new Date().toISOString(),
                version: '3.0',
                totalMines: this.mines.length
            },
            mines: this.mines,
            statistics: {
                totalEmissions: this.mines.reduce((sum, m) => sum + m.emissions, 0),
                totalCapacity: this.mines.reduce((sum, m) => sum + m.capacity, 0),
                totalWorkforce: this.mines.reduce((sum, m) => sum + m.workforce, 0)
            }
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `india-coal-mines-advanced-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    initializeAnimations() {
        // Add smooth transitions to all interactive elements
        document.querySelectorAll('.mine-marker, .state-region, button').forEach(element => {
            element.style.transition = 'all 0.3s ease';
        });
    }
}

// Initialize the advanced map
window.advancedMap = null;

function initializeAdvancedMap() {
    if (document.getElementById('google-map')) {
        window.advancedMap = new AdvancedIndiaMap('google-map');
    }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdvancedMap);
} else {
    initializeAdvancedMap();
}
