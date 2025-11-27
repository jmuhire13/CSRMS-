import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FaBell, FaExclamationTriangle, FaChild, FaUtensils, FaTimes } from 'react-icons/fa'
import apiService from '../services/api'

const NotificationPanel = ({ isOpen, onClose }) => {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchAlerts()
    }
  }, [isOpen])

  const fetchAlerts = async () => {
    setLoading(true)
    try {
      const response = await apiService.getAlerts()
      if (response.success) {
        setAlerts(response.data.alerts || [])
      }
    } catch (error) {
      console.error('Failed to fetch alerts:', error)
    } finally {
      setLoading(false)
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'urgent_case':
        return <FaExclamationTriangle className="text-red-500" />
      case 'dropout_risk':
        return <FaChild className="text-orange-500" />
      case 'malnutrition_risk':
        return <FaUtensils className="text-yellow-500" />
      default:
        return <FaBell className="text-blue-500" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'border-red-500 bg-red-50'
      case 'high':
        return 'border-orange-500 bg-orange-50'
      case 'medium':
        return 'border-yellow-500 bg-yellow-50'
      default:
        return 'border-blue-500 bg-blue-50'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 max-w-full bg-white shadow-xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--pale-blue)' }}>
              <h3 className="text-lg font-bold" style={{ color: 'var(--navy-blue)' }}>
                System Alerts
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-4 h-full overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-4 border-t-4 rounded-full animate-spin" 
                       style={{ borderColor: 'var(--pale-blue)', borderTopColor: 'var(--navy-blue)' }}>
                  </div>
                </div>
              ) : alerts.length === 0 ? (
                <div className="text-center py-8" style={{ color: 'var(--para)' }}>
                  <FaBell size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No alerts at this time</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-lg border-l-4 ${getPriorityColor(alert.priority)}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm mb-1" style={{ color: 'var(--navy-blue)' }}>
                            {alert.childName}
                          </p>
                          <p className="text-xs mb-2" style={{ color: 'var(--para)' }}>
                            {alert.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              alert.priority === 'critical' ? 'bg-gray-300 text-gray-800' :
                              alert.priority === 'high' ? 'bg-blue-200 text-blue-900' :
                              'bg-gray-200 text-gray-700'
                            }`}>
                              {alert.priority.toUpperCase()}
                            </span>
                            <span className="text-xs" style={{ color: 'var(--para)' }}>
                              {new Date(alert.createdAt).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default NotificationPanel