// API service for CSRMS frontend
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('csrms_token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('csrms_token', token);
    } else {
      localStorage.removeItem('csrms_token');
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  async updateProfile(profileData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // User management methods
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/users${queryString ? `?${queryString}` : ''}`);
  }

  async getSocialWorkers() {
    return this.request('/users/social-workers');
  }

  async updateUserStatus(userId, isActive) {
    return this.request(`/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ isActive }),
    });
  }

  // Children management methods
  async getChildren(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/children${queryString ? `?${queryString}` : ''}`);
  }

  async getChild(childId) {
    return this.request(`/children/${childId}`);
  }

  async createChild(childData) {
    return this.request('/children', {
      method: 'POST',
      body: JSON.stringify(childData),
    });
  }

  async updateChild(childId, childData) {
    return this.request(`/children/${childId}`, {
      method: 'PUT',
      body: JSON.stringify(childData),
    });
  }

  async addChildNote(childId, noteData) {
    return this.request(`/children/${childId}/notes`, {
      method: 'POST',
      body: JSON.stringify(noteData),
    });
  }

  // Case management methods
  async getCases(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/cases${queryString ? `?${queryString}` : ''}`);
  }

  async createCase(caseData) {
    return this.request('/cases', {
      method: 'POST',
      body: JSON.stringify(caseData),
    });
  }

  async addCaseActivity(caseId, activityData) {
    return this.request(`/cases/${caseId}/activities`, {
      method: 'POST',
      body: JSON.stringify(activityData),
    });
  }

  // Donation methods
  async getDonations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/donations${queryString ? `?${queryString}` : ''}`);
  }

  async createDonation(donationData) {
    return this.request('/donations', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  }

  async getDonationStats() {
    return this.request('/donations/stats');
  }

  // Reports methods
  async getDashboardStats() {
    return this.request('/reports/dashboard');
  }

  async getSystemStats() {
    return this.request('/reports/system');
  }

  async getPerformanceMetrics(timeframe = '30') {
    return this.request(`/reports/performance?timeframe=${timeframe}`);
  }

  // Matching methods
  async getResourceMatches() {
    return this.request('/matching/resources-to-needs');
  }

  async autoAllocateResources(availableFunds) {
    return this.request('/matching/auto-allocate', {
      method: 'POST',
      body: JSON.stringify({ availableFunds }),
    });
  }

  async getPriorityList() {
    return this.request('/matching/priority-list');
  }

  // Notification methods
  async getAlerts() {
    return this.request('/notifications/alerts');
  }

  async getUrgentCases() {
    return this.request('/notifications/urgent-cases');
  }

  async getDropoutRisks() {
    return this.request('/notifications/dropout-risks');
  }

  async getMalnutritionRisks() {
    return this.request('/notifications/malnutrition-risks');
  }

  async sendAlerts() {
    return this.request('/notifications/send-alerts', {
      method: 'POST',
    });
  }

  // Health check
  async checkHealth() {
    return this.request('/health');
  }

  // Logout
  logout() {
    this.setToken(null);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export the class for testing or multiple instances
export { ApiService };