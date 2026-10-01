---
quand: pour savoir où va le chantier, quand c'est fini, et comment le valider.
---

# Plan de reconstruction — définition, intégration, sortie, validation

Ce document sert de cadre de fin de chantier. Le lire quand on veut savoir ce
quand il faut pouvoir dire que le chantier est terminé pour déclarer le chantier terminé, comment la branche rejoindra
`main`, comment on vérifiera visuellement que rien n'a régressé, et dans quel
ordre les familles seront reconstruites. Il ne décrit pas l'état d'avancement :
celui-ci est dans `PLAN.md`, section « Reprise ».

## Definition of Done

Le chantier est terminé quand les six conditions sont vraies ensemble. Aucune ne
se compensent.

- **Zéro référence pendante.** Le compte d'occurrences pendantes dans les
  recettes vaut zéro, mesuré par `measure-pending.mjs`. Pas « les tokens
  existent », pas « les plus grossiers sont passés » : zéro.
- **Application rendue.** Les 75 recettes qui référencent un token produisent
  un rendu correct dans les sept thèmes et les trois densités, vérifié par
  `getComputedStyle` dans le navigateur.
- **Contraste audité.** X2 parcourt les sept thèmes et toutes les paires sans
  écart. Cible WCAG 2.2 AA : 4.5:1 pour le texte, 3:1 pour les composants d'interface.
  Pas d'APCA en complément : une seule métrique, deux seuils explicites.
- **Visual regression verte.** L'outil de validation visuelle passe sur le
  périmètre déclaré, avec les seuils fixés ci-dessous.
- **Documentation à jour.** Glossaire, guide d'ajout, pièges connus, specs de
  composants et conventions reflètent l'état réel. Aucun écart ouvert non
  consigné.
- **Annotations de listes e2e relues.** Toute annotation `mr-theme-subset:` dont la
  raison cite 11b1 est devenue fausse en fin de 11b1 : la relecture de ces
  annotations fait partie de la Definition of Done. Aucun mécanisme automatique
  pour l'instant.
- **CI verte.** Sur la branche de travail, la chaîne complète passe. Le chantier
  ne se déclare pas terminé sur une CI locale qui n'a pas été relue.

## Stratégie d'intégration avec `main`

`origin/main` est à `b9b98d8` depuis le début du chantier. La branche de travail
ne s'ouvre jamais en PR technique : l'application est volontairement sans tokens
pendant toute la reconstruction, et la fusionner casserait le site.

L'intégration se fera par **rebase périodique de la branche sur `main`**, pas par
merge, pour garder l'historique linéaire et rendre chaque commit de famille
rejouable.

La fréquence se décide sur un écart mesuré, pas sur un calendrier : à chaque
rapport, on mesure le nombre de commits dont `main` a bougé depuis le dernier
rebase. Sous dix commits de divergence, le rebase est indolore. Au-delà, on
signale que le rebase devient risqué et on demande un arbitrage.

**Qui résout :** la session qui constate la divergence, qui mesure l'écart et
qui applique le rebase. Un conflit sur les recettes ou les tokens n'est jamais
résolu silencieusement : il se signale, parce qu'un conflit dans une recette
signifie que `main` a touché à la même surface que la reconstruction.

Un rebase n'est jamais l'occasion d'une autre tâche. Reprise du chantier d'abord,
correction de conflit seulement.

## Plan de sortie

Six paliers, dans cet ordre. Chaque palier se termine par une preuve, pas par une
intention.

1. **Fondations** — 11b1 : les familles `bg`, `text`, `border`, `accent`,
   `status`. Trente-deux tokens si les huit ajouts sont validés, vingt sinon.
2. **Géométrie** — 11b2 : `--mr-ref-radius-scale`, `--mr-border-width`, et
   l'interposition des lectures directes de l'échelle de rayon, qui bloque la
   reconstruction des composants.
3. **Typographie** — 11b3 : tailles `--mr-text-*`, et passage du bandeau à un
   poids de 600.
4. **Mouvement** — 11b4 : durées et courbes, bloc `reduced-motion` complété.
5. **Nettoyage** — 0.7 : registre local-tokens, 226 entrées, traitées par lots.
   Appareil déprécié jeté en 11z.
6. **Clôture** — intégration, validation visuelle, Definition of Done.

L'ordre n'est pas négociable : chaque palier conditionne le suivant. Une famille
qui n'a pas de fondations ne se reconstruit pas sur des valeurs jetables.

## Plan de validation visuelle

**Outil.** Playwright, déjà présent pour les e2e. Pas d'outil supplémentaire :
un second moteur de capture, et donc deux systèmes à maintenir et un diff à
expliquer deux fois.

**Périmètre.** Les 75 recettes qui référencent un token, sur les sept thèmes, les
trois densités, et les états observables : repos, survol, focus, actif, désactivé,
invalide, chargement. C'est large. Il se réduit en deux passes : d'abord les
composants de structure sur les sept thèmes, puis les états sur deux thèmes
extrêmes et le thème high-contrast.

**Seuils.** Une régression est un écart de couleur supérieur à une perceptible, ou
un décalage de géométrie supérieur à 1 pixel. En deçà, le bruit d'anti alias
domine et le seuil produit des faux positifs.

**Capturer l'ancien rendu.** L'historique git contient le rendu d'avant la table
rase. Il est récupérable : les commits précédant la suppression des 280 tokens
contiennent le CSS et les thèmes complets. Le plan est de les extraire dans une
branche de référence, de les capturer avec le même script Playwright, et de
comparer les deux dans les mêmes conditions.

C'est une **décision de principe, pas un outillage livré** : rien de tout cela
n'est écrit tant que le chantier n'est pas proche de sa fin. Le faire maintenant
produirait un outil qui compare des applications qui ne se ressemblent plus, et
qui n'aurait plus de valeur au moment de la comparaison.

**Règle de rendu.** Aucun changement d'apparence sans annonce. La reconstruction
est un chantier qui change tout, c'est son objet ; mais un changement **non
prévu** dans une famille donnée se montre avant-après et attend validation.