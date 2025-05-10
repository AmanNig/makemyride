import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import RideBookingScreen from './screens/RideBookingScreen';
import RideDetailsScreen from './screens/RideDetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationProvider, useNavigate } from './contexts/NavigationContext';

const AppContent: React.FC = () => {
  const { currentScreen } = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Determine which screen to show based on the navigation state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'ride-booking':
        return <RideBookingScreen />;
      case 'ride-details':
        return <RideDetailsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Only show navbar on the home screen or if we're not in a detail view */}
      {(currentScreen === 'home' || currentScreen === 'rides' || currentScreen === 'payment') && (
        <Navbar 
          isOpen={isMenuOpen} 
          toggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
        />
      )}
      
      <main className={`pt-${currentScreen === 'home' || currentScreen === 'rides' || currentScreen === 'payment' ? '16' : '0'}`}>
        {renderScreen()}
      </main>
    </div>
  );
};

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;