import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Inserisci username e password')
      return
    }

    const success = login(username, password)

    if (success) {
      navigate('/')
    } else {
      setError('Credenziali non valide. Riprova.')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/logo_scan.png" alt="SCAN360 Logo" className="login-logo" />
          <h1 className="login-title">SCAN360</h1>
          <p className="login-subtitle">Strategic Corporate Analysis Navigator</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-circle me-2"></i>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              <i className="fas fa-user me-2"></i>
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Inserisci username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <i className="fas fa-lock me-2"></i>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Inserisci password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-login">
            <i className="fas fa-sign-in-alt me-2"></i>
            Accedi
          </button>
        </form>

        <div className="text-center mt-4">
          <small style={{ color: 'var(--text-secondary)' }}>
            <i className="fas fa-info-circle me-1"></i>
            Demo: AdminAgricola / Campidanese2025
          </small>
        </div>
      </div>
    </div>
  )
}
