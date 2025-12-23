# 🔐 Configuration Supabase

## Installation

1. **Installer les dépendances** :
```bash
npm install
```

2. **Créer un projet Supabase** :
   - Allez sur [supabase.com](https://supabase.com)
   - Créez un nouveau projet
   - Notez votre URL et votre clé anonyme

3. **Configurer les variables d'environnement** :
   - Copiez `.env.example` vers `.env`
   - Remplissez vos credentials Supabase :
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## Configuration de la Base de Données

### 1. Créer la Table `users`

Exécutez cette requête SQL dans l'éditeur SQL de Supabase :

```sql
-- Créer la table users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('BRAND', 'INFLUENCER', 'ADMIN')),
  avatar_url TEXT,
  company TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Politique : Les utilisateurs peuvent lire leur propre profil
CREATE POLICY "Users can read own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- Politique : Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Politique : Les utilisateurs peuvent insérer leur propre profil
CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 2. Configurer l'Email (Optionnel)

Dans Supabase Dashboard :
- Allez dans **Authentication** > **Email Templates**
- Personnalisez les templates de réinitialisation de mot de passe
- Configurez votre SMTP (ou utilisez celui de Supabase)

### 3. Configurer les Redirect URLs

Dans Supabase Dashboard :
- Allez dans **Authentication** > **URL Configuration**
- Ajoutez votre URL de production : `https://yourdomain.com/reset-password`
- Ajoutez votre URL de développement : `http://localhost:3000/reset-password`

## Fonctionnalités Implémentées

✅ **Authentification complète**
- Inscription avec email/password
- Connexion avec email/password
- Déconnexion
- Gestion de session persistante

✅ **Récupération de mot de passe**
- Envoi d'email de réinitialisation
- Page de réinitialisation sécurisée
- Validation de mot de passe

✅ **Gestion de profil**
- Mise à jour d'email
- Mise à jour de mot de passe
- Mise à jour du profil utilisateur

✅ **Fallback Mode**
- Si Supabase n'est pas configuré, le système utilise localStorage
- Parfait pour le développement et les démos

## Utilisation

### Inscription
```typescript
const { signUp } = useAuth();
await signUp('user@example.com', 'password123', 'John Doe', 'BRAND');
```

### Connexion
```typescript
const { login } = useAuth();
await login('user@example.com', 'password123');
```

### Récupération de mot de passe
```typescript
const { resetPassword } = useAuth();
await resetPassword('user@example.com');
```

### Mise à jour de mot de passe
```typescript
const { updatePassword } = useAuth();
await updatePassword('newPassword123');
```

### Mise à jour d'email
```typescript
const { updateEmail } = useAuth();
await updateEmail('newemail@example.com');
```

## Sécurité

- ✅ Row Level Security (RLS) activé
- ✅ Politiques de sécurité configurées
- ✅ Validation côté serveur
- ✅ Chiffrement des mots de passe (géré par Supabase)
- ✅ Tokens JWT sécurisés

---

**Le système est maintenant prêt pour la production !** 🚀

