# Captures de validation (tokens)

Générées au navigateur (Chromium/Playwright) sur le CSS réel, avant/après
chaque changement. Elles documentent des écarts **mesurés**, pas des intentions.

## radius-xs/sm/md/lg × --mr-radius-scale (commit `9cfedf0`)

Mesuré via `getComputedStyle` avec `data-brand="studio"` (scale 0.5), thème light :

| Composant | Token | Avant | Après |
|---|---|---|---|
| badge | `radius-xs` | 6px | **3px** |
| checkbox (contrôle) | `radius-xs` | 6px | **3px** |
| kbd | `radius-xs` | 6px | **3px** |
| banner | `radius-md` | 14px | **7px** |
| accordion | `radius-md` | 14px | **7px** |
| callout | `radius-md` | 14px | **7px** |
| card | `radius-card` | 5px | 5px (déjà scalé) |
| input | `radius-control` | 3px | 3px (déjà scalé) |
| modal panel | `radius-overlay` | 6px | 6px (déjà scalé) |

Monority (scale 1) : aucun changement.

## --mr-border-control 3:1 (commit `465fc87`)

`border-control` n'apparaît **qu'au survol / focus** ; au repos les champs
utilisent `border-subtle`. Les captures `form-dense-*` forcent donc un champ
focusé + un champ survolé. Le changement est discret à l'œil : c'est un
plancher de conformité (WCAG 1.4.11), pas un restyle.

Ratios mesurés contre un fond `bg-hover` composite (blanc 4,5 %), 5 bases :

| Thème | Avant | Après |
|---|---|---|
| dark (0.6 → 0.69) | 2.18 – 2.59 ❌ | **3.10 – 3.69 ✅** |
| oled (0.55 → 0.655) | 2.03 – 2.28 ❌ | **3.10 – 3.48 ✅** |

`border-control-*` : zoom sur le champ survolé. `form-dense-*` : vue complète
(6 inputs, select, textarea, table).
