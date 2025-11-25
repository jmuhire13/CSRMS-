const Child = require('../models/Child');

class MatchingService {
  // Match resources to children's needs
  static async matchResourcesToNeeds() {
    try {
      const children = await Child.find({ status: 'active' })
        .populate('assignedSocialWorker', 'name district');

      const matches = [];

      for (const child of children) {
        const childMatches = this.calculateMatches(child);
        if (childMatches.length > 0) {
          matches.push({
            childId: child._id,
            childName: child.fullName,
            matches: childMatches
          });
        }
      }

      return matches;
    } catch (error) {
      console.error('Matching service error:', error);
      throw error;
    }
  }

  // Calculate priority score for resource allocation
  static calculateMatches(child) {
    const matches = [];
    const needs = child.needs;

    // Healthcare matching
    if (needs.healthcare.required) {
      matches.push({
        type: 'healthcare',
        priority: this.getPriorityScore(needs.healthcare.priority),
        urgency: needs.healthcare.priority,
        estimatedCost: this.getEstimatedCost('healthcare', needs.healthcare.priority),
        description: needs.healthcare.description || 'Medical care needed'
      });
    }

    // Education matching
    if (needs.education.required) {
      matches.push({
        type: 'education',
        priority: this.getPriorityScore(needs.education.priority),
        urgency: needs.education.priority,
        estimatedCost: this.getEstimatedCost('education', needs.education.priority),
        description: needs.education.description || 'Educational support needed'
      });
    }

    // Nutrition matching
    if (needs.nutrition.required) {
      matches.push({
        type: 'nutrition',
        priority: this.getPriorityScore(needs.nutrition.priority),
        urgency: needs.nutrition.priority,
        estimatedCost: this.getEstimatedCost('nutrition', needs.nutrition.priority),
        description: needs.nutrition.description || 'Nutritional support needed'
      });
    }

    // Housing matching
    if (needs.housing.required) {
      matches.push({
        type: 'housing',
        priority: this.getPriorityScore(needs.housing.priority),
        urgency: needs.housing.priority,
        estimatedCost: this.getEstimatedCost('housing', needs.housing.priority),
        description: needs.housing.description || 'Housing support needed'
      });
    }

    // Sort by priority (highest first)
    return matches.sort((a, b) => b.priority - a.priority);
  }

  // Convert priority to numeric score
  static getPriorityScore(priority) {
    const scores = {
      'urgent': 100,
      'high': 75,
      'medium': 50,
      'low': 25
    };
    return scores[priority] || 25;
  }

  // Estimate resource cost based on type and priority
  static getEstimatedCost(type, priority) {
    const baseCosts = {
      healthcare: { urgent: 200, high: 150, medium: 100, low: 50 },
      education: { urgent: 150, high: 100, medium: 75, low: 50 },
      nutrition: { urgent: 100, high: 75, medium: 50, low: 30 },
      housing: { urgent: 500, high: 300, medium: 200, low: 100 }
    };
    return baseCosts[type][priority] || 50;
  }

  // Auto-allocate resources based on available funds
  static async autoAllocateResources(availableFunds = 10000) {
    try {
      const matches = await this.matchResourcesToNeeds();
      const allocations = [];
      let remainingFunds = availableFunds;

      // Flatten and sort all matches by priority
      const allMatches = [];
      matches.forEach(match => {
        match.matches.forEach(m => {
          allMatches.push({
            ...m,
            childId: match.childId,
            childName: match.childName
          });
        });
      });

      allMatches.sort((a, b) => b.priority - a.priority);

      // Allocate resources starting with highest priority
      for (const match of allMatches) {
        if (remainingFunds >= match.estimatedCost) {
          allocations.push({
            childId: match.childId,
            childName: match.childName,
            resourceType: match.type,
            amount: match.estimatedCost,
            priority: match.urgency,
            description: match.description,
            status: 'allocated'
          });
          remainingFunds -= match.estimatedCost;
        }
      }

      return {
        allocations,
        totalAllocated: availableFunds - remainingFunds,
        remainingFunds,
        childrenHelped: new Set(allocations.map(a => a.childId)).size
      };
    } catch (error) {
      console.error('Auto allocation error:', error);
      throw error;
    }
  }
}

module.exports = MatchingService;