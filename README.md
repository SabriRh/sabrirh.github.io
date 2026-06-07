# sabrirh.github.io

Portfolio personnel de **Sabri Rhaimia** — Web Developer / Tech Lead.

En ligne : [sabrirh.github.io](https://sabrirh.github.io)

## Stack

- [Angular 21](https://angular.dev) (composants standalone, signals)
- TypeScript, SCSS
- [Jest](https://jestjs.io) + [Spectator](https://github.com/ngneat/spectator) pour les tests
- Déploiement continu sur GitHub Pages via GitHub Actions

## Démarrage

```bash
npm install
npm start        # serveur de dev sur http://localhost:4200
```

## Scripts

| Commande        | Description                      |
| --------------- | -------------------------------- |
| `npm start`     | Serveur de développement         |
| `npm run build` | Build de production dans `dist/` |
| `npm test`      | Lance la suite de tests Jest     |

## Contenu

Les projets affichés sont chargés depuis [`public/projects.json`](public/projects.json) ;
les visuels associés se trouvent dans [`public/imgs/`](public/imgs/).

## Déploiement

Le déploiement est automatique : chaque push sur `master` déclenche le workflow
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) qui teste, build et
publie le site sur GitHub Pages. Un déclenchement manuel est aussi possible depuis
l'onglet **Actions** du dépôt.

Réglage requis une seule fois : **Settings → Pages → Source = GitHub Actions**.
