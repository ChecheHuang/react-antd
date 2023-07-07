import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const token = localStorage.getItem('token') || ''
const AuthRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation()
  if (pathname === '/login' && !token) return children

  if (!token) {
    return <Navigate to="/login" />
  }
  return children
}

export default AuthRouter
