import { useSelector } from 'react-redux'
// import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { PropTypes } from 'prop-types'

RequireAuth.propTypes = {
  children: PropTypes.any,
}

function RequireAuth({ children }) {
  const isAuth = Boolean(useSelector((state) => state.token))

  const location = useLocation()
  if (!isAuth) {
    return <Navigate to="/login" state={{ path: location.pathname }} />
  }
  return children
}

export default RequireAuth
