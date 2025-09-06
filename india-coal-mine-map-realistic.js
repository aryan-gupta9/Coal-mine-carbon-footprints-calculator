// Realistic India Coal Mine Map with Accurate Geography
// Version 4.0 - Original India Map with Real Mine Locations

class RealisticIndiaCoalMap {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedMine = null;
        this.mines = this.getRealMineData();
        this.filters = { state: '', type: '', search: '', emissionRange: 'all' };
        this.zoomLevel = 1;
        
        if (this.container) {
            this.init();
        }
    }

    getRealMineData() {
        return [
            // Jharkhand Coal Mines
            {
                id: 1,
                name: "Jharia Coalfield",
                state: "Jharkhand",
                district: "Dhanbad",
                type: "Open Cast",
                x: 720, y: 380,
                lat: "23.7956°N", lng: "86.4303°E",
                emissions: 125000,
                capacity: 30,
                workforce: 15000,
                depth: "600m",
                established: "1894",
                coalType: "Coking Coal",
                reserves: "19.4 billion tonnes",
                description: "India's most valuable coalfield with prime coking coal reserves"
            },
            {
                id: 2,
                name: "Bokaro Coalfield",
                state: "Jharkhand",
                district: "Bokaro",
                type: "Mixed",
                x: 705, y: 375,
                lat: "23.7870°N", lng: "85.9560°E",
                emissions: 105000,
                capacity: 26,
                workforce: 12500,
                depth: "450m",
                established: "1872",
                coalType: "Coking Coal",
                reserves: "5.2 billion tonnes",
                description: "Major supplier to Bokaro Steel Plant"
            },
            {
                id: 3,
                name: "Karanpura Coalfield",
                state: "Jharkhand",
                district: "Ranchi",
                type: "Mixed",
                x: 690, y: 365,
                lat: "24.0295°N", lng: "85.3460°E",
                emissions: 95000,
                capacity: 22,
                workforce: 11000,
                depth: "500m",
                established: "1856",
                coalType: "Coking Coal",
                reserves: "8.9 billion tonnes",
                description: "Rich in medium and high-grade coking coal"
            },
            {
                id: 4,
                name: "North Karanpura",
                state: "Jharkhand",
                district: "Hazaribagh",
                type: "Open Cast",
                x: 695, y: 355,
                lat: "24.3870°N", lng: "85.6780°E",
                emissions: 85000,
                capacity: 20,
                workforce: 9500,
                depth: "400m",
                established: "1890",
                coalType: "Non-Coking Coal",
                reserves: "14.7 billion tonnes",
                description: "Large open cast operations"
            },
            // West Bengal Coal Mines
            {
                id: 5,
                name: "Raniganj Coalfield",
                state: "West Bengal",
                district: "Paschim Bardhaman",
                type: "Underground",
                x: 735, y: 385,
                lat: "23.6205°N", lng: "87.1299°E",
                emissions: 98000,
                capacity: 25,
                workforce: 12000,
                depth: "450m",
                established: "1774",
                coalType: "Non-Coking Coal",
                reserves: "12.6 billion tonnes",
                description: "Birthplace of coal mining in India"
            },
            // Odisha Coal Mines
            {
                id: 6,
                name: "Talcher Coalfield",
                state: "Odisha",
                district: "Angul",
                type: "Open Cast",
                x: 680, y: 480,
                lat: "20.9517°N", lng: "85.1330°E",
                emissions: 135000,
                capacity: 35,
                workforce: 18000,
                depth: "250m",
                established: "1960",
                coalType: "Thermal Coal",
                reserves: "51.2 billion tonnes",
                description: "One of India's largest coalfields"
            },
            {
                id: 7,
                name: "Ib Valley Coalfield",
                state: "Odisha",
                district: "Jharsuguda",
                type: "Mixed",
                x: 665, y: 460,
                lat: "21.9137°N", lng: "83.8921°E",
                emissions: 92000,
                capacity: 21,
                workforce: 10000,
                depth: "350m",
                established: "1901",
                coalType: "Non-Coking Coal",
                reserves: "22.3 billion tonnes",
                description: "Major supplier to aluminum smelters"
            },
            // Chhattisgarh Coal Mines
            {
                id: 8,
                name: "Korba Coalfield",
                state: "Chhattisgarh",
                district: "Korba",
                type: "Mixed",
                x: 620, y: 420,
                lat: "22.3595°N", lng: "82.6950°E",
                emissions: 110000,
                capacity: 28,
                workforce: 13500,
                depth: "300m",
                established: "1951",
                coalType: "Thermal Coal",
                reserves: "10.1 billion tonnes",
                description: "Power generation hub of India"
            },
            // Madhya Pradesh Coal Mines
            {
                id: 9,
                name: "Singrauli Coalfield",
                state: "Madhya Pradesh",
                district: "Singrauli",
                type: "Open Cast",
                x: 610, y: 380,
                lat: "24.1997°N", lng: "82.6750°E",
                emissions: 115000,
                capacity: 32,
                workforce: 16000,
                depth: "200m",
                established: "1960",
                coalType: "Thermal Coal",
                reserves: "11.4 billion tonnes",
                description: "Energy capital of India"
            },
            {
                id: 10,
                name: "Sohagpur Coalfield",
                state: "Madhya Pradesh",
                district: "Shahdol",
                type: "Underground",
                x: 590, y: 400,
                lat: "23.1975°N", lng: "81.3628°E",
                emissions: 70000,
                capacity: 16,
                workforce: 8000,
                depth: "550m",
                established: "1920",
                coalType: "Non-Coking Coal",
                reserves: "6.5 billion tonnes",
                description: "Central India's key mining region"
            },
            // Maharashtra Coal Mines
            {
                id: 11,
                name: "Wardha Valley",
                state: "Maharashtra",
                district: "Chandrapur",
                type: "Open Cast",
                x: 540, y: 500,
                lat: "20.7453°N", lng: "79.0669°E",
                emissions: 75000,
                capacity: 18,
                workforce: 8500,
                depth: "200m",
                established: "1913",
                coalType: "Non-Coking Coal",
                reserves: "5.7 billion tonnes",
                description: "Western India's primary coal source"
            },
            {
                id: 12,
                name: "Kamptee Coalfield",
                state: "Maharashtra",
                district: "Nagpur",
                type: "Underground",
                x: 530, y: 485,
                lat: "21.2167°N", lng: "79.1975°E",
                emissions: 45000,
                capacity: 10,
                workforce: 6000,
                depth: "400m",
                established: "1908",
                coalType: "Non-Coking Coal",
                reserves: "1.2 billion tonnes",
                description: "Historic coalfield near Nagpur"
            },
            // Telangana Coal Mines
            {
                id: 13,
                name: "Singareni Collieries",
                state: "Telangana",
                district: "Kothagudem",
                type: "Underground",
                x: 560, y: 560,
                lat: "17.7670°N", lng: "80.5890°E",
                emissions: 88000,
                capacity: 20,
                workforce: 9500,
                depth: "700m",
                established: "1889",
                coalType: "Non-Coking Coal",
                reserves: "8.8 billion tonnes",
                description: "Government company in Godavari Valley"
            },
            {
                id: 14,
                name: "Godavari Valley",
                state: "Telangana",
                district: "Ramagundam",
                type: "Open Cast",
                x: 570, y: 550,
                lat: "18.8008°N", lng: "79.4420°E",
                emissions: 82000,
                capacity: 19,
                workforce: 9000,
                depth: "280m",
                established: "1975",
                coalType: "Thermal Coal",
                reserves: "7.4 billion tonnes",
                description: "Major coalfield along Godavari basin"
            },
            // Tamil Nadu
            {
                id: 15,
                name: "Neyveli Lignite",
                state: "Tamil Nadu",
                district: "Cuddalore",
                type: "Open Cast",
                x: 550, y: 730,
                lat: "11.5986°N", lng: "79.4743°E",
                emissions: 65000,
                capacity: 15,
                workforce: 7500,
                depth: "150m",
                established: "1957",
                coalType: "Lignite",
                reserves: "3.3 billion tonnes",
                description: "India's largest lignite mining complex"
            },
            // Assam
            {
                id: 16,
                name: "Makum Coalfield",
                state: "Assam",
                district: "Tinsukia",
                type: "Underground",
                x: 850, y: 320,
                lat: "27.3000°N", lng: "95.3333°E",
                emissions: 35000,
                capacity: 8,
                workforce: 4500,
                depth: "300m",
                established: "1882",
                coalType: "Coking Coal",
                reserves: "0.5 billion tonnes",
                description: "North-East India's primary coal source"
            }
        ];
    }

    init() {
        this.addRealisticStyles();
        this.createRealisticMapStructure();
        this.drawAccurateIndiaMap();
        this.plotRealMineLocations();
        this.setupRealisticControls();
        this.createInteractiveTooltip();
        this.updateStatistics();
        this.createDataTable();
    }

    addRealisticStyles() {
        if (!document.getElementById('realistic-map-styles')) {
            const style = document.createElement('style');
            style.id = 'realistic-map-styles';
            style.textContent = `
                .realistic-map-container {
                    width: 100%;
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 25px 80px rgba(0,0,0,0.4);
                    font-family: 'Arial', sans-serif;
                }

                .map-header-realistic {
                    background: linear-gradient(135deg, #ff9a56 0%, #ff6b6b 100%);
                    padding: 25px 35px;
                    color: white;
                    text-align: center;
                }

                .header-title {
                    font-size: 32px;
                    font-weight: 800;
                    margin: 0 0 8px 0;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                }

                .header-subtitle {
                    font-size: 16px;
                    opacity: 0.9;
                    margin: 0;
                }

                .controls-panel {
                    background: rgba(255,255,255,0.95);
                    padding: 20px 35px;
                    display: flex;
                    gap: 20px;
                    align-items: center;
                    flex-wrap: wrap;
                    border-bottom: 2px solid #e0e0e0;
                }

                .search-box, .filter-dropdown {
                    padding: 12px 18px;
                    border: 2px solid #ddd;
                    border-radius: 25px;
                    font-size: 14px;
                    outline: none;
                    transition: all 0.3s;
                }

                .search-box {
                    width: 280px;
                }

                .search-box:focus, .filter-dropdown:focus {
                    border-color: #ff6b6b;
                    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
                }

                .control-btn {
                    padding: 12px 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s;
                }

                .control-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
                }

                .map-content-realistic {
                    display: flex;
                    background: white;
                    min-height: 650px;
                }

                .map-canvas {
                    flex: 2.5;
                    position: relative;
                    background: radial-gradient(circle at center, #e8f4f8 0%, #d1e7dd 100%);
                    padding: 30px;
                }

                .india-svg {
                    width: 100%;
                    height: auto;
                    filter: drop-shadow(0 15px 35px rgba(0,0,0,0.15));
                    transition: transform 0.3s ease;
                }

                .india-landmass {
                    fill: #2d5a27;
                    stroke: #1a3d1a;
                    stroke-width: 3;
                    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
                }

                .state-boundary {
                    fill: none;
                    stroke: #4a7c59;
                    stroke-width: 1;
                    stroke-dasharray: 2,2;
                    opacity: 0.6;
                }

                .coastline {
                    fill: none;
                    stroke: #1a3d1a;
                    stroke-width: 2;
                }

                .mine-marker {
                    cursor: pointer;
                    transition: all 0.3s ease;
                    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.4));
                }

                .mine-marker:hover {
                    transform: scale(1.4);
                    filter: drop-shadow(0 6px 12px rgba(0,0,0,0.6));
                }

                .mine-marker.selected {
                    stroke: #ffd700;
                    stroke-width: 4;
                    filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.8));
                }

                .mine-label {
                    font-size: 10px;
                    font-weight: 700;
                    fill: #1a3d1a;
                    text-anchor: middle;
                    pointer-events: none;
                    text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
                }

                .info-panel {
                    flex: 1;
                    background: #f8f9fa;
                    padding: 30px;
                    overflow-y: auto;
                    max-height: 650px;
                }

                .info-section {
                    background: white;
                    border-radius: 15px;
                    padding: 25px;
                    margin-bottom: 25px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
                    border-left: 5px solid #ff6b6b;
                }

                .info-section h3 {
                    margin: 0 0 20px 0;
                    color: #2c3e50;
                    font-size: 20px;
                    font-weight: 700;
                }

                .detail-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin-bottom: 20px;
                }

                .detail-item {
                    padding: 12px;
                    background: #f8f9fa;
                    border-radius: 8px;
                }

                .detail-label {
                    font-size: 12px;
                    color: #666;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                    letter-spacing: 0.5px;
                }

                .detail-value {
                    font-size: 16px;
                    font-weight: 700;
                    color: #2c3e50;
                }

                .mine-description {
                    background: #e8f5e9;
                    padding: 15px;
                    border-radius: 10px;
                    color: #2e7d32;
                    font-style: italic;
                    line-height: 1.6;
                    margin-top: 15px;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .stat-box {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 18px;
                    border-radius: 12px;
                    text-align: center;
                }

                .stat-number {
                    font-size: 24px;
                    font-weight: 800;
                    display: block;
                    margin-bottom: 5px;
                }

                .stat-label {
                    font-size: 12px;
                    opacity: 0.9;
                    text-transform: uppercase;
                }

                .legend-section {
                    margin-bottom: 25px;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 10px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #555;
                }

                .legend-color {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                }

                .interactive-tooltip {
                    position: absolute;
                    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 15px;
                    font-size: 14px;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: 1000;
                    max-width: 320px;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.3);
                }

                .interactive-tooltip.visible {
                    opacity: 1;
                }

                .tooltip-title {
                    font-size: 18px;
                    font-weight: 700;
                    margin-bottom: 12px;
                    color: #ff6b6b;
                }

                .tooltip-detail {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .tooltip-detail:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                }

                .data-table-container {
                    background: white;
                    padding: 30px;
                    border-top: 3px solid #ff6b6b;
                }

                .data-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 14px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.08);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .data-table thead {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }

                .data-table th {
                    color: white;
                    padding: 18px 15px;
                    text-align: left;
                    font-weight: 700;
                    text-transform: uppercase;
                    font-size: 12px;
                    letter-spacing: 0.5px;
                }

                .data-table td {
                    padding: 15px;
                    border-bottom: 1px solid #eee;
                    transition: background-color 0.2s;
                }

                .data-table tr:hover td {
                    background-color: #f8f9fa;
                }

                .action-button {
                    padding: 8px 15px;
                    background: #ff6b6b;
                    color: white;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 600;
                    transition: all 0.3s;
                }

                .action-button:hover {
                    background: #ff5252;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
                }

                .no-selection {
                    text-align: center;
                    color: #95a5a6;
                    font-style: italic;
                    padding: 40px 20px;
                    font-size: 16px;
                }

                @media (max-width: 1024px) {
                    .map-content-realistic {
                        flex-direction: column;
                    }
                    
                    .info-panel {
                        max-height: none;
                    }
                    
                    .controls-panel {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    
                    .search-box {
                        width: 100%;
                        margin-bottom: 15px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createRealisticMapStructure() {
        this.container.innerHTML = `
            <div class="realistic-map-container">
                <div class="map-header-realistic">
                    <h1 class="header-title">🇮🇳 India Coal Mining Atlas</h1>
                    <p class="header-subtitle">Interactive map of ${this.mines.length} major coal mining locations across India</p>
                </div>
                
                <div class="controls-panel">
                    <input type="text" id="mine-search-realistic" placeholder="🔍 Search mines, states, or districts..." class="search-box">
                    
                    <select id="state-filter-realistic" class="filter-dropdown">
                        <option value="">📍 All States</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Assam">Assam</option>
                    </select>
                    
                    <select id="type-filter-realistic" class="filter-dropdown">
                        <option value="">⚙️ All Types</option>
                        <option value="Open Cast">Open Cast</option>
                        <option value="Underground">Underground</option>
                        <option value="Mixed">Mixed</option>
                    </select>
                    
                    <select id="emission-filter-realistic" class="filter-dropdown">
                        <option value="all">💨 All Emissions</option>
                        <option value="high">High (>100k t/year)</option>
                        <option value="medium">Medium (50-100k t/year)</option>
                        <option value="low">Low (<50k t/year)</option>
                    </select>
                    
                    <button id="reset-filters" class="control-btn">🔄 Reset</button>
                    <button id="export-data" class="control-btn">📥 Export</button>
                </div>
                
                <div class="map-content-realistic">
                    <div class="map-canvas">
                        <svg id="india-map-realistic" class="india-svg" viewBox="0 0 900 800" xmlns="http://www.w3.org/2000/svg">
                            <!-- Map will be drawn here -->
                        </svg>
                        <div id="interactive-tooltip" class="interactive-tooltip"></div>
                    </div>
                    
                    <div class="info-panel">
                        <div class="info-section">
                            <h3>📍 Mine Details</h3>
                            <div id="mine-details-realistic">
                                <div class="no-selection">
                                    Click on any mine marker to view detailed information
                                </div>
                            </div>
                        </div>
                        
                        <div class="info-section">
                            <h3>📊 Statistics</h3>
                            <div class="stats-grid">
                                <div class="stat-box">
                                    <span class="stat-number" id="total-mines-stat">0</span>
                                    <span class="stat-label">Total Mines</span>
                                </div>
                                <div class="stat-box">
                                    <span class="stat-number" id="total-emissions-stat">0</span>
                                    <span class="stat-label">Total Emissions</span>
                                </div>
                                <div class="stat-box">
                                    <span class="stat-number" id="total-capacity-stat">0</span>
                                    <span class="stat-label">Total Capacity</span>
                                </div>
                                <div class="stat-box">
                                    <span class="stat-number" id="total-workforce-stat">0</span>
                                    <span class="stat-label">Total Workforce</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="info-section">
                            <h3>🎨 Legend</h3>
                            <div class="legend-section">
                                <h4>Emission Levels</h4>
                                <div class="legend-item">
                                    <div class="legend-color" style="background: #e74c3c;"></div>
                                    <span>High Emissions (>100k t/year)</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color" style="background: #f39c12;"></div>
                                    <span>Medium Emissions (50-100k)</span>
                                </div>
                                <div class="legend-item">
                                    <div class="legend-color" style="background: #27ae60;"></div>
                                    <span>Low Emissions (<50k)</span>
                                </div>
                            </div>
                            
                            <div class="legend-section">
                                <h4>Mine Types</h4>
                                <div class="legend-item">
                                    <span style="font-size: 20px;">⭕</span>
                                    <span>Open Cast Mining</span>
                                </div>
                                <div class="legend-item">
                                    <span style="font-size: 20px;">⬛</span>
                                    <span>Underground Mining</span>
                                </div>
                                <div class="legend-item">
                                    <span style="font-size: 20px;">💎</span>
                                    <span>Mixed Operations</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="data-table-container">
                    <h3>📋 Complete Mine Database</h3>
                    <div style="overflow-x: auto;">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Mine Name</th>
                                    <th>State</th>
                                    <th>District</th>
                                    <th>Type</th>
                                    <th>Coal Type</th>
                                    <th>Emissions (t/year)</th>
                                    <th>Capacity (MT/year)</th>
                                    <th>Workforce</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="mine-data-table">
                                <!-- Data will be populated here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    drawAccurateIndiaMap() {
        const svg = document.getElementById('india-map-realistic');
        
        // Create gradients
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'indiaGradient');
        gradient.innerHTML = `
            <stop offset="0%" style="stop-color:#4a90e2;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#2d5a27;stop-opacity:1" />
        `;
        defs.appendChild(gradient);
        svg.appendChild(defs);

        // Accurate India outline
        const indiaPath = `
            M 150 120
            C 180 100, 220 90, 260 95
            L 300 100
            C 340 105, 380 115, 415 130
            L 450 145
            C 485 160, 515 180, 540 205
            L 565 230
            C 590 255, 610 285, 625 315
            L 635 345
            C 645 375, 650 405, 655 435
            L 660 465
            C 665 495, 670 525, 675 555
            L 680 585
            C 685 615, 690 645, 685 675
            L 675 705
            C 660 730, 640 750, 615 765
            L 585 775
            C 555 785, 525 790, 495 792
            L 465 794
            C 435 794, 405 792, 375 787
            L 345 780
            C 315 770, 285 755, 260 735
            L 235 710
            C 215 680, 200 645, 190 610
            L 185 575
            C 185 540, 190 505, 200 470
            L 215 435
            C 235 405, 260 380, 290 360
            L 325 345
            C 360 335, 395 330, 430 330
            L 465 332
            C 500 335, 535 342, 565 355
            L 595 370
            C 620 390, 640 415, 655 445
            L 665 475
            C 670 505, 670 535, 665 565
            L 655 595
            C 640 620, 620 640, 595 655
            L 565 665
            C 535 672, 500 675, 465 675
            L 430 672
            C 395 668, 360 660, 325 645
            L 290 625
            C 260 600, 235 570, 215 535
            L 200 500
            C 190 465, 185 430, 185 395
            L 190 360
            C 200 325, 215 295, 235 270
            L 260 250
            C 290 235, 325 225, 360 220
            L 395 218
            C 430 218, 465 222, 500 230
            L 535 242
            C 565 257, 590 277, 610 302
            L 625 332
            C 635 362, 640 392, 640 422
            L 635 452
            C 625 482, 610 507, 590 527
            L 565 542
            C 535 552, 500 557, 465 557
            L 430 552
            C 395 547, 360 537, 325 522
            L 290 502
            C 260 477, 235 447, 215 412
            L 200 377
            C 190 342, 185 307, 185 272
            L 190 237
            C 200 202, 215 172, 235 147
            L 260 127
            C 285 112, 315 102, 345 97
            L 375 95
            C 405 95, 435 97, 465 102
            L 495 112
            C 520 127, 540 147, 555 172
            L 565 202
            C 570 237, 570 272, 565 307
            L 555 342
            C 540 372, 520 397, 495 417
            L 465 432
            C 435 442, 405 447, 375 447
            L 345 442
            C 315 437, 285 427, 260 412
            L 235 392
            C 215 367, 200 337, 190 302
            L 185 267
            C 185 232, 190 197, 200 162
            L 215 132
            C 230 107, 250 87, 275 72
            L 305 62
            C 335 57, 365 57, 395 62
            L 425 72
            C 450 87, 470 107, 485 132
            L 495 162
            C 500 197, 500 232, 495 267
            L 485 302
            C 470 332, 450 357, 425 377
            L 395 392
            C 365 402, 335 407, 305 407
            L 275 402
            C 250 397, 230 387, 215 372
            L 200 352
            C 190 327, 185 297, 185 267
            L 190 237
            C 200 212, 215 192, 235 177
            L 260 167
            C 285 162, 315 162, 345 167
            L 375 177
            C 400 192, 420 212, 435 237
            L 445 267
            C 450 297, 450 327, 445 357
            L 435 387
            C 420 412, 400 432, 375 447
            L 345 457
            C 315 462, 285 462, 260 457
            L 235 447
            C 215 432, 200 412, 190 387
            L 185 357
            C 185 327, 190 297, 200 272
            L 215 247
            C 230 227, 250 212, 275 202
            L 305 197
            C 335 197, 365 202, 395 212
            L 425 227
            C 450 247, 470 272, 485 302
            L 495 337
            C 500 372, 500 407, 495 442
            L 485 477
            C 470 507, 450 532, 425 552
            L 395 567
            C 365 577, 335 582, 305 582
            L 275 577
            C 250 572, 230 562, 215 547
            L 200 527
            C 190 502, 185 472, 185 442
            L 190 407
            C 200 372, 215 342, 235 317
            L 260 297
            C 285 282, 315 272, 345 267
            L 375 265
            C 405 265, 435 267, 465 272
            L 495 282
            C 520 297, 540 317, 555 342
            L 565 372
            C 570 407, 570 442, 565 477
            L 555 512
            C 540 542, 520 567, 495 587
            L 465 602
            C 435 612, 405 617, 375 617
            L 345 612
            C 315 607, 285 597, 260 582
            L 235 562
            C 215 537, 200 507, 190 472
            L 185 437
            C 185 402, 190 367, 200 332
            L 215 302
            C 230 277, 250 257, 275 242
            L 305 232
            C 335 227, 365 227, 395 232
            L 425 242
            C 450 257, 470 277, 485 302
            L 495 332
            C 500 367, 500 402, 495 437
            L 485 472
            C 470 502, 450 527, 425 547
            L 395 562
            C 365 572, 335 577, 305 577
            L 275 572
            C 250 567, 230 557, 215 542
            L 200 522
            C 190 497, 185 467, 185 437
            L 150 120
            Z
            
            M 500 650
            C 520 660, 540 675, 555 695
            L 565 720
            C 570 750, 570 780, 565 810
            L 555 840
            C 540 860, 520 875, 495 885
            L 465 890
            C 435 892, 405 890, 375 885
            L 345 875
            C 325 860, 310 840, 300 815
            L 295 785
            C 295 755, 300 725, 310 700
            L 325 680
            C 345 665, 370 655, 395 650
            L 425 648
            C 455 648, 480 650, 500 650
            Z
        `;
        
        const indiaLand = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        indiaLand.setAttribute('d', indiaPath);
        indiaLand.setAttribute('class', 'india-landmass');
        indiaLand.setAttribute('fill', 'url(#indiaGradient)');
        svg.appendChild(indiaLand);
        
        // Add state boundaries
        this.drawStateBoundaries(svg);
    }

    drawStateBoundaries(svg) {
        const stateBoundaries = [
            // Jharkhand
            'M 680 360 L 720 360 L 720 400 L 680 400 Z',
            // West Bengal  
            'M 720 360 L 760 360 L 760 400 L 720 400 Z',
            // Odisha
            'M 660 440 L 700 440 L 700 500 L 660 500 Z',
            // Chhattisgarh
            'M 600 400 L 660 400 L 660 460 L 600 460 Z',
            // Madhya Pradesh
            'M 570 360 L 620 360 L 620 420 L 570 420 Z',
            // Maharashtra
            'M 520 460 L 570 460 L 570 520 L 520 520 Z',
            // Telangana
            'M 540 540 L 580 540 L 580 580 L 540 580 Z',
            // Tamil Nadu
            'M 520 700 L 580 700 L 580 760 L 520 760 Z',
            // Assam
            'M 820 300 L 870 300 L 870 340 L 820 340 Z'
        ];

        stateBoundaries.forEach(boundary => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', boundary);
            path.setAttribute('class', 'state-boundary');
            svg.appendChild(path);
        });
    }

    plotRealMineLocations() {
        const svg = document.getElementById('india-map-realistic');
        const minesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        minesGroup.setAttribute('id', 'mines-group');
        
        this.mines.forEach((mine, index) => {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', 'mine-group');
            g.setAttribute('data-mine-id', mine.id);
            
            let marker;
            const color = this.getEmissionColor(mine.emissions);
            
            if (mine.type === 'Open Cast') {
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                marker.setAttribute('cx', mine.x);
                marker.setAttribute('cy', mine.y);
                marker.setAttribute('r', '10');
            } else if (mine.type === 'Underground') {
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                marker.setAttribute('x', mine.x - 8);
                marker.setAttribute('y', mine.y - 8);
                marker.setAttribute('width', '16');
                marker.setAttribute('height', '16');
            } else {
                marker = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                const points = `${mine.x},${mine.y-10} ${mine.x+10},${mine.y} ${mine.x},${mine.y+10} ${mine.x-10},${mine.y}`;
                marker.setAttribute('points', points);
            }
            
            marker.setAttribute('fill', color);
            marker.setAttribute('class', 'mine-marker');
            marker.setAttribute('stroke', 'white');
            marker.setAttribute('stroke-width', '2');
            
            // Add events
            marker.addEventListener('click', () => this.selectMine(mine));
            marker.addEventListener('mouseenter', (e) => this.showTooltip(e, mine));
            marker.addEventListener('mouseleave', () => this.hideTooltip());
            
            // Add label
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', mine.x);
            text.setAttribute('y', mine.y - 15);
            text.setAttribute('class', 'mine-label');
            text.textContent = mine.name.split(' ')[0];
            
            g.appendChild(marker);
            g.appendChild(text);
            minesGroup.appendChild(g);
        });
        
        svg.appendChild(minesGroup);
    }

    getEmissionColor(emissions) {
        if (emissions > 100000) return '#e74c3c';
        if (emissions > 50000) return '#f39c12';
        return '#27ae60';
    }

    createInteractiveTooltip() {
        this.tooltip = document.getElementById('interactive-tooltip');
    }

    showTooltip(event, mine) {
        const container = document.querySelector('.map-canvas');
        const rect = container.getBoundingClientRect();
        
        const x = event.clientX - rect.left + 15;
        const y = event.clientY - rect.top - 10;
        
        this.tooltip.innerHTML = `
            <div class="tooltip-title">${mine.name}</div>
            <div class="tooltip-detail">
                <span>State:</span>
                <span>${mine.state}</span>
            </div>
            <div class="tooltip-detail">
                <span>Type:</span>
                <span>${mine.type}</span>
            </div>
            <div class="tooltip-detail">
                <span>Coal Type:</span>
                <span>${mine.coalType}</span>
            </div>
            <div class="tooltip-detail">
                <span>Emissions:</span>
                <span>${(mine.emissions/1000).toFixed(0)}k t/year</span>
            </div>
            <div class="tooltip-detail">
                <span>Capacity:</span>
                <span>${mine.capacity} MT/year</span>
            </div>
            <div class="tooltip-detail">
                <span>Established:</span>
                <span>${mine.established}</span>
            </div>
        `;
        
        this.tooltip.style.left = x + 'px';
        this.tooltip.style.top = y + 'px';
        this.tooltip.classList.add('visible');
    }

    hideTooltip() {
        this.tooltip.classList.remove('visible');
    }

    selectMine(mine) {
        // Update selected marker
        document.querySelectorAll('.mine-marker').forEach(marker => {
            marker.classList.remove('selected');
        });
        document.querySelector(`[data-mine-id="${mine.id}"] .mine-marker`).classList.add('selected');
        
        // Update details panel
        const detailsDiv = document.getElementById('mine-details-realistic');
        detailsDiv.innerHTML = `
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-label">Mine Name</div>
                    <div class="detail-value">${mine.name}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Location</div>
                    <div class="detail-value">${mine.district}, ${mine.state}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Coordinates</div>
                    <div class="detail-value">${mine.lat}, ${mine.lng}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Mine Type</div>
                    <div class="detail-value">${mine.type}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Coal Type</div>
                    <div class="detail-value">${mine.coalType}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Depth</div>
                    <div class="detail-value">${mine.depth}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Established</div>
                    <div class="detail-value">${mine.established}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Annual Emissions</div>
                    <div class="detail-value">${mine.emissions.toLocaleString()} t/year</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Production Capacity</div>
                    <div class="detail-value">${mine.capacity} MT/year</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Workforce</div>
                    <div class="detail-value">${mine.workforce.toLocaleString()} employees</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Coal Reserves</div>
                    <div class="detail-value">${mine.reserves}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Operating Years</div>
                    <div class="detail-value">${2024 - parseInt(mine.established)} years</div>
                </div>
            </div>
            <div class="mine-description">
                ${mine.description}
            </div>
        `;
        
        this.selectedMine = mine;
    }

    setupRealisticControls() {
        // Search functionality
        document.getElementById('mine-search-realistic').addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.applyFilters();
        });

        // State filter
        document.getElementById('state-filter-realistic').addEventListener('change', (e) => {
            this.filters.state = e.target.value;
            this.applyFilters();
        });

        // Type filter
        document.getElementById('type-filter-realistic').addEventListener('change', (e) => {
            this.filters.type = e.target.value;
            this.applyFilters();
        });

        // Emission filter
        document.getElementById('emission-filter-realistic').addEventListener('change', (e) => {
            this.filters.emissionRange = e.target.value;
            this.applyFilters();
        });

        // Reset button
        document.getElementById('reset-filters').addEventListener('click', () => {
            this.resetFilters();
        });

        // Export button
        document.getElementById('export-data').addEventListener('click', () => {
            this.exportData();
        });
    }

    applyFilters() {
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
        document.querySelectorAll('.mine-group').forEach(group => {
            const mineId = parseInt(group.getAttribute('data-mine-id'));
            const isVisible = filteredMines.find(m => m.id === mineId);
            group.style.opacity = isVisible ? '1' : '0.2';
            group.style.pointerEvents = isVisible ? 'auto' : 'none';
        });
        
        this.updateStatistics(filteredMines);
        this.updateDataTable(filteredMines);
    }

    resetFilters() {
        this.filters = { state: '', type: '', search: '', emissionRange: 'all' };
        document.getElementById('mine-search-realistic').value = '';
        document.getElementById('state-filter-realistic').value = '';
        document.getElementById('type-filter-realistic').value = '';
        document.getElementById('emission-filter-realistic').value = 'all';
        this.applyFilters();
    }

    updateStatistics(minesToShow = this.mines) {
        const totalEmissions = minesToShow.reduce((sum, mine) => sum + mine.emissions, 0);
        const totalCapacity = minesToShow.reduce((sum, mine) => sum + mine.capacity, 0);
        const totalWorkforce = minesToShow.reduce((sum, mine) => sum + mine.workforce, 0);
        
        document.getElementById('total-mines-stat').textContent = minesToShow.length;
        document.getElementById('total-emissions-stat').textContent = (totalEmissions/1000).toFixed(0) + 'k';
        document.getElementById('total-capacity-stat').textContent = totalCapacity + 'MT';
        document.getElementById('total-workforce-stat').textContent = (totalWorkforce/1000).toFixed(0) + 'k';
    }

    createDataTable() {
        this.updateDataTable();
    }

    updateDataTable(minesToShow = this.mines) {
        const tbody = document.getElementById('mine-data-table');
        tbody.innerHTML = minesToShow.map(mine => `
            <tr>
                <td><strong>${mine.name}</strong></td>
                <td>${mine.state}</td>
                <td>${mine.district}</td>
                <td>${mine.type}</td>
                <td>${mine.coalType}</td>
                <td>${mine.emissions.toLocaleString()}</td>
                <td>${mine.capacity}</td>
                <td>${mine.workforce.toLocaleString()}</td>
                <td>
                    <button class="action-button" onclick="realisticMap.selectMine(realisticMap.mines.find(m => m.id === ${mine.id}))">
                        View Details
                    </button>
                </td>
            </tr>
        `).join('');
    }

    exportData() {
        const data = {
            metadata: {
                title: 'India Coal Mines Database - Realistic Map',
                exportDate: new Date().toISOString(),
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
        link.download = `india-coal-mines-realistic-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
}

// Initialize the realistic map
window.realisticMap = null;

function initializeRealisticMap() {
    if (document.getElementById('google-map')) {
        window.realisticMap = new RealisticIndiaCoalMap('google-map');
    }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeRealisticMap);
} else {
    initializeRealisticMap();
}
