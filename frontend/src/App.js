import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes/index';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            
            // Nếu route là public, render bình thường
            if (route.isPublic) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            }
            
            // Nếu route yêu cầu đăng nhập
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute requiredRole={route.requiredRole}>
                    <Layout>
                      <Page />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            );
          })}
          
          {/* Route mặc định cho trang không tồn tại */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;