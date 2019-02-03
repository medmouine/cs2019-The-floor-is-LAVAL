# Readme

Pour configurer votre projet, suivez les étapes suivantes:

## Configurer les variables d'environnement

À la racine de votre projet, vous trouverez un fichier `.env.template`. Renommez-le `.env`. Vous devez remplacer le MONGODB_URI par celui de votre équipe. Vous trouverez votre l'uri de votre base de données mongo sur votre dashboard, sous l'onglet team, dans la section "links".

```
MONGODB_URI=votre_uri_mongo


ARTICLES_API_BASE_URI=https://cs2019-tse-articles-api.herokuapp.com/
FRONT_END_ORIGIN=*
PORT=8081
```

## Installer les dépendances

Vous devez tout d'abord [installer NPM](https://www.npmjs.com/get-npm) et [Node.js](https://nodejs.org/en/download/).

Ensuite, dans le répertoire du projet, exécutez la commande suivante:

```
npm i
```

## Démarrer votre projet localement

```
npm start-watch
```

## Rouler les tests

Pour rouler les tests, exécutez la commande suivante:

```
npm t
```
