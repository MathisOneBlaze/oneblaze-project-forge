
# OneShell Project Forge

![OneShell Logo](/public/lovable-uploads/e8aaa7e3-94a8-4a94-a1d9-91c89053d04c.png)

OneShell Project Forge est une application web permettant de créer rapidement des structures de projet personnalisées pour différents types de workflows créatifs.

## Fonctionnalités

- Création de structures de dossiers selon différents types de projets
- Interface minimaliste et intuitive avec une esthétique cyberpunk
- Thème sombre avec accents de vert signature EVRGRN
- Personnalisation de la structure selon les besoins spécifiques du projet
- Support pour différents types de projets (Musique, Vidéo, Graphique, Dev, etc.)

## Structure du projet

```
src/
├── components/         # Composants React réutilisables
│   ├── ui/             # Composants UI de base (shadcn/ui)
│   ├── CheckboxOption.tsx     # Composant pour les options à cocher
│   ├── FormField.tsx          # Composant pour les champs de formulaire
│   ├── Logo.tsx               # Logo de l'application
│   ├── ProjectCard.tsx        # Carte pour les types de projets
│   ├── ProjectForm.tsx        # Formulaire pour la création de projet
│   ├── ProjectFormBody.tsx    # Corps du formulaire de projet
│   └── ProjectTypeSelection.tsx # Sélection du type de projet
├── hooks/              # Hooks React personnalisés
├── lib/                # Utilitaires et fonctions
├── pages/              # Pages de l'application
│   ├── Index.tsx       # Page d'accueil
│   └── NotFound.tsx    # Page 404
├── App.tsx             # Composant racine de l'application
├── index.css           # Styles globaux
└── main.tsx            # Point d'entrée de l'application
```

## Dépendances principales

- **React & React DOM**: Framework UI
- **Tailwind CSS**: Utilitaire de styles
- **shadcn/ui**: Composants UI de base
- **Lucide React**: Icônes
- **React Router**: Navigation entre les pages
- **React Query**: Gestion des requêtes et de l'état

## Types de projets supportés

1. **Musique**: Albums, singles, performances
2. **Vidéo**: YouTube, clips, interviews
3. **Graphique**: Design, illustrations, branding
4. **Dev**: Web, mobile, logiciels
5. **Jeux**: Prototypes, game design
6. **Enseignement & Recherches**: Documentation et analyses
7. **Formation / Cours**: Matériel pédagogique
8. **Conférence**: Présentations, slides
9. **Administration**: Contrats, finances, légal
10. **Autres**: Projets personnalisés

## Guide d'utilisation

### 1. Création d'un nouveau projet

1. Sur la page d'accueil, sélectionnez le type de projet que vous souhaitez créer.
2. Remplissez les informations requises dans le formulaire:
   - Titre du projet
   - Date de création
   - Catégorie spécifique
   - Emplacement de création
   - Options supplémentaires (selon le type de projet)
3. Vérifiez l'aperçu de la structure qui sera créée
4. Cliquez sur "Créer" pour générer la structure du projet

### 2. Utilisation des templates

La fonctionnalité de templates permettra de:
- Créer des structures personnalisées réutilisables
- Importer des templates existants
- Exporter vos templates pour les partager

(Cette fonctionnalité sera disponible dans une future mise à jour)

### 3. Paramètres

La section paramètres permettra de:
- Personnaliser les dossiers racines
- Configurer les emplacements par défaut
- Gérer les métadonnées des projets

(Cette fonctionnalité sera disponible dans une future mise à jour)

## Installation et démarrage

### Prérequis

- Node.js 18+ et npm

### Installation

```bash
# Cloner le dépôt
git clone <repository-url>
cd oneshell-project-forge

# Installer les dépendances
npm install
```

### Démarrage en développement

```bash
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173`.

### Construction pour production

```bash
npm run build
```

Les fichiers générés seront dans le dossier `dist/`.

## Personnalisation

### Thème

Le thème de l'application utilise Tailwind CSS avec une palette de couleurs personnalisée:
- Fond principal: #0F0F0F (noir profond)
- Accents: #00FF99 (vert EVRGRN)
- Texte: #F0F0F0 (blanc cassé)

Pour modifier la palette, vous pouvez éditer le fichier `tailwind.config.ts`.

## Roadmap

- [ ] Système de templates personnalisables
- [ ] Gestion avancée des métadonnées
- [ ] Exportation et archivage de projets
- [ ] Synchronisation avec services tiers (Git, Notion)
- [ ] Interface administrateur pour la gestion globale

## Licence

© 2025 EVRGRN. Tous droits réservés.

## Contact

Pour toute question ou suggestion, contactez [contact@oneblaze.com](mailto:contact@oneblaze.com).

---

Imaginé par Mathis OneBlaze
