import React, { Component, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import './scss/style.scss'
import PrivateRoute from './route/PrivateRoute'
import routes from './routes'
import CheckToken from './route/CheckToken'
import AutoRefreshPage from './route/AutoRefresh'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))


class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={loading}>
          <CheckToken />
          <AutoRefreshPage />
          <Routes>
            <Route path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/" element={<DefaultLayout />} >
              <Route path="/" element={<PrivateRoute />} >
                {routes.map((route, idx) => {
                  return (
                    route.element && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        element={<route.element />}
                      />
                    )
                  )
                })}
                <Route path="/" element={<Navigate to="dashboard" replace />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
    )
  }
}

export default App