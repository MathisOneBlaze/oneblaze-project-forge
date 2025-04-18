
import React, { useEffect, useState } from 'react';
import { useElectron } from '@/hooks/use-electron';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LaptopIcon, CloudIcon } from 'lucide-react';

interface ElectronDetectorProps {
  children?: React.ReactNode;
}

const ElectronDetector: React.FC<ElectronDetectorProps> = ({ children }) => {
  const { isElectron } = useElectron();
  const [showBanner, setShowBanner] = useState(true);
  
  useEffect(() => {
    // Auto-hide the banner after 5 seconds
    if (showBanner) {
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showBanner]);
  
  if (!showBanner) return null;
  
  return (
    <Alert className={`mb-6 ${isElectron ? 'bg-green-950/20 border-green-500/30' : 'bg-blue-950/20 border-blue-500/30'}`}>
      {isElectron ? (
        <>
          <LaptopIcon className="h-4 w-4 text-green-500" />
          <AlertTitle>Mode Electron Actif</AlertTitle>
          <AlertDescription>
            Vous utilisez la version desktop. La création de dossiers sur votre système de fichiers est activée.
          </AlertDescription>
        </>
      ) : (
        <>
          <CloudIcon className="h-4 w-4 text-blue-500" />
          <AlertTitle>Mode Navigateur</AlertTitle>
          <AlertDescription>
            Vous utilisez la version web. La création de dossiers sera simulée. Pour créer réellement des dossiers, utilisez la version desktop.
          </AlertDescription>
        </>
      )}
    </Alert>
  );
};

export default ElectronDetector;
