// API Service Module - Handles all backend API communications
// Coal Mine Carbon Footprint Calculator

class APIService {
    constructor() {
        this.baseURL = 'http://localhost:3000/api';
        this.token = localStorage.getItem('authToken');
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }

    // Helper method for API calls
    async apiCall(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    }

    // Authentication APIs
    async login(email, password) {
        const response = await this.apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        if (response.success && response.data.token) {
            this.token = response.data.token;
            this.user = response.data.user;
            localStorage.setItem('authToken', this.token);
            localStorage.setItem('user', JSON.stringify(this.user));
        }

        return response;
    }

    async register(name, email, password) {
        const response = await this.apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        });

        if (response.success && response.data.token) {
            this.token = response.data.token;
            this.user = response.data.user;
            localStorage.setItem('authToken', this.token);
            localStorage.setItem('user', JSON.stringify(this.user));
        }

        return response;
    }

    async logout() {
        const response = await this.apiCall('/auth/logout', {
            method: 'POST'
        });

        this.token = null;
        this.user = {};
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        return response;
    }

    async getCurrentUser() {
        return await this.apiCall('/auth/me');
    }

    // Mine Management APIs
    async getMines() {
        return await this.apiCall('/mines');
    }

    async getMine(mineId) {
        return await this.apiCall(`/mines/${mineId}`);
    }

    async createMine(mineData) {
        return await this.apiCall('/mines', {
            method: 'POST',
            body: JSON.stringify(mineData)
        });
    }

    async updateMine(mineId, mineData) {
        return await this.apiCall(`/mines/${mineId}`, {
            method: 'PUT',
            body: JSON.stringify(mineData)
        });
    }

    async deleteMine(mineId) {
        return await this.apiCall(`/mines/${mineId}`, {
            method: 'DELETE'
        });
    }

    // Emission Calculation APIs
    async saveEmissionCalculation(mineId, emissionData) {
        return await this.apiCall(`/mines/${mineId}/emissions`, {
            method: 'POST',
            body: JSON.stringify(emissionData)
        });
    }

    async getEmissionHistory(mineId, period = 'monthly') {
        return await this.apiCall(`/mines/${mineId}/emissions?period=${period}`);
    }

    async getEmissionSummary(mineId) {
        return await this.apiCall(`/mines/${mineId}/emissions/summary`);
    }

    // Carbon Sinks APIs
    async saveCarbonSinksData(mineId, sinksData) {
        return await this.apiCall(`/mines/${mineId}/carbon-sinks`, {
            method: 'POST',
            body: JSON.stringify(sinksData)
        });
    }

    async getCarbonSinksData(mineId) {
        return await this.apiCall(`/mines/${mineId}/carbon-sinks`);
    }

    // Neutrality Pathways APIs
    async savePathwaySimulation(mineId, pathwayData) {
        return await this.apiCall(`/mines/${mineId}/pathways`, {
            method: 'POST',
            body: JSON.stringify(pathwayData)
        });
    }

    async getPathwaySimulations(mineId) {
        return await this.apiCall(`/mines/${mineId}/pathways`);
    }

    // Reports APIs
    async generateReport(mineId, reportType = 'comprehensive') {
        return await this.apiCall(`/mines/${mineId}/reports?type=${reportType}`);
    }

    async getReports(mineId) {
        return await this.apiCall(`/mines/${mineId}/reports`);
    }

    // Dashboard Analytics APIs
    async getDashboardStats(userId) {
        return await this.apiCall(`/dashboard/stats?userId=${userId || this.user.id}`);
    }

    async getIndustryBenchmarks() {
        return await this.apiCall('/benchmarks');
    }

    async getStateData(state) {
        return await this.apiCall(`/data/states/${state}`);
    }

    // Smart Calculator APIs
    async getRecommendations(mineId) {
        return await this.apiCall(`/mines/${mineId}/recommendations`);
    }

    async runOptimization(mineId, targetReduction) {
        return await this.apiCall(`/mines/${mineId}/optimize`, {
            method: 'POST',
            body: JSON.stringify({ targetReduction })
        });
    }

    async compareMines(mineIds) {
        return await this.apiCall('/mines/compare', {
            method: 'POST',
            body: JSON.stringify({ mineIds })
        });
    }

    // Utility methods
    isAuthenticated() {
        return !!this.token;
    }

    getUserInfo() {
        return this.user;
    }

    setAuthHeader(token) {
        this.token = token;
        localStorage.setItem('authToken', token);
    }
}

// Export for use in other scripts
const apiService = new APIService();
