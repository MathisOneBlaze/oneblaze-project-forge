
import React, { useState } from 'react';
import FormField from './FormField';
import CheckboxOption from './CheckboxOption';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface CommonProjectOptions {
  addReadme: boolean;
  createAdminShortcut: boolean;
  generatePlanning: boolean;
  openFolderAfterCreation: boolean;
}

interface ProjectFormProps {
  projectType: string;
  onSubmit: (projectData: any) => void;
}

const ProjectFormBody: React.FC<ProjectFormProps> = ({ projectType, onSubmit }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDate, setProjectDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [projectCategory, setProjectCategory] = useState('');
  const [projectLocation, setProjectLocation] = useState(`/B-Projets/${getProjectTypeFolder(projectType)}`);
  const [projectDescription, setProjectDescription] = useState('');
  
  const [commonOptions, setCommonOptions] = useState<CommonProjectOptions>({
    addReadme: true,
    createAdminShortcut: true,
    generatePlanning: false,
    openFolderAfterCreation: true
  });
  
  const [additionalOptions, setAdditionalOptions] = useState<Record<string, boolean>>({});
  const [showPreview, setShowPreview] = useState(false);

  function getProjectTypeFolder(type: string): string {
    const typeFolders: Record<string, string> = {
      'musiqueForm': '1 - Musique',
      'videoForm': '2 - Vidéo',
      'graphiqueForm': '3 - Graphique',
      'devForm': '4 - Dev',
      'gameForm': '5 - Games',
      'enseignementForm': '6 - Enseignement & Recherches',
      'coursForm': '6 - Enseignement & Recherches/Cours & Formations',
      'conferenceForm': '6 - Enseignement & Recherches/Conférences',
      'adminForm': 'A - Admin',
      'customForm': '999 - FUTURE'
    };
    
    return typeFolders[type] || '';
  }
  
  // Get categories based on project type
  function getCategoriesForType(): string[] {
    switch (projectType) {
      case 'musiqueForm':
        return ['Album', 'Single', 'Performance'];
      case 'videoForm':
        return ['YouTube', 'Clip', 'Performance', 'Interview', 'Live stream', 'PUB & promo'];
      case 'devForm':
        return ['Web', 'Mobile', 'Desktop', 'API', 'Library'];
      case 'gameForm':
        return ['Prototype', 'Demo', 'Full Game', 'Game Jam'];
      case 'enseignementForm':
        return ['Cours & Formations', 'Conférences', 'Recherches'];
      default:
        return [];
    }
  }
  
  // Get additional options based on project type
  function getAdditionalOptionsForType(): { id: string; label: string }[] {
    switch (projectType) {
      case 'musiqueForm':
        return [
          { id: 'createSongFolders', label: 'Créer un dossier par chanson (avec sous-dossier MAO, mix, etc.)' },
          { id: 'importStrategy', label: 'Importer template de stratégie (depuis /C-Ressources)' },
          { id: 'createMediaFolders', label: 'Créer dossier Audio, Graphique, Vidéo, Publication' },
          { id: 'addContractTemplate', label: 'Ajouter modèle de contrat' }
        ];
      case 'videoForm':
        return [
          { id: 'includeDocumentsFolder', label: 'Inclure sous-dossier "Documents" (script, charte graphique, etc.)' },
          { id: 'includeShootingTemplate', label: 'Inclure modèle de fiche de tournage' },
          { id: 'addImageRights', label: 'Ajouter modèle de droits à l\'image' },
          { id: 'createContractShortcut', label: 'Créer raccourci vers contrat dans Admin' }
        ];
      case 'devForm':
      case 'gameForm':
        return [
          { id: 'initGitRepo', label: 'Initialiser dépôt Git' },
          { id: 'includeReadmeWithConventions', label: 'Inclure README avec conventions' },
          { id: 'addTechDocsFolder', label: 'Ajouter dossier "Docs techniques"' },
          { id: 'addAssetsFolder', label: 'Ajouter sous-dossier "UI / Assets / Codesources"' }
        ];
      case 'enseignementForm':
        return [
          { id: 'addSyllabusTemplate', label: 'Ajouter modèle de syllabus (cours)' },
          { id: 'addPresentationTemplate', label: 'Ajouter modèle de présentation (conférence)' },
          { id: 'addResearchData', label: 'Ajouter tableau de données vide + dossier notes (recherche)' }
        ];
      default:
        return [];
    }
  }
  
  function getFolderStructurePreview(): string[] {
    const folderName = `[${projectDate}]_${projectCategory || 'Categorie'}_${projectTitle || 'Titre'}`;
    const basePath = `${projectLocation}/${folderName}`;
    
    const structure = [basePath];
    
    // Common folders
    structure.push(`${basePath}/Documents`);
    
    if (commonOptions.addReadme) {
      structure.push(`${basePath}/README.md`);
    }
    
    if (commonOptions.generatePlanning) {
      structure.push(`${basePath}/planning.md`);
    }
    
    // Type-specific folders
    switch (projectType) {
      case 'musiqueForm':
        if (additionalOptions.createMediaFolders) {
          structure.push(`${basePath}/Audio`);
          structure.push(`${basePath}/Graphique`);
          structure.push(`${basePath}/Vidéo`);
          structure.push(`${basePath}/Publication`);
        }
        
        if (additionalOptions.createSongFolders) {
          structure.push(`${basePath}/Audio/[Nom_Chanson]`);
          structure.push(`${basePath}/Audio/[Nom_Chanson]/Stems`);
          structure.push(`${basePath}/Audio/[Nom_Chanson]/Export`);
        }
        
        if (additionalOptions.importStrategy) {
          structure.push(`${basePath}/Documents/Stratégie`);
        }
        
        if (additionalOptions.addContractTemplate) {
          structure.push(`${basePath}/Documents/Contrats`);
        }
        break;
        
      case 'videoForm':
        structure.push(`${basePath}/Rushes`);
        structure.push(`${basePath}/Montages`);
        structure.push(`${basePath}/Export & Diffusion`);
        
        if (additionalOptions.includeDocumentsFolder) {
          structure.push(`${basePath}/Documents/Script`);
          structure.push(`${basePath}/Documents/Charte Graphique`);
        }
        
        if (additionalOptions.includeShootingTemplate) {
          structure.push(`${basePath}/Documents/Fiche de tournage.md`);
        }
        
        if (additionalOptions.addImageRights) {
          structure.push(`${basePath}/Documents/Droits à l'image.docx`);
        }
        break;
        
      case 'devForm':
      case 'gameForm':
        structure.push(`${basePath}/Code`);
        
        if (additionalOptions.initGitRepo) {
          structure.push(`${basePath}/.git`);
        }
        
        if (additionalOptions.addTechDocsFolder) {
          structure.push(`${basePath}/Docs techniques`);
        }
        
        if (additionalOptions.addAssetsFolder) {
          structure.push(`${basePath}/Assets`);
          structure.push(`${basePath}/Assets/UI`);
        }
        break;
        
      case 'enseignementForm':
        if (projectCategory === 'Cours & Formations') {
          structure.push(`${basePath}/Matériel pédagogique`);
          
          if (additionalOptions.addSyllabusTemplate) {
            structure.push(`${basePath}/Documents/Syllabus.md`);
          }
        } else if (projectCategory === 'Conférences') {
          structure.push(`${basePath}/Slides & Visuels`);
          
          if (additionalOptions.addPresentationTemplate) {
            structure.push(`${basePath}/Documents/Présentation.pptx`);
          }
        } else if (projectCategory === 'Recherches') {
          structure.push(`${basePath}/Données`);
          structure.push(`${basePath}/Analyses`);
          
          if (additionalOptions.addResearchData) {
            structure.push(`${basePath}/Données/dataset.csv`);
            structure.push(`${basePath}/Notes`);
          }
        }
        break;
    }
    
    if (commonOptions.createAdminShortcut) {
      const adminType = getAdminFolder(projectType);
      structure.push(`A - Admin/${adminType}/Raccourcis_projets/[Lien vers ${projectTitle || 'Projet'}]`);
    }
    
    return structure;
  }
  
  function getAdminFolder(type: string): string {
    switch (type) {
      case 'musiqueForm':
        return '2 - EVRGRN';
      case 'devForm':
      case 'gameForm':
        return '4 - B.i.K / B.i.C';
      default:
        return '1 - Mathis OneBlaze';
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      title: projectTitle,
      date: projectDate,
      category: projectCategory,
      location: projectLocation,
      description: projectDescription,
      commonOptions,
      additionalOptions,
      projectType,
      folderName: `[${projectDate}]_${projectCategory}_${projectTitle}`
    };
    
    onSubmit(formData);
  };
  
  const updateCommonOption = (key: keyof CommonProjectOptions, value: boolean) => {
    setCommonOptions(prev => ({ ...prev, [key]: value }));
  };
  
  const updateAdditionalOption = (key: string, value: boolean) => {
    setAdditionalOptions(prev => ({ ...prev, [key]: value }));
  };
  
  const categories = getCategoriesForType();
  const additionalOptionsForType = getAdditionalOptionsForType();
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-xl font-medium mb-4 border-b border-oneblaze-light pb-2">Informations de base</h3>
          
          <FormField label="Titre du projet">
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="oneblaze-input w-full"
              required
            />
          </FormField>
          
          <FormField label="Date de création">
            <input
              type="date"
              value={projectDate}
              onChange={(e) => setProjectDate(e.target.value)}
              className="oneblaze-input w-full"
              required
            />
          </FormField>
          
          <FormField label="Catégorie">
            {categories.length > 0 ? (
              <select
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
                className="oneblaze-input w-full"
                required
              >
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
                className="oneblaze-input w-full"
                required
              />
            )}
          </FormField>
          
          <FormField label="Emplacement">
            <input
              type="text"
              value={projectLocation}
              onChange={(e) => setProjectLocation(e.target.value)}
              className="oneblaze-input w-full"
              required
            />
          </FormField>
          
          <FormField label="Description (optionnelle)">
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              className="oneblaze-input w-full h-24 resize-none"
            />
          </FormField>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-4 border-b border-oneblaze-light pb-2">Options générales</h3>
            <div className="space-y-1">
              <CheckboxOption
                id="addReadme"
                label="Ajouter README.md à la racine du projet"
                checked={commonOptions.addReadme}
                onChange={(checked) => updateCommonOption('addReadme', checked)}
              />
              <CheckboxOption
                id="createAdminShortcut"
                label="Créer raccourci dans dossier ADMIN (contrats, suivi, etc.)"
                checked={commonOptions.createAdminShortcut}
                onChange={(checked) => updateCommonOption('createAdminShortcut', checked)}
              />
              <CheckboxOption
                id="generatePlanning"
                label="Générer un planning modèle (ex : Gantt, TODO.md, etc.)"
                checked={commonOptions.generatePlanning}
                onChange={(checked) => updateCommonOption('generatePlanning', checked)}
              />
              <CheckboxOption
                id="openFolderAfterCreation"
                label="Ouvrir le dossier à la fin"
                checked={commonOptions.openFolderAfterCreation}
                onChange={(checked) => updateCommonOption('openFolderAfterCreation', checked)}
              />
            </div>
          </div>
          
          {additionalOptionsForType.length > 0 && (
            <div>
              <h3 className="text-xl font-medium mb-4 border-b border-oneblaze-light pb-2">Options spécifiques</h3>
              <div className="space-y-1">
                {additionalOptionsForType.map((option) => (
                  <CheckboxOption
                    key={option.id}
                    id={option.id}
                    label={option.label}
                    checked={!!additionalOptions[option.id]}
                    onChange={(checked) => updateAdditionalOption(option.id, checked)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-oneblaze-light pt-4">
        <button 
          type="button" 
          className="flex items-center text-oneblaze-green-hover mb-2"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          <span className="ml-2">Prévisualisation de l'arborescence</span>
        </button>
        
        {showPreview && (
          <div className="bg-oneblaze-dark p-4 rounded-xl border border-oneblaze-light font-mono text-sm overflow-auto max-h-60">
            <ul className="space-y-1">
              {getFolderStructurePreview().map((path, index) => (
                <li key={index} className="whitespace-nowrap">
                  {path}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="flex justify-center pt-4">
        <button type="submit" className="oneblaze-button font-bold text-lg animate-pulse-glow">
          Créer le projet
        </button>
      </div>
    </form>
  );
};

export default ProjectFormBody;
