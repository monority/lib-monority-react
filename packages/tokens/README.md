# @monority/tokens

Source de vérité des tokens (DTCG) de Monority UI. Ce package ne produit que du
JSON et deux fichiers CSS générés ; **toute correction se fait ici**, jamais dans
`packages/styles/src/tokens/generated/`.

## Ordre de build (important)

```
packages/tokens/src/*.json          <- source
        │  pnpm --filter @monority/tokens build
        ▼
packages/styles/src/tokens/generated/{tokens,deprecated}.css
        │  pnpm --filter @monority/ui build      (tsup)
        ▼
packages/ui/dist/index.css          <- ce que consomme apps/web
        │  pnpm --filter @monority/web build
        ▼
apps/web/dist
```

### Le piège

`apps/web` **ne lit pas** `packages/styles/src/tokens/generated/`. Il consomme
`@monority/ui`, dont le CSS est embarqué dans `packages/ui/dist/index.css` par
`tsup` au moment du build.

Conséquence : `pnpm --filter @monority/tokens build` seul régénère bien les
CSS, **sans aucun changement de rendu** — le bundle continue de servir
l'ancienne version, silencieusement. C'est ce qui a produit des captures
« avant/après » identiques lors du travail sur le rebranding des rayons.

### Les deux garde-fous

| Commande | Effet |
|---|---|
| `pnpm --filter @monority/tokens build:downstream` | tokens **puis** `@monority/ui` — le bundle consommé est à jour |
| `pnpm --filter @monority/tokens build:downstream:web` | idem + `apps/web/dist` (pour les captures Playwright) |

Le contrôle **T7** (`scripts/check-dist-freshness.mjs`, branché sur `pnpm test`)
échoue si `packages/ui/dist/index.css` est plus ancien que les CSS générés. Il
passe automatiquement dès que `build:downstream` a été lancé.

> Règle pratique : après toute modification de token, lancer
> `build:downstream`. Avant de conclure qu'un changement « n'a aucun effet »,
> vérifier `getComputedStyle` dans le navigateur.

## Contrôles

| ID | Script | Rôle |
|---|---|---|
| T1 | `check-equivalence.mjs` | CSS généré ≡ référence de documentation |
| T3 | `check-no-hardcoded.mjs` | aucun hex / teinte en dur hors statut |
| T6 | `check-deprecated.mjs` | tout `var(--mr-*)` utilisé est défini ; `--warn` rapporte les usages de `--mr-space-*` (échelle dépréciée, migration en cours) |
| T7 | `check-dist-freshness.mjs` | le bundle CSS consommé n'est pas périmé |
| T8 | `check-opaque-control-bgs.mjs` | les 9 contrôles à bordure ont un fond opaque (sinon la bordure au repos n'a pas de fond stable pour être mesurée) |
| S11 | `check-spec-values.mjs` | les valeurs des tables de spec correspondent aux tokens résolus |
| X2 | `check-contrasts.mjs` | contraste WCAG 2.1 sur toutes les paires (seuils AA / HC) |

`pnpm --filter @monority/tokens test` enchaîne build + T1 + T3 + T6 + X2 + S11 + T7 + T8.

## Ajouter un token

1. Déclarer la feuille dans `src/` (`primitives`, `core`, `components`, `density`,
   `brand-studio` ou `themes/<theme>.json`).
2. Les couleurs portent une extension `com.monority.oklch` ; le générateur émet
   la formule CSS à partir d'elle :
   - `"h": "neutral"` → `var(--mr-neutral-hue)`
   - `"c": "neutral"` → `var(--mr-neutral-chroma)` (0 par défaut)
   - `"h": "brand"` → `var(--mr-brand-hue)` ; `"c": {"factor": f}` →
     `calc(var(--mr-brand-chroma) * f)`
3. Régénérer, puis **synchroniser la référence** :
   `docs/design/reference/monority-ui-tokens.reference.css` (T1 échoue sinon).
4. Si le token consomme une variable de marque (`--mr-brand-*`,
   `--mr-neutral-*`) ou un token de thème, le générateur le redéclare
   automatiquement sous `[data-brand]` : une custom property contenant `var()`
   est figée là où elle est déclarée, donc un sous-arbre de marque sans
   `data-theme` hériterait sinon la valeur de l'ancêtre.
5. Vérifier le contraste si c'est une couleur (X2) et `pnpm test`.
