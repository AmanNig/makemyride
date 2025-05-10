import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define all available app screens
type Screen = 'home' | 'ride-booking' | 'ride-details' | 'driver' | 'rides' | 'payment' | 'profile';

interface NavigationContextType {
  currentScreen: Screen;
  navigateTo: (screen: Screen, params?: any) => void;
  navigateBack: () => void;
  screenParams: any;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [screenHistory, setScreenHistory] = useState<Screen[]>(['home']);
  const [screenParams, setScreenParams] = useState<any>({});

  const navigateTo = (screen: Screen, params?: any) => {
    setScreenHistory((prev) => [...prev, screen]);
    if (params) {
      setScreenParams((prev: any) => ({
        ...prev,
        [screen]: params,
      }));
    }
  };

  const navigateBack = () => {
    if (screenHistory.length > 1) {
      setScreenHistory((prev) => prev.slice(0, -1));
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        currentScreen: screenHistory[screenHistory.length - 1],
        navigateTo,
        navigateBack,
        screenParams: screenParams[screenHistory[screenHistory.length - 1]] || {},
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigate = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigate must be used within a NavigationProvider');
  }
  return context;
};