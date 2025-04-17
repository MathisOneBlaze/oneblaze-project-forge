
# Structure détaillée du projet OneShell

Ce document fournit une documentation détaillée sur la structure et l'organisation du projet OneShell Project Forge.

## Architecture globale

L'application OneShell Project Forge est construite sur une architecture moderne basée sur React avec TypeScript, utilisant Vite comme bundler. Elle suit une approche de conception par composants et utilise des hooks pour la gestion de l'état.

## Structure des dossiers

```
/
├── public/                    # Fichiers statiques accessibles publiquement
│   └── lovable-uploads/       # Images et ressources téléchargées
├── src/                       # Code source de l'application
│   ├── components/            # Composants React réutilisables
│   │   ├── ui/                # Composants UI de base (shadcn/ui)
│   │   ├── CheckboxOption.tsx # Option à cocher
│   │   ├── FormField.tsx      # Champ de formulaire
│   │   ├── Logo.tsx           # Logo de l'application
│   │   ├── ProjectCard.tsx    # Carte pour les types de projets
│   │   ├── ProjectForm.tsx    # Formulaire de création
│   │   ├── ProjectFormBody.tsx # Corps du formulaire
│   │   └── ProjectTypeSelection.tsx # Sélection du type
│   ├── hooks/                 # Hooks React personnalisés
│   │   ├── use-mobile.tsx     # Détection d'appareil mobile
│   │   └── use-toast.ts       # Gestion des notifications toast
│   ├── lib/                   # Utilitaires et fonctions
│   │   └── utils.ts           # Fonctions utilitaires
│   ├── pages/                 # Pages de l'application
│   │   ├── Index.tsx          # Page d'accueil
│   │   └── NotFound.tsx       # Page 404
│   ├── App.tsx                # Configuration de l'application
│   ├── index.css              # Styles globaux
│   └── main.tsx               # Point d'entrée
├── docs/                      # Documentation
├── README.md                  # Documentation principale
├── index.html                 # Fichier HTML principal
├── package.json               # Dépendances et scripts
├── tailwind.config.ts         # Configuration de Tailwind CSS
└── vite.config.ts             # Configuration de Vite
```

## Composants principaux

### `ProjectTypeSelection.tsx`
Ce composant affiche la grille des différents types de projets disponibles (Musique, Vidéo, etc.). Chaque type est représenté par une carte cliquable qui déclenche l'ouverture du formulaire correspondant.

### `ProjectForm.tsx`
Formulaire principal pour la création d'un projet. Il s'adapte dynamiquement au type de projet sélectionné et affiche les champs appropriés.

### `ProjectFormBody.tsx`
Contient la logique et les champs spécifiques à chaque type de projet. Il s'agit du corps du formulaire qui change en fonction du type sélectionné.

### `CheckboxOption.tsx`
Composant réutilisable pour les options à cocher dans les formulaires, stylisé selon la charte graphique de l'application.

### `Logo.tsx`
Gère l'affichage du logo OneShell avec différentes tailles et options.

## Styles et thème

L'application utilise Tailwind CSS avec une configuration personnalisée définie dans `tailwind.config.ts`. Les principales classes de style sont:

- `.oneblaze-card`: Style pour les cartes et conteneurs
- `.oneblaze-button`: Style pour les boutons
- `.oneblaze-input`: Style pour les champs de saisie
- `.oneblaze-checkbox`: Style pour les cases à cocher

Des animations sont également définies:
- `animate-float`: Animation flottante pour le logo
- `animate-fade-in`: Animation de fondu à l'entrée
- `hover:shadow-[0_0_15px_rgba(0,255,153,0.2)]`: Effet de lueur verte au survol

## Flux de données

1. L'utilisateur sélectionne un type de projet sur la page d'accueil
2. Le type est passé au composant `ProjectForm` qui charge le formulaire approprié
3. L'utilisateur remplit les informations et soumet le formulaire
4. Une structure de dossier est générée selon les spécifications
5. L'utilisateur est redirigé vers la page d'accueil ou le dossier est ouvert selon les options

## Extensions futures

Le code est structuré pour permettre facilement l'ajout de:
- Nouveaux types de projets
- Champs personnalisés dans les formulaires
- Options additionnelles pour la génération de structure
- Intégration avec des services externes

## Notes techniques

- L'application utilise React Router pour la navigation
- Les notifications sont gérées par le composant Toast de shadcn/ui
- Les icônes proviennent de Lucide React
- Les formulaires sont construits avec une approche modulaire pour faciliter l'extension

---

Pour plus d'informations sur le développement et la maintenance, consultez le README principal du projet.
