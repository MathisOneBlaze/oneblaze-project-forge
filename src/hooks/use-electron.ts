
import { useCallback } from 'react';

export function useElectron() {
  const isElectron = typeof window !== 'undefined' && window.electronAPI !== undefined;

  const selectDirectory = useCallback(async () => {
    if (!isElectron) {
      console.warn('Not running in Electron environment');
      return null;
    }
    return await window.electronAPI?.selectDirectory();
  }, [isElectron]);

  const createProjectStructure = useCallback(
    async (basePath: string, structure: Record<string, any>) => {
      if (!isElectron) {
        console.warn('Not running in Electron environment');
        return { success: false, error: 'Not running in Electron environment' };
      }
      return await window.electronAPI?.createProjectStructure({ basePath, structure });
    },
    [isElectron]
  );

  return {
    isElectron,
    selectDirectory,
    createProjectStructure,
  };
}
