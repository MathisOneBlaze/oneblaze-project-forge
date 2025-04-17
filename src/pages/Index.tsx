
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import ProjectTypeSelection from '@/components/ProjectTypeSelection';
import ProjectForm from '@/components/ProjectForm';
import { Dices, Settings } from 'lucide-react';

const Index = () => {
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);

  const handleSelectProjectType = (typeId: string) => {
    setSelectedProjectType(typeId);
  };

  const handleBackToSelection = () => {
    setSelectedProjectType(null);
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <header className="mb-12">
        <div className="flex justify-between items-center">
          <Logo size="lg" className="animate-float" />
          <div className="flex gap-3">
            <button className="oneblaze-button flex items-center gap-2 py-2">
              <Dices size={18} />
              <span className="hidden sm:inline">Templates</span>
            </button>
            <button className="oneblaze-button flex items-center gap-2 py-2">
              <Settings size={18} />
              <span className="hidden sm:inline">Paramètres</span>
            </button>
          </div>
        </div>
        
        {!selectedProjectType && (
          <div className="mt-8 text-center max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">Project Forge</h1>
            <p className="text-muted-foreground mb-8">
              Créez rapidement une structure de projet avec tous les dossiers et fichiers nécessaires pour votre workflow créatif
            </p>
          </div>
        )}
      </header>
      
      <main className="flex-1">
        {selectedProjectType ? (
          <ProjectForm projectType={selectedProjectType} onBack={handleBackToSelection} />
        ) : (
          <ProjectTypeSelection onSelectProjectType={handleSelectProjectType} />
        )}
      </main>
      
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>OneBlaze Project Forge &copy; {new Date().getFullYear()} — Designed with ⚡ by EVRGRN</p>
      </footer>
    </div>
  );
};

export default Index;
