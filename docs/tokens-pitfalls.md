---
quand: après le point 1 de la reprise 2026-10-01, pour qui décide où va un token.
---

# Pièges connus — refonte du système de tokens

Ce fichier s'adresse à l'auteur d'un token ou d'un contrôle de conformité dans
le chantier en cours. Le lire avant d'écrire un script, un test ou un token. Il
ne décrit pas l'état du chantier : celui-ci est dans `PLAN.md`, section
« Reprise », et dans `DECISIONS.md`.

Chaque piège a été payé. Aucun n'est théorique.

## Un scan qui cherche un motif d'écriture est aveugle aux autres formes

Chercher `themes = [` ne trouve que les listes déclarées ainsi. Un nom de thème
cité dans une chaîne de template, un attribut `data-theme="dark"`, une boucle
`for…of`, un `describe.each`, ou une constante partagée échappent tous au motif.

Ce piège a produit deux erreurs de mesure réelles. Un décompte de « 4 specs e2e
portant une liste de thèmes » était faux : le re-scan élargi en trouve 10
fichiers. Un audit de thèmes en oubliait un, `slate.json`, parce que le fichier
était suivi par git et matchait le glob, mais que trois listes en dur
l'ignoraient. **Chercher un motif d'écriture n'est pas mesurer un fait.**

Le scan correct pose une question de contenu, pas de forme : quels fichiers
contiennent au moins deux noms de thèmes, quelles que soient la syntaxe.

## Un glob et une liste en dur divergent en silence

Rien ne signale la divergence. Le code compile, les tests passent, et un fichier
de thème peut être invisible pendant des sessions.

La parade : une seule source, ou un test qui compare les deux et nomme le
fichier fautif. C'est le test de parité.

## Un contrôle qui itère une liste fixe est aveugle aux ajouts

X2 parcourait six thèmes alors que le disque en contenait sept. La vérification
passait au vert sur un périmètre faux. La parade est identique : itérer le glob,
et tester le test en négatif.

## Deux mesures d'unités différentes ne se comparent pas

Le chantier a comparé « 3291 » et « 2241 » comme s'il s'agissait de la même
grandeur. Ce sont deux périmètres : l'ancien comptait autre chose. Un nombre sans
unité explicite est un nombre qu'on ne peut pas comparer. La référence est fixée
en D24 : occurrences pendantes dans les recettes.

## Un détecteur de source ne voit pas une liste encodée dans une chaîne

`get-theme-script.ts` plaçait ses sept noms de thèmes à l'intérieur d'une chaîne
de template interpolée. Une analyse par expression régulière portant sur les
identifiants n'en voyait aucun. Le fichier « n'avait pas de liste de thèmes ».

## Une dépendance de workspace n'est pas importable sans point d'entrée

`@monority/tokens` est `private: true`, sans `main` ni `exports`. Les specs e2e
ne peuvent pas importer la liste des thèmes : la parité est portée par un test,
pas par un import. Ouvrir un `exports` sur du code de build serait un couplage
injustifié, payé par le package le plus proche du bas de la chaîne.

## Stylelint 16 : deux surprises de la règle `custom-property-pattern`

Le motif matche le nom **sans** le préfixe `--`. Et il n'utilise que le
**premier groupe capturant** de la regex : les suivants sont ignorés, en
silence. Une règle écrite avec trois groupes n'en teste qu'un.

## Un module ESM qui exécute son CLI à l'import tue le runner

Le CLI s'exécute à l'import, appelle `process.exit`, et le runner de tests meurt
avec lui, sans message utile. Isoler derrière :

```js
if (process.argv[1] === fileURLToPath(import.meta.url)) {
```

## `it.skip` en dur survit à la suppression du verrou

Un test neutralisé à la main reste muet à la fin du chantier, et personne ne le
sait. Passer par `duringRebuild(it)` de `apps/web/src/lib/rebuild-lock.ts`, qui
relie l'oubli à `rebuild.json`.

## `git ls-files` ignore les fichiers non suivis

Un `skip` déclaré dans un fichier non suivi n'apparaît pas dans l'inventaire,
et le registre des tests neutralisés ne peut pas le voir. Corollaire : les
commentaires d'explication placés avant un skip mentionnent `it(` et faussent
l'appariement au registre.

## Ne jamais modifier `PLAN.md` pour tester une garde

Le fichier est lu par le test lui-même. Le modifier pour le faire échouer prouve
que le test lit le fichier, pas qu'il détecte la violation. Utiliser la fixture
`packages/tokens/scripts/fixtures/test-skips/plan.completed.md`.

## Une ligne de sortie de grep n'est pas un bloc CSS

`[data-theme="dim"]` occupait sa propre ligne dans le CSS généré, groupé avec
`[data-theme="dark"]` par la virgule en fin de ligne précédente. Lu ligne à
ligne, cela ressemble à un bloc autonome vide, donc à un défaut. Ce n'en était pas
un : le défaut était dans la lecture.

Quand une anomalie visuelle apparaît dans un fichier généré, ouvrir le fichier.

## Un chemin calculé à la racine peut être faux d'un cran

Le test d'alias calculait `repoRoot` avec `../../..` depuis
`packages/tokens/scripts/lib/`, ce qui donne `packages/`, pas la racine. Le
`ENOENT` ne le disait pas : le test échouait sur l'assertion suivante, donc la
cause paraissait être la logique. Vérifier le chemin avant de douter de la
logique.

## Un octet de contrôle dans un fichier commité le rend binaire

Un octet NUL écrit à la place d'un backtick rend `DECISIONS.md` illisible par
`git grep`, qui le signale « binary file matches ». Aucun diff, aucun motif, plus
de contrôle par expression régulière sur le fichier.

Vérifier avant de commiter :

```bash
node -e "const b=require('fs').readFileSync('DECISIONS.md');let n=0;for(const c of b){if(c<9||(c>13&&c<32)||c===127)n++};console.log(n)"
```

La réponse doit être `0`.