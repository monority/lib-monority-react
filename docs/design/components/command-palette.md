# CommandPalette
Statut : spec v4 — à valider
Source : prompt maître §7.12

## Rôle
Palette de commande globale (recherche rapide, navigation et raccourcis d'action) déclenchée généralement par Ctrl+K / Cmd+K. Choisir `Combobox` pour la saisie d'un champ de formulaire ordinaire, `Modal` pour un dialogue de tâche.

## Anatomie
`Boîte modale md (540px) → Champ Input sans bordure extérieure en tête → Liste défilante d'actions avec groupes en labels instrument et raccourcis Kbd`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| md | max-inline-size | `--mr-dialog-width-md` | 540px | 540px |
| toutes | max-block-size | `calc(100dvh - 128px)` | 100dvh − 128px | 100dvh − 128px |
| toutes | fond panneau | `--mr-bg-overlay` | `#ffffff` (light) | `#ffffff` (light) |
| toutes | border-radius | `--mr-radius-overlay` | 12px | 12px |
| toutes | bordure | `--mr-border-default` | 1px solid | 1px solid |
| toutes | ombre | `--mr-shadow-overlay` | ombre overlay | ombre overlay |
| toutes | voile | `--mr-scrim` | neutre 40 % (light) | noir 60 % (dark) |
| toutes | hauteur champ recherche | `--mr-control-size-lg` | 48px | 40px |
| toutes | hauteur élément de commande | `--mr-menu-item-height` | 32px | 28px |
| toutes | hauteur titre groupe | `--mr-menu-group-label-height` | 24px | 24px |
| toutes | police titre groupe | `--mr-type-label` | 11px / 16px, 500, mono | 11px / 16px, 500, mono |
| toutes | police élément commande | `--mr-type-body` | 14px / 20px, 400 | 13px / 20px, 400 |

## États
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| conteneur | ouvert | `--mr-bg-overlay` | `--mr-text-primary` | `--mr-border-default` | voile `--mr-scrim`, ombre `--mr-shadow-overlay` |
| champ recherche | repos / focus | transparent | `--mr-text-primary` | bordure inférieure `--mr-border-subtle` | pas de bordure extérieure |
| élément commande | repos | transparent | `--mr-text-primary` | transparent | raccourci en Kbd |
| élément commande | actif clavier / survol | `--mr-bg-hover` | `--mr-text-primary` | transparent | raccourci en Kbd |
| élément commande | sélectionné | transparent | `--mr-text-primary` | transparent | rail gauche 2px `--mr-accent` |

## Comportement et clavier
- Déclenchement global au raccourci clavier `Cmd+K` / `Ctrl+K`.
- Frappe dans le champ recherche filtre immédiatement les commandes affichées.
- `Flèche Bas` / `Flèche Haut` déplace la sélection dans la liste filtrée sans sortir du champ de saisie (`aria-activedescendant`).
- `Enter` exécute la commande active, referme la palette et émet `onSelect(value)`.
- `Escape` referme la palette et restitue le focus à l'élément actif précédant l'ouverture.
- Clic sur le voile referme la palette.

## Accessibilité
- Élément `<dialog>` natif sans portail.
- Champ de recherche : `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded="true"`, `aria-controls="command-list"`.
- Liste : `role="listbox"`, éléments `role="option"`.
- Titres de groupe : style `label` instrument en Geist Mono avec `role="presentation"` ou séparateur sémantique.
- Cible interactive de chaque commande ≥ `--mr-min-target` (hauteurs 32px / compact 28px).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `items` | `Array<{ value: string, label: string, icon?: ReactNode, shortcut?: string, group?: string, disabled?: boolean }>` | requis | liste de commandes (P2) |
| `open` | `boolean` | — | état d'ouverture contrôlé (P5) |
| `defaultOpen` | `boolean` | `false` | ouverture initiale non contrôlée (P5) |
| `onOpenChange` | `(open: boolean) => void` | — | futur événement DOM `open-change` (P6) |
| `onSelect` | `(value: string) => void` | — | action sélectionnée (P6) |
| `placeholder` | `string` | défaut composant | texte indicatif du champ de recherche |
| `className` | `string` | — | fusion de classe (P9) |

Le callback `onClose` est déprécié au profit de `onOpenChange(false)` (7.12).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `onClose` sur CommandPalette (types / inventory) | `onOpenChange(false)` (7.12, P6) ; `onSelect` conservé | oui | ligne CommandPalette |
| portail JavaScript via `createPortal` | élément `<dialog>` natif avec `.showModal()` (3, C6) | non | section 3 |
| titres de groupe en style non standard | style `--mr-type-label` (11px mono 500 majuscules, signature 4) | non (visuel) | section 4 |
| recette command-palette : 3 valeurs en dur signalées (inventory §2.1) | tokens `--mr-dialog-width-md`, `--mr-menu-item-height` (T2) | non | inventory §2.1 |

## Critères de vérification
1. largeur maximale : 540px (`--mr-dialog-width-md`).
2. champ de recherche en tête : fond transparent, sans bordure extérieure, bordure inférieure `--mr-border-subtle`.
3. élément de commande actif : fond `--mr-bg-hover`, rayon 6px (`--mr-radius-control`).
4. titres de groupe : police mono, taille 11px, `font-weight` 500, texte en majuscules, couleur `--mr-text-tertiary`.
5. raccourcis clavier rendus avec le composant Kbd.
6. `Flèche Bas` navigue dans la liste sans perte du focus de saisie.
7. `Enter` valide l'action active et referme la palette.
8. `Escape` referme la palette et restitue le focus précédent.
9. élément racine = `<dialog>` natif sans aucun `createPortal`.

## Interdits
- Jamais de bordure extérieure sur l'Input de tête (fusion visuelle totale avec le haut du panneau).
- Jamais d'aplat d'accent en fond de commande sélectionnée.
- Jamais de `createPortal`.
- Pas de perte de focus lors de l'activation au clavier.
