
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ProjectFormBody from './ProjectFormBody';
import { useToast } from '@/hooks/use-toast';

interface ProjectFormProps {
  projectType: string;
  onBack: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectType, onBack }) => {
  const { toast } = useToast();
  
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
  
  const handleSubmit = (projectData: any) => {
    console.log('Données du formulaire:', projectData);
    
    // Simuler la création du projet
    setTimeout(() => {
      toast({
        title: "Projet créé avec succès !",
        description: `Le projet "${projectData.title}" a été créé dans ${projectData.location}/${projectData.folderName}`,
      });
    }, 1500);
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack} 
          className="flex items-center text-oneblaze-text hover:text-oneblaze-green-hover transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Retour</span>
        </button>
        <h2 className="text-2xl font-bold ml-auto mr-auto">
          Création d'un projet <span className="text-oneblaze-green-hover">{getProjectTypeName(projectType)}</span>
        </h2>
      </div>
      
      <div className="bg-oneblaze-light rounded-xl p-6 shadow-lg">
        <ProjectFormBody projectType={projectType} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ProjectForm;
