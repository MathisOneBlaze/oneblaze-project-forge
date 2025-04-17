
import React from 'react';
import { Music, Video, PenTool, Code, Gamepad2, BookOpen, BookText, Mic, FileSpreadsheet, FolderPlus } from 'lucide-react';
import ProjectCard from './ProjectCard';

interface ProjectType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const projectTypes: ProjectType[] = [
  {
    id: 'musiqueForm',
    title: 'Musique',
    description: 'Albums, singles, performances',
    icon: Music
  },
  {
    id: 'videoForm',
    title: 'Vidéo',
    description: 'YouTube, clips, interviews',
    icon: Video
  },
  {
    id: 'graphiqueForm',
    title: 'Graphique',
    description: 'Design, illustrations, branding',
    icon: PenTool
  },
  {
    id: 'devForm',
    title: 'Dev',
    description: 'Web, mobile, logiciels',
    icon: Code
  },
  {
    id: 'gameForm',
    title: 'Jeux',
    description: 'Prototypes, game design',
    icon: Gamepad2
  },
  {
    id: 'enseignementForm',
    title: 'Enseignement & Recherches',
    description: 'Documentation et analyses',
    icon: BookOpen
  },
  {
    id: 'coursForm',
    title: 'Formation / Cours',
    description: 'Matériel pédagogique',
    icon: BookText
  },
  {
    id: 'conferenceForm',
    title: 'Conférence',
    description: 'Présentations, slides',
    icon: Mic
  },
  {
    id: 'adminForm',
    title: 'Administration',
    description: 'Contrats, finances, légal',
    icon: FileSpreadsheet
  },
  {
    id: 'customForm',
    title: 'Autres',
    description: 'Projets personnalisés',
    icon: FolderPlus
  },
];

interface ProjectTypeSelectionProps {
  onSelectProjectType: (typeId: string) => void;
}

const ProjectTypeSelection: React.FC<ProjectTypeSelectionProps> = ({ onSelectProjectType }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {projectTypes.map((type) => (
        <ProjectCard 
          key={type.id}
          title={type.title}
          description={type.description}
          icon={type.icon}
          onClick={() => onSelectProjectType(type.id)}
        />
      ))}
    </div>
  );
};

export default ProjectTypeSelection;
