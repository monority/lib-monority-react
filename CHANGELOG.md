# Changelog

Le changelog de la librairie est généré automatiquement par
[changesets](https://github.com/changesets/changesets) et vit dans le paquet
publié :

- **[`packages/ui/CHANGELOG.md`](./packages/ui/CHANGELOG.md)** — versions et
  notes de `@monority/ui`

Ce fichier racine ne sert plus qu'à pointer vers lui. Il est conservé pour ne pas
casser les liens existants (badges, README, documentation).

Comment ça marche : chaque changement notable ajoute un fichier dans
`.changeset/` (voir `.changeset/README.md`). À la prochaine version, le workflow
**Release** applique les changesets et écrit `packages/ui/CHANGELOG.md`.

> Le fichier `packages/ui/CHANGELOG.md` apparaîtra à la première application
> des changesets en attente.
