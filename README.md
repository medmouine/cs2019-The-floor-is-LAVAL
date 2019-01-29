# Readme

Pour configurer votre projet, suivez les étapes suivantes:

## Configurer les variables d'environnement

Créez un fichier `.env` à la racine de votre projet. Mettez le contenu suivant à l'intérieur. Vous trouverez votre l'uri de votre base de données mongo sur votre dashboard, sous l'onglet team, dans la section "links".

```
ARTICLES_API_BASE_URI=https://cs2019-tse-articles-api.herokuapp.com/
FRONT_END_ORIGIN=*
MONGODB_URI=votre_uri_mongo
PORT=8081
```

## Installer les dépendances

Vous devez tout d'abord [installer NPM](https://www.npmjs.com/get-npm).

Ensuite, exécutez la commande suivante:

```
npm i
```

## Builder le projet

```
npm run build
```

## Démarrer votre projet localement

```
npm start
```
