
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ProjectFormBody from './ProjectFormBody';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useProjectStructure } from '@/hooks/use-project-structure';

interface ProjectFormProps {
  projectType: string;
  onBack: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectType, onBack }) => {
  const { toast } = useToast();
  const { createProject } = useProjectStructure();
  
  const getProjectTypeName = (type: string) => {
    const typeNames: Record<string, string> = {
      'musiqueForm': 'Musique',
      'videoForm': 'Vidéo',
      'graphiqueForm': 'Graphique',
      'devForm': 'Développement',
      'gameForm': 'Jeux',
      'enseignementForm': 'Enseignement & Recherches',
      'coursForm': 'Formation / Cours',
      'conferenceForm': 'Conférence',
      'adminForm': 'Administration',
      'customForm': 'Personnalisé'
    };
    
    return typeNames[type] || 'Projet';
  };
  
  const handleSubmit = async (projectData: any) => {
    console.log('Données du formulaire:', projectData);
    await createProject({
      ...projectData,
      projectType
    });
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost"
          onClick={onBack} 
          className="flex items-center hover:text-primary transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Retour</span>
        </Button>
        <h2 className="text-2xl font-bold ml-auto mr-auto">
          Création d'un projet <span className="text-primary">{getProjectTypeName(projectType)}</span>
        </h2>
      </div>
      
      <div className="bg-card rounded-xl p-6 shadow-lg">
        <ProjectFormBody projectType={projectType} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ProjectForm;
