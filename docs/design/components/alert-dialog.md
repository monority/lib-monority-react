# AlertDialog
Statut : spec v4 — à valider
Source : prompt maître §7.12

## Rôle
Boîte de dialogue d'alerte ou de confirmation critique pour une action irréversible (suppression définitive, rupture de contrat). Choisir `Modal` pour une tâche interactive ordinaire pouvant être fermée passivement.

## Anatomie
`Voile (::backdrop bloquant) → Panneau <dialog role="alertdialog"> → En-tête (label instrument + titre h2 + description small) → Pied (action d'annulation secondaire + action de confirmation principale ou danger)`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | max-inline-size | `--mr-dialog-width-sm` | 400px | 400px |
| md | max-inline-size | `--mr-dialog-width-md` | 540px | 540px |
| toutes | padding panneau | `--mr-spacing-6` | 24px | 24px |
| toutes | border-radius | `--mr-radius-overlay` | 12px | 12px |
| toutes | bordure | `--mr-border-default` | 1px solid | 1px solid |
| toutes | ombre | `--mr-shadow-overlay` | ombre overlay | ombre overlay |
| toutes | voile | `--mr-scrim` | neutre 40 % (light) | noir 60 % (dark) |
| toutes | titre | `--mr-type-h2` | 18px / 24px, 600, sans | 18px / 24px, 600, sans |
| toutes | description | `--mr-type-small` | 13px / 20px, 400, sans | 13px / 20px, 400, sans |
| toutes | écart titre → description | `--mr-spacing-1` | 4px | 4px |
| toutes | écart corps → pied | `--mr-spacing-6` | 24px | 24px |
| toutes | écart entre boutons | `--mr-spacing-2` | 8px | 8px |

## États
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| dialogue critique | ouvert | `--mr-bg-overlay` | `--mr-text-primary` | `--mr-border-default` | voile `--mr-scrim` infranchissable, ombre `--mr-shadow-overlay` |
| dialogue critique | fermeture | `--mr-bg-overlay` | `--mr-text-primary` | `--mr-border-default` | disparition en `--mr-duration-fast` |

## Comportement et clavier
- Ouvert via `.showModal()` sur un élément `<dialog role="alertdialog">` natif.
- **Aucune fermeture au clic sur le voile** : l'utilisateur doit obligatoirement cliquer sur un bouton explicite d'action ou presser `Escape`.
- Touche `Escape` : équivaut à l'action d'annulation, referme la boîte et rend le focus au déclencheur.
- Le focus initial est placé par défaut sur le bouton d'annulation (pour prévenir une confirmation accidentelle lors d'une frappe `Enter` hâtive).
- Action destructive : bouton de confirmation en variante `danger` (`--mr-danger-solid`).
- Apparition : `--mr-duration-slow` (240ms) / `--mr-ease-enter` ; disparition `--mr-duration-fast` (120ms) / `--mr-ease-exit`.

## Accessibilité
- `role="alertdialog"`, `aria-modal="true"`.
- `aria-labelledby` relié au titre h2 ; `aria-describedby` relié au texte d'avertissement.
- Focus piégé nativement dans la boîte.
- Restitution du focus au déclencheur à la fermeture.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `open` | `boolean` | — | état d'ouverture contrôlé (P5) |
| `defaultOpen` | `boolean` | `false` | état initial non contrôlé (P5) |
| `onOpenChange` | `(open: boolean) => void` | — | futur événement DOM `open-change` (P6) |
| `onConfirm` | `() => void` | — | confirmation explicite validée (7.12) |
| `size` | `'sm' \| 'md'` | `'sm'` | largeur de la boîte |
| `destructive` | `boolean` | `false` | action de confirmation en variante `danger` |
| `title` | `ReactNode` | requis | titre h2 de l'alerte |
| `description` | `ReactNode` | requis | description détaillée de l'impact |
| `className` | `string` | — | fusion de classe (P9) |

Le callback `onCancel` est déprécié au profit de `onOpenChange(false)` (7.12).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `onCancel` sur AlertDialog (types / inventory) | `onOpenChange(false)` (7.12, P6) ; `onConfirm` conservé | oui | ligne AlertDialog |
| prop `tone` dans les types | remplacée par `destructive: boolean` (7.12, P1) | oui | ligne AlertDialog |
| portail JavaScript via `createPortal` | élément `<dialog role="alertdialog">` natif (3, C6) | non | section 3 |
| fermeture possible au clic sur le voile dans certains wrappers | clic sur le voile sans effet (7.12) | non (comportement) | section 7.12 |
| recette alert-dialog : 3 valeurs en dur signalées (inventory §2.1) | tokens `--mr-dialog-width-*`, `--mr-spacing-6` (T2) | non | inventory §2.1 |

## Critères de vérification
1. élément racine = `<dialog role="alertdialog">` sans portail.
2. clic sur le voile `::backdrop` n'entraîne aucune fermeture du dialogue.
3. focus initial placé sur le bouton d'annulation (Button secondary).
4. confirmation destructive : bouton de confirmation avec fond `--mr-danger-solid` (`#c52b30` light).
5. dimensions : largeur max = 400px en sm (`--mr-dialog-width-sm`), 540px en md.
6. `border-radius` = 12px (`--mr-radius-overlay`), padding = 24px (`--mr-spacing-6`).
7. titre : police `--mr-type-h2` (18px / 24px, 600 sans).
8. `Escape` déclenche la fermeture sans confirmer l'action.
9. apparition : transition `opacity` et `translateY` sur `--mr-duration-slow` (240ms).

## Interdits
- Jamais de fermeture au clic sur le voile `::backdrop`.
- Jamais de focus initial placé par défaut sur une action destructive (protection contre la validation involontaire).
- Jamais de `createPortal`.
- Pas de confirmation sans demande de validation explicite.
