---
'@monority/ui': minor
---

Expose `positionOverlay` et verrouille la frontière de package

Ajoute `positionOverlay` aux exports publics de `@monority/ui`. L'implémentation
reste dans `internal/position/` : seule la fonction est exposée, pour éviter que
les applications atteignent `packages/ui/src/internal/*` par chemin relatif.

```ts
import { positionOverlay } from '@monority/ui'

const stop = positionOverlay(overlayElement, anchorRect, { placement: 'bottom', offset: 8 })
// … plus tard
stop() // retire les écouteurs scroll/resize
```

C'était jusqu'ici une impasse : l'application de documentation devait importer un
fichier `internal/` du paquet (`../../../../packages/ui/src/internal/...`). Elle
passe désormais par l'API publique, et `apps/web` n'a plus aucun import de
`packages/ui/src/internal/**` — c'est vérifié, mais pas encore gardé par un test
(à ajouter).

Ajoute également la bannière `use client` sur les fichiers JS distribués, pour que
les composants soient utilisables en Server Components côté consommateur.
