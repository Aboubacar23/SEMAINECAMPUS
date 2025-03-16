# GTO-back

Ce projet représente la partie back-end de l'application web GTO développée avec Node.js et Sequelize pour la gestion des bases de données. Le serveur utilise Express.js pour la gestion des routes et des requêtes HTTP.

## Prérequis
- Node.js (version 14 ou supérieure)
- NPM (Node Package Manager)
- Base de données configurée en MySQL

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/adembaransdv/GTO-back.git
cd GTO-back
```

### 2. Installer les dépendances

Exécute la commande suivante pour installer les dépendances du projet :

```bash
npm install
```

Cela va installer toutes les dépendances nécessaires, y compris Sequelize et les connecteurs pour la base de données.

## Développement

Pour démarrer le serveur en mode développement, utilise la commande suivante :

```bash
npm run dev
```

Cela démarre le serveur avec Nodemon, qui permet un redémarrage automatique lors des changements de fichiers.

Dans le fichier .env vous trouverez le port sur lequel le back écoute dans la variable PORT. Par défaut c'est sur le port 5000.

## Scripts
```bash
    npm install : Installe toutes les dépendances nécessaires.
    npm run dev : Lance le serveur en mode développement avec Nodemon.
    npm start : Démarre le serveur en mode production.
```

## Configuration de la base de données
### 1. Configuration de Sequelize

Dans le fichier .env il faut configurer les paramètres de connexion à la base de données. Exemple :
```bash
DB_HOST=localhost-mysql.services.clever-cloud.com 
DB_USER=root 
DB_NAME=database
DB_PASSWORD=root
DB_PORT=21883
```
### 2. Synchronisation des modèles avec la base de données

Le fichier server.js va synchroniser les modèles avec la base de données avec le script suivant :
```js
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
})
```

Si tu veux contribuer à ce projet, n'hésite pas à ouvrir une Pull Request ou à signaler un problème via les Issues.

## Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.