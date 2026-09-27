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

## Bordures de contrôles : repos + survol (PROPOSITION, non appliquée)

Structure retenue : `border-control` devient la bordure **au repos** des 9
contrôles, un nouveau `border-control-hover` prend les valeurs actuelles de
`border-control` (rendu du survol inchangé), et les 21 usages
hover/focus/active/accent sont migrés vers ce nouveau jeton.

| Thème | repos | ratio repos | hover | ratio hover | ΔL | survol modifié |
|---|---|---|---|---|---|---|
| light | 0.62 | 3.32 | **0.56** | 4.08 | 0.060 | **oui** (0.615 → 0.56) |
| dark | 0.565 | 3.31 | 0.69 | 3.33 | 0.125 | non |
| oled | 0.5175 | 3.32 | 0.655 | 3.26 | 0.138 | non |
| ocean | 0.56 | 3.31 | **0.62** | 4.23 | 0.060 | **oui** (0.6 → 0.62) |
| night | 0.5525 | 3.33 | **0.6125** | 4.26 | 0.060 | **oui** (0.58 → 0.6125) |
| high-contrast | 0.55 | 4.38 | 0.3 | 12.32 | 0.250 | non |

`high-contrast` est inchangé au repos : sa bordure actuelle (`border-subtle`
0.55) atteint déjà 4.38:1, au-dessus de la cible 3.3.

`ctrl-<theme>-{current,proposed}-{rest,hover}.png` : 8 contrôles, 4 thèmes,
avant / après, au repos et au survol. Les valeurs proposées sont injectées
dans la page de capture — le rendu est identique au changement réel, aucune
source de token n'a été modifiée.

### Note : `slate`

`slate` est absent du pipeline de tokens (chantier en cours). Sa mesure
« avant » vaut en réalité celle de `light`, et sa bordure de repos restera à
~1.5:1 tant que la même correction ne lui est pas appliquée à la
réintégration.
