# Plan de remise en ordre — Monority UI

## Règles communes (toutes les étapes)
- Une étape par session. N'exécute que l'étape demandée.
- Un commit par sujet. Après chaque commit : typecheck, tests (ui, web, tokens), build, format:check.
- Stage uniquement par liste de chemins, jamais git add . ; vérifie l'index avant chaque commit.
- Avant de supprimer un fichier ou un symbole : git grep pour prouver qu'il n'est pas utilisé.
- Aucun changement de rendu non annoncé. Si une étape en provoque un, montre l'avant/après et attends validation.
- Si une décision marquée [DÉCISION] n'est pas tranchée dans ce fichier, arrête-toi et pose la question.
- Contexte presque épuisé : termine sur un commit propre, écris HANDOFF.md (non commité, dans .gitignore) avec les commits faits, ce qui reste et les pièges.
- En fin d'étape : coche l'étape ci-dessous, commite PLAN.md, fais un rapport court avec les preuves.

## Décisions
- D1 Classes utilitaires non préfixées (.hidden, .grid, .container…) et doublons avec les composants Stack/Grid/Container/Section : [DÉCISION] préfixer en mr-* / sortir dans un export optionnel / supprimer au profit des composants.
- D2 Reset global (reset.css + normalize.css) : [DÉCISION] export opt-in "./reset.css" / conserver dans le bundle.
- D3 Scripts d'audit ponctuels (tokens/scripts/probe-contrast.mjs, extract-deprecated.mjs, docs/design/audit/*.mjs) : [DÉCISION] archiver / supprimer.
- D4 Pages de faux SaaS dans apps/web (auth simulée, Admin, Dashboard, services/, useAuth, AuthProvider) : [DÉCISION] démo volontaire à regrouper / à supprimer.
- D5 Source de vérité de la doc composant (docs/design/components/*.md vs .docs/.meta/.examples de apps/web) : [DÉCISION] laquelle fait foi, l'autre en dérive.

## Étapes
- [x] 1. Nettoyage : fichiers morts (racine, styles/debug, vendors/prism, apps/web, tooling), BOM + .editorconfig, AGENTS.md, .npmrc + registry-url/NODE_AUTH_TOKEN dans release.yml, essai à blanc changesets, test NavigationMenu sur getByRole.
- [ ] 2. Bugs de consommation : layers renommées monority.*, bannière "use client" (+ test dist), détection production via process.env.NODE_ENV littéral (helper unique, messages en anglais), types d'InputBase sans index signature any. Puis D1 et D2 si tranchées.
- [ ] 3. Migration BEM → data-* : les composants émettent des attributs data-* pour variantes et états ; suppression des sélecteurs BEM doublés dans les recettes. Par famille de composants, un commit par famille. Mesure le poids de dist/index.css avant/après.
- [ ] 4. Doublons et rangement : fusion Divider/Separator (garder un nom, l'autre en alias déprécié), fusion display/data-display en catégories claires, renommage des 8 tests stepNN selon ce qu'ils vérifient, fusion des 3 tests d'exports.
- [ ] 5. Migrations et doc : MIGRATIONS.md unique (space→spacing, deprecated.css, legacy-layout.css, radius, BEM) avec état et version de fin ; historique d'audit vers docs/archive/ ; application de D3 et D5 ; CHANGELOG.md racine supprimé ou redirigé vers celui du package.
- [ ] 6. apps/web : application de D4, puis organisation par fonctionnalité (features/docs, features/playground, features/moodboard, features/showcase, shared/) ; page harness exclue du build de production.
- [ ] 7. État contrôlé : useControllableState (updates fonctionnels, tests) adopté par les ~19 composants concernés ; useFieldIds adopté ou supprimé. Tests existants inchangés.
- [ ] 8. forwardRef → ref comme prop (React 19) dans les 76 fichiers, par lots. Supprime le "ref as any" d'InputBase.
- [ ] 9. Build et outillage : déclarations via tsc --emitDeclarationOnly (mesure avant/après), import de @monority/styles par nom de package, un seul export CSS, publint + arethetypeswrong + test:dist en CI, snapshots Playwright régénérés dans l'image Docker officielle (suppression des *-win32.png) + job e2e en CI, size-limit sur dist/index.css et dist/index.js.
- [ ] 10. Lint : derniers diagnostics traités, étape lint bloquante en CI. Suppression de PLAN.md.
