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
Point de contrôle (après Textarea, 4e composant) :
1. revue des tokens (doublons, noms contre vocabulaire, tokens sans lecteur)
2. décision sur le patron de recette (section 2) et sur le nom partagé des champs
3. ajout des thèmes slate, oled, ocean, night, high-contrast, un commit par thème, contraste de toutes les paires existantes dans chacun, et re-vérification de la bande de surfaces (ADR-024)
4. test Firefox et WebKit avec Playwright installé dans le cache utilisateur (aucun fichier du dépôt) et décision du plancher de navigateurs
5. branchement de pnpm verify en CI avec installation de Chromium, sans toucher à release.yml
6. bilan de poids et durée de verify à froid
7. revue de docs/foundation/ contre le code
8. décisions ouvertes à trancher
9. préparation du changelog
10. nettoyage de l'historique à décider avec moi (fusion en squash ou conservation des commits)

