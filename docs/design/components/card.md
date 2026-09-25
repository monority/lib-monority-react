# Card
Statut : spec v4 — à valider
Source : prompt maître §7.13

## Rôle
Conteneur structurant principal regroupant un ensemble cohérent d'informations et d'actions (statistiques, réglages, tableau). Choisir `FormSection` pour un formulaire plat sans délimitation de surface, `Modal` pour une tâche bloquante.

## Anatomie
`[En-tête (label instrument ... action optionnelle) → titre h3 → description small] → Corps (children) → [Pied séparé par bordure supérieure]`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | fond | `--mr-bg-surface` | `#f8fbfb` (light) | `#151d20` (dark) |
| toutes | bordure | `--mr-border-subtle` | 1px solid | 1px solid |
| toutes | border-radius | `--mr-radius-card` | 10px | 10px |
| toutes | padding carte | `--mr-card-padding` | 20px | 16px |
| toutes | écart en-tête → corps | `--mr-card-gap` | 16px | 12px |
| toutes | titre | `--mr-type-h3` | 16px / 24px, 600, sans | 16px / 24px, 600, sans |
| toutes | label instrument | `--mr-type-label` | 11px / 16px, 500, mono | 11px / 16px, 500, mono |
| toutes | description | `--mr-type-small` | 13px / 20px, 400, sans | 13px / 20px, 400, sans |
| toutes | écart label → titre | `--mr-spacing-1` | 4px | 4px |
| toutes | padding-top pied | `--mr-spacing-3` | 12px | 12px |
| toutes | métadonnées pied | `--mr-type-code-sm` | 12px / 16px, 400, mono | 12px / 16px, 400, mono |
| toutes | ombre | — | aucune ombre (`none`) | aucune ombre (`none`) |

Les anciennes tailles de padding sm / md / lg sont remplacées par la densité (`--mr-card-padding` : 20px en comfortable, 16px en compact).

## États
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| default | repos | `--mr-bg-surface` | `--mr-text-primary` | `--mr-border-subtle` | aucune ombre |
| interactive | repos | `--mr-bg-surface` | `--mr-text-primary` | `--mr-border-subtle` | carte entière cliquable |
| interactive | survol | `--mr-bg-surface` | `--mr-text-primary` | `--mr-border-default` | curseur pointeur |
| interactive | focus | état de repos | `--mr-text-primary` | `--mr-border-default` | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset `var(--mr-focus-offset)` |

## Comportement et clavier
- Variante `interactive` : focusable via `tabindex="0"`, activable via `Enter` ou `Espace`.
- Transitions de bordure en `--mr-duration-fast` / `--mr-ease-standard` sur la variante interactive.
- Contenu pleine largeur (Table, Divider) : marges horizontales négatives égales au padding (`margin-inline: calc(var(--mr-card-padding) * -1)`).
- Table en bas de carte : marge inférieure négative et la carte masque le débordement (`overflow: hidden`) pour épouser les coins arrondis.

## Accessibilité
- Si la carte est interactive : `role="button"` ou `role="link"`, `tabindex="0"`.
- Titre hiérarchique : balise `<h3>` sémantique pour la structure de document.
- Label instrument : voix système mono, `aria-hidden="true"` si redondant avec le titre.
- Aucune ombre n'est requise pour la distinction visuelle (surfaces et bordures suffisent, section 4).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `variant` | `'default' \| 'interactive'` | `'default'` | mode d'interaction |
| `label` | `ReactNode` | — | label instrument en tête de carte (Geist Mono) |
| `title` | `ReactNode` | — | titre h3 |
| `description` | `ReactNode` | — | texte descriptif sous le titre |
| `action` | `ReactNode` | — | action d'en-tête (Button ou IconButton à droite) |
| `footer` | `ReactNode` | — | contenu du pied de carte séparé par une bordure |
| `children` | `ReactNode` | requis | corps de la carte |
| `className` | `string` | — | fusion de classe (P9) |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| props de padding `sm \| md \| lg` | remplacées par la densité unique `--mr-card-padding` (7.13) | oui | ligne Card |
| ombres douces résiduelles dans certaines variantes | aucune ombre : profondeur par surfaces et bordures (4, 7.13, D3) | non (visuel) | section 4 |
| tokens `--mr-card-radius`, `--mr-card-padding-md`, `--mr-card-gap-md` | `--mr-radius-card`, `--mr-card-padding`, `--mr-card-gap` (mappés exacts, 5.16) | non | migration-table §2 |
| recette card : 1 valeur en dur signalée (inventory §2.1) | tokens `--mr-radius-card`, `--mr-card-padding` (T2) | non | inventory §2.1 |

## Critères de vérification
1. fond de carte = `--mr-bg-surface` (`#f8fbfb` light), bordure = 1px solid `--mr-border-subtle` (`#dde4e6` light).
2. `box-shadow` = `none` (absence totale d'ombre sur la carte, critère D3).
3. `border-radius` = 10px (`--mr-radius-card`).
4. padding interne = 20px en comfortable, 16px en compact (`--mr-card-padding`).
5. écart en-tête → corps = 16px en comfortable, 12px en compact (`--mr-card-gap`).
6. titre h3 : `font-size` = 16px, `line-height` = 24px, `font-weight` = 600 (`--mr-type-h3`).
7. label instrument : `font-size` = 11px, `line-height` = 16px, police mono, majuscules (`--mr-type-label`).
8. variante interactive survol : bordure = `--mr-border-default` (`#ccd4d7` light).
9. variante interactive focus : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)`.

## Interdits
- Jamais de carte dans une carte (pas d'imbrication de Card).
- Jamais d'ombre sur Card (`box-shadow` strictement interdit hors overlays flottants, D3).
- Jamais de props de padding `sm / md / lg` (la densité régit seule l'espacement).
- Pas de titre de carte en voix système mono.
