---
quand: au moment d'ajouter ou de modifier un token, et avant de critiquer un build lent.
---

# Ajouter un token — guide de contribution

Ce guide s'adresse à qui veut ajouter un token au système. Le lire avant
d'écrire le token. Pour la reconstruction en cours, voir `PLAN.md` section
« Reprise ». Pour les mots employés, voir `docs/tokens-glossary.md`. Pour les
pièges qui ont été payés, voir `docs/tokens-pitfalls.md`.

## 1. Vérifier qu'il manque vraiment

Un token se crée parce qu'une valeur est utilisée à plusieurs endroits et qu'elle
doit varier ensemble. Si la valeur n'est utilisée qu'une fois, c'est une variable
locale dans la recette, pas un token.

Mesurer avant de décider :

```bash
node packages/tokens/scripts/measure-pending.mjs
```

Cette commande compte les occurrences pendantes et les tokens distincts. Un token
qui n'a qu'un consommateur ne justifie pas une entrée dans l'échelle.

## 2. Choisir le niveau

Primitif, sémantique ou composant ? Le choix est dans `docs/tokens-glossary.md`.
Le test : un token sémantique doit se calculable dans **tous** les thèmes sans
intervention humaine. S'il faut un cas particulier pour un thème, c'est un token
de composant.

## 3. Vérifier qu'il entre dans une échelle existante

`packages/tokens/categories.json` déclare, par famille, les échelles avec leur
plancher, leur plafond et leur pas (D15). Ajouter une valeur hors échelle
nécessite une décision écrite, pas une valeur dans le CSS.

Une couleur qui n'est pas sur l'échelle des statuts est le cas typique : c'est
pourquoi les teintes de statut sont fixes et non dérivées d'une primitive
(voir l'ADR D19).

## 4. Déclarer la source, pas le résultat

Les sources sont les JSON DTCG de `packages/tokens/src/` : `primitives.json`,
`core.json`, `components.json`, `density.json`, `brand-studio.json`,
`deprecated.json`, et `themes/*.json` pour les overrides.

**Ne jamais modifier `packages/styles/src/tokens/generated/*`.** Le CSS généré
est un artefact ; il est réécrit à chaque build et sa modification sera perdue.
Voir `AGENTS.md` §3.

Reconstruire ensuite :

```bash
pnpm --filter @monority/tokens build:downstream
```

Reconstruire les tokens seuls ne change pas le rendu de l'app : c'est `dist/` que
le site consomme. Vérifier par `getComputedStyle` dans le navigateur, pas dans le
code.

## 5. Écrire la valeur, pas la couleur

Aucune valeur visuelle en dur. Les couleurs sont en OKLCH. Un neutre se construit
depuis `--mr-ref-neutral-hue` et `--mr-ref-neutral-chroma` ; la marque depuis
`--mr-ref-brand-hue` et `--mr-ref-brand-chroma`. Coder une chroma ou une hue
dans un thème neutre est interdit (AGENTS.md §4), et vérifié.

Un token qui dépend de la marque doit rester réévalué sur `[data-brand]`. Le
générateur s'en charge ; ne pas le contourner.

## 6. Valider le contraste

Chaque paire est vérifiée par X2, sur tous les thèmes du disque. Le thème
high-contrast a ses propres seuils et interdit toute régression.

Viser une marge, pas le minimum : environ 3.3 pour un seuil de 3. Un seuil
atteint exactement est un seuil qui Cassera au thème suivant.

Les tokens dont le contrat de contraste n'est pas écrit ne sont pas créés : ils
gagnent le fichier d'écart plutôt que d'être inventés.

## 7. Prouver le test en négatif

Un contrôle qui n'a jamais échoué n'est pas un contrôle. Ajouter la violation,
vérifier que l'étape échoue, puis la défaire. C'est une règle du dépôt
(AGENTS.md §7).

## 8. Preuve de fin

```bash
pnpm verify
```

Aucune autre preuve ne vaut. Vingt-et-une étapes, arrêt au premier échec, code 0.

## Ce que coûte un token

Le coût d'ajout d'un token est faible, son coût de gouvernance ne l'est pas : il
entre dans le cliquet, dans X2, dans l'échelle de sa famille, et il doit rester
synchronisé dans les sept thèmes. La question à poser avant d'en créer un n'est
donc pas « quel est le coût de la ligne ? » mais « qu'est-ce qui change si on
l'exprime avec les tokens qui existent déjà ? ».