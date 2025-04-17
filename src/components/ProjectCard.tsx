
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, icon: IconComponent, onClick }) => {
  return (
    <Button 
      variant="outline"
      className={cn(
        "flex flex-col items-center justify-center p-6 h-full w-full text-center group",
        "border-2 border-transparent hover:border-oneblaze-green-hover hover:bg-oneblaze-dark transition-colors duration-300 shadow-lg",
        "hover:shadow-[0_0_15px_rgba(0,255,153,0.2)]"
      )}
      onClick={onClick}
    >
      <div className="mb-4 p-4 rounded-full bg-oneblaze-dark text-oneblaze-text group-hover:text-oneblaze-green-hover transition-colors duration-300">
        <IconComponent size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Button>
  );
};

export default ProjectCard;
