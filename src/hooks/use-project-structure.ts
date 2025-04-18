
import { useToast } from "@/hooks/use-toast";
import { useElectron } from "@/hooks/use-electron";

// This hook handles project structure creation
export function useProjectStructure() {
  const { toast } = useToast();
  const { isElectron, selectDirectory, createProjectStructure } = useElectron();

  // Function to create the project structure
  const createProject = async (projectData: any) => {
    try {
      // Build the folder structure based on project data
      const structure = buildStructureFromProjectData(projectData);
      
      if (isElectron) {
        // In desktop mode, create actual folders
        const basePath = projectData.location || await selectDirectory();
        
        if (!basePath) {
          toast({
            title: "Opération annulée",
            description: "Aucun dossier sélectionné pour la création du projet.",
            variant: "destructive",
          });
          return false;
        }
        
        const fullPath = `${basePath}/${projectData.folderName}`;
        
        const result = await createProjectStructure(fullPath, structure);
        
        if (result.success) {
          toast({
            title: "Projet créé avec succès !",
            description: `Le projet "${projectData.title}" a été créé dans ${fullPath}`,
          });
          return true;
        } else {
          toast({
            title: "Erreur lors de la création",
            description: result.error || "Une erreur inconnue s'est produite",
            variant: "destructive",
          });
          return false;
        }
      } else {
        // In web mode, just show success message
        toast({
          title: "Simulation de création de projet",
          description: `Le projet "${projectData.title}" serait créé dans ${projectData.location}/${projectData.folderName}`,
        });
        
        // Log the structure that would be created
        console.log("Structure du projet qui serait créée:", structure);
        return true;
      }
    } catch (error) {
      console.error("Erreur lors de la création du projet:", error);
      toast({
        title: "Erreur lors de la création",
        description: "Une erreur s'est produite lors de la création du projet.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Helper function to build folder structure from project data
  const buildStructureFromProjectData = (projectData: any) => {
    // Base structure common to all project types
    const baseStructure: Record<string, any> = {
      "_METADATA": {
        "project_info.json": JSON.stringify({
          title: projectData.title,
          created: projectData.date,
          type: projectData.projectType,
          category: projectData.category,
        }, null, 2)
      },
    };

    // Add specific folders based on project type
    switch (projectData.projectType) {
      case "musiqueForm":
        baseStructure["01_AUDIO"] = {};
        baseStructure["02_MIXAGE"] = {};
        baseStructure["03_MASTERING"] = {};
        break;
      case "videoForm":
        baseStructure["01_FOOTAGE"] = {};
        baseStructure["02_AUDIO"] = {};
        baseStructure["03_EDITING"] = {};
        baseStructure["04_EXPORTS"] = {};
        break;
      case "graphiqueForm":
        baseStructure["01_SOURCES"] = {};
        baseStructure["02_DESIGNS"] = {};
        baseStructure["03_EXPORTS"] = {};
        break;
      case "devForm":
        baseStructure["src"] = {};
        baseStructure["docs"] = {};
        baseStructure["assets"] = {};
        baseStructure["build"] = {};
        break;
      // Add cases for other project types
      default:
        baseStructure["01_SOURCES"] = {};
        baseStructure["02_DOCUMENTS"] = {};
        baseStructure["03_EXPORTS"] = {};
    }

    // Add README file
    baseStructure["README.md"] = `# ${projectData.title}\n\nCréé le: ${projectData.date}\nType: ${projectData.projectType}\nCatégorie: ${projectData.category || "Non spécifiée"}\n`;

    return baseStructure;
  };

  return { createProject };
}
