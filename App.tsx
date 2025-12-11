
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CreateCampaign } from './pages/CreateCampaign';
import { AdminDashboard } from './pages/AdminDashboard';
import { BrandDashboard } from './pages/BrandDashboard';
import { BecomeInfluencer } from './pages/BecomeInfluencer';
import { Login } from './pages/Login';
import { Legal } from './pages/Legal';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(null);
  const { isLoading, isAuthenticated, user } = useAuth();

  // Simple scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="h-screen bg-midnight-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-gold-500 w-12 h-12" />
      </div>
    );
  }

  const handleNavigate = (page: string) => {
    // STRICT ROUTE PROTECTION
    // If user tries to access restricted pages without auth, redirect to login
    const protectedRoutes = ['create', 'admin', 'brand'];
    
    if (protectedRoutes.includes(page) && !isAuthenticated) {
      setRedirectAfterLogin(page); // Remember where they wanted to go
      setCurrentPage('login');
      return;
    }
    
    setCurrentPage(page);
  };

  const handleLoginSuccess = () => {
    if (redirectAfterLogin) {
      setCurrentPage(redirectAfterLogin);
      setRedirectAfterLogin(null);
    } else {
      // Default routing based on role
      if (user?.role === 'ADMIN') setCurrentPage('admin');
      else if (user?.role === 'BRAND') setCurrentPage('brand');
      else setCurrentPage('home');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'create':
        return <CreateCampaign onSuccess={() => handleNavigate('home')} />;
      case 'admin':
        return user?.role === 'ADMIN' ? <AdminDashboard /> : <Home onNavigate={handleNavigate} />;
      case 'brand':
        return user?.role === 'BRAND' ? <BrandDashboard /> : <Home onNavigate={handleNavigate} />;
      case 'influencer':
        return <BecomeInfluencer />;
      case 'legal':
        return <Legal onNavigate={handleNavigate} />;
      case 'login':
        return <Login onSuccess={handleLoginSuccess} isRedirected={!!redirectAfterLogin} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  if (currentPage === 'login') {
    return <Login onSuccess={handleLoginSuccess} isRedirected={!!redirectAfterLogin} />;
  }

  return (
    <Layout activePage={currentPage} onNavigate={handleNavigate}>
      {renderPage()}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
