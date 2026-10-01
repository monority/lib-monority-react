---
quand: quand un mot du chantier n'est pas évident, ou pour nommer un token.
---

# Glossaire — système de tokens

Ce glossaire s'adresse à quiconque rejoint le chantier, ou à un consommateur de
la librairie qui lit ses tokens. Le lire avant d'écrire une ADR ou de nommer un
token. Pour l'état d'avancement, voir `PLAN.md` section « Reprise ».

**Primitive.** Token de niveau le plus bas, le seul construit directement en
valeur de couleur. Sept existent, toutes préfixées `--mr-ref-` (D11) :
`neutral-hue`, `neutral-chroma`, `brand-hue`, `brand-chroma`, et quatre autres.
Une primitive ne se consomme jamais dans une recette ; elle sert à construire un
token sémantique.

**Sémantique.** Token qui décrit un rôle, pas une couleur. `--mr-text-primary`
vaut ce qu'il vaut dans chaque thème ; on ne sait pas à l'avance de quelle
couleur il s'agit. C'est le seul niveau qu'une recette consomme.

**Niveau.** Rang d'un token dans la chaîne qui va de la primitive à la recette.
Trois : primitive, sémantique, composant. Un token de composant porte le
préfixe du composant et n'est consommé que par lui. Le passage d'un niveau à
l'autre est interdit dans les deux sens : une recette qui consomme une
primitive, un token sémantique qui consomme un token de composant.

**Pas.** Différence minimale entre deux valeurs consécutives d'une échelle.
Vérifié par l'audit : `--mr-ref-*` suit une progression arithmétique. Un pas
irrégulier rend une échelle impossible à interpoler.

**Échelle.** Suite de valeurs ordonnées d'un token sémantique, déclarée et
fermée par famille dans `packages/tokens/categories.json` (D15). Une échelle a
une **plafond**, un **plancher** et un **pas**. On ne sort pas d'une échelle
sans décision : c'est le garde-fou qui empêche la croissance illimitée du
système. Exemple : la taille du spinner est une échelle à trois pas, `{sm, md,
lg}`, qui joue deux rôles — `size` pour le disque, `ring` pour l'épaisseur
(D16).

**Famille.** Groupe de tokens qui partagent un sens : `bg`, `text`, `border`,
`accent`, `status`, `space`, `radius`. La famille est l'unité de
reconstruction : 11b1 la reconstruit famille par famille, un commit par famille,
chacune réversible seule.

**Recette.** Fichier CSS de `packages/styles/src/recipes/`, un par composant,
dans la layer des recettes. C'est l'unique endroit où un composant consomme un
token. 76 recettes, dont 75 référencent au moins un token.

**Cliquet.** Plancher chiffré qui interdit à une métrique de remonter :
les références pendantes, les violations Stylelint, les tests neutralisés. Un
cliquet se vérifie en fin de commit ; s'il remonte, on s'arrête. `3291` a été
retiré des critères parce qu'il comptait autre chose (D24).

**Référence pendante.** Occurrence, dans une recette, d'un token `--mr-*` qui
n'est pas encore défini. L'application ne s'affiche pas tant qu'il en reste :
c'est voulu. L'unité de référence est l'occurrence, pas le token distinct : à
`13259ee`, 2241 occurrences pour 129 tokens distincts.

**Alias.** Nom de rendu qui pointe vers un thème existant. `dim` rend `dark`.
Ce n'est ni un thème — il n'a pas de fichier dans `src/themes/` — ni une
préférence. Déclaré dans `packages/tokens/theme-aliases.json` (D23). Un alias
n'est jamais compté comme thème manquant, ni comme fichier orphelin.

**Préférence.** Choix de l'utilisateur, résolu à l'exécution, jamais à la
compilation. `system` est une préférence : elle ne figure dans aucun fichier de
thème, et le build n'en a rien à faire. Elle reste dans `packages/ui`, hors du
registre de tokens. C'est la distinction que l'alias avait masquée.