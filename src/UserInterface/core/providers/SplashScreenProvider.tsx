import React, {
  useState,
  createContext,
  useMemo,
  useCallback,
  ReactNode,
  FC,
} from 'react';

// Define the context type
export interface SplashScreenContextType {
  isSplashOpen: boolean;
  splashTitle: string;
  splashContent: ReactNode | null;
  openSplash: (newContent: ReactNode, newTitle: string) => void;
  closeSplash: () => void;
}

// Create a context with a default value
export const SplashScreenContext = createContext<
  SplashScreenContextType | undefined
>(undefined);

// Provider component to wrap around components that need access to the splash screen context
export const SplashScreenProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSplashOpen, setIsSplashOpen] = useState(false);
  const [splashTitle, setSplashTitle] = useState('');
  const [splashContent, setSplashContent] = useState<ReactNode | null>(null);

  const openSplash = useCallback((newContent: ReactNode, newTitle: string) => {
    setSplashContent(newContent);
    setSplashTitle(newTitle);
    setIsSplashOpen(true);
  }, []);

  const closeSplash = useCallback(() => {
    setIsSplashOpen(false);
    setSplashContent(null);
    setSplashTitle('');
  }, []);

  const value = useMemo(
    () => ({
      isSplashOpen,
      splashTitle,
      splashContent,
      openSplash,
      closeSplash,
    }),
    [isSplashOpen, splashTitle, splashContent, openSplash, closeSplash]
  );

  return (
    <SplashScreenContext.Provider value={value}>
      {children}
    </SplashScreenContext.Provider>
  );
};
