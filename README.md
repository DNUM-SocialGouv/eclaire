# API Eclaire - Plateforme nationale des essais cliniques - Ministère de la santé

## Pré-requis
- Avoir `podman` installé (https://podman.io/)
- Installer `corepack`, l'activer puis gérer `yarn`
```bash 
npm install -g corepack
corepack enable
yarn set version stable
yarn
```

## Installation

```bash
yarn
cp .env.sample .env
```

Puis remplir les secrets.

## Utilisation

Vous trouverez toutes ces commandes dans le fichier package.json.

### Lancer l'application pour développer

Nécessite d'avoir lancé les containers et d'avoir chargé des informations
```bash
yarn start:db
yarn hard-index-migration
```

```bash
yarn dev
```

> Cette application fonctionne avec la dernière version LTS de node.

### Lancer l'application pour simuler la production

```bash
yarn build && yarn start
```

### Lancer les tests

Nécessite d'avoir lancé les containers 
```bash
yarn start:db
```

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

## Import MedDra
- Supprimer l'index meddra sur Elasticsearch s'il existe déjà
- Récupérer le fichier llt.asc qui est au format `Windows-1252` 
- Ouvrir le fichier avec un éditeur de code pour le sauvegarder avec l'encodage `UTF-8` et ainsi lire les caractères spéciaux correctement
- Renommer le fichier en `meddra-utf8.asc`
- Placer ce fichier à la racine du projet
- Exécuter la ligne bash suivante

```bash
yarn etl:meddra-import
```

## Guide d'implémentation et données implémentées
- Le guide officiel est disponible sur https://interop.esante.gouv.fr/ig/fhir/eclaire/
- Les données implémentées sont marquées par une coche sur l'image [mapping.png](mapping.png)

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

### Code MedDra/label en Français en base de données (09/10/23)

- Facile et rapide d'implémentation
- Evite de faire trop d'appel à leur API
- Par contre, il faut mettre cette liste à jour tous les semestres
