
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileEdit } from 'lucide-react';

const templateFormSchema = z.object({
  templateName: z.string().min(3, "Le nom du template doit contenir au moins 3 caractères"),
  templateDescription: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  templateBaseType: z.string().min(1, "Veuillez sélectionner un type de projet de base"),
  creationType: z.enum(['copy', 'new'], {
    required_error: "Veuillez choisir un type de création",
  }),
  baseTemplate: z.string().optional(),
});

type TemplateFormValues = z.infer<typeof templateFormSchema>;

interface CreateTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTemplate: (data: TemplateFormValues) => void;
  existingTemplates: Array<{id: string, name: string, description: string, baseType: string}>;
}

const projectTypes = [
  { id: 'video', label: 'Vidéo' },
  { id: 'motion', label: 'Motion Design' },
  { id: 'photo', label: 'Projet Photo' },
  { id: 'web', label: 'Projet Web' },
  { id: 'music', label: 'Musique' },
  { id: 'graphic', label: 'Graphique' },
  { id: 'dev', label: 'Développement' },
  { id: 'game', label: 'Jeux' },
  { id: 'teaching', label: 'Enseignement' },
  { id: 'course', label: 'Formation' },
  { id: 'conference', label: 'Conférence' },
  { id: 'admin', label: 'Administration' },
  { id: 'custom', label: 'Personnalisé' },
];

const CreateTemplateDialog: React.FC<CreateTemplateDialogProps> = ({
  open,
  onOpenChange,
  onCreateTemplate,
  existingTemplates,
}) => {
  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      templateName: "",
      templateDescription: "",
      templateBaseType: "",
      creationType: "new",
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer un nouveau template</DialogTitle>
          <DialogDescription>
            Définissez les détails de votre nouveau template de projet
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onCreateTemplate)} className="space-y-6">
            <FormField
              control={form.control}
              name="templateBaseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de projet</FormLabel>
                  <FormControl>
                    <select 
                      className="oneblaze-input w-full h-10 px-3 rounded-xl"
                      {...field}
                    >
                      <option value="">Sélectionnez un type de projet</option>
                      {projectTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="creationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de création</FormLabel>
                  <Tabs
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="new">Nouveau template</TabsTrigger>
                      <TabsTrigger value="copy">Copier un template existant</TabsTrigger>
                    </TabsList>
                    <TabsContent value="new" className="space-y-4">
                      <FormDescription>
                        Créez un nouveau template à partir de zéro
                      </FormDescription>
                    </TabsContent>
                    <TabsContent value="copy" className="space-y-4">
                      <FormField
                        control={form.control}
                        name="baseTemplate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Template de base</FormLabel>
                            <FormControl>
                              <select 
                                className="oneblaze-input w-full h-10 px-3 rounded-xl"
                                {...field}
                                disabled={existingTemplates.length === 0}
                              >
                                <option value="">Sélectionnez un template</option>
                                {existingTemplates.map((template) => (
                                  <option key={template.id} value={template.id}>
                                    {template.name}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormDescription>
                              {existingTemplates.length === 0 
                                ? "Aucun template disponible à copier" 
                                : "Choisissez un template existant comme base"}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="templateName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du template</FormLabel>
                  <FormControl>
                    <Input placeholder="Mon template personnalisé" className="oneblaze-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="templateDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Décrivez à quoi sert ce template" className="oneblaze-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button type="submit" className="oneblaze-button">
                <FileEdit size={16} className="mr-2" />
                Créer le template
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTemplateDialog;
