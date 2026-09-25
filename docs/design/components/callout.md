# Callout
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §7.3 tons)

## Rôle
Signale une information importante liée au contenu environnant, en bloc dans le flux. Retenir le Banner pour une annonce pleine largeur et le Toast pour une confirmation éphémère. `size="sm"` absorbe l'ancien InlineAlert (7.19).

## Anatomie
Bloc : label instrument facultatif, titre en `small-strong`, texte en `small`, icône 16px du ton en tête, action ou fermeture facultative en fin de bloc.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| md | padding bloc | `--mr-spacing-3` | 12px | 12px |
| md | padding inline | `--mr-spacing-4` | 16px | 16px |
| sm | padding bloc | `--mr-spacing-2` | 8px | 8px |
| sm | padding inline | `--mr-spacing-3` | 12px | 12px |
| toutes | rayon | `--mr-radius-card` | 10px | 10px |
| toutes | bordure | `--mr-border-width` | 1px | 1px |
| toutes | icône | `--mr-icon-size-sm` | 16px | 16px |
| toutes | écart icône/contenu | `--mr-control-gap` | 8px | 6px |
| toutes | titre | `--mr-type-small-strong` | 13px / 20px, 500 | 13px / 20px, 500 |
| toutes | texte | `--mr-type-small` | 13px / 20px | 13px / 20px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| neutral | unique | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-border-default` | icône `--mr-text-secondary` |
| accent | unique | `--mr-accent-subtle` | `--mr-text-primary` | `--mr-accent-border` | icône `--mr-accent-text` |
| success | unique | `--mr-success-subtle` | `--mr-text-primary` | `--mr-success-border` | icône `--mr-success-text` |
| warning | unique | `--mr-warning-subtle` | `--mr-text-primary` | `--mr-warning-border` | icône `--mr-warning-text` |
| danger | unique | `--mr-danger-subtle` | `--mr-text-primary` | `--mr-danger-border` | icône `--mr-danger-text` |
| info | unique | `--mr-info-subtle` | `--mr-text-primary` | `--mr-info-border` | icône `--mr-info-text` |

Pas d'état survol / pression sur le bloc lui-même ; seuls l'action et la fermeture sont interactifs.

## Comportement et clavier
- Bloc statique dans le flux : aucune animation d'apparition, aucun déplacement de contenu voisin après le premier rendu.
- Fermeture facultative : IconButton `ghost` sm, `Enter` / `Espace`, émet `onOpenChange(false)`.
- Action facultative : Button `ghost` sm ou lien `accent-text`, une seule par bloc.
- `size="sm"` : variante compacte qui remplace InlineAlert (alias déprécié + avertissement en développement, 7.19).

## Accessibilité
- Information persistante : `role="status"` ; urgence (danger) : `role="alert"`.
- Icône décorative en `aria-hidden="true"` ; le ton est doublé par le titre, jamais seul.
- Titre relié au bloc par `aria-labelledby` quand le texte seul ne suffit pas.
- Contraste : texte `--mr-text-primary` ≥ 7:1, icône `{ton}-text` ≥ 4.5:1.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `tone` | `'neutral' \| 'accent' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'info'` | ton (P1) |
| `size` | `'sm' \| 'md'` | `'md'` | densité (`sm` remplace InlineAlert) |
| `title` | `string` | — | titre `small-strong` |
| `dismissible` | `boolean` | `false` | fermeture facultative |
| `children` | `ReactNode` | requis | texte `small` |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onOpenChange(open)` pour la fermeture, futur événement `open-change` (P6).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| composant InlineAlert (`onAction`, ton) maintenu à part | fusion 7.19 : Callout `size="sm"`, alias déprécié + avertissement en dev | oui | migration-table §1 et §7.19 |
| tokens dédiés `--mr-callout-accent`, `--mr-callout-accent-bg` | `{ton}-subtle` / `{ton}-border` / `{ton}-text` (5.3) | non (visuel) | migration-table §2 |
| recette callout : 2 valeurs en dur signalées (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |
| rôle live manquant éventuel | `role="status"`, `alert` pour danger | non | prompt §7.18 |

## Critères de vérification
1. Padding md : 12px bloc × 16px inline ; sm : 8px × 12px.
2. Rayon : 10px ; bordure 1px `solid` ; aucune ombre.
3. Fonds light : neutral `--mr-bg-sunken`, accent `#dcf4f5`, success `#dff8e6`, warning `#fff0d7`, danger `#feebe9`, info `#e7f1ff`.
4. Bordures : `{ton}-border` du ton actif ; icône 16px `{ton}-text`, `aria-hidden="true"`.
5. Titre : 13px/20px, 500 ; texte : 13px/20px, `color` = `--mr-text-primary`.
6. Rôle : `status`, ou `alert` pour le ton danger.
7. `size="sm"` : rendu compact, alias InlineAlert émet un avertissement en développement.
8. Fermeture : IconButton `ghost` sm uniquement si `dismissible`, émet `onOpenChange(false)`.

## Interdits
- Jamais plus d'une action par bloc, jamais d'action `primary`.
- Jamais de bloc sans rôle live quand il porte une information de statut.
- Jamais le ton comme seul porteur de sens : toujours un titre ou un texte explicite.
- Jamais d'ombre, jamais de rayon hors `card`.
