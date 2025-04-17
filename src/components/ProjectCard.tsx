
import React from 'react';
import { Icon } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, icon: IconComponent, onClick }) => {
  return (
    <button 
      className="oneblaze-card flex flex-col items-center justify-center p-6 h-full w-full text-center group"
      onClick={onClick}
    >
      <div className="mb-4 p-4 rounded-full bg-oneblaze-dark group-hover:text-oneblaze-green-hover transition-colors duration-300">
        <IconComponent size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  );
};

export default ProjectCard;
