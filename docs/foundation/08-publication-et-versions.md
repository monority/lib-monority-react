# 08 : Publication et versions

Ce document définit ce qui est public, comment la version change, comment on déprécie, et ce que le paquet publié doit garantir. Il sert à décider si un changement est mineur ou majeur, et à préparer une publication.

## Ce qui est public

Un engagement de compatibilité couvre :

- les composants exportés par `@monority/ui` et leurs props documentées ;
- les tokens sémantiques et les tokens de composant documentés ;
- `--mr-ref-brand-hue` et `--mr-ref-brand-chroma`, interface de la marque ;
- les attributs de données publics (`data-theme`, `data-brand`, `data-density`, et les `data-variant`, `data-size`, `data-state` documentés) ;
- les noms de couches (`mr.reset`, `mr.base`, `mr.tokens`, `mr.themes`, `mr.components`, `mr.utilities`) et leur ordre ;
- les noms de classes de base `.mr-<composant>` documentés ;
- les points d'entrée et les `exports` de `package.json`.

Tout le reste est interne : les autres primitives, les tokens non documentés, les sélecteurs de parties internes, `src/internal/`. Un contributeur peut les changer sans changement de version majeure, mais ne doit pas les documenter comme stables.

## Règles de semver

- **Majeure** : suppression ou renommage d'un élément public ; changement de l'ordre ou des noms de couches ; retrait d'un thème ; changement incompatible d'une prop ; remontée du plancher de navigateurs.
- **Mineure** : nouveau composant, nouveau token public, nouveau thème, nouvelle prop optionnelle, changement de rendu volontaire et annoncé (couleur, espacement) qui ne casse pas le contrat.
- **Patch** : correction de bug, correction d'accessibilité, correction de contraste qui ne change pas la teinte perçue, correction de documentation.

En cas de doute entre mineure et majeure, la majeure l'emporte. Un changement de valeur d'un token public qui modifie notablement l'apparence est annoncé dans le changelog, même en mineure.

## Dépréciation

1. Annonce : le token ou la prop est marqué déprécié dans la documentation et le changelog, avec le remplaçant et la date prévue de retrait.
2. Période : au moins une version mineure complète avant le retrait. Pour un token, l'ancien nom reste valide et pointe vers la même cible ; on migre les usages, on ne change pas la cible d'un alias.
3. Retrait : uniquement dans une version majeure, avec guide de migration.
4. Aucun code nouveau n'utilise un élément déprécié, dans le dépôt comme dans la documentation.

## Changesets

Chaque changement qui touche le paquet publié ajoute un changeset avec le niveau de version justifié (majeure, mineure, patch) et un texte lisible pour l'utilisateur. Un changeset est préparé pendant le chantier, jamais publié depuis une branche de chantier.

## Règles du paquet publié

Tout ce qui part sur npm fonctionne chez un consommateur qui n'a pas ce monorepo.

- Aucun fichier de `dist/` ne référence un chemin hors du paquet.
- Aucune condition d'export ne pointe vers `./src`, hors la condition `monority-source` réservée au monorepo.
- Le code partagé entre points d'entrée n'est jamais dupliqué (`splitting: true`). Un contexte React n'est défini qu'une fois dans tout le `dist/`.
- La détection de production utilise la forme littérale `process.env.NODE_ENV`, jamais `globalThis`.
- Aucun style global ni nom générique n'est imposé à l'hôte (couches, classes, variables).
- Le CSS publié est inspecté : il contient les couches dans l'ordre, les sept thèmes et l'alias, aucune variable sans définition.
- La taille du `dist/` est rapportée avant publication.

## Navigateurs

Cible : navigateurs évergreen à jour, qui supportent ensemble `@layer`, `oklch()`, `color-mix()`, les propriétés logiques et `:where()`. Aucun navigateur ancien n'est supporté. Le plancher exact (versions minimales) est à fixer par mesure de l'audience réelle avant la première publication (voir `10-decisions.md`).

Règle pour les fonctionnalités récentes : si une fonctionnalité n'est pas garantie sur tout le plancher, une valeur de repli lisible est prévue, jamais une valeur brute de design. Remonter le plancher est un changement majeur.

## Processus de publication

1. Toutes les conditions de la définition de terminé du lot sont remplies ; `pnpm verify`, le build, `test:dist` et les e2e sont verts.
2. Les changesets sont relus pour le niveau de version.
3. Revue par PR, jamais de poussée directe sur `main`.
4. La publication est exécutée par le workflow prévu, depuis `main`, après fusion. Aucun workflow de publication n'est déclenché par une branche de chantier.
5. Le changelog et la documentation publique sont à jour au moment de la fusion.

## Documentation publique

La documentation destinée aux consommateurs couvre : installation, déclaration des couches, sélection du thème, de la marque et de la densité, contrat de surcharge, liste des tokens publics, composants et leurs props. Elle est écrite à partir de ces documents, sans les contredire.
