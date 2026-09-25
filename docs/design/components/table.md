# Table
Statut : spec v4 — à valider
Source : prompt maître §7.15

## Rôle
Affichage tabulaire de données structurées en lignes et colonnes avec alignement strict des types de données. Choisir `DataTable` pour un tableau enrichi de tri, sélection et pagination, `DataList` pour des paires clé/valeur simples.

## Anatomie
`Conteneur défilant horizontalement → <table> → En-tête <thead> (cellules label instrument) → Corps <tbody> (lignes de données) → [Ligne sélectionnée avec rail gauche]`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | hauteur en-tête | `--mr-table-head-height` | 32px | 28px |
| toutes | hauteur de ligne | `--mr-table-row-height` | 40px | 32px |
| toutes | padding-inline cellules | `--mr-table-cell-padding-inline` | 12px | 8px |
| toutes | police en-tête | `--mr-type-label` | 11px / 16px, 500, mono | 11px / 16px, 500, mono |
| comfortable | police cellules | `--mr-type-body` | 14px / 20px, 400, sans | — |
| compact | police cellules | `--mr-type-small` | — | 13px / 20px, 400, sans |
| toutes | identifiants | `--mr-type-code` | 13px / 20px, 400, mono | 13px / 20px, 400, mono |
| toutes | chiffres numériques | `font-variant-numeric: tabular-nums` | tabular-nums | tabular-nums |
| toutes | rail ligne sélectionnée | `--mr-rail-width` | 2px | 2px |
| toutes | hauteur état vide | `--mr-table-empty-height` | 120px | 120px |
| toutes | bordure séparatrice | `--mr-border-width` | 1px | 1px |

Alignements stricts : texte à gauche, identifiants mono à gauche, nombres à droite en `tabular-nums`, statuts en Badge sm, actions en IconButton ghost sm à droite.

## États
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| en-tête | repos | `--mr-bg-sunken` | `--mr-text-tertiary` | bordure inférieure `--mr-border-subtle` | style label mono |
| ligne | repos | transparent | `--mr-text-primary` | bordure inférieure `--mr-border-subtle` | dernière ligne sans bordure |
| ligne | survol | `--mr-bg-hover` | `--mr-text-primary` | bordure inférieure `--mr-border-subtle` | survol sur toute la ligne |
| ligne | sélectionnée repos | `--mr-bg-hover` | `--mr-text-primary` | bordure inférieure `--mr-border-subtle` | rail gauche 2px `--mr-accent` par pseudo-élément |
| ligne | sélectionnée survol | `--mr-bg-hover` | `--mr-text-primary` | bordure inférieure `--mr-border-subtle` | rail gauche 2px `--mr-accent` |
| état vide | ready | transparent | `--mr-text-secondary` | — | hauteur min 120px, centré |
| chargement | loading | transparent | — | — | 3 lignes de Skeleton pulsant |
| erreur | error | transparent | `--mr-danger-text` | — | message + Button secondary sm |

## Comportement et clavier
- Conteneur avec défilement horizontal propre (`overflow-x: auto`) sans défilement de toute la page.
- Survol de ligne actif sous `@media (hover: hover) and (pointer: fine)`.
- Si interactive ou sélectionnable : ligne sélectionnée signalée par son rail gauche d'accent et fond `bg-hover`.
- Tri de colonne : bouton d'en-tête activable via `Enter` ou `Espace`, met à jour l'icône et l'attribut `aria-sort`.

## Accessibilité
- `<table>` sémantique native avec `<thead>`, `<tbody>`, `<th>`, `<td>`.
- En-tête : `scope="col"`, `aria-sort="ascending | descending | none"` sur les colonnes triables.
- Ligne sélectionnée : `aria-selected="true | false"`.
- Nombres : `font-variant-numeric: tabular-nums` pour l'alignement vertical des chiffres.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `columns` | `Array<{ key: string, header: ReactNode, align?: 'left' \| 'right' \| 'center', kind?: 'text' \| 'id' \| 'number' \| 'status' \| 'actions', sortable?: boolean, render?: (value: any, row: any) => ReactNode }>` | requis | configuration des colonnes (P2) |
| `rows` | `any[]` | requis | données des lignes (P2) |
| `getRowId` | `(row: any) => string` | — | identifiant unique de ligne |
| `state` | `'ready' \| 'loading' \| 'empty' \| 'error'` | `'ready'` | état global du tableau (C3) |
| `onRetry` | `() => void` | — | rappel en cas d'erreur pour recharger |
| `className` | `string` | — | fusion de classe (P9) |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| ligne sélectionnée en fond teinté complet | rail gauche 2px `--mr-accent` + fond `bg-hover` (signature, section 4, 7.15) | non (visuel) | section 4 |
| en-tête avec typographie variable | style `--mr-type-label` (11px mono 500 majuscules, 7.15) | non (visuel) | section 7.15 |
| recette table : 2 valeurs en dur signalées (inventory §2.1) | tokens `--mr-table-head-height`, `--mr-table-row-height`, `--mr-table-cell-padding-inline` (T2) | non | inventory §2.1 |

## Critères de vérification
1. en-tête : `block-size` = 32px en comfortable, 28px en compact (`--mr-table-head-height`), fond `--mr-bg-sunken` (`#f1f5f6` light).
2. en-tête cellules : police mono, taille = 11px, graisse = 500, texte en majuscules (`--mr-type-label`), couleur `--mr-text-tertiary`.
3. ligne : `block-size` = 40px en comfortable, 32px en compact (`--mr-table-row-height`), bordure 1px solid `--mr-border-subtle`.
4. survol de ligne : fond = `--mr-bg-hover` (`#e8eef0` light).
5. ligne sélectionnée : pseudo-élément rail gauche `inline-size` = 2px, fond `--mr-accent` (`#07787d` light).
6. alignement numérique : cellules `kind="number"` alignées à droite avec `tabular-nums`.
7. état vide : `block-size` = 120px (`--mr-table-empty-height`).
8. état chargement : 3 lignes de Skeleton pulsantes avec conteneur `aria-busy="true"`.
9. padding horizontal de cellule : 12px en comfortable, 8px en compact (`--mr-table-cell-padding-inline`).

## Interdits
- Jamais d'aplat d'accent en fond de ligne sélectionnée (rail gauche obligatoire, section 4).
- Jamais de chiffres sans `tabular-nums`.
- Jamais de scroll horizontal de page causé par la table (défilement interne obligatoire).
- Pas d'en-tête sans bordure inférieure séparatrice.
