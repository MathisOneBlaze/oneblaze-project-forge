
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import ProjectTypeSelection from '@/components/ProjectTypeSelection';
import ProjectForm from '@/components/ProjectForm';
import { Dices, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const Index = () => {
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
  const [showTemplatesSheet, setShowTemplatesSheet] = useState(false);
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);

  const handleSelectProjectType = (typeId: string) => {
    setSelectedProjectType(typeId);
  };

  const handleBackToSelection = () => {
    setSelectedProjectType(null);
  };

  const handleTemplatesClick = () => {
    setShowTemplatesSheet(true);
  };

  const handleSettingsClick = () => {
    setShowSettingsSheet(true);
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
            src="/lovable-uploads/e8aaa7e3-94a8-4a94-a1d9-91c89053d04c.png" 
            alt="EVRGRN Logo" 
            className="h-10 mx-auto" 
          />
        </div>
        <p className="text-sm text-muted-foreground">
          EVRGRN © 2025 - Imaginé par Mathis OneBlaze
        </p>
      </footer>

      {/* Templates Sheet */}
      <Sheet open={showTemplatesSheet} onOpenChange={setShowTemplatesSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Templates</SheetTitle>
            <SheetDescription>
              Gérez vos templates de projets personnalisés
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Cette fonctionnalité vous permettra de créer, modifier et appliquer des templates personnalisés pour vos différents types de projets.
            </p>
            <div className="border rounded-lg p-4 bg-muted/10">
              <h3 className="text-lg font-medium mb-2">Fonctionnalités à venir</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Créer des templates personnalisés</li>
                <li>Importer des templates existants</li>
                <li>Modifier la structure des dossiers et fichiers</li>
                <li>Partager des templates avec votre équipe</li>
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Settings Sheet */}
      <Sheet open={showSettingsSheet} onOpenChange={setShowSettingsSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Paramètres</SheetTitle>
            <SheetDescription>
              Configurez votre application Project Forge
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="border rounded-lg p-4 bg-muted/10">
              <h3 className="text-lg font-medium mb-2">Emplacements par défaut</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Ces paramètres seront bientôt configurables pour personnaliser les emplacements de création des projets.
              </p>
            </div>
            <div className="border rounded-lg p-4 bg-muted/10">
              <h3 className="text-lg font-medium mb-2">Apparence</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Les options de personnalisation de l'interface seront disponibles dans une prochaine mise à jour.
              </p>
            </div>
            <div className="border rounded-lg p-4 bg-muted/10">
              <h3 className="text-lg font-medium mb-2">À propos</h3>
              <p className="text-sm text-muted-foreground">
                Project Forge v1.0.0
                <br />
                Développé par EVRGRN
                <br />
                © 2025 Tous droits réservés
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
