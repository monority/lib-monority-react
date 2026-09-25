# DataTable
Statut : spec v4 — à valider
Source : prompt maître §7.15

## Rôle
Tableau de données interactif complet intégrant le tri multi-colonnes, la sélection par case à cocher, la pagination et les états de données (chargement, vide, erreur). Choisir `Table` pour un tableau simple en lecture seule.

## Anatomie
`[Barre de filtres / recherche optionnelle] → Table (avec colonne Checkbox de sélection et boutons de tri d'en-tête) → Pied avec Pagination (IconButton précédent/suivant + numéros de page)`.

## Dimensions
Identiques à `Table` (7.15) pour la grille, plus les dimensions de contrôle associées :

| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | hauteur en-tête | `--mr-table-head-height` | 32px | 28px |
| toutes | hauteur de ligne | `--mr-table-row-height` | 40px | 32px |
| toutes | padding-inline cellules | `--mr-table-cell-padding-inline` | 12px | 8px |
| toutes | case à cocher sélection | `--mr-checkbox-size-md` | 16px | 16px |
| toutes | icône de tri | `--mr-icon-size-sm` | 16px | 16px |
| toutes | rail ligne sélectionnée | `--mr-rail-width` | 2px | 2px |
| toutes | hauteur état vide | `--mr-table-empty-height` | 120px | 120px |
| toutes | boutons de pagination | `--mr-control-size-sm` | 32px | 28px |

## États
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| en-tête triable | repos | `--mr-bg-sunken` | `--mr-text-tertiary` | bordure inférieure `--mr-border-subtle` | icône de tri discrète |
| en-tête triable | survol | `--mr-bg-hover` | `--mr-text-primary` | bordure inférieure `--mr-border-subtle` | icône de tri mise en valeur |
| en-tête trié | actif | `--mr-bg-sunken` | `--mr-text-primary` | bordure inférieure `--mr-border-subtle` | icône orientée (asc/desc), `aria-sort` |
| ligne | sélectionnée repos | `--mr-bg-hover` | `--mr-text-primary` | bordure inférieure `--mr-border-subtle` | rail gauche 2px `--mr-accent`, Checkbox cochée |
| ligne | sélectionnée survol | `--mr-bg-hover` | `--mr-text-primary` | bordure inférieure `--mr-border-subtle` | rail gauche 2px `--mr-accent` |
| état chargement | loading | transparent | — | — | 3 lignes de Skeleton, `aria-busy="true"` |
| état vide | empty | transparent | `--mr-text-secondary` | — | hauteur 120px, centré |
| état erreur | error | transparent | `--mr-danger-text` | — | message d'erreur + bouton Réessayer |

## Comportement et clavier
- Tri : clic sur l'en-tête de colonne (ou frappe `Enter` / `Espace`) inverse l'ordre de tri et émet `onSortChange({ key, direction })`.
- Sélection : la première colonne contient une Checkbox de sélection unitaire ; l'en-tête contient une Checkbox de sélection globale (gère l'état `indeterminate`).
- Ligne sélectionnée : l'activation émet `onSelectionChange(selectedIds)`.
- Pagination intégrée : boutons précédent/suivant et numéros de page en Button ghost sm avec rail inférieur sur la page active.
- Défilement horizontal interne propre si la table excède la largeur du conteneur.

## Accessibilité
- `aria-sort="ascending | descending | none"` sur les en-têtes triables.
- Checkbox de sélection globale avec `aria-label="Tout sélectionner"`.
- Checkbox de ligne avec `aria-label="Sélectionner la ligne N"`.
- Lignes sélectionnées : `aria-selected="true | false"`.
- Pagination avec `aria-label="Pagination"` et `aria-current="page"` sur la page courante.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `columns` | `Array<DataTableColumn>` | requis | configuration des colonnes |
| `rows` | `any[]` | requis | données |
| `getRowId` | `(row: any) => string` | requis | clé unique de chaque ligne |
| `selectedRowIds` | `string[]` | — | lignes sélectionnées (P5) |
| `onSelectionChange` | `(ids: string[]) => void` | — | futur événement DOM `selection-change` (P6) |
| `sort` | `{ key: string, direction: 'asc' \| 'desc' }` | — | tri courant |
| `onSortChange` | `(sort: SortState) => void` | — | futur événement DOM `sort-change` (P6) |
| `page` | `number` | `1` | page active |
| `pageCount` | `number` | — | nombre total de pages |
| `onPageChange` | `(page: number) => void` | — | futur événement DOM `page-change` (P6) |
| `state` | `'ready' \| 'loading' \| 'empty' \| 'error'` | `'ready'` | état global |
| `onRetry` | `() => void` | — | rappel après erreur |
| `className` | `string` | — | fusion de classe (P9) |

Le callback `onSelectedRowIdsChange` est déprécié au profit de `onSelectionChange` (7.15, P6).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `onSelectedRowIdsChange` (types / inventory) | renommé `onSelectionChange` (7.15, P6) | oui | ligne DataTable |
| ligne sélectionnée en fond d'accent | rail gauche 2px `--mr-accent` + fond `bg-hover` (signature, section 4) | non (visuel) | section 4 |
| en-tête non mono dans certaines colonnes | style `--mr-type-label` (11px mono 500 majuscules, 7.15) | non (visuel) | section 7.15 |
| recette data-table : 5 valeurs en dur signalées (inventory §2.1) | tokens `--mr-table-head-height`, `--mr-table-row-height`, etc. (T2) | non | inventory §2.1 |

## Critères de vérification
1. en-tête triable : bouton avec icône 16px, émet `onSortChange` et bascule `aria-sort`.
2. Checkbox en première colonne pour la sélection par ligne.
3. Checkbox d'en-tête indéterminée si sélection partielle (`indeterminate={true}`).
4. ligne sélectionnée : pseudo-élément rail gauche de 2px en `--mr-accent`, fond `--mr-bg-hover`.
5. état chargement : 3 rangées de Skeleton avec conteneur `aria-busy="true"`.
6. état erreur : message `--mr-danger-text` accompagné d'un bouton secondaire de réessai.
7. pagination intégrée avec page courante dotée de `aria-current="page"` et rail d'accent inférieur.
8. alignement : nombres à droite avec `tabular-nums`, texte à gauche, statuts en Badge sm.
9. défilement horizontal sans overflow global de page.

## Interdits
- Jamais de fond accent saturé sur une ligne sélectionnée.
- Jamais de pagination sans numérotation tabulaire.
- Jamais de tri sans mise à jour immédiate de `aria-sort`.
- Pas de perte de sélection lors d'un changement de tri si les lignes restent identifiables via `getRowId`.
