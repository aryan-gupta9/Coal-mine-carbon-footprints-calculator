// India Coal Mine Map - Standalone SVG Solution
// No external dependencies, no API keys required

class IndiaCoalMineMap {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.selectedMine = null;
        this.mines = this.getCoalMineData();
        this.filters = {
            state: '',
            type: '',
            search: ''
        };
        
        if (this.container) {
            this.init();
        }
    }

    getCoalMineData() {
        return [
            {
                id: 1,
                name: "Jharia Coal Field",
                state: "Jharkhand",
                type: "Open Cast",
                x: 520,
                y: 280,
                emissions: 125000,
                capacity: 30,
                workforce: 1500,
                description: "One of India's largest and oldest coal fields"
            },
            {
                id: 2,
                name: "Raniganj Coalfield",
                state: "West Bengal",
                type: "Underground",
                x: 530,
                y: 290,
                emissions: 98000,
                capacity: 25,
                workforce: 1200,
                description: "Historic coalfield with extensive underground mining"
            },
            {
                id: 3,
                name: "Korba Coalfield",
                state: "Chhattisgarh",
                type: "Mixed",
                x: 460,
                y: 330,
                emissions: 110000,
                capacity: 28,
                workforce: 1350,
                description: "Power generation hub with multiple thermal plants"
            },
            {
                id: 4,
                name: "Talcher Coalfield",
                state: "Odisha",
                type: "Open Cast",
                x: 500,
                y: 360,
                emissions: 135000,
                capacity: 35,
                workforce: 1800,
                description: "Major supplier to power plants in Eastern India"
            },
            {
                id: 5,
                name: "Singareni Collieries",
                state: "Telangana",
                type: "Underground",
                x: 420,
                y: 420,
                emissions: 88000,
                capacity: 20,
                workforce: 950,
                description: "Government-owned coal mining company"
            },
            {
                id: 6,
                name: "Wardha Valley",
                state: "Maharashtra",
                type: "Open Cast",
                x: 410,
                y: 370,
                emissions: 75000,
                capacity: 18,
                workforce: 850,
                description: "Important coalfield in Western India"
            },
            {
                id: 7,
                name: "Karanpura Coalfield",
                state: "Jharkhand",
                type: "Mixed",
                x: 500,
                y: 270,
                emissions: 95000,
                capacity: 22,
                workforce: 1100,
                description: "Rich in coking coal reserves"
            },
            {
                id: 8,
                name: "Bokaro Coalfield",
                state: "Jharkhand",
                type: "Open Cast",
                x: 510,
                y: 275,
                emissions: 105000,
                capacity: 26,
                workforce: 1250,
                description: "Supplies to Bokaro Steel Plant"
            },
            {
                id: 9,
                name: "Ib Valley Coalfield",
                state: "Odisha",
                type: "Mixed",
                x: 480,
                y: 340,
                emissions: 92000,
                capacity: 21,
                workforce: 1000,
                description: "Important for regional power generation"
            },
            {
                id: 10,
                name: "Godavari Valley",
                state: "Telangana",
                type: "Open Cast",
                x: 440,
                y: 410,
                emissions: 82000,
                capacity: 19,
                workforce: 900,
                description: "Along the Godavari river basin"
            }
        ];
    }

    init() {
        this.createMapStructure();
        this.drawIndiaMap();
        this.plotMines();
        this.setupControls();
        this.updateStatistics();
    }

    createMapStructure() {
        this.container.innerHTML = `
            <div class="manual-map-container">
                <div class="map-header">
                    <h3>🗺️ India Coal Mine Locations</h3>
                    <p>Interactive map showing major coal mining regions</p>
                </div>
                
                <div class="map-controls">
                    <div class="control-group">
                        <input type="text" id="mine-search" placeholder="Search mines..." class="map-search-input">
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
                    <button id="reset-map-view" class="map-btn">Reset View</button>
                </div>
                
                <div class="map-main">
                    <div class="map-svg-container">
                        <svg id="india-map-svg" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                            <!-- Map will be drawn here -->
                        </svg>
                    </div>
                    
                    <div class="map-sidebar">
                        <div class="map-info-panel">
                            <h4>Selected Mine</h4>
                            <div id="mine-details">
                                <p class="no-selection">Click on a mine to view details</p>
                            </div>
                        </div>
                        
                        <div class="map-legend">
                            <h4>Legend</h4>
                            <div class="legend-item">
                                <span class="legend-dot" style="background: #ff4444;"></span>
                                <span>High Emissions (>100k t/year)</span>
                            </div>
                            <div class="legend-item">
                                <span class="legend-dot" style="background: #ffaa44;"></span>
                                <span>Medium (50-100k t/year)</span>
                            </div>
                            <div class="legend-item">
                                <span class="legend-dot" style="background: #44ff44;"></span>
                                <span>Low (<50k t/year)</span>
                            </div>
                        </div>
                        
                        <div class="map-statistics">
                            <h4>Statistics</h4>
                            <div class="stat-row">
                                <span>Total Mines:</span>
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
                        </div>
                    </div>
                </div>
                
                <div class="map-table-container">
                    <h4>Mine Data Table</h4>
                    <table class="mines-data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>State</th>
                                <th>Type</th>
                                <th>Emissions (t/year)</th>
                                <th>Capacity (MT/year)</th>
                                <th>Workforce</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="mines-table-body">
                            <!-- Table rows will be generated here -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        this.addStyles();
    }

    addStyles() {
        if (!document.getElementById('india-map-styles')) {
            const style = document.createElement('style');
            style.id = 'india-map-styles';
            style.textContent = `
                .manual-map-container {
                    width: 100%;
                    background: white;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }

                .map-header {
                    text-align: center;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #e0e0e0;
                }

                .map-header h3 {
                    margin: 0 0 5px 0;
                    color: #2c3e50;
                    font-size: 24px;
                }

                .map-header p {
                    margin: 0;
                    color: #666;
                    font-size: 14px;
                }

                .map-controls {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: center;
                }

                .control-group {
                    flex: 1;
                    min-width: 150px;
                }

                .map-search-input, .map-select {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 14px;
                }

                .map-btn {
                    padding: 8px 16px;
                    background: #27ae60;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: background 0.3s;
                }

                .map-btn:hover {
                    background: #229954;
                }

                .map-main {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 30px;
                }

                .map-svg-container {
                    flex: 2;
                    background: #f5f8fa;
                    border-radius: 8px;
                    padding: 20px;
                    min-height: 500px;
                }

                #india-map-svg {
                    width: 100%;
                    height: auto;
                    max-height: 600px;
                }

                .india-outline {
                    fill: #e8f4f8;
                    stroke: #2c3e50;
                    stroke-width: 2;
                }

                .state-boundary {
                    fill: none;
                    stroke: #95a5a6;
                    stroke-width: 1;
                    stroke-dasharray: 2,2;
                }

                .mine-marker {
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .mine-marker:hover {
                    transform: scale(1.3);
                }

                .mine-marker.selected {
                    stroke: #2c3e50;
                    stroke-width: 3;
                }

                .mine-label {
                    font-size: 11px;
                    fill: #2c3e50;
                    pointer-events: none;
                    text-anchor: middle;
                }

                .map-sidebar {
                    flex: 1;
                    min-width: 250px;
                }

                .map-info-panel, .map-legend, .map-statistics {
                    background: #f8f9fa;
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 15px;
                }

                .map-info-panel h4, .map-legend h4, .map-statistics h4 {
                    margin: 0 0 15px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    border-bottom: 1px solid #e0e0e0;
                    padding-bottom: 8px;
                }

                #mine-details {
                    font-size: 14px;
                }

                #mine-details .detail-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                    padding-bottom: 5px;
                    border-bottom: 1px solid #e0e0e0;
                }

                #mine-details .detail-label {
                    color: #666;
                }

                #mine-details .detail-value {
                    font-weight: bold;
                    color: #2c3e50;
                }

                .no-selection {
                    color: #999;
                    text-align: center;
                    font-style: italic;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 8px;
                    font-size: 13px;
                }

                .legend-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: 1px solid #333;
                }

                .stat-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;
                    font-size: 14px;
                }

                .stat-row span {
                    color: #666;
                }

                .stat-row strong {
                    color: #2c3e50;
                }

                .map-table-container {
                    margin-top: 30px;
                    overflow-x: auto;
                }

                .map-table-container h4 {
                    margin-bottom: 15px;
                    color: #2c3e50;
                }

                .mines-data-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 14px;
                }

                .mines-data-table th {
                    background: #2c3e50;
                    color: white;
                    padding: 10px;
                    text-align: left;
                }

                .mines-data-table td {
                    padding: 10px;
                    border-bottom: 1px solid #e0e0e0;
                }

                .mines-data-table tr:hover {
                    background: #f8f9fa;
                }

                .view-btn {
                    padding: 4px 12px;
                    background: #3498db;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                }

                .view-btn:hover {
                    background: #2980b9;
                }

                @media (max-width: 768px) {
                    .map-main {
                        flex-direction: column;
                    }
                    
                    .map-controls {
                        flex-direction: column;
                    }
                    
                    .control-group {
                        width: 100%;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    drawIndiaMap() {
        const svg = document.getElementById('india-map-svg');
        
        // Simplified India outline (you can make this more detailed)
        const indiaPath = `
            M 300 180
            L 320 160
            L 350 150
            L 400 140
            L 450 145
            L 500 150
            L 550 160
            L 580 180
            L 600 200
            L 610 230
            L 600 260
            L 590 290
            L 580 320
            L 570 350
            L 550 380
            L 520 410
            L 480 440
            L 440 460
            L 400 470
            L 360 460
            L 320 440
            L 290 410
            L 270 380
            L 260 350
            L 250 320
            L 240 290
            L 240 260
            L 250 230
            L 270 200
            L 290 180
            Z
        `;

        // Draw India outline
        const indiaOutline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        indiaOutline.setAttribute('d', indiaPath);
        indiaOutline.setAttribute('class', 'india-outline');
        svg.appendChild(indiaOutline);

        // Add state boundaries (simplified)
        this.drawStateBoundaries(svg);
    }

    drawStateBoundaries(svg) {
        const boundaries = [
            'M 300 250 L 400 250',  // Horizontal boundary
            'M 400 250 L 500 250',
            'M 350 200 L 350 300',  // Vertical boundary
            'M 450 200 L 450 300',
            'M 300 350 L 500 350',
            'M 400 300 L 400 400'
        ];

        boundaries.forEach(boundary => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', boundary);
            path.setAttribute('class', 'state-boundary');
            svg.appendChild(path);
        });
    }

    plotMines() {
        const svg = document.getElementById('india-map-svg');
        const minesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        minesGroup.id = 'mines-group';
        
        this.mines.forEach(mine => {
            const color = this.getEmissionColor(mine.emissions);
            
            // Create mine marker circle
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', mine.x);
            circle.setAttribute('cy', mine.y);
            circle.setAttribute('r', '8');
            circle.setAttribute('fill', color);
            circle.setAttribute('class', 'mine-marker');
            circle.setAttribute('data-mine-id', mine.id);
            
            // Add click event
            circle.addEventListener('click', () => this.selectMine(mine));
            
            // Create label
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', mine.x);
            text.setAttribute('y', mine.y - 12);
            text.setAttribute('class', 'mine-label');
            text.textContent = mine.name.split(' ')[0];
            
            minesGroup.appendChild(circle);
            minesGroup.appendChild(text);
        });
        
        svg.appendChild(minesGroup);
        this.updateTable();
    }

    getEmissionColor(emissions) {
        if (emissions > 100000) return '#ff4444';
        if (emissions > 50000) return '#ffaa44';
        return '#44ff44';
    }

    selectMine(mine) {
        // Update selected marker
        document.querySelectorAll('.mine-marker').forEach(marker => {
            marker.classList.remove('selected');
        });
        document.querySelector(`[data-mine-id="${mine.id}"]`)?.classList.add('selected');
        
        // Update details panel
        const detailsDiv = document.getElementById('mine-details');
        detailsDiv.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value">${mine.name}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">State:</span>
                <span class="detail-value">${mine.state}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Type:</span>
                <span class="detail-value">${mine.type}</span>
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
                <span class="detail-value">${mine.workforce.toLocaleString()}</span>
            </div>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                <p style="color: #666; font-size: 13px;">${mine.description}</p>
            </div>
        `;
        
        this.selectedMine = mine;
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
    }

    applyFilters() {
        const filteredMines = this.mines.filter(mine => {
            const matchesSearch = !this.filters.search || 
                mine.name.toLowerCase().includes(this.filters.search) ||
                mine.state.toLowerCase().includes(this.filters.search);
            
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
        });

        // Update table
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
                <td>${mine.type}</td>
                <td>${mine.emissions.toLocaleString()}</td>
                <td>${mine.capacity}</td>
                <td>${mine.workforce.toLocaleString()}</td>
                <td>
                    <button class="view-btn" onclick="indiaMap.selectMine(indiaMap.mines.find(m => m.id === ${mine.id}))">
                        View
                    </button>
                </td>
            </tr>
        `).join('');
    }

    updateStatistics(minesToShow = this.mines) {
        const totalEmissions = minesToShow.reduce((sum, mine) => sum + mine.emissions, 0);
        const totalCapacity = minesToShow.reduce((sum, mine) => sum + mine.capacity, 0);
        const totalWorkforce = minesToShow.reduce((sum, mine) => sum + mine.workforce, 0);

        document.getElementById('total-mines-stat').textContent = minesToShow.length;
        document.getElementById('total-emissions-stat').textContent = totalEmissions.toLocaleString() + ' t/year';
        document.getElementById('total-capacity-stat').textContent = totalCapacity + ' MT/year';
        document.getElementById('total-workforce-stat').textContent = totalWorkforce.toLocaleString();
    }

    // Public method to add new mine
    addMine(mineData) {
        const newMine = {
            id: this.mines.length + 1,
            ...mineData
        };
        this.mines.push(newMine);
        this.plotMines();
        this.updateStatistics();
    }

    // Export data
    exportData() {
        const dataStr = JSON.stringify(this.mines, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'coal-mines-data.json';
        link.click();
    }
}

// Initialize the map when DOM is ready
window.indiaMap = null;

function initializeIndiaMap() {
    if (document.getElementById('google-map')) {
        window.indiaMap = new IndiaCoalMineMap('google-map');
    }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeIndiaMap);
} else {
    initializeIndiaMap();
}
