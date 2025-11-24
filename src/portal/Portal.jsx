import React, { useEffect, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import './Portal.css'

// Import portal components
import PortalLayout from './components/PortalLayout'
import ProtectedRoute from './components/ProtectedRoute'

// Import portal pages with lazy loading for better performance
const RoleSelection = React.lazy(() => import('./pages/RoleSelection'))
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'))
const SocialWorkerDashboard = React.lazy(() => import('./pages/SocialWorkerDashboard'))
const CaregiverDashboard = React.lazy(() => import('./pages/CaregiverDashboard'))
const DonorDashboard = React.lazy(() => import('./pages/DonorDashboard'))

// Loading component
const PortalLoading = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--off-white)' }}>
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-t-4 rounded-full animate-spin mx-auto mb-4" 
           style={{ borderColor: 'var(--pale-blue)', borderTopColor: 'var(--navy-blue)' }}>
      </div>
      <p className="text-lg font-semibold" style={{ color: 'var(--navy-blue)' }}>
        Loading Portal...
      </p>
    </div>
  </div>
)

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portal Error:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--off-white)' }}>
          <div className="max-w-md w-full mx-4 p-8 rounded-2xl text-center" style={{ backgroundColor: 'var(--white)' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--beige-accent)' }}>
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold mb-4 font-secondary" style={{ color: 'var(--navy-blue)' }}>
              Portal Error
            </h2>
            <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--para)' }}>
              We encountered an unexpected error while loading the portal. This might be due to a network issue or a temporary system problem.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 rounded-lg font-semibold text-white transition hover:opacity-90"
                style={{ backgroundColor: 'var(--navy-blue)' }}
              >
                Reload Portal
              </button>
              <button
                onClick={() => {
                  window.location.href = '/'
                }}
                className="w-full px-6 py-3 rounded-lg font-semibold transition border-2"
                style={{ 
                  color: 'var(--navy-blue)', 
                  borderColor: 'var(--navy-blue)',
                  backgroundColor: 'transparent'
                }}
              >
                Return to Website
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm font-semibold mb-2" style={{ color: 'var(--navy-blue)' }}>
                  Error Details (Development)
                </summary>
                <pre className="text-xs p-3 rounded bg-gray-100 overflow-auto" style={{ color: '#e74c3c' }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Portal Wrapper Component
const PortalWrapper = () => {
  useEffect(() => {
    // Set portal-specific body classes
    document.body.classList.add('portal-mode')
    
    return () => {
      document.body.classList.remove('portal-mode')
    }
  }, [])

  return (
    <div className="portal-container min-h-screen portal-fade-in" style={{ backgroundColor: 'var(--off-white)' }}>
      <Suspense fallback={<PortalLoading />}>
        <Routes>
          {/* Public route - Role Selection */}
          <Route path="/" element={<RoleSelection />} />
          <Route path="/select" element={<RoleSelection />} />
          
          {/* Protected routes - Dashboards */}
          <Route path="/dashboard" element={<PortalLayout />}>
            <Route index element={<Navigate to="/portal/" replace />} />
            
            <Route 
              path="admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="social-worker" 
              element={
                <ProtectedRoute allowedRoles={['social-worker']}>
                  <SocialWorkerDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="caregiver" 
              element={
                <ProtectedRoute allowedRoles={['caregiver']}>
                  <CaregiverDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="donor" 
              element={
                <ProtectedRoute allowedRoles={['donor']}>
                  <DonorDashboard />
                </ProtectedRoute>
              } 
            />
          </Route>
          
          {/* Fallback routes */}
          <Route path="/loading" element={<PortalLoading />} />
          <Route path="*" element={<Navigate to="/portal/" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}

const Portal = () => {
  console.log('🚪 Portal component initialized with enhanced routing and error handling')
  
  return (
    <ErrorBoundary>
      <UserProvider>
        <PortalWrapper />
      </UserProvider>
    </ErrorBoundary>
  )
}

export default Portal