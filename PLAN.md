# Chantier base CSS saine — Monority UI

Branche `refactor/css-foundation`, worktree `lib-monority-react-css-foundation`.
Source du systeme : `docs/foundation/`. Valeurs neuves definies par etapes.
Inventaire et recoltes : `C:/Users/monority/AppData/Local/Temp/`.

## Etape 0 — Squelette minimal
Reset (:where() scope mr-*), base minimale (canvas, typography, focus, color-scheme),
vocabulaire unique, tokens/ref.css et semantic.css prets a recevoir,
Stylelint avec regles prouvees en negatif, pnpm verify vert, harness dans apps/web.

## Tranches verticales — Composant par composant
Croissance stricte : proposition sans ecriture, regle derriere chaque valeur neuve,
contraste calcule, validation humaine, tokens et recette dans mr.components.
Button en premier (B1 a B6).

## Reprise
Sauvegarde : git push -u origin feat/docs-parity-missing-components
Commit de session : 27bae0f (plage 8f192b0..27bae0f)
Etat :
- Etape 1 terminee : parite 75/75 composants documentes atteinte
- Pages ajoutees : ButtonLink, CopyButton, IconButton, NumberInput, PasswordInput
- Controles de qualite : pnpm verify vert (8 portes), 94 tests web verts
- Prochaine etape : Pousser la branche, ouvrir la PR, puis engager l'Etape 2 (polissage formulaires et navigation)
