# Chantier base CSS saine — Monority UI

Methode : nettoyage complet d'abord, fondation ensuite, composants un par un
avec validation humaine. Branche `refactor/css-foundation`, base
`origin/main` a `b7b460a`. Archive `archive/tokens-json-d899d22`, consultable
par `git show archive/tokens-json-d899d22:<chemin>`. Recoltes hors depot :
`Temp/css-foundation-harvest/synthese.md` (440 valeurs, ne plus relire
l'historique) et `Temp/cssf-inventory/inventaire.md` (ordre de la Phase 3).

## Phase 1 — nettoyage (faite)
Controles supprimes (b6bc0fe, 1310 lignes), generateur et JSON supprimes
(41c888e, 5494 lignes), CSS genere supprime (86062e4, 982 lignes),
76 recettes supprimees (0995467, 7387 lignes), references tokens et items
d'ancien chantier supprimes (ce commit). Sortie : aucun nom d'ancien systeme
dans le code, build vert, verify reduit vert, application non stylee.
Verify reduit : typecheck, lint JS/TS, format, build, tests unitaires.

## Phase 2 — fondation, un petit groupe coherent par commit
layers.css avec l'ordre declare une fois, reset.css scope mr-* en :where(),
base/ un fichier par sujet, tokens/ref.css puis tokens/semantic.css depuis
la synthese sans redessiner, un commit par theme (7 themes puis alias dim),
Stylelint 3 regles puis test de contraste prouves en negatif d'abord,
pnpm verify reconstruit a 8 etapes au plus. Tokens semantiques de base
autorises d'avance, le reste nait avec son premier consommateur mesure.
Sortie : demo de couches verifiee une fois au navigateur, resultat note.

## Phase 3 — un composant a la fois, Button en premier
Ordre dans inventaire.md. Par composant : annonce 3 lignes, recette en couche
mr.components, tokens crees seulement avec consommateur reel, verify vert,
page harness avec variantes et etats pour light, dark et high-contrast,
captures en Temp sans toucher aux snapshots, commit local sans push, rapport
court, arret jusqu'au message valide. Spec et ancienne recette qui divergent :
signale dans le rapport au lieu de choisir seul.

## Regles
Stager par liste de chemins, jamais `git add .`. Message par `git commit -F`,
Conventional Commits en français. Verify avant chaque commit. Push apres
chaque commit vert sauf en Phase 3 (commit local, push au valide). Jamais sur
`main`, aucune PR avant la Definition of Done. Prose et puces, aucun tableau.

## Reprise
Phase 1 terminee, 5 commits de suppression verts et pousses. Worktree :
`C:/Dev/Projects/lib-monority-react-css-foundation`. dist/index.css a
4595 octets, application non stylee, attendu. Connu : specs e2e
theme-runtime et theme-subtree lisent resolved.json supprime, a reecrire en
Phase 2 ; gabarit du generateur emet encore l'ancien namespace, a jour en
Phase 2 ; ligne build:downstream de AGENTS.md en l'etat jusqu'en Phase 2 ;
mentions historiques en .md d'archives conservees telles quelles.
Prochain : ecrire layers.css, premier commit de la Phase 2.
Verify de transition : 5 etapes (typecheck, lint, format, build, tests).
Les 8 etapes finales sont reconstruites en Phase 2, voir AGENTS.md section 7.
