# API Eclaire - Plateforme nationale des essais cliniques - Ministère de la santé

## Installation

```bash
yarn
cp .env.sample .env
```

Puis remplir les secrets.

## Utilisation

Vous trouverez toutes ces commandes dans le fichier package.json.

### Lancer l'application pour développer

```bash
yarn dev
```

> Cette application fonctionne avec la dernière version LTS de node.

### Lancer l'application pour simuler la production

```bash
yarn build && yarn start
```

### Lancer les tests

```bash
yarn test

yarn test:e2e

yarn test:coverage

yarn test:mutation
```

### Lancer le linter

```bash
yarn lint
```

### Vérifier le typage

```bash
yarn typecheck
```

### Lancer la CI

```bash
yarn amibroken
```

### Vérifier qu'il n'y a pas de code mort

```bash
yarn deadcode
```

### Vérifier qu'il n'y a pas de dépendance inutile

```bash
yarn depcheck
```

### Se connecter au one-off de Scalingo (il faut avoir installé le CLI de Scalingo au préalable)

```bash
yarn bash:production
```

## Architectural Decision Records (ADR)

### Open source (30/03/23)

- Rien n'empêche le contraire
- On peut utiliser des outils gratuits d'observabilité
- C'est nul d'être fermé
- Projet d'état
- Open API

### Framework : NestJS (30/03/23)

- Facile d'utilisation
- Connu par une grosse majorité des développeurs
- Beaucoup de ressource sur Internet, très bonne documentation
- Très bien pour faire juste une API
- Pas de front

### Hébergeur : Scalingo (30/03/23)

- Hébergeur Français
- Facile d'utilisation
- Peu cher
- Interface très simple
- Certifié HDS
- Autonome
- Scalable

### Dépôt de code : GitHub (30/03/23)

- Connu de tous
- Facile d'utilisation
- CI gratuite

### Écrire le code en Anglais (30/03/23)

- Audit OMS : lecture du code

### Outils d'observabilité : Sentry (30/03/23)

- Facile d'utilisation
- Très répandu
- La DNUM nous fourni un compte par défaut
- Notification rapide dès qu'il y a une erreur en production
- Erreur très détailler pour mieux la corriger

### Gestion des variables d'environnement

- Les variables d'environnement ne contiennent pas de configuration
- Les secrets doivent être sur Scalingo
- En local, il y a un fichier `.env.sample` commité et vide et on le surcharge avec un fichier `.env`
