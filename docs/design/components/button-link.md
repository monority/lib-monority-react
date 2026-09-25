# ButtonLink
Statut : spec v4 — à valider
Source : prompt maître §7.1

## Rôle
Action qui navigue (lien) avec l'apparence d'un Button. Seule API autorisée après le retrait de `as` sur Button (7.19) : un bouton-lien s'obtient avec `ButtonLink`, jamais avec `as`.

## Anatomie
`<a>` stylé comme Button : `[iconLeading] libellé [iconTrailing]`, spinner superposé en chargement.

## Dimensions
Identiques à Button (7.1) :

| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | block-size | `--mr-control-size-sm` | 32px | 28px |
| md | block-size | `--mr-control-size-md` | 40px | 32px |
| lg | block-size | `--mr-control-size-lg` | 48px | 40px |
| sm/md/lg | padding-inline | `--mr-control-padding-inline-sm/md/lg` | 12 / 16 / 20px | 8 / 12 / 16px |
| sm/md/lg | font-size | `--mr-control-font-size-sm/md/lg` | 13 / 14 / 16px | 12 / 13 / 14px |
| toutes | font-weight | `--mr-font-weight-medium` | 500 | 500 |
| toutes | écart icône/texte | `--mr-control-gap` | 8px | 6px |
| toutes | border-radius | `--mr-radius-control` | 6px | 6px |
| toutes | border-width | `--mr-border-width` | 1px | 1px |

## États
Mêmes variantes et états que Button (7.1) :

| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| primary | repos / survol / pression | `--mr-accent` / `--mr-accent-hover` / `--mr-accent-active` | `--mr-on-accent` | transparent | — |
| secondary | repos / survol / pression | `--mr-bg-raised` / `--mr-bg-hover` / `--mr-bg-active` | `--mr-text-primary` | `--mr-border-default` | — |
| ghost | repos / survol / pression | transparent / `--mr-bg-hover` / `--mr-bg-active` | `--mr-text-secondary` puis `--mr-text-primary` | transparent | — |
| danger | repos / survol / pression | `--mr-danger-solid` / `--mr-danger-solid-hover` / `--mr-danger-solid-hover` | `--mr-on-danger-solid` | transparent | — |
| toutes | focus | état de repos | texte de repos | bordure de repos | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset `var(--mr-focus-offset)` |
| toutes | désactivé | `--mr-bg-hover` (ghost : transparent) | `--mr-text-disabled` | `--mr-border-subtle` | `cursor: not-allowed` ; lien non cliquable via `aria-disabled="true"` |
| toutes | chargement | fond de la variante | libellé en `opacity: 0` | bordure de la variante | spinner `currentColor`, `aria-busy` |

## Comportement et clavier
- Navigation : clic ou `Enter` (natif `<a href>`). `Espace` = défilement de la page (comportement standard des liens, non intercepté).
- Transitions `background-color`, `border-color`, `color` en `--mr-duration-fast` / `--mr-ease-standard`.
- Survol uniquement avec `@media (hover: hover) and (pointer: fine)`.
- Chargement : `aria-busy="true"`, clic neutralisé (navigation bloquée), largeur identique au repos.

## Accessibilité
- Élément natif `<a>` avec `href` obligatoire (navigation réelle).
- Focus `:focus-visible`, anneau `--mr-focus-color` ; dans une liste, `outline-offset: -2px`.
- Cible ≥ `--mr-min-target` (24px).
- Icônes décoratives `aria-hidden="true"` ; libellé requis.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `href` | `string` | requis | destination |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'secondary'` | forme et emphase |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | taille |
| `loading` | `boolean` | `false` | chargement |
| `disabled` | `boolean` | `false` | désactivé (`aria-disabled`) |
| `fullWidth` | `boolean` | `false` | largeur 100 % |
| `iconLeading` | `ReactNode` | — | icône de début |
| `iconTrailing` | `ReactNode` | — | icône de fin |
| `className` | `string` | — | fusion (P9) |
| `children` | `ReactNode` | — | libellé |

Callbacks : `onClick` natif (`click`). Prochain événement DOM : `click` → `click`.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `Button as="a"` (Button.types.ts:7) | retiré → `ButtonLink` (7.19) | oui | ligne Button |
| lien stylé par copie de classes Button | composant `ButtonLink` rendant `<a>` (P3 : `as` interdit sur composant interactif) | non | ligne Button |
| variantes Button `muted` / `subtle` / `warning` héritées | même mapping que Button : `secondary` / `ghost` / `secondary` | oui | ligne Button |

## Critères de vérification
1. Élément racine = `a` avec attribut `href` non vide.
2. ButtonLink md : `block-size` = 40px (compact 32px) ; `border-radius` = 6px.
3. secondary repos : `background-color` = `--mr-bg-raised` (`#ffffff` light), `border-color` = `--mr-border-default` (`#ccd4d7`).
4. primary survol : `background-color` = `--mr-accent-hover` (`#08686c` light).
5. focus-visible : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)`.
6. désactivé : `aria-disabled="true"`, `color` = `--mr-text-disabled` (`#80888a`), `cursor` = `not-allowed`.
7. chargement : `aria-busy="true"`, `block-size` identique au repos, navigation non déclenchée au clic.
8. gap icône/texte = 8px ; padding-inline md = 16px (compact 12px).

## Interdits
- Ni prop `as` sur Button ni sur ButtonLink (P3) ; pas d'ancre rendue sans `href`.
- Ni `copyValue`, ni `iconOnly`.
- Jamais d'opacité au désactivé, jamais `transition: all`, jamais de `box-shadow` de focus.
- Jamais de `role="button"` sur l'ancre : sémantique de navigation garantie.
