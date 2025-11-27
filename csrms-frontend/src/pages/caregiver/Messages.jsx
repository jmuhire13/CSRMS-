import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send, Mail, MailOpen, User, Clock, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSendModal, setShowSendModal] = useState(false);
  const [children, setChildren] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    recipientId: '',
    childId: '',
    subject: '',
    message: '',
    priority: 'normal'
  });

  useEffect(() => {
    fetchMessages();
    fetchChildren();
  }, [currentPage, filterStatus]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await api.getCaregiverMessages(currentPage, filterStatus);
      if (response.success) {
        setMessages(response.data?.messages || response.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchChildren = async () => {
    try {
      const response = await api.getCaregiverChildren(1, 100);
      if (response.success) {
        setChildren(response.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch children:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      // Get the social worker ID from the selected child
      let recipientId = formData.recipientId;
      if (formData.childId && !recipientId) {
        const selectedChild = children.find(c => c._id === formData.childId);
        if (selectedChild?.assignedSocialWorker?._id) {
          recipientId = selectedChild.assignedSocialWorker._id;
        } else {
          alert('Please select a child with an assigned social worker');
          return;
        }
      }

      const response = await api.sendCaregiverMessage({
        ...formData,
        recipientId
      });
      if (response.success) {
        alert('Message sent successfully!');
        setShowSendModal(false);
        setFormData({
          recipientId: '',
          childId: '',
          subject: '',
          message: '',
          priority: 'normal'
        });
        fetchMessages();
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      alert('Failed to send message: ' + err.message);
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await api.markCaregiverMessageAsRead(messageId);
      fetchMessages();
    } catch (err) {
      console.error('Failed to mark message as read:', err);
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      handleMarkAsRead(message._id);
    }
  };

  const getPriorityBadge = (priority) => {
    const priorityColors = {
      'low': 'bg-gray-100 text-gray-800',
      'normal': 'bg-blue-100 text-blue-800',
      'high': 'bg-orange-100 text-orange-800',
      'urgent': 'bg-red-100 text-red-800'
    };
    return priorityColors[priority] || 'bg-gray-100 text-gray-800';
  };

  const unreadCount = messages ? messages.filter(m => m.status === 'unread').length : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-7 h-7 text-purple-600" />
            Messages
          </h2>
          <p className="text-gray-600 mt-1">
            Communicate with social workers {unreadCount > 0 && `(${unreadCount} unread)`}
          </p>
        </div>
        <button
          onClick={() => setShowSendModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Send className="w-5 h-5" />
          Send Message
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-2 flex gap-2">
        <button
          onClick={() => setFilterStatus(null)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterStatus === null
              ? 'bg-purple-100 text-purple-700 font-medium'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Messages
        </button>
        <button
          onClick={() => setFilterStatus('unread')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterStatus === 'unread'
              ? 'bg-purple-100 text-purple-700 font-medium'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Unread {unreadCount > 0 && `(${unreadCount})`}
        </button>
        <button
          onClick={() => setFilterStatus('read')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterStatus === 'read'
              ? 'bg-purple-100 text-purple-700 font-medium'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Read
        </button>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading messages...</p>
          </div>
        </div>
      ) : !messages || messages.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-500">No messages found</p>
          <button
            onClick={() => setShowSendModal(true)}
            className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            Send Your First Message
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {messages.map((message, index) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleViewMessage(message)}
              className={`bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 ${
                message.status === 'unread' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-lg ${message.status === 'unread' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {message.status === 'unread' ? (
                      <Mail className="w-5 h-5 text-blue-700" />
                    ) : (
                      <MailOpen className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${message.status === 'unread' ? 'text-gray-900' : 'text-gray-700'}`}>
                        {message.subject}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadge(message.priority)}`}>
                        {message.priority}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{message.message}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {message.sender?.firstName} {message.sender?.lastName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(message.createdAt).toLocaleDateString()}
                      </span>
                      {message.child && (
                        <span>
                          Re: {message.child.firstName} {message.child.lastName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Send Message Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-semibold text-gray-900">Send Message to Social Worker</h3>
              <button
                onClick={() => setShowSendModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="p-6 space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-blue-800">
                  <AlertCircle className="inline w-4 h-4 mr-1" />
                  This message will be sent to the social worker assigned to the selected child.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related to Child (Optional)
                </label>
                <select
                  value={formData.childId}
                  onChange={(e) => setFormData({ ...formData, childId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Not related to a specific child</option>
                  {children.map(child => (
                    <option key={child._id} value={child._id}>
                      {child.firstName} {child.lastName} ({child.childId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief subject of your message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowSendModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* View Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-semibold text-gray-900">Message Details</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{selectedMessage.subject}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    From: {selectedMessage.sender?.firstName} {selectedMessage.sender?.lastName}
                  </p>
                </div>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPriorityBadge(selectedMessage.priority)}`}>
                  {selectedMessage.priority}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              {selectedMessage.child && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-900">Related to Child:</p>
                  <p className="text-sm text-blue-700">
                    {selectedMessage.child.firstName} {selectedMessage.child.lastName} ({selectedMessage.child.childId})
                  </p>
                </div>
              )}

              <div className="text-xs text-gray-500 pt-4 border-t">
                <p>Sent: {new Date(selectedMessage.createdAt).toLocaleString()}</p>
                {selectedMessage.readAt && (
                  <p>Read: {new Date(selectedMessage.readAt).toLocaleString()}</p>
                )}
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
