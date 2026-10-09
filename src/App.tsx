import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import TripFormPage from './pages/TripFormPage';
import FollowUpPage from './pages/FollowUpPage';
import GeneratingPage from './pages/GeneratingPage';
import ResultPage from './pages/ResultPage';
import MyTripPage from './pages/MyTripPage';

const AppRoutes: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plan" element={<TripFormPage />} />
        <Route path="/questions" element={<FollowUpPage />} />
        <Route path="/generating" element={<GeneratingPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/my-trip" element={<MyTripPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
