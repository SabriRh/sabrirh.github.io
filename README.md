# sabrirh.github.io

Portfolio personnel de **Sabri Rhaimia** — Web Developer / Tech Lead.

En ligne : [sabrirh.github.io](https://sabrirh.github.io)

## Stack

- [Angular 21](https://angular.dev) (composants standalone, signals)
- TypeScript, SCSS
- [Jest](https://jestjs.io) + [Spectator](https://github.com/ngneat/spectator) pour les tests
- Déploiement GitHub Pages via [gh-pages](https://github.com/tschaub/gh-pages)

## Démarrage

```bash
npm install
npm start        # serveur de dev sur http://localhost:4200
```

## Scripts

| Commande         | Description                                  |
| ---------------- | -------------------------------------------- |
| `npm start`      | Serveur de développement                     |
| `npm run build`  | Build de production dans `dist/`             |
| `npm test`       | Lance la suite de tests Jest                 |
| `npm run deploy` | Build puis publie sur la branche `gh-pages`  |

## Contenu

Les projets affichés sont chargés depuis [`public/projects.json`](public/projects.json) ;
les visuels associés se trouvent dans [`public/imgs/`](public/imgs/).

## Déploiement

```bash
npm run deploy
```

Le build est publié sur la branche `gh-pages`. Vérifier que la source GitHub Pages
du dépôt (Settings → Pages) pointe bien sur la branche `gh-pages`.
