# 🚀 Déploiement sur Vercel

## Configuration

Le projet est configuré pour Vercel avec les fichiers suivants :

### `vercel.json`
- **Build Command** : `npm run build`
- **Output Directory** : `dist`
- **Rewrites** : Toutes les routes pointent vers `/index.html` (SPA)

### `vite.config.ts`
- Configuration Vite standard
- Output vers le dossier `dist`
- Optimisation des chunks

## Instructions de Déploiement

1. **Connecter le repository GitHub à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Importez votre repository `ads-studio`
   - Vercel détectera automatiquement Vite

2. **Configuration dans Vercel Dashboard**
   - **Framework Preset** : Vite (ou Other)
   - **Root Directory** : `.` (racine du projet)
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`

3. **Variables d'Environnement** (si nécessaire)
   - Ajoutez vos variables d'environnement dans Vercel Dashboard
   - Exemple : `VITE_API_URL`, etc.

## Résolution des Problèmes

### Erreur "No Next.js version detected"
✅ **Résolu** : Le fichier `vercel.json` spécifie maintenant explicitement que c'est un projet Vite, pas Next.js.

### Build échoue
- Vérifiez que tous les fichiers sont commités
- Vérifiez les logs de build dans Vercel
- Assurez-vous que `package.json` contient toutes les dépendances

### Routes ne fonctionnent pas
✅ **Résolu** : Le fichier `vercel.json` contient les rewrites nécessaires pour les SPA.

## Structure du Projet

```
ads-studio/
├── vercel.json          # Configuration Vercel
├── vite.config.ts       # Configuration Vite
├── package.json         # Dépendances
├── tsconfig.json        # Configuration TypeScript
├── index.html           # Point d'entrée HTML
├── index.tsx            # Point d'entrée React
└── dist/                # Dossier de build (généré)
```

## Commandes Locales

```bash
# Installation
npm install

# Développement
npm run dev

# Build
npm run build

# Preview
npm run preview
```

---

**Le projet est maintenant prêt pour le déploiement sur Vercel !** 🎉

