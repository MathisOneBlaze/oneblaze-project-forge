import React, { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import ProjectTypeSelection from '@/components/ProjectTypeSelection';
import ProjectForm from '@/components/ProjectForm';
import { Dices, Settings, FolderPlus, FileEdit, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CreateTemplateDialog from '@/components/CreateTemplateDialog';
import ElectronDetector from '@/components/ElectronDetector';

const masterShellFormSchema = z.object({
  masterShellPath: z.string().min(1, "Le chemin du dossier MasterShell est requis")
});

const templateFormSchema = z.object({
  templateName: z.string().min(3, "Le nom du template doit contenir au moins 3 caractères"),
  templateDescription: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  templateBaseType: z.string().min(1, "Veuillez sélectionner un type de projet de base"),
  creationType: z.enum(['copy', 'new'], {
    required_error: "Veuillez choisir un type de création",
  }),
  baseTemplate: z.string().optional(),
});

type MasterShellFormValues = z.infer<typeof masterShellFormSchema>;
type TemplateFormValues = z.infer<typeof templateFormSchema>;

interface Template {
  id: string;
  name: string;
  description: string;
  baseType: string;
  creationType?: 'copy' | 'new';
  baseTemplateId?: string;
}

const Index = () => {
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
  const [showTemplatesSheet, setShowTemplatesSheet] = useState(false);
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);
  const [showCreateTemplateDialog, setShowCreateTemplateDialog] = useState(false);
  const [masterShellPath, setMasterShellPath] = useState<string>("");
  const [templates, setTemplates] = useState<Template[]>([]);
  
  const masterShellForm = useForm<MasterShellFormValues>({
    resolver: zodResolver(masterShellFormSchema),
    defaultValues: {
      masterShellPath: "",
    },
  });

  const templateForm = useForm<TemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      templateName: "",
      templateDescription: "",
      templateBaseType: ""
    },
  });

  useEffect(() => {
    const savedMasterShellPath = localStorage.getItem("masterShellPath");
    if (savedMasterShellPath) {
      setMasterShellPath(savedMasterShellPath);
      masterShellForm.setValue("masterShellPath", savedMasterShellPath);
    }
    
    const savedTemplates = localStorage.getItem("projectTemplates");
    if (savedTemplates) {
      setTemplates(JSON.parse(savedTemplates));
    }
  }, []);

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

  const handleCreateTemplateClick = () => {
    setShowCreateTemplateDialog(true);
    setShowTemplatesSheet(false);
  };

  const onSaveMasterShellPath = (data: MasterShellFormValues) => {
    setMasterShellPath(data.masterShellPath);
    localStorage.setItem("masterShellPath", data.masterShellPath);
    toast({
      title: "Paramètres enregistrés",
      description: "Le dossier MasterShell a été configuré avec succès.",
    });
  };

  const onCreateTemplate = (data: TemplateFormValues) => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      name: data.templateName,
      description: data.templateDescription,
      baseType: data.templateBaseType,
      creationType: data.creationType,
      baseTemplateId: data.baseTemplate,
    };
    
    const updatedTemplates = [...templates];
    
    if (data.creationType === 'copy' && data.baseTemplate) {
      const baseTemplate = templates.find(t => t.id === data.baseTemplate);
      if (baseTemplate) {
        updatedTemplates.push(newTemplate);
      }
    } else {
      updatedTemplates.push(newTemplate);
    }
    
    setTemplates(updatedTemplates);
    localStorage.setItem("projectTemplates", JSON.stringify(updatedTemplates));
    setShowCreateTemplateDialog(false);
    
    toast({
      title: "Template créé",
      description: `Le template "${data.templateName}" a été créé avec succès.`,
    });
  };

  const handleSelectTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedProjectType(template.baseType);
      setShowTemplatesSheet(false);
      toast({
        title: "Template sélectionné",
        description: `Le template "${template.name}" a été sélectionné.`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <header className="mb-12">
        <div className="flex justify-between items-center">
          <Logo size="lg" className="animate-float" />
          <div className="flex gap-3">
            <Button 
              className="oneblaze-button" 
              size="sm"
              onClick={handleTemplatesClick}
            >
              <Dices size={18} />
              <span className="hidden sm:inline">Templates</span>
            </Button>
            <Button 
              className="oneblaze-button" 
              size="sm"
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
            <ElectronDetector />
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

      <Sheet open={showTemplatesSheet} onOpenChange={setShowTemplatesSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Templates</SheetTitle>
            <SheetDescription>
              Gérez vos templates de projets personnalisés
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="flex justify-end mb-4">
              <Button className="oneblaze-button" onClick={handleCreateTemplateClick}>
                <FileEdit size={16} className="mr-2" />
                Créer un template
              </Button>
            </div>
            
            {templates.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Aucun template personnalisé disponible</p>
                <p className="text-sm mt-2">Créez votre premier template pour accélérer vos projets futurs</p>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Templates disponibles</h3>
                {templates.map(template => (
                  <div 
                    key={template.id}
                    className="border rounded-lg p-4 bg-muted/10 hover:bg-muted/20 cursor-pointer transition-colors"
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="border rounded-lg p-4 bg-muted/10 mt-8">
              <h3 className="text-lg font-medium mb-2">À propos des templates</h3>
              <p className="text-sm text-muted-foreground">
                Les templates vous permettent de sauvegarder et réutiliser des structures de projets personnalisées.
                Créez un template à partir d'un type de projet existant et personnalisez-le selon vos besoins.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showSettingsSheet} onOpenChange={setShowSettingsSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Paramètres</SheetTitle>
            <SheetDescription>
              Configurez votre application Project Forge
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div className="border rounded-lg p-5 bg-muted/10">
              <h3 className="text-lg font-medium mb-4">Emplacement MasterShell</h3>
              <Form {...masterShellForm}>
                <form onSubmit={masterShellForm.handleSubmit(onSaveMasterShellPath)} className="space-y-4">
                  <FormField
                    control={masterShellForm.control}
                    name="masterShellPath"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chemin du dossier MasterShell</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input 
                              placeholder="/chemin/vers/votre/dossier/MasterShell" 
                              className="oneblaze-input flex-1"
                              {...field} 
                            />
                          </FormControl>
                          <Button type="button" className="oneblaze-button" onClick={() => {
                            const mockPath = "/Users/mathisoneblaze/Documents/MasterShell";
                            masterShellForm.setValue("masterShellPath", mockPath);
                          }}>
                            <FolderPlus size={16} />
                          </Button>
                        </div>
                        <FormDescription>
                          Ce dossier contiendra tous vos projets créés avec Project Forge
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="oneblaze-button w-full">
                    <CheckCircle size={16} className="mr-2" />
                    Enregistrer les paramètres
                  </Button>
                </form>
              </Form>
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

      <CreateTemplateDialog
        open={showCreateTemplateDialog}
        onOpenChange={setShowCreateTemplateDialog}
        onCreateTemplate={onCreateTemplate}
        existingTemplates={templates}
      />
    </div>
  );
};

export default Index;
