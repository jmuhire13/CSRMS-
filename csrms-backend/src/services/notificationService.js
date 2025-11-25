const Child = require('../models/Child');
const User = require('../models/User');

class NotificationService {
  // Check for urgent cases and generate alerts
  static async checkUrgentCases() {
    try {
      const urgentChildren = await Child.find({
        status: 'active',
        $or: [
          { 'needs.healthcare.priority': 'urgent' },
          { 'needs.education.priority': 'urgent' },
          { 'needs.nutrition.priority': 'urgent' },
          { 'needs.housing.priority': 'urgent' }
        ]
      }).populate('assignedSocialWorker', 'name email phone');

      const alerts = [];

      for (const child of urgentChildren) {
        const urgentNeeds = this.getUrgentNeeds(child);
        
        alerts.push({
          type: 'urgent_case',
          childId: child._id,
          childName: child.fullName,
          socialWorker: child.assignedSocialWorker,
          urgentNeeds,
          message: `URGENT: ${child.fullName} requires immediate attention for ${urgentNeeds.join(', ')}`,
          priority: 'critical',
          createdAt: new Date()
        });
      }

      return alerts;
    } catch (error) {
      console.error('Urgent cases check error:', error);
      throw error;
    }
  }

  // Get list of urgent needs for a child
  static getUrgentNeeds(child) {
    const urgentNeeds = [];
    
    if (child.needs.healthcare.priority === 'urgent') {
      urgentNeeds.push('Healthcare');
    }
    if (child.needs.education.priority === 'urgent') {
      urgentNeeds.push('Education');
    }
    if (child.needs.nutrition.priority === 'urgent') {
      urgentNeeds.push('Nutrition');
    }
    if (child.needs.housing.priority === 'urgent') {
      urgentNeeds.push('Housing');
    }

    return urgentNeeds;
  }

  // Check for children at risk of school dropout
  static async checkSchoolDropoutRisk() {
    try {
      const atRiskChildren = await Child.find({
        status: 'active',
        'progress.education': { $lt: 40 }, // Less than 40% education progress
        'needs.education.required': true
      }).populate('assignedSocialWorker', 'name email phone');

      const alerts = [];

      for (const child of atRiskChildren) {
        alerts.push({
          type: 'dropout_risk',
          childId: child._id,
          childName: child.fullName,
          socialWorker: child.assignedSocialWorker,
          message: `ALERT: ${child.fullName} is at risk of school dropout (Education progress: ${child.progress.education}%)`,
          priority: 'high',
          createdAt: new Date()
        });
      }

      return alerts;
    } catch (error) {
      console.error('Dropout risk check error:', error);
      throw error;
    }
  }

  // Check for malnutrition indicators
  static async checkMalnutritionRisk() {
    try {
      const atRiskChildren = await Child.find({
        status: 'active',
        'progress.nutrition': { $lt: 50 }, // Less than 50% nutrition progress
        'needs.nutrition.required': true
      }).populate('assignedSocialWorker', 'name email phone');

      const alerts = [];

      for (const child of atRiskChildren) {
        alerts.push({
          type: 'malnutrition_risk',
          childId: child._id,
          childName: child.fullName,
          socialWorker: child.assignedSocialWorker,
          message: `NUTRITION ALERT: ${child.fullName} shows signs of malnutrition risk (Nutrition progress: ${child.progress.nutrition}%)`,
          priority: 'high',
          createdAt: new Date()
        });
      }

      return alerts;
    } catch (error) {
      console.error('Malnutrition check error:', error);
      throw error;
    }
  }

  // Generate comprehensive alert summary
  static async generateAlertSummary() {
    try {
      const [urgentCases, dropoutRisks, malnutritionRisks] = await Promise.all([
        this.checkUrgentCases(),
        this.checkSchoolDropoutRisk(),
        this.checkMalnutritionRisk()
      ]);

      const allAlerts = [
        ...urgentCases,
        ...dropoutRisks,
        ...malnutritionRisks
      ];

      // Sort by priority and creation time
      allAlerts.sort((a, b) => {
        const priorityOrder = { critical: 3, high: 2, medium: 1, low: 0 };
        const aPriority = priorityOrder[a.priority] || 0;
        const bPriority = priorityOrder[b.priority] || 0;
        
        if (aPriority !== bPriority) {
          return bPriority - aPriority;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      return {
        totalAlerts: allAlerts.length,
        criticalAlerts: urgentCases.length,
        highPriorityAlerts: dropoutRisks.length + malnutritionRisks.length,
        alerts: allAlerts,
        summary: {
          urgentCases: urgentCases.length,
          dropoutRisks: dropoutRisks.length,
          malnutritionRisks: malnutritionRisks.length
        }
      };
    } catch (error) {
      console.error('Alert summary error:', error);
      throw error;
    }
  }

  // Send notification to social worker
  static async notifySocialWorker(alert) {
    try {
      // In a real implementation, this would send SMS/email
      console.log(`📱 NOTIFICATION SENT TO: ${alert.socialWorker.name}`);
      console.log(`📧 Email: ${alert.socialWorker.email}`);
      console.log(`📞 Phone: ${alert.socialWorker.phone}`);
      console.log(`🚨 Message: ${alert.message}`);
      
      return {
        success: true,
        recipient: alert.socialWorker.name,
        method: 'email_sms',
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Notification send error:', error);
      throw error;
    }
  }

  // Batch send notifications for all alerts
  static async sendAllNotifications() {
    try {
      const alertSummary = await this.generateAlertSummary();
      const notifications = [];

      for (const alert of alertSummary.alerts) {
        if (alert.priority === 'critical' || alert.priority === 'high') {
          const notification = await this.notifySocialWorker(alert);
          notifications.push(notification);
        }
      }

      return {
        totalNotificationsSent: notifications.length,
        notifications,
        alertSummary
      };
    } catch (error) {
      console.error('Batch notification error:', error);
      throw error;
    }
  }
}

module.exports = NotificationService;