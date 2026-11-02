# @monority/logo3d

Le logo Monority en trois dimensions : un nuage de points, une dépendance
(`three`, en peer), aucune texture, aucun parse SVG au runtime.

- Géométrie **cuite à la compilation** depuis `assets/logo3.svg` (11 sous-tracés,
  975 sommets aplatis). Le tracé n'utilise que `M`, `L`, `C` : la cuisson tient
  en un parseur de quarante lignes, sans dépendance.
- **6 975 points** par défaut (975 de contour + 6 000 de surface), coordonnées
  quantifiées en Int16 : **27,9 Ko bruts, 37,4 Ko en base64, ≈ 28 Ko gzip**.
- **Propriétés du tracé** : `logo3.svg` est une line art — des rubans fins
  remplis. À grande taille, chaque trait se lit comme une ligne double ; aux
  tailles d'usage d'un logo (≤ 200 px), les deux bords fusionnent. C'est une
  propriété du dessin, pas un défaut de cuisson.

## Installation

Paquet **ESM uniquement** (Node ≥ 18, navigateurs modernes) : aucun build CJS.

```bash
pnpm add @monority/logo3d three
```

`react` reste optionnel : il n'est requis que pour l'entrée `./react`.

## Three.js brut

```ts
import { createLogo3D } from '@monority/logo3d'

const logo = createLogo3D({ quality: 'high', color: '#eae4db' })
scene.add(logo.object3D)

// dans votre boucle
logo.update(deltaSeconds)

// au démontage
logo.dispose()
```

Le cœur ne crée ni renderer ni caméra : il s'insère dans une scène existante.
`update(dt)` n'alloue rien.

## React

```tsx
import { Logo3D } from '@monority/logo3d/react'

<Logo3D label="Monority" style={{ width: 320, height: 320 }} />
```

Le composant crée son renderer, cadre le logo, gère le redimensionnement,
suspend le rendu hors écran et respecte `prefers-reduced-motion`. Si WebGL est
indisponible, il appelle `onUnsupported` : le repli visuel appartient à l'hôte.

## Options

| Option | Défaut | Effet |
|---|---|---|
| `quality` | `high` | `low` divise les points par 4, `medium` par 2 |
| `color` | `#eae4db` | Couleur des points |
| `size` | `0.008` | Taille des points, en unités monde (le logo mesure 1) |
| `speed` | `0.6` | Vitesse de la rotation d'attente ; `0` fige |
| `paused` | `false` | Pose statique |
| `motion` *(React)* | `auto` | `auto` respecte le mouvement réduit, `none` fige, `always` anime |

## Budget

| Mesure | Valeur |
|---|---|
| Draw calls | 1 |
| Points (haute qualité) | 6 975 |
| Données cuites | 27,9 Ko (Int16), ≈ 28 Ko gzip |
| JS hors `three` | ≈ 2,4 Ko gzip (cœur 1,0 + React 1,3) |

## Re-cuire

```bash
pnpm bake            # 6 000 points de surface
pnpm bake --fill 12000
```

La cuisson est déterministe (graine fixe) : deux exécutions produisent le même
fichier. `test/data.test.mjs` vérifie trois choses : la structure décodée, que
les données n'ont pas été éditées à la main (`logo.sha256`), et que
`logo3.svg` est bien la source qui a été cuite (`SOURCE_SHA256`). Si vous
modifiez le SVG, relancez la cuisson — le test échouera sinon, volontairement.

## Licence

MIT.
