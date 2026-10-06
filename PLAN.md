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
Sauvegarde : git push origin refactor/css-foundation:backup/css-foundation-wip
Etat :
- 7 themes finalises et actifs (light, dark, oled, slate, ocean, night, high-contrast) + alias dim
- Theme High Contrast cree (themes/high-contrast.css) : WCAG AAA (canevas L=1, textes 20.6:1 et 13.6:1, bordure 7.4:1, accent > 9.3:1)
- Verifications de contraste et d'etats Button/Input/Field conformes sur les 7 themes
- Decouverte dynamique des themes du dossier themes/ et tests de portees imbriquees valides
- Tests rendered automatises et pnpm verify 6 etapes vert (1251 tests unitaires)
- Textarea non commence, en attente de validation utilisateur
Point de contrôle (apres Textarea, 4e composant) :
1. revue des tokens (doublons, noms contre vocabulaire, tokens sans lecteur)
2. decision sur le patron de recette et sur le nom partage des champs
3. test Firefox et WebKit avec Playwright dans le cache utilisateur
4. branchement de pnpm verify en CI avec installation de Chromium
5. bilan de poids et duree de verify a froid
6. revue de docs/foundation/ contre le code
7. decisions ouvertes a trancher
8. preparation du changelog
9. nettoyage de l'historique a decider avec l'utilisateur


