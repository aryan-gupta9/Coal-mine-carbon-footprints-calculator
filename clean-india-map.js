// Clean India Map without Coal Mine Locations
// Version 5.0 - Basic India Map Only

class CleanIndiaMap {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.zoomLevel = 1;
        
        if (this.container) {
            this.init();
        }
    }

    init() {
        this.addCleanStyles();
        this.createCleanMapStructure();
        this.drawBasicIndiaMap();
    }

    addCleanStyles() {
        if (!document.getElementById('clean-map-styles')) {
            const style = document.createElement('style');
            style.id = 'clean-map-styles';
            style.textContent = `
                .clean-map-container {
                    width: 100%;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                    font-family: 'Arial', sans-serif;
                }

                .clean-map-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 20px 30px;
                    color: white;
                    text-align: center;
                }

                .clean-header-title {
                    font-size: 28px;
                    font-weight: 700;
                    margin: 0 0 5px 0;
                    text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
                }

                .clean-header-subtitle {
                    font-size: 14px;
                    opacity: 0.9;
                    margin: 0;
                }

                .clean-map-content {
                    display: flex;
                    background: white;
                    min-height: 500px;
                }

                .clean-map-canvas {
                    flex: 1;
                    position: relative;
                    background: radial-gradient(circle at center, #e8f4f8 0%, #d1e7dd 100%);
                    padding: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .clean-india-svg {
                    width: 100%;
                    max-width: 600px;
                    height: auto;
                    filter: drop-shadow(0 10px 25px rgba(0,0,0,0.15));
                    transition: transform 0.3s ease;
                }

                .clean-india-svg:hover {
                    transform: scale(1.02);
                }

                .clean-india-landmass {
                    fill: #2d5a27;
                    stroke: #1a3d1a;
                    stroke-width: 3;
                    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
                    transition: fill 0.3s ease;
                }

                .clean-india-landmass:hover {
                    fill: #3d6a37;
                }

                .clean-state-boundary {
                    fill: none;
                    stroke: #4a7c59;
                    stroke-width: 1;
                    stroke-dasharray: 3,3;
                    opacity: 0.5;
                }

                .clean-state-label {
                    font-size: 11px;
                    font-weight: 600;
                    fill: #1a3d1a;
                    text-anchor: middle;
                    pointer-events: none;
                    text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
                }

                .clean-info-panel {
                    flex: 0.4;
                    background: #f8f9fa;
                    padding: 30px;
                    border-left: 3px solid #667eea;
                }

                .clean-info-section {
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 20px;
                    box-shadow: 0 3px 15px rgba(0,0,0,0.08);
                }

                .clean-info-section h3 {
                    margin: 0 0 15px 0;
                    color: #2c3e50;
                    font-size: 18px;
                    font-weight: 700;
                }

                .clean-country-info {
                    color: #555;
                    line-height: 1.6;
                    font-size: 14px;
                }

                .clean-stats-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin-top: 20px;
                }

                .clean-stat-box {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: center;
                }

                .clean-stat-number {
                    font-size: 20px;
                    font-weight: 700;
                    display: block;
                    margin-bottom: 5px;
                }

                .clean-stat-label {
                    font-size: 11px;
                    opacity: 0.9;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .clean-geography-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .clean-geography-list li {
                    padding: 8px 0;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                }

                .clean-geography-list li:last-child {
                    border-bottom: none;
                }

                .clean-geography-label {
                    font-weight: 600;
                    color: #555;
                }

                .clean-geography-value {
                    color: #2c3e50;
                    font-weight: 500;
                }

                @media (max-width: 768px) {
                    .clean-map-content {
                        flex-direction: column;
                    }
                    
                    .clean-info-panel {
                        flex: none;
                        border-left: none;
                        border-top: 3px solid #667eea;
                    }
                    
                    .clean-stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createCleanMapStructure() {
        this.container.innerHTML = `
            <div class="clean-map-container">
                <div class="clean-map-header">
                    <h1 class="clean-header-title">🇮🇳 India Map</h1>
                    <p class="clean-header-subtitle">Republic of India - Geographic Overview</p>
                </div>
                
                <div class="clean-map-content">
                    <div class="clean-map-canvas">
                        <svg id="clean-india-map" class="clean-india-svg" viewBox="0 0 900 800" xmlns="http://www.w3.org/2000/svg">
                            <!-- India map will be drawn here -->
                        </svg>
                    </div>
                    
                    <div class="clean-info-panel">
                        <div class="clean-info-section">
                            <h3>🏛️ About India</h3>
                            <div class="clean-country-info">
                                India, officially the Republic of India, is a country in South Asia. 
                                It is the seventh-largest country by area and the most populous country in the world.
                            </div>
                            
                            <div class="clean-stats-grid">
                                <div class="clean-stat-box">
                                    <span class="clean-stat-number">28</span>
                                    <span class="clean-stat-label">States</span>
                                </div>
                                <div class="clean-stat-box">
                                    <span class="clean-stat-number">8</span>
                                    <span class="clean-stat-label">Union Territories</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="clean-info-section">
                            <h3>📊 Geography Facts</h3>
                            <ul class="clean-geography-list">
                                <li>
                                    <span class="clean-geography-label">Area:</span>
                                    <span class="clean-geography-value">3.29 million km²</span>
                                </li>
                                <li>
                                    <span class="clean-geography-label">Population:</span>
                                    <span class="clean-geography-value">1.4+ billion</span>
                                </li>
                                <li>
                                    <span class="clean-geography-label">Capital:</span>
                                    <span class="clean-geography-value">New Delhi</span>
                                </li>
                                <li>
                                    <span class="clean-geography-label">Largest City:</span>
                                    <span class="clean-geography-value">Mumbai</span>
                                </li>
                                <li>
                                    <span class="clean-geography-label">Official Languages:</span>
                                    <span class="clean-geography-value">Hindi & English</span>
                                </li>
                                <li>
                                    <span class="clean-geography-label">Currency:</span>
                                    <span class="clean-geography-value">Indian Rupee (₹)</span>
                                </li>
                                <li>
                                    <span class="clean-geography-label">Time Zone:</span>
                                    <span class="clean-geography-value">IST (UTC+5:30)</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div class="clean-info-section">
                            <h3>🌏 Major Regions</h3>
                            <div class="clean-country-info">
                                India is divided into several geographic regions including the 
                                Northern Plains, Peninsular India, the Himalayas, and coastal regions 
                                along the Arabian Sea and Bay of Bengal.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    drawBasicIndiaMap() {
        const svg = document.getElementById('clean-india-map');
        
        // Create gradients
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'cleanIndiaGradient');
        gradient.innerHTML = `
            <stop offset="0%" style="stop-color:#4a90e2;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#2d5a27;stop-opacity:1" />
        `;
        defs.appendChild(gradient);
        svg.appendChild(defs);

        // Simplified but accurate India outline
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
            L 150 120
            Z
        `;
        
        const indiaLand = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        indiaLand.setAttribute('d', indiaPath);
        indiaLand.setAttribute('class', 'clean-india-landmass');
        indiaLand.setAttribute('fill', 'url(#cleanIndiaGradient)');
        svg.appendChild(indiaLand);
        
        // Add some basic state boundaries (optional)
        this.drawBasicStateBoundaries(svg);
        
        // Add major city labels
        this.addMajorCityLabels(svg);
    }

    drawBasicStateBoundaries(svg) {
        const stateBoundaries = [
            // Major state divisions (simplified)
            'M 400 200 L 500 200 L 500 300 L 400 300 Z',
            'M 500 200 L 600 200 L 600 300 L 500 300 Z',
            'M 400 300 L 500 300 L 500 400 L 400 400 Z',
            'M 500 300 L 600 300 L 600 400 L 500 400 Z',
            'M 300 400 L 400 400 L 400 500 L 300 500 Z',
            'M 400 400 L 500 400 L 500 500 L 400 500 Z'
        ];

        stateBoundaries.forEach(boundary => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', boundary);
            path.setAttribute('class', 'clean-state-boundary');
            svg.appendChild(path);
        });
    }

    addMajorCityLabels(svg) {
        const cities = [
            { name: 'New Delhi', x: 400, y: 250 },
            { name: 'Mumbai', x: 300, y: 450 },
            { name: 'Kolkata', x: 550, y: 380 },
            { name: 'Chennai', x: 450, y: 650 },
            { name: 'Bangalore', x: 420, y: 600 },
            { name: 'Hyderabad', x: 450, y: 550 }
        ];

        cities.forEach(city => {
            // City dot
            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.setAttribute('cx', city.x);
            dot.setAttribute('cy', city.y);
            dot.setAttribute('r', '3');
            dot.setAttribute('fill', '#e74c3c');
            dot.setAttribute('stroke', 'white');
            dot.setAttribute('stroke-width', '1');
            svg.appendChild(dot);

            // City label
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', city.x);
            label.setAttribute('y', city.y - 8);
            label.setAttribute('class', 'clean-state-label');
            label.style.fontSize = '10px';
            label.style.fontWeight = '600';
            label.textContent = city.name;
            svg.appendChild(label);
        });
    }
}

// Initialize the clean map
window.cleanMap = null;

function initializeCleanMap() {
    if (document.getElementById('google-map')) {
        window.cleanMap = new CleanIndiaMap('google-map');
    }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCleanMap);
} else {
    initializeCleanMap();
}
