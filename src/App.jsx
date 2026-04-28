import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomeScreen from './components/HomeScreen';
import { Toaster } from 'react-hot-toast';

// Lazy load other pages for better performance
const ServiceListing = lazy(() => import('./pages/ServiceListing'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const ServiceCategoryDetail = lazy(() => import('./pages/ServiceCategoryDetail'));
const BookingCheckout = lazy(() => import('./pages/BookingCheckout'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const ProviderDashboard = lazy(() => import('./pages/ProviderDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const LoginRegister = lazy(() => import('./pages/LoginRegister'));
const Providers = lazy(() => import('./pages/Providers'));
const Offers = lazy(() => import('./pages/Offers'));
const VideoConsultPage = lazy(() => import('./pages/VideoConsultPage'));
const AutoPilotPage = lazy(() => import('./pages/AutoPilotPage'));

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Layout>
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/services" element={<ServiceListing />} />
            <Route path="/category/:category" element={<ServiceCategoryDetail />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/checkout" element={<BookingCheckout />} />
            <Route path="/tracking/:id" element={<OrderTracking />} />
            <Route path="/profile/*" element={<UserDashboard />} />
            <Route path="/provider/*" element={<ProviderDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/auth" element={<LoginRegister />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/video-consult" element={<VideoConsultPage />} />
            <Route path="/auto-pilot" element={<AutoPilotPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
};

export default App;
