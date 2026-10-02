# Chantier base CSS saine — Monority UI

Branche `refactor/css-foundation`, worktree `lib-monority-react-css-foundation`.
Source du systeme : `docs/foundation/`. Valeurs neuves definies par etapes.
Inventaire et recoltes : `C:/Users/monority/AppData/Local/Temp/`.

## Etape 0 — Squelette minimal
Reset (:where() scope mr-*), base minimale (canvas, typography, focus, color-scheme),
vocabulaire unique, tokens/ref.css et semantic.css prets a recevoir,
Stylelint avec regle no-raw-values prouvee en negatif, pnpm verify a 5 etapes,
harness minimal dans apps/web.

## Tranches verticales — Composant par composant
Croissance stricte avec le composant en cours : proposition sans ecriture,
regle derriere chaque valeur neuve, contraste calcule, validation humaine,
tokens et recette dans mr.components, pnpm verify vert, arret.
Button en premier (B1 a B6).

## Reprise
Retours de validation visuelle B1 traites (HEAD non pousse en attente d accord) :
- Libelle explicite 'Enregistrer' dans le harness et correction du selecteur de canvas.css (:where(:root, [data-theme])) supprimant le masquage parasite du libelle
- Style de base neutre applique : --mr-bg-inverse et --mr-text-on-inverse (ratio contraste 15.19:1)
- Anneau de focus conserve sur marque (--mr-focus-ring: var(--mr-accent-solid)), balayage 12 teintes valide (>= 5:1, marge sRGB >= 0.04)
- Hauteur md fixee a 32px (--mr-size-control-md: 2rem) avec min-block-size (zoom 200% valide sans troncature a 64px)
- Cascade des conteneurs [data-theme] et [data-brand] assuree par le selecteur :where(:root, [data-theme], [data-brand]) dans semantic.css (specificite 0,0,0)
- 18 tokens declares au total (5 primitives dans ref.css, 13 semantiques dans semantic.css)
- ADR-020 adopte, ADR-018 et ADR-019 amendes, vocabulary.json mis a jour
- pnpm verify vert a 6 etapes
Prochaine action : validation humaine sur le rendu visuel B1 avant push et passage a B2.
