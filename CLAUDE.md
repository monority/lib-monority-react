# Monority React — Session Memory

## Dernières sessions

### 2026-06-04 — Textarea placeholder padding fix ✅
- Fix padding-block manquant sur le variant `md` (placeholder colle en haut)
- 2 fichiers CSS modifies, 22/22 tests, build OK
- [Note vault](https://obsidian://open?vault=Obsidian%20Vault&file=dev-actual%2F2026-06-04%20Session%20Monority%20-%20Textarea%20Harmonization)

### 2026-06-03 — Textarea Harmonization ✅
- Harmonisation complète avec les patterns Callout/Section/Button
- 4 fichiers modifiés, 22/22 tests, build OK
- **Leçons** : `children` ≠ defaultValue dans Textarea (rendu via Field)
- [Note vault](https://obsidian://open?vault=Obsidian%20Vault&file=dev-actual%2F2026-06-03%20Session%20Monority%20-%20Textarea%20Harmonization)

### 2026-06-03 — Section Rework ✅
- Rework complet : 13 problèmes adressés, 11 fichiers modifiés
- `as: ElementType`, `titleAs`, `data-*` selectors dans CSS
- Status `draft` → `stable`
- [Note vault](https://obsidian://open?vault=Obsidian%20Vault&file=dev-actual%2F2026-06-03%20Session%20Monority%20-%20Callout%20%26%20Section%20Rework)

### 2026-06-03 — Callout Rework + Recommendations ✅
- Rework complet Callout + token `--mr-font-weight-semibold` (30 fichiers mis à jour)
- Status `draft` → `stable`
- [Note vault](https://obsidian://open?vault=Obsidian%20Vault&file=dev-actual%2F2026-06-03%20Session%20Monority%20-%20Callout%20%26%20Section%20Rework)

## Conventions du projet (apprises pendant les reworks)
- `cva()` ne filtre pas `undefined` → garder les defaults dans la destructuration
- `title != null` plutôt que `title &&` pour les `ReactNode`
- `as: ElementType` pour le polymorphisme (pas de union fermée)
- Tout `data-*` dans le JSX doit avoir son sélecteur `[data-*]` dans le CSS
- Doc import path : toujours `@monority/ui/nom-composant`
- cssHooks et tokens dans la doc : toujours vérifiés contre le CSS réel
- `children` d'un Field n'est pas la valeur d'un textarea/input — utiliser defaultValue/value
- Toujours verifier le `padding-block` sur les `<textarea>` (pas de padding vertical natif)

## Prochains composants à harmoniser (potentiels)
- [ ] Input (même pattern que Textarea)
- [ ] FormSection
- [ ] Tous les composants encore en `draft`
