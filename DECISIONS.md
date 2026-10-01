# Decisions conservees du chantier base CSS

Ces decisions ne sont pas rouvertes sans demande explicite. Elles completent
AGENTS.md, qui prime en cas de conflit.

- Prefixe et portee : tout identifiant public est prefixe `mr-`. Aucun
  selecteur global hors reset et base, eux-memes scopes a la portee `mr-*`.
- Recette gouverne : tant qu'une spec n'est pas reecrite et marquee validee,
  la recette fait foi (ancien D6). Reecrire spec et recette dans le meme commit.
- Trois niveaux : primitives `--mr-ref-*`, semantiques `--mr-bg-*` et
  suivants, composants `--mr-<composant>-*`. Une recette ne lit jamais une
  primitive. Un token de composant n'existe que si au moins deux recettes ou
  deux variantes le lisent. Aucune valeur brute hors primitives et themes.
- Etats derives : `hover`, `active`, `focus` et `disabled` se derivent avec
  `color-mix(in oklch, ...)`, jamais declares comme tokens.
- Vocabulaire : identifiants de token, categorie et role en anglais,
  vocabulaire ferme dans un seul fichier. Durees nommees par role (`state`,
  `panel`), pas par composant.
- Themes : `light`, `dark`, `slate`, `oled`, `ocean`, `night`,
  `high-contrast`. `dim` est un alias de `dark`. `system` est une preference
  resolue a l'execution dans `packages/ui`, jamais un theme CSS. La liste des
  themes se lit du dossier `themes/` par un glob, jamais d'une liste recopiee.
- Themes teintes : `slate`, `ocean` et `night` redefinissent localement leurs
  primitives de teinte dans leur propre fichier. L'ancienne exception D25 est
  supprimee par cette simplification : plus de chroma ni hue globaux a
  contourner, chaque theme porte ses teintes.
- Statuts : teintes fixes succes 155, avertissement 80, danger 25, info 255,
  sans primitive dediee.
- Contraste : WCAG 2.2 AA, 4,5:1 pour le texte, 3:1 pour les composants UI,
  pas d'APCA. Les bordures de controle au repos atteignent 3:1 et un controle
  a bordure a toujours un fond opaque.
- Rendu : aucune valeur d'origine ne change sans etre annoncee dans le message
  de commit (ancien D10). Pendant la reconstruction, tout ecart est annonce
  token par token ; la regle stricte de non-regression reprend en fin de Phase 3.
- Suppression : l'ancien systeme a disparu en Phase 1, en commits verts
  separes, une fois mesure que plus rien ne le lisait. Il reste consultable
  par le tag d'archive, jamais reecrit.
- Types : `tokens.d.ts` n'est genere depuis le CSS que si du code TypeScript
  consomme les noms de tokens, avec le consommateur cite. Sinon il n'existe pas.
