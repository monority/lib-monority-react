# Banner
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §7.3 tons)

## Rôle
Annonce un état global (maintenance, version, alerte produit) en bande pleine largeur en tête de page. Retenir le Callout pour un message dans le flux et le Toast pour une confirmation éphémère.

## Anatomie
Bande pleine largeur : icône 16px du ton, texte court (`small`, lien éventuel en `accent-text`), action facultative et fermeture en IconButton `ghost` sm à droite.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | largeur | — | 100% du conteneur | 100% du conteneur |
| toutes | icône | `--mr-icon-size-sm` | 16px | 16px |
| toutes | écart icône/texte | `--mr-control-gap` | 8px | 6px |
| toutes | padding bloc | `--mr-spacing-2` | 8px | 8px |
| toutes | padding inline | `--mr-spacing-4` | 16px | 16px |
| toutes | bordure inférieure | `--mr-border-width` | 1px | 1px |
| toutes | fermeture | `--mr-control-size-sm` | 32px | 28px |
| toutes | texte | `--mr-type-small` | 13px / 20px | 13px / 20px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| neutral | unique | `--mr-bg-sunken` | `--mr-text-secondary` | bas `--mr-border-default` | icône `--mr-text-secondary` |
| accent | unique | `--mr-accent-subtle` | `--mr-text-primary` | bas `--mr-accent-border` | icône `--mr-accent-text` |
| success | unique | `--mr-success-subtle` | `--mr-text-primary` | bas `--mr-success-border` | icône `--mr-success-text` |
| warning | unique | `--mr-warning-subtle` | `--mr-text-primary` | bas `--mr-warning-border` | icône `--mr-warning-text` |
| danger | unique | `--mr-danger-subtle` | `--mr-text-primary` | bas `--mr-danger-border` | icône `--mr-danger-text` |
| info | unique | `--mr-info-subtle` | `--mr-text-primary` | bas `--mr-info-border` | icône `--mr-info-text` |

Pas d'état survol / pression sur la bande elle-même ; seule la fermeture est interactive.

## Comportement et clavier
- Affichage persistant tant que la cause est active ; la fermeture manuelle émet `onOpenChange(false)` et reste mémorisée pendant la session.
- Fermeture au clavier : focus sur le bouton, `Enter` / `Espace`, `Escape` quand le focus est dans la bande.
- Apparition : `opacity` en `--mr-duration-fast` / `--mr-ease-enter` ; aucune translation de page.
- L'action éventuelle est un Button `ghost` sm, une seule par bande.

## Accessibilité
- Information persistante : `role="status"` ; urgence (danger) : `role="alert"`.
- Icône décorative en `aria-hidden="true"` ; le ton est doublé par le texte, jamais seul.
- Bouton de fermeture avec `aria-label` explicite (« Fermer l'annonce … »).
- Contraste : texte `--mr-text-primary` ≥ 7:1 sur tous les fonds `{ton}-subtle`.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `tone` | `'neutral' \| 'accent' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'info'` | ton (P1) |
| `action` | `{ label, onSelect }` | — | action unique facultative |
| `dismissible` | `boolean` | `true` | bouton de fermeture |
| `open` | `boolean` | — | visibilité contrôlée (P5) |
| `children` | `ReactNode` | requis | message court |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onOpenChange(open)` et `onSelect` pour l'action, futurs événements `open-change` (P6).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| tokens dédiés `--mr-banner-border`, `--mr-banner-marker`, `--mr-banner-soft`, `--mr-banner-tone` | `{ton}-subtle` / `{ton}-border` / `{ton}-text` (5.3) | non (visuel) | migration-table §2 |
| recette banner : 4 valeurs en dur signalées (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |
| fermeture locale éventuelle | IconButton `ghost` sm (7.1) | non | migration-table §1 (aucun changement de nom) |
| rôle live manquant éventuel | `role="status"`, `alert` pour danger | non | prompt §7.18 |

## Critères de vérification
1. Bande : `width` = 100%, bordure basse 1px seule, aucune autre bordure, aucun rayon, aucune ombre.
2. Fonds light : neutral `--mr-bg-sunken`, accent `#dcf4f5`, success `#dff8e6`, warning `#fff0d7`, danger `#feebe9`, info `#e7f1ff`.
3. Bordure basse : `{ton}-border` du ton actif, 1px `solid`.
4. Icône : 16px × 16px, couleur `{ton}-text`, `aria-hidden="true"`.
5. Texte : 13px/20px, `color` = `--mr-text-primary` ; lien éventuel en `--mr-accent-text`.
6. Fermeture : IconButton `ghost` 32px (28px compact), `aria-label` explicite, mémorisée en session.
7. Rôle : `status`, ou `alert` pour le ton danger.
8. Padding : 8px bloc, 16px inline ; écart icône/texte 8px (6px compact).

## Interdits
- Jamais plus d'une action par bande, jamais d'action `primary`.
- Jamais de bande sans rôle live (`status` ou `alert`).
- Jamais le ton comme seul porteur de sens : toujours un texte explicite.
- Jamais d'ombre, jamais de rayon, jamais de bordure autre que la bordure inférieure.
