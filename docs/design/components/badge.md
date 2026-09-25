# Badge
Statut : spec v4 — à valider
Source : prompt maître §7.3

## Rôle
Affiche un statut ou une catégorie compacte en contexte (liste, carte, tableau). Ni action, ni information indispensable seule : un badge accompagne toujours un texte déjà lisible.

## Anatomie
Pastille : `[point] libellé`. Point facultatif (`dot`), libellé court, chiffres en `tabular-nums`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | block-size | `--mr-badge-height-sm` | 20px | 20px |
| md | block-size | `--mr-badge-height-md` | 24px | 24px |
| sm | padding-inline | `--mr-spacing-1-5` | 6px | 6px |
| md | padding-inline | `--mr-spacing-2` | 8px | 8px |
| sm | font-size / line-height | police 500, 11/16, sans | 11px / 16px | 11px / 16px |
| md | font-size / line-height | police 500, 12/16, sans | 12px / 16px | 12px / 16px |
| toutes | font-weight | `--mr-font-weight-medium` | 500 | 500 |
| toutes | point | `--mr-badge-dot-size` | 6px | 6px |
| toutes | écart point/texte | `--mr-spacing-1-5` | 6px | 6px |
| toutes | border-radius | `--mr-radius-inline` | 4px | 4px |
| toutes | border-width | `--mr-border-width` | 1px | 1px |

Les tokens de composant ne dépendent pas de la densité (5.13) : mêmes valeurs en compact.

## États
| Variante | État | Fond | Texte et point | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| neutral | unique | `--mr-bg-sunken` | `--mr-text-secondary` | `--mr-border-subtle` | point `--mr-text-secondary` si `dot` |
| accent | unique | `--mr-accent-subtle` | `--mr-accent-text` | `--mr-accent-border` | point `--mr-accent-text` si `dot` |
| success | unique | `--mr-success-subtle` | `--mr-success-text` | `--mr-success-border` | point `--mr-success-text` |
| warning | unique | `--mr-warning-subtle` | `--mr-warning-text` | `--mr-warning-border` | point `--mr-warning-text` |
| danger | unique | `--mr-danger-subtle` | `--mr-danger-text` | `--mr-danger-border` | point `--mr-danger-text` |
| info | unique | `--mr-info-subtle` | `--mr-info-text` | `--mr-info-border` | point `--mr-info-text` |

Pas d'état survol / pression / focus / désactivé : un badge n'est pas interactif.

## Comportement et clavier
Aucune interaction, aucune animation, aucune transition. Variation chiffrée favorable (« +4.8 % ») : badge `success` ou `danger` selon le sens, jamais `accent`.

## Accessibilité
- Texte toujours présent : la couleur n'est jamais le seul porteur de sens (section 4).
- Aucun rôle interactif : ni `tabindex`, ni `button`, ni focus.
- `font-variant-numeric: tabular-nums` pour les valeurs chiffrées.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `tone` | `'neutral' \| 'accent' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'neutral'` | ton (P1) |
| `size` | `'sm' \| 'md'` | `'sm'` | taille |
| `dot` | `boolean` | `false` | point de statut |
| `className` | `string` | — | fusion (P9) |
| `children` | `ReactNode` | requis | libellé |

Aucun callback (composant non interactif).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| prop `variant` actuelle (inventory : Badge `variant`) | tons nommés `tone` (P1 : `tone` pour neutral/accent/success/warning/danger/info) | oui | ligne Badge |
| recette badge : 2 valeurs en dur signalées (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |
| anciens tokens `--mr-*` de badge éventuels | ton via `{ton}-subtle` / `{ton}-text` / `{ton}-border` (5.3/5.4) | non | migration-table §2 |

## Critères de vérification
1. Badge sm : `block-size` = 20px ; md : 24px (inchangé en compact).
2. `border-radius` = 4px ; `border-width` = 1px ; `box-shadow` absent.
3. neutral : `background-color` = `--mr-bg-sunken` (`#f1f5f6` light), `color` = `--mr-text-secondary` (`#4a5558` light), `border-color` = `--mr-border-subtle`.
4. success : `background-color` = `--mr-success-subtle` (`#dff8e6` light), `color` = `--mr-success-text` (`#016d3c` light), `border-color` = `--mr-success-border`.
5. danger : `color` = `--mr-danger-text` (`#ba2b2e` light), `border-color` = `--mr-danger-border`.
6. accent : `background-color` = `--mr-accent-subtle` (`#dcf4f5` light), `color` = `--mr-accent-text` (`#076e73` light).
7. `dot` : point `width`/`height` = 6px, écart point/texte = 6px, `border-radius` = 9999px.
8. police : sm 11px/16px, md 12px/16px, `font-weight` 500, `font-variant-numeric` = `tabular-nums`.

## Interdits
- Aucun survol, aucune pression, aucun focus, aucun état désactivé : un badge n'est pas interactif.
- Jamais d'ombre (`box-shadow` interdit, section 4).
- Jamais `accent` pour une variation chiffrée (favorable → `success`, défavorable → `danger`).
- Jamais de badge sans texte ; jamais la couleur comme seul sens.
