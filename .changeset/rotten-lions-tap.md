---
'@monority/ui': major
---

Tokens : renommage des primitives sous le préfixe `--mr-ref-*` (D11), et table rase du système reconstruit.

Les 7 primitives changent de nom : `--mr-brand-hue`, `--mr-brand-chroma`, `--mr-neutral-hue`, `--mr-neutral-chroma`, `--mr-font-sans`, `--mr-font-mono` et `--mr-radius-scale` deviennent `--mr-ref-brand-hue`, `--mr-ref-brand-chroma`, `--mr-ref-neutral-hue`, `--mr-ref-neutral-chroma`, `--mr-ref-font-sans`, `--mr-ref-font-mono` et `--mr-ref-radius-scale`.

Rupture parce que le CSS est redefini entierement : le systeme de tokens a ete raze et se reconstruit famille par famille dans les phases 11b1 a 11b5. Le rendu n'est pas encore stable, la library n'est pas prete a l'usage.

**Migration cote consommateur**, pour surcharger la marque :

```css
/* avant */ :root { --mr-brand-hue: 295; }
/* apres */ :root { --mr-ref-brand-hue: 295; }
```

Le tableau complet des correspondances est dans `MIGRATIONS.md`.

Ne pas dependre de la surface de tokens avant la fin du chantier : elle est en reconstruction active.