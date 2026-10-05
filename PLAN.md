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
- Theme sombre approfondi (themes/dark.css) : canevas ajuste a L=0.17 pour un rendu profond et net
- Theme Slate integre (themes/slate.css) : atmosphere bleutee (hue 220, chroma 0.02), canevas L=0.17
- Decouverte dynamique des themes du dossier themes/ (4 themes actifs : light, dark, oled, slate)
- Verifications de contraste et d'etats Button/Input/Field conformes sur les 4 themes
- Navigation harness prete pour light, dark, oled, slate et dim
- Tests rendered automatises et pnpm verify 6 etapes vert (1251 tests unitaires)
- Textarea non commence, en attente de validation utilisateur
Point de contrôle (apres Textarea, 4e composant) :
1. revue des tokens (doublons, noms contre vocabulaire, tokens sans lecteur)
2. decision sur le patron de recette et sur le nom partage des champs
3. ajout des themes suivants : ocean, night, high-contrast
4. test Firefox et WebKit avec Playwright dans le cache utilisateur
5. branchement de pnpm verify en CI avec installation de Chromium
6. bilan de poids et duree de verify a froid
7. revue de docs/foundation/ contre le code
8. decisions ouvertes a trancher
9. preparation du changelog
10. nettoyage de l'historique a decider avec l'utilisateur


