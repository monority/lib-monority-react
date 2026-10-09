---
'@monority/ui': minor
---

Refonte complete de l architecture CSS : base CSS Foundation en couches @layer mr.* et tokens OKLCH

- **Couches CSS declarees** : `mr.reset`, `mr.base`, `mr.tokens`, `mr.themes`, `mr.components`, `mr.utilities`. Les regles de la bibliotheque ne peuvent plus ecraser involontairement les styles non-couche de l application consommatrice.
- **Design tokens OKLCH** : primitives `--mr-ref-*`, semantiques `--mr-bg-*`, `--mr-text-*`, `--mr-border-*`, `--mr-accent-*`. Etats derives a l execution avec `color-mix(in oklch, ...)`.
- **7 themes complets** : `light`, `dark`, `slate`, `oled`, `ocean`, `night`, `high-contrast` (plus l alias historique `dim`).
- **Support de la marque par cascade** : redefinition propre des primitives `--mr-ref-brand-*` via `[data-brand]`.
- **Composants React 19** : utilisation exclusive de la ref en prop native (suppression de forwardRef dans le code neuf).
- **Accessibilite WCAG 2.2 AA** : conformite stricte des ratios de contraste sur tous les themes et surfaces (ratio >= 4.5:1 pour le texte, >= 3:1 pour les composants UI).
- **75 composants publics** : integrite des 75 composants validee dans le harness, les tests unitaires et les suites e2e Playwright.
