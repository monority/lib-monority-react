# Design customization

`DesignConfig` compose independent visual axes. Une combination ne crée jamais un nouveau composant ni un nouveau thème.

```ts
import {
  DEFAULT_DESIGN_CONFIG,
  DesignProvider,
  type DesignConfig,
} from '@monority/ui'

const config: DesignConfig = {
  ...DEFAULT_DESIGN_CONFIG,
  theme: 'dark',
  accent: 'violet',
  chartPalette: 'ocean',
  radius: 'rounded',
  spacing: 'dense',
  density: 'compact',
}

<DesignProvider config={config}>
  <App />
</DesignProvider>
```

## Axes

- `theme` : `dark` (défaut, gris pur), `light`, `slate`, `oled`, `ocean`, `night`. `high-contrast` est piloté par `prefers-contrast`, ce n'est pas un choix.
- `brand` : `monority`, `studio`.
- `accent` : `neutral` (défaut), cyan, blue, violet, indigo, green, amber, orange, red, rose. `neutral` = chroma 0 (noir en clair, blanc en sombre/oled). Une teinte chromatique colore directement les contrôles primaires et indicateurs.
- `chartPalette` : default, ocean, spectrum, warm.
- `radius` : sharp, compact, default, rounded, pill.
- `spacing` : dense, default, comfortable, airy.
- `density` : compact, default, spacious.

`resolveDesignConfig()` déterministe les variables CSS :
`--mr-brand-*`, `--mr-control-*`, `--mr-chart-1..5`, `--mr-radius-*` et `--mr-spacing-*`.
Le provider expose également les axes via `data-design-*` pour l'inspection et les tests.

Le customizer du moodboard persiste la configuration dans `monority-design-config` et propose la copie JSON de la configuration courante.

## Frontière

Un thème définit l'atmosphère et les surfaces. Il ne définit ni la géométrie, ni le layout, ni la palette de charts, ni la couleur indépendante des composants. Les futurs axes typographie, bordures, mouvement, échelle des icônes et largeur de contenu peuvent être ajoutés au même modèle.
