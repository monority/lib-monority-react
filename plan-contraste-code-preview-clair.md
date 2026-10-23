# Plan — Contraste de la preview de code en theme clair

Report : "Il y a un probleme de contraste des couleurs sur la preview code en light mode." Cible : rendre le contraste coherent et conforme WCAG AA en theme clair, sans casser le theme sombre.

## Cause racine

- `apps/web/src/shared/components/CodeViewer/CodeBlock.tsx` chargeait la feuille vendeur `highlight.js/styles/github-dark.css`.
- Cette feuille pose des couleurs claires (#c9d1d9, #7ee787, #f2cc60, #ffa657, #aff5b4, #ffdcd7) sur les classes hljs : theme sombre suppose.
- `code-theme.css` ne couvrait pas toutes ces classes. Les classes non couvertes (`subst`, `quote`, `symbol`, `bullet`, `doctag`, `emphasis`, `strong`, `addition`, `deletion`, `variable.language_`, `attribute`, `regexp`, `selector-attr`, `code`, `formula`) restaient aux couleurs vendeur claires sur fond `--mr-bg-surface` blanc : ratios mesures 1,4:1 a 3,1:1, sous le seuil AA 4,5:1.

## Dead code trouve au passage

- `code-theme.css` : fallback `var(--mr-accent)` indefini (aucune definition de `--mr-accent` dans la fondation).
- `code-theme.css` : fond `hljs-addition` lie a `var(--mr-success)`, indefini.
- `apps/web/src/features/docs/index.css` : variables `--mr-code-*` lues nulle part dans les recettes.
- `apps/web/src/features/docs/index.css` : bloc `:root[data-theme='dark'] .docs-layout` strictement identique aux valeurs par defaut.
- `PreCode.docs.tsx` : tokens inexistants cites (`--mr-font-mono`, `--mr-bg-surface-strong`, `--mr-code-*`) et hooks BEM `--sm/--md/--wrap` supprimes de la recette.

## Changements retenus

1. Supprimer l'import vendeur dans `CodeBlock.tsx` : `code-theme.css` devient l'unique source de verite pour la syntaxe.
2. Reecrire `code-theme.css` : fallbacks valides mirrors des tokens docs, couverture complete des classes hljs emises pour les trois langages enregistres (bash, tsx, xml), `display: block` repris de la feuille vendeur, couleurs addition/deletion sur fonds teintes 12%.
3. `docs/index.css` : supprimer `--mr-code-*` et le bloc dark redondant.
4. `PreCode.docs.tsx` : aligner la liste de tokens et les cssHooks sur la recette reelle.

## Validation

- Tests cibles : `docs-shell.test.ts` (8/8), `PreCode.test.tsx` (7/7).
- `pnpm typecheck` vert, `biome check` propre sur les fichiers touches, `pnpm lint:css` propre.
- Verification navigateur (O6) : script Playwright jetable, page docs en `data-theme="light"`, `getComputedStyle` sur `code.hljs` et les classes hljs, passage au parseur `tooling/rendered/common.js`, exigence >= 4,5:1 pour tout texte, sanity check de non-regression en theme sombre.
- S'assurer qu'aucune classe hljs equipee par les langues enregistrees ne resout une couleur non couverte.

## Hors sujet signale, non fait

- La query docs cible `.mr-pre-code`, composant bibliotheque : la couleur de syntaxe reste une decision du site de docs, pas un token publie. A reevaluer si un consommateur npm veut la meme palette.

## Prochaine action

Verification navigateur puis commit unique `fix(docs): contraste syntaxe code theme clair` via `git commit -F fichier`.
