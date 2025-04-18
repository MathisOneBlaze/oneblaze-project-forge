
interface ElectronAPI {
  selectDirectory: () => Promise<string | null>;
  createProjectStructure: (options: {
    basePath: string;
    structure: Record<string, any>;
  }) => Promise<{ success: boolean; path?: string; error?: string }>;
}

interface Window {
  electronAPI?: ElectronAPI;
}
