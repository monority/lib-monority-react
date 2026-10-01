# Migrations

Correspondance entre l'état précédent et l'état courant du système de tokens. Une entrée par changement de rupture.

Le paquet n'a jamais été publié sur npm : aucun de ces changements ne cherche à préserver une compatibilité de version antérieure. Les anciens noms sont **supprimés**, pas dépréciés (D9).

## D11 — Préfixe `--mr-ref-*` sur les primitives

Raison : le ROADMAP §5.2 exige un nom conforme par catégorie, et `neutral-hue`, `neutral-chroma`, `font-sans` et `font-mono` échouaient. Le préfixe distingue aussi les trois niveaux du système à l'œil : primitif, sémantique, composant.

Portée : 154 occurrences dans 78 fichiers. Application le 2026-10-01, commit `4d0b1a2`.

| Ancien nom | Nouveau nom | Consommateurs | Rôle |
|---|---|---|---|
| `--mr-brand-hue` | `--mr-ref-brand-hue` | `design-config.ts`, `get-theme-script.ts`, e2e `design-customizer` et `theme-subtree`, thème studio | Teinte de la marque |
| `--mr-brand-chroma` | `--mr-ref-brand-chroma` | idem | Chroma de la marque |
| `--mr-neutral-hue` | `--mr-ref-neutral-hue` | base CSS, T3 | Teinte des neutres |
| `--mr-neutral-chroma` | `--mr-ref-neutral-chroma` | base CSS, T3 | Chroma des neutres |
| `--mr-font-sans` | `--mr-ref-font-sans` | `base/root.css`, `base/typography.css`, CSS de l'app | Police sans empattement |
| `--mr-font-mono` | `--mr-ref-font-mono` | 4 recettes, CSS de l'app | Police à chasse fixe |
| `--mr-radius-scale` | `--mr-ref-radius-scale` | 52 recettes | Facteur d'échelle des rayons |

Action requise pour un consommateur qui surcharge la marque :

```css
/* avant */ :root { --mr-brand-hue: 295; }
/* après */ :root { --mr-ref-brand-hue: 295; }
```

## Table rase du système de tokens

Raison : décision D11 du 2026-10-01, confirmée après que l'inventaire eut montré trois vocabulaires concurrents et 109 « orphelins » dont 70 définis par `language.md`.

Portée : 280 tokens ramenés à 7 primitives, **−3372 lignes** de sources DTCG. Commits `41aa61d` et `f370ea4`.

Il n'y a pas de table de correspondance : le système précédent n'a jamais été publié, donc personne n'en dépend. Les recettes ont été volontairement laissées dans l'état : elles référencent 3291 tokens pendants, reconstruits famille par famille dans les phases 11b1 à 11b5.

## Archives volontairement non migrées

Deux fichiers décrivent un état historique et conservent les anciens noms. Les renommer falsifierait l'archive ; ils sont déclarés dans `packages/tokens/audit-exclusions.json` et exclus des audits.

- `docs/design/audit/migration-table.md` — table de correspondance de la migration de 5a.
- `docs/design/reference/prompt-maitre-v4.md` — prompt maître d'origine du projet.

La preuve que cette exclusion est réelle et non une convention orale est produite par `pnpm audit:scope`.