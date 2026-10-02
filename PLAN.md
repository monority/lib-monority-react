# Chantier base CSS saine — Monority UI

Branche `refactor/css-foundation`, worktree `lib-monority-react-css-foundation`.
Source du systeme : `docs/foundation/`. Archive : `archive/tokens-json-d899d22`.
Inventaire Phase 3 et recoltes : `C:/Users/monority/AppData/Local/Temp/`.

## Phase 1 — Nettoyage (terminee)
Suppression de l'ancien systeme (tokens JSON, generateur Style Dictionary,
recettes, controles obsoletes, CSS genere).

## Phase 2 — Fondation CSS (en cours)
Couches `@layer mr.*` (`layers.css`), reset minimal en `:where()`, base/ par sujet,
recolte des echelles depuis le tag d'archive, fichier de vocabulaire unique,
tokens ref et semantic (theme clair par defaut), themes (7 themes et dim),
Stylelint (3 regles) et test de contraste prouves en negatif,
`pnpm verify` a 8 etapes au plus, harness de verification visuelle dans apps/web.

## Phase 3 — Composant par composant
Reconstruction unitaire : Button en premier (ou composant plus simple selon usage),
recette dans `mr.components`, tokens avec consommateur reel, `pnpm verify` vert,
harness visuel, commit atomique vert, rapport et arret pour validation humaine.

## Reprise
Phase 1 terminee, sortie soldee et verifiee.
Documentation de reference installee dans `docs/foundation/` (11 documents).
`AGENTS.md` mis a jour (aucun tableau, aucun emoji, 8 etapes max de verify).
Dernier commit : 259c1a1 docs(agents): mettre a jour AGENTS.md.
Prochaine etape : Phase 2.1 — reset.css scope mr-* en :where() et base/.
Verify de transition : 4 etapes (typecheck, format:check, build, test) vert.
