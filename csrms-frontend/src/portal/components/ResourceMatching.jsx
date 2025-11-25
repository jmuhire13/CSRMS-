import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { FaChild, FaHandsHelping, FaDollarSign, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa'
import apiService from '../../services/api'

const ResourceMatching = () => {
  const [matches, setMatches] = useState([])
  const [priorityList, setPriorityList] = useState([])
  const [loading, setLoading] = useState(false)
  const [allocation, setAllocation] = useState(null)
  const [availableFunds, setAvailableFunds] = useState(10000)

  useEffect(() => {
    fetchMatches()
    fetchPriorityList()
  }, [])

  const fetchMatches = async () => {
    setLoading(true)
    try {
      const response = await apiService.getResourceMatches()
      if (response.success) {
        setMatches(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch matches:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPriorityList = async () => {
    try {
      const response = await apiService.getPriorityList()
      if (response.success) {
        setPriorityList(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch priority list:', error)
    }
  }

  const handleAutoAllocate = async () => {
    setLoading(true)
    try {
      const response = await apiService.autoAllocateResources(availableFunds)
      if (response.success) {
        setAllocation(response.data)
      }
    } catch (error) {
      console.error('Failed to auto-allocate:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (urgency) => {
    switch (urgency) {
      case 'urgent':
        return '#dc2626'
      case 'high':
        return '#ea580c'
      case 'medium':
        return '#ca8a04'
      case 'low':
        return '#16a34a'
      default:
        return 'var(--navy-blue)'
    }
  }

  const getResourceIcon = (type) => {
    switch (type) {
      case 'healthcare':
        return '🏥'
      case 'education':
        return '📚'
      case 'nutrition':
        return '🍎'
      case 'housing':
        return '🏠'
      default:
        return '📦'
    }
  }

  return (
    <div className="space-y-6">
      {/* Auto Allocation Section */}
      <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--pale-blue)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-secondary" style={{ color: 'var(--navy-blue)' }}>
            Automated Resource Allocation
          </h2>
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--navy-blue)' }}>
                Available Funds ($)
              </label>
              <input
                type="number"
                value={availableFunds}
                onChange={(e) => setAvailableFunds(Number(e.target.value))}
                className="px-3 py-2 border rounded-lg w-32"
                style={{ borderColor: 'var(--pale-blue)' }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAutoAllocate}
              disabled={loading}
              className="px-4 py-2 rounded-lg font-semibold text-white"
              style={{ backgroundColor: 'var(--navy-blue)' }}
            >
              {loading ? 'Allocating...' : 'Auto Allocate'}
            </motion.button>
          </div>
        </div>

        {allocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
          >
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--off-white)' }}>
              <div className="flex items-center gap-2 mb-2">
                <FaDollarSign style={{ color: '#16a34a' }} />
                <span className="font-semibold" style={{ color: 'var(--navy-blue)' }}>Total Allocated</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#16a34a' }}>
                ${allocation.totalAllocated.toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--off-white)' }}>
              <div className="flex items-center gap-2 mb-2">
                <FaChild style={{ color: '#2563eb' }} />
                <span className="font-semibold" style={{ color: 'var(--navy-blue)' }}>Children Helped</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#2563eb' }}>
                {allocation.childrenHelped}
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--off-white)' }}>
              <div className="flex items-center gap-2 mb-2">
                <FaHandsHelping style={{ color: '#8b5cf6' }} />
                <span className="font-semibold" style={{ color: 'var(--navy-blue)' }}>Allocations Made</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#8b5cf6' }}>
                {allocation.allocations.length}
              </p>
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--off-white)' }}>
              <div className="flex items-center gap-2 mb-2">
                <FaDollarSign style={{ color: '#f59e0b' }} />
                <span className="font-semibold" style={{ color: 'var(--navy-blue)' }}>Remaining</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: '#f59e0b' }}>
                ${allocation.remainingFunds.toLocaleString()}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Priority List */}
      <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--pale-blue)' }}>
        <h3 className="text-xl font-bold font-secondary mb-4" style={{ color: 'var(--navy-blue)' }}>
          Priority Resource Allocation List
        </h3>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-t-4 rounded-full animate-spin" 
                 style={{ borderColor: 'var(--pale-blue)', borderTopColor: 'var(--navy-blue)' }}>
            </div>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {priorityList.slice(0, 10).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg border"
                style={{ borderColor: 'var(--pale-blue)', backgroundColor: 'var(--off-white)' }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {getResourceIcon(item.resourceType)}
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: 'var(--navy-blue)' }}>
                      {item.childName}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--para)' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: getPriorityColor(item.urgency) }}
                    >
                      {item.urgency.toUpperCase()}
                    </span>
                    <span className="font-bold" style={{ color: 'var(--navy-blue)' }}>
                      ${item.estimatedCost}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--para)' }}>
                    {item.resourceType}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Allocation Results */}
      {allocation && allocation.allocations.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--pale-blue)' }}>
          <h3 className="text-xl font-bold font-secondary mb-4" style={{ color: 'var(--navy-blue)' }}>
            Allocation Results
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {allocation.allocations.map((alloc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-2 rounded border-l-4"
                style={{ 
                  borderColor: getPriorityColor(alloc.priority),
                  backgroundColor: 'var(--off-white)' 
                }}
              >
                <div className="flex items-center gap-2">
                  <FaCheckCircle style={{ color: '#16a34a' }} />
                  <span className="font-semibold" style={{ color: 'var(--navy-blue)' }}>
                    {alloc.childName}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--para)' }}>
                    - {alloc.resourceType}
                  </span>
                </div>
                <span className="font-bold" style={{ color: '#16a34a' }}>
                  ${alloc.amount}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ResourceMatching