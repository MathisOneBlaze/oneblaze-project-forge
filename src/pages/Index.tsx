
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import ProjectTypeSelection from '@/components/ProjectTypeSelection';
import ProjectForm from '@/components/ProjectForm';
import { Dices, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);

  const handleSelectProjectType = (typeId: string) => {
    setSelectedProjectType(typeId);
  };

  const handleBackToSelection = () => {
    setSelectedProjectType(null);
  };

  const handleTemplatesClick = () => {
    toast({
      title: "Templates",
      description: "La fonctionnalité de templates sera disponible prochainement.",
      duration: 3000,
    });
  };

  const handleSettingsClick = () => {
    toast({
      title: "Paramètres",
      description: "La fonctionnalité de paramètres sera disponible prochainement.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <header className="mb-12">
        <div className="flex justify-between items-center">
          <Logo size="lg" className="animate-float" />
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 border-2 border-transparent hover:border-oneblaze-green-hover hover:bg-oneblaze-dark hover:text-oneblaze-green-hover" 
              onClick={handleTemplatesClick}
            >
              <Dices size={18} />
              <span className="hidden sm:inline">Templates</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 border-2 border-transparent hover:border-oneblaze-green-hover hover:bg-oneblaze-dark hover:text-oneblaze-green-hover" 
              onClick={handleSettingsClick}
            >
              <Settings size={18} />
              <span className="hidden sm:inline">Paramètres</span>
            </Button>
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
      
      <footer className="mt-12 text-center">
        <div className="mb-3">
          <img 
            src="/lovable-uploads/f922661b-bf08-44a6-ac07-10e9c71a2d51.png" 
            alt="EVRGRN Logo" 
            className="h-10 mx-auto" 
          />
        </div>
        <p className="text-sm text-muted-foreground">
          EVRGRN © 2025 - Imaginé par Mathis OneBlaze
        </p>
      </footer>
    </div>
  );
};

export default Index;
