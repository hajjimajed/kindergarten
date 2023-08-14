import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import Navigation from './routes/navigation/navigation.component';
import Dashboard from './routes/dashboard/dashboard.component';
import Children from './routes/children/children.component';
import Cadres from './routes/cadres/cadres.component';
import Activities from './routes/activities/activities.component';
import Projects from './routes/projects/projects.component';
import Profile from './routes/profile/profile.component';
import SettingProfile from './routes/setting/setting.component';
import Login from './routes/login/login.component';
import Register from './routes/register/register.component';
import ResetPassword from './routes/reset-password/reset-password.component';

import SplashScreen from './components/splash-screen/splash-screen.component';

import { AuthContext } from './contexts/auth.context';

function AuthWrapper({ children }) {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  if (isAuth && (window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/reset-password')) {
    return <Navigate to="/" replace={true} />;
  }

  if (!isAuth && window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/reset-password') {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
}


function App() {

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate loading time for the splash screen (2 seconds)
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Routes>
          <Route path="/login" element={<AuthWrapper><Login /></AuthWrapper>} />
          <Route path="/register" element={<AuthWrapper><Register /></AuthWrapper>} />
          <Route path="/reset-password" element={<AuthWrapper><ResetPassword /></AuthWrapper>} />
          <Route path="/" element={<Navigation />}>
            <Route index element={<AuthWrapper><Dashboard /></AuthWrapper>} />
            <Route path="/children" element={<AuthWrapper><Children /></AuthWrapper>} />
            <Route path="/cadres" element={<AuthWrapper><Cadres /></AuthWrapper>} />
            <Route path="/activities" element={<AuthWrapper><Activities /></AuthWrapper>} />
            <Route path="/projects" element={<AuthWrapper><Projects /></AuthWrapper>} />
            <Route path="/profile" element={<AuthWrapper><Profile /></AuthWrapper>} />
            <Route path="/setting" element={<AuthWrapper><SettingProfile /></AuthWrapper>} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
