import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // Check login status on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true'
    const userData = localStorage.getItem('user')

    if (loggedIn && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const login = (username, password) => {
    // Demo credentials - same as original
    const validCredentials = [
      { username: 'AdminAgricola', password: 'Campidanese2025' },
      { username: 'admin', password: 'admin' }
    ]

    const isValid = validCredentials.some(
      cred => cred.username === username && cred.password === password
    )

    if (isValid) {
      const userData = {
        username,
        loginTime: new Date().toISOString()
      }

      localStorage.setItem('loggedIn', 'true')
      localStorage.setItem('user', JSON.stringify(userData))

      setIsAuthenticated(true)
      setUser(userData)
      return true
    }

    return false
  }

  const logout = () => {
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
