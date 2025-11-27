// API service for CSRMS frontend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

  // ===== ADMIN METHODS =====
  // User Management
  async createSocialWorker(userData) {
    return this.request('/admin/users/social-worker', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async createCaregiver(userData) {
    return this.request('/admin/users/caregiver', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getAllSocialWorkers(page = 1, limit = 10) {
    return this.request(`/admin/users/social-workers?page=${page}&limit=${limit}`);
  }

  async getAllCaregivers(page = 1, limit = 10) {
    return this.request(`/admin/users/caregivers?page=${page}&limit=${limit}`);
  }

  async updateUser(userId, userData) {
    return this.request(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(userId) {
    return this.request(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async resetUserPassword(userId) {
    return this.request(`/admin/users/${userId}/reset-password`, {
      method: 'POST',
    });
  }

  // Children Management (Admin)
  async getAllChildren(page = 1, limit = 10) {
    return this.request(`/admin/children?page=${page}&limit=${limit}`);
  }

  async getChildrenByDistrict() {
    return this.request('/admin/children/by-district');
  }

  // Donation Management (Admin)
  async getAllDonations(page = 1, limit = 10, filters = {}) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    });
    return this.request(`/admin/donations?${queryParams}`);
  }

  async getDonationsByCategory() {
    return this.request('/admin/donations/by-category');
  }

  async getDonationTrends(year) {
    return this.request(`/admin/donations/trends?year=${year || new Date().getFullYear()}`);
  }

  // Password Management
  async changePassword(currentPassword, newPassword) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // ==================== SOCIAL WORKER METHODS ====================

  // Children Management
  async addChild(childData) {
    return this.request('/social-worker/children', {
      method: 'POST',
      body: JSON.stringify(childData),
    });
  }

  async getMyChildren(page = 1, status = null) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: '10',
      ...(status && { status }),
    });
    return this.request(`/social-worker/children?${queryParams}`);
  }

  async updateChild(childId, updateData) {
    return this.request(`/social-worker/children/${childId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  async assignChildToCaregiver(childId, caregiverId) {
    return this.request(`/social-worker/children/${childId}/assign`, {
      method: 'PUT',
      body: JSON.stringify({ caregiverId }),
    });
  }

  // Cases Management
  async createCase(caseData) {
    return this.request('/social-worker/cases', {
      method: 'POST',
      body: JSON.stringify(caseData),
    });
  }

  async getMyCases(page = 1, filters = {}) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: '10',
      ...filters,
    });
    return this.request(`/social-worker/cases?${queryParams}`);
  }

  async updateCase(caseId, updateData) {
    return this.request(`/social-worker/cases/${caseId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  // Caregivers
  async getAvailableCaregivers() {
    return this.request('/social-worker/caregivers');
  }

  // Reports and Statistics
  async getMyReports() {
    return this.request('/social-worker/reports');
  }

  // ==================== CAREGIVER METHODS ====================

  // Dashboard
  async getCaregiverDashboardStats() {
    return this.request('/caregiver/dashboard');
  }

  // Children Management
  async getCaregiverChildren(page = 1, limit = 10) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    return this.request(`/caregiver/children?${queryParams}`);
  }

  async getCaregiverChildDetails(childId) {
    return this.request(`/caregiver/children/${childId}`);
  }

  // Assessment Management
  async createAssessment(assessmentData) {
    return this.request('/caregiver/assessments', {
      method: 'POST',
      body: JSON.stringify(assessmentData),
    });
  }

  async getCaregiverAssessments(filters = {}) {
    const queryParams = new URLSearchParams(filters);
    return this.request(`/caregiver/assessments?${queryParams}`);
  }

  // Resource Request Management
  async createResourceRequest(requestData) {
    return this.request('/caregiver/resource-requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async getCaregiverResourceRequests(status = null, category = null) {
    const queryParams = new URLSearchParams({
      ...(status && { status }),
      ...(category && { category }),
    });
    return this.request(`/caregiver/resource-requests?${queryParams}`);
  }

  // Messaging
  async sendCaregiverMessage(messageData) {
    return this.request('/caregiver/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
    });
  }

  async getCaregiverMessages(page = 1, status = null) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      ...(status && { status }),
    });
    return this.request(`/caregiver/messages?${queryParams}`);
  }

  async markCaregiverMessageAsRead(messageId) {
    return this.request(`/caregiver/messages/${messageId}/read`, {
      method: 'PUT',
    });
  }

  // ============= Donor APIs =============
  
  // Get donor dashboard statistics
  async getDonorDashboard() {
    return this.request('/donations/donor/dashboard');
  }

  // Get donor's donation history
  async getDonorHistory(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    return this.request(`/donations/donor/history?${queryParams}`);
  }

  // Create a new donation
  async createDonation(donationData) {
    return this.request('/donations/donor/donate', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  }

  // Get children in need
  async getChildrenInNeed() {
    return this.request('/children/in-need');
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