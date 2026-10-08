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
- Phase 2 terminee : migration de la famille Layout (11 composants : Container, Grid, Stack, Section, Separator, Divider, AspectRatio, ScrollArea, PageHeader, Toolbar, Resizable)
- 11 recettes CSS creees dans packages/styles/src/recipes/ sous @layer mr.components, 100% tokens, zero valeur brute, specificite <= 0,2,0
- Tokens ajoutes dans semantic.css : --mr-size-container-sm/md/lg/xl, enregistres dans vocabulary.json
- Modernisation Layout complete : 11 composants migres vers React 19 (ref en prop directe, zero forwardRef)
- Verifications : pnpm verify vert (6 etapes : typecheck, format, lint:css, test:rendered, build, test), 1303 tests unitaires @monority/ui (11 fichiers et 90 tests Layout), 94 tests @monority/web
- Prochaine etape : Phase 3 — migration de la famille Overlays (8 composants) ou famille Data (5 composants)
