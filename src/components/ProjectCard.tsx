
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
        "hover:border-primary hover:bg-accent transition-colors duration-300"
      )}
      onClick={onClick}
    >
      <div className="mb-4 p-4 rounded-full bg-background text-foreground group-hover:text-primary transition-colors duration-300">
        <IconComponent size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Button>
  );
};

export default ProjectCard;
