import { useContext } from 'react';
import {
  SplashScreenContext,
  SplashScreenContextType,
} from '../providers/SplashScreenProvider';

// Hook to use the splash screen context
export const useSplashScreen = (): SplashScreenContextType => {
  const context = useContext(SplashScreenContext);
  if (!context) {
    throw new Error(
      'useSplashScreen must be used within a SplashScreenProvider'
    );
  }
  return context;
};
