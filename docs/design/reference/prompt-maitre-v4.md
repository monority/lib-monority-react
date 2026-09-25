# Refonte Monority UI — prompt maître (v4)

Fichiers joints obligatoires :
- `monority-ui-tokens.reference.css` : valeur exacte de chaque token.
- `monority-ui-tokens.deprecated.reference.css` : correspondance des anciens tokens.

En cas de divergence entre ce document et ces fichiers, arrête-toi et signale-la dans le bilan.

---

## 1. Objectif

Refonte complète de Monority UI (dépôt `lib-monority-react`) : langage visuel, tokens, thèmes, TOUS les composants (apparence et API), puis le moodboard comme vitrine et banc de preuve. Version majeure (semver).

Le moodboard n'est pas l'objet de la refonte. Il est reconstruit en dernier, uniquement avec les composants refondus.

## 2. Règles de travail

- Une seule phase par exécution (phase 3 : une famille de composants par exécution). Tu termines, tu produis le bilan, tu t'arrêtes.
- Aucune affirmation « pass » sans preuve : commande et sortie résumée, fichier et ligne, ou capture nommée. Chaque chiffre du bilan cite la commande qui l'a produit.
- Français ou anglais uniquement. Aucun caractère CJK ni autre alphabet dans le code, les libellés, les commentaires ou le bilan. Contrôle obligatoire en fin de phase, sur le bilan et sur tous les fichiers modifiés :
  `rg -n '[\p{Han}\p{Hiragana}\p{Katakana}\p{Hangul}]' <fichiers>` → 0 résultat. Sinon le bilan est invalide.
- Aucune valeur visuelle en dur dans les composants : couleur, espacement, rayon, taille de police, graisse, hauteur, largeur, durée, ombre, z-index passent par un token `--mr-*`. Exceptions : `0`, `1px` et `2px` pour bordure, rail et focus, `100%`, pourcentages de mise en page.
- Tu n'inventes aucune valeur. Si un cas n'est pas couvert, tu t'arrêtes et tu poses la question.
- Tu ne changes pas la technologie de rendu (React 19, pas de migration vers les Web Components), mais l'API doit rester transposable (section 9).
- Tu ne crées ni commit ni push. Tu proposes le message de commit dans le bilan.
- `docs/roadmap/` n'est pas modifié.
- Les fichiers de conventions (`docs/conventions.md`, `memory-ai/project-knowledge.md`, et tout fichier d'instructions d'agents) sont mis à jour en phase 1 et font foi ensuite. Une convention ancienne qui contredit ce document est une erreur à corriger, pas une règle à suivre.

Arrêt immédiat, avec question dans le bilan, si :
- le worktree suivi contient des changements non commités d'une étape précédente ;
- deux règles de ce document entrent en conflit ;
- une modification casse un test consumer sans entrée de migration possible ;
- la phase exige de sortir de son périmètre ;
- une décision de design n'est pas couverte par ce document.

---

## 3. Décisions structurantes (non négociables)

| Sujet | Décision | Raison |
|---|---|---|
| Préfixe | `--mr-*` pour les tokens, `mr-` pour les classes, `data-mr-*` pour les attributs internes | Existant, aucun coût de migration |
| Source des tokens | `packages/tokens` (Style Dictionary v4, format DTCG) devient la source unique ; `packages/styles/src/tokens` est généré | Aujourd'hui deux sources, dont une importée nulle part |
| Thèmes | `light` (défaut), `dark`, `oled`, `high-contrast`. `dim` devient un alias déprécié de `dark` | `dim` trop proche de `dark` ; `high-contrast` est une vraie exigence d'accessibilité |
| Portée des thèmes | Tout attribut `data-theme`, `data-brand`, `data-density` fonctionne sur `:root` et sur n'importe quel élément | Aujourd'hui light, dim et high-contrast ne fonctionnent que sur `:root` |
| Changement de thème | Script de tête bloquant + `ThemeProvider` sans lecture du stockage au rendu | Supprime le flash et le décalage d'hydratation en rendu serveur |
| Vocabulaire des statuts | `success`, `warning`, `danger`, `info` (+ `neutral`, `accent`) | Vocabulaire déjà utilisé, standard |
| APIs de listes | Conserver la forme pilotée par données (`items`, `columns`, `rows`), unifiée | Meilleure performance, transposable en propriétés, pas de churn inutile |
| Overlays | Couche supérieure native : `<dialog>` + `showModal()`, attribut `popover` ; positionnement conservé en JavaScript | Focus, Échap et empilement natifs, sans portail |
| Polymorphisme | `as` retiré des composants interactifs ; autorisé sur les primitives de mise en page et de texte avec une liste fermée de balises | Sémantique garantie, compatible Web Components |
| Consolidation | Fusions listées en 7.19 uniquement (doublons avérés) ; les noms existants sont conservés | Refondre sans renommer ce qui fonctionne |

---

## 4. Direction de design

### Intention

Monority UI est un instrument de précision : calme en surface, exact dans le détail. L'interface doit donner l'impression d'un outil fiable, pas d'une vitrine. Rien n'est décoratif ; chaque élément visuel porte une information.

### Deux voix typographiques

| Voix | Police | Usage exclusif |
|---|---|---|
| Humaine | `--mr-font-sans` (Geist) | Titres, contenu, libellés d'action, texte d'aide, valeurs chiffrées |
| Système | `--mr-font-mono` (Geist Mono) | Labels de section, identifiants, unités, horodatages, versions, codes, raccourcis clavier |

Un texte n'appartient qu'à une voix. Les chiffres de données sont en voix humaine avec `font-variant-numeric: tabular-nums`, jamais en mono (le point décimal d'une police à chasse fixe crée un trou).

### Signature (trois éléments, appliqués partout sans exception)

1. **Label instrument** : style `label` (Geist Mono 500, 11/16, majuscules, `--mr-tracking-label`, couleur `--mr-text-tertiary`). En tête de chaque groupe : carte, section de formulaire, panneau, groupe de menu, en-tête de table.
2. **Rail d'accent** : la sélection et l'état actif sont signalés par un rail de `--mr-rail-width` (2px) en `--mr-accent`, jamais par un aplat d'accent. Onglets, navigation horizontale, segments, pagination : rail inférieur. Navigation verticale, élément de menu sélectionné, ligne de table sélectionnée : rail gauche.
3. **Profondeur par surfaces et bordures.** Les ombres sont réservées aux éléments flottants via `--mr-shadow-overlay`, seul token d'ombre.

### Règles d'usage de l'accent

- L'accent n'apparaît que pour : l'action principale, le focus, la sélection (rail), la donnée mise en avant, l'état coché ou activé.
- Au maximum une action `primary` visible par zone (carte, dialog, barre d'actions de page).
- Jamais d'accent en fond de grande surface. Le seul fond teinté d'accent autorisé est `--mr-accent-subtle` (badge, plage de dates).
- La couleur n'est jamais le seul porteur de sens : un statut a toujours un texte.

---

## 5. Fondations

### 5.1 Primitives (seules valeurs modifiables par une marque)

| Token | Défaut | Rôle |
|---|---|---|
| `--mr-brand-hue` | `200` | Teinte oklch de l'accent |
| `--mr-brand-chroma` | `0.12` | Chroma de référence de l'accent (chaque token accent en applique un facteur) |
| `--mr-neutral-hue` | `215` | Teinte des neutres |
| `--mr-font-sans` | Geist + pile système | Voix humaine |
| `--mr-font-mono` | Geist Mono + pile système | Voix système |
| `--mr-radius-scale` | `1` | Multiplicateur de tous les rayons sauf `full` |

Les tokens sémantiques ne contiennent jamais de hex ni de teinte en dur pour l'accent et les neutres : ils combinent une luminosité fixée par thème avec les primitives. Seules les couleurs de statut et `danger-solid` ont des teintes fixes.

### 5.2 Thèmes

| Thème | Usage | Seuils de contraste |
|---|---|---|
| `light` | Défaut | AA (section 5.5) |
| `dark` | Préférence sombre | AA |
| `oled` | Écrans OLED, fond noir pur | AA |
| `high-contrast` | Basse vision, `prefers-contrast: more` | Textes 7:1, bordures de contrôle 7:1, focus 4.5:1, aucune ombre, surfaces distinguées par bordures |

- Les sélecteurs de thème sont `[data-theme="…"]`, sans restriction à `:root`. La classe `.monority-theme-root` devient inutile (alias déprécié).
- `dim` est servi par le bloc `dark` pendant une version majeure, puis retiré.
- Résolution de `system` : `prefers-contrast: more` → `high-contrast` ; sinon `prefers-color-scheme` → `dark` ou `light`.
- `getThemeScript()` (exporté) renvoie un script à insérer dans `<head>` : il lit le choix stocké, résout `system` et pose `data-theme` sur `<html>` avant le premier rendu.
- `ThemeProvider` : aucune lecture de `localStorage` ni de `matchMedia` pendant le rendu. Il lit l'attribut posé par le script via `useSyncExternalStore`, écrit le choix et met à jour l'attribut. Il expose `theme`, `resolvedTheme`, `setTheme`. `isDark` est déprécié.
- Tous les thèmes sont atteignables par l'API (`light | dark | oled | high-contrast | system`).
- `@media (forced-colors: active)` est géré en plus de `high-contrast` (section 6).

### 5.3 Couleurs sémantiques

Valeurs pour la marque par défaut : hex indicatif, puis luminosité / chroma / teinte oklch. L'implémentation utilise la formule du fichier de référence.

| Token | Light | Dark | OLED | High-contrast |
|---|---|---|---|---|
| `--mr-bg-canvas` | `#ecf1f3` 0.955 / 0.006 / 215 | `#0e1517` 0.19 / 0.012 / 215 | `#000000` 0 / 0 / 215 | `#ffffff` 1 / 0 / 215 |
| `--mr-bg-surface` | `#f8fbfb` 0.985 / 0.003 / 215 | `#151d20` 0.225 / 0.013 / 215 | `#080d0e` 0.155 / 0.008 / 215 | `#ffffff` 1 / 0 / 215 |
| `--mr-bg-raised` | `#ffffff` 1 / 0 / 215 | `#1c2628` 0.26 / 0.014 / 215 | `#0f1517` 0.19 / 0.01 / 215 | `#ffffff` 1 / 0 / 215 |
| `--mr-bg-overlay` | `#ffffff` 1 / 0 / 215 | `#242d30` 0.29 / 0.014 / 215 | `#171e20` 0.23 / 0.012 / 215 | `#ffffff` 1 / 0 / 215 |
| `--mr-bg-sunken` | `#f1f5f6` 0.968 / 0.005 / 215 | `#11191b` 0.205 / 0.012 / 215 | `#040607` 0.12 / 0.006 / 215 | `#f1f4f5` 0.965 / 0.004 / 215 |
| `--mr-bg-hover` | `#e8eef0` 0.945 / 0.007 / 215 | `#263032` 0.3 / 0.014 / 215 | `#182022` 0.235 / 0.012 / 215 | `#e4e9ea` 0.93 / 0.006 / 215 |
| `--mr-bg-active` | `#e1e8e9` 0.925 / 0.008 / 215 | `#2e393b` 0.335 / 0.015 / 215 | `#1f282a` 0.27 / 0.013 / 215 | `#d7dee0` 0.895 / 0.008 / 215 |
| `--mr-border-subtle` | `#dde4e6` 0.915 / 0.008 / 215 | `#293234` 0.31 / 0.013 / 215 | `#1c2325` 0.25 / 0.01 / 215 | `#6a7376` 0.55 / 0.012 / 215 |
| `--mr-border-default` | `#ccd4d7` 0.865 / 0.01 / 215 | `#384244` 0.37 / 0.014 / 215 | `#2a3234` 0.31 / 0.012 / 215 | `#454f52` 0.42 / 0.014 / 215 |
| `--mr-border-control` | `#7c878a` 0.615 / 0.014 / 215 | `#6f7b7e` 0.575 / 0.015 / 215 | `#626d6f` 0.525 / 0.014 / 215 | `#253033` 0.3 / 0.015 / 215 |
| `--mr-text-primary` | `#131c1f` 0.22 / 0.015 / 215 | `#eef3f4` 0.96 / 0.005 / 215 | `#eef3f4` 0.96 / 0.005 / 215 | `#010405` 0.1 / 0.012 / 215 |
| `--mr-text-secondary` | `#4a5558` 0.44 / 0.015 / 215 | `#b6c0c2` 0.8 / 0.012 / 215 | `#b6c0c2` 0.8 / 0.012 / 215 | `#253033` 0.3 / 0.015 / 215 |
| `--mr-text-tertiary` | `#5d686b` 0.51 / 0.014 / 215 | `#95a1a4` 0.7 / 0.014 / 215 | `#95a1a4` 0.7 / 0.014 / 215 | `#343f42` 0.36 / 0.015 / 215 |
| `--mr-text-disabled` | `#80888a` 0.62 / 0.01 / 215 | `#737c7f` 0.58 / 0.012 / 215 | `#737c7f` 0.58 / 0.012 / 215 | `#5c6567` 0.5 / 0.012 / 215 |
| `--mr-accent` | `#07787d` 0.52 / 0.087 / 200 | `#4cdbe3` 0.82 / 0.12 / 200 | `#4cdbe3` 0.82 / 0.12 / 200 | `#005357` 0.4 / 0.074 / 200 |
| `--mr-accent-hover` | `#08686c` 0.47 / 0.078 / 200 | `#6be7ed` 0.86 / 0.11 / 200 | `#6be7ed` 0.86 / 0.11 / 200 | `#004548` 0.35 / 0.067 / 200 |
| `--mr-accent-active` | `#005c60` 0.43 / 0.073 / 200 | `#3aced6` 0.78 / 0.12 / 200 | `#3aced6` 0.78 / 0.12 / 200 | `#00393c` 0.31 / 0.06 / 200 |
| `--mr-on-accent` | `#ffffff` 1 / 0 / 215 | `#031a1b` 0.2 / 0.03 / 200 | `#031a1b` 0.2 / 0.03 / 200 | `#ffffff` 1 / 0 / 215 |
| `--mr-accent-text` | `#076e73` 0.49 / 0.082 / 200 | `#4cdbe3` 0.82 / 0.12 / 200 | `#4cdbe3` 0.82 / 0.12 / 200 | `#004d51` 0.38 / 0.072 / 200 |
| `--mr-accent-subtle` | `#dcf4f5` 0.95 / 0.025 / 200 | `#0a3537` 0.3 / 0.045 / 200 | `#022729` 0.25 / 0.041 / 200 | `#ddf4f5` 0.95 / 0.024 / 200 |
| `--mr-accent-border` | `#80c5c9` 0.78 / 0.07 / 200 | `#1c777b` 0.52 / 0.08 / 200 | `#1c777b` 0.52 / 0.08 / 200 | `#005357` 0.4 / 0.074 / 200 |
| `--mr-focus-color` | `#068187` 0.55 / 0.092 / 200 | `#4cdbe3` 0.82 / 0.12 / 200 | `#4cdbe3` 0.82 / 0.12 / 200 | `#003638` 0.3 / 0.054 / 200 |
| `--mr-success-text` | `#016d3c` 0.47 / 0.116 / 155 | `#6ad895` 0.8 / 0.14 / 155 | `#6ad895` 0.8 / 0.14 / 155 | `#00572e` 0.4 / 0.1 / 155 |
| `--mr-success-subtle` | `#dff8e6` 0.955 / 0.035 / 155 | `#143320` 0.29 / 0.05 / 155 | `#072614` 0.24 / 0.05 / 155 | `#e3f8e9` 0.96 / 0.03 / 155 |
| `--mr-success-border` | `#94cda7` 0.8 / 0.08 / 155 | `#2c6c47` 0.48 / 0.09 / 155 | `#2c6c47` 0.48 / 0.09 / 155 | `#00572e` 0.4 / 0.1 / 155 |
| `--mr-warning-text` | `#905211` 0.5 / 0.11 / 60 | `#f7c15f` 0.84 / 0.13 / 80 | `#f7c15f` 0.84 / 0.13 / 80 | `#6a3a06` 0.4 / 0.09 / 60 |
| `--mr-warning-subtle` | `#fff0d7` 0.96 / 0.036 / 80 | `#3c2a0e` 0.3 / 0.05 / 75 | `#2f1e02` 0.25 / 0.05 / 75 | `#fff1da` 0.965 / 0.035 / 80 |
| `--mr-warning-border` | `#e7bc81` 0.82 / 0.09 / 75 | `#876125` 0.52 / 0.09 / 75 | `#876125` 0.52 / 0.09 / 75 | `#6a3a06` 0.4 / 0.09 / 60 |
| `--mr-danger-text` | `#ba2b2e` 0.52 / 0.18 / 25 | `#fe8a88` 0.76 / 0.14 / 22 | `#fe8a88` 0.76 / 0.14 / 22 | `#90101a` 0.42 / 0.16 / 25 |
| `--mr-danger-subtle` | `#feebe9` 0.955 / 0.021 / 25 | `#451e1c` 0.29 / 0.06 / 25 | `#371210` 0.24 / 0.06 / 25 | `#ffedeb` 0.96 / 0.02 / 25 |
| `--mr-danger-border` | `#edaaa4` 0.8 / 0.08 / 25 | `#9c433f` 0.5 / 0.12 / 25 | `#9c433f` 0.5 / 0.12 / 25 | `#90101a` 0.42 / 0.16 / 25 |
| `--mr-info-text` | `#2063b0` 0.5 / 0.14 / 255 | `#87bafd` 0.78 / 0.11 / 255 | `#87bafd` 0.78 / 0.11 / 255 | `#02468b` 0.4 / 0.13 / 255 |
| `--mr-info-subtle` | `#e7f1ff` 0.955 / 0.021 / 255 | `#1a2c44` 0.29 / 0.05 / 255 | `#0e2036` 0.24 / 0.05 / 255 | `#e9f3ff` 0.96 / 0.02 / 255 |
| `--mr-info-border` | `#a0c0eb` 0.8 / 0.07 / 255 | `#39659b` 0.5 / 0.1 / 255 | `#39659b` 0.5 / 0.1 / 255 | `#02468b` 0.4 / 0.13 / 255 |
| `--mr-danger-solid` | `#c52b30` 0.54 / 0.19 / 25 | `#fb817f` 0.74 / 0.15 / 22 | `#fb817f` 0.74 / 0.15 / 22 | `#90101a` 0.42 / 0.16 / 25 |
| `--mr-danger-solid-hover` | `#b01e25` 0.49 / 0.18 / 25 | `#ff9592` 0.78 / 0.128 / 22 | `#ff9592` 0.78 / 0.128 / 22 | `#790d14` 0.37 / 0.14 / 25 |
| `--mr-on-danger-solid` | `#ffffff` 1 / 0 / 215 | `#250e0d` 0.2 / 0.04 / 25 | `#250e0d` 0.2 / 0.04 / 25 | `#ffffff` 1 / 0 / 215 |
| `--mr-tooltip-bg` | `#192426` 0.25 / 0.015 / 215 | `#e4e9ea` 0.93 / 0.006 / 215 | `#e4e9ea` 0.93 / 0.006 / 215 | `#010405` 0.1 / 0.012 / 215 |
| `--mr-tooltip-text` | `#f2f6f7` 0.97 / 0.005 / 215 | `#101719` 0.2 / 0.012 / 215 | `#101719` 0.2 / 0.012 / 215 | `#ffffff` 1 / 0 / 215 |
| `--mr-switch-thumb-off` | `#ffffff` 1 / 0 / 215 | `#eef3f4` 0.96 / 0.005 / 215 | `#eef3f4` 0.96 / 0.005 / 215 | `#ffffff` 1 / 0 / 215 |
| `--mr-chart-muted` | `#ccd4d7` 0.865 / 0.01 / 215 | `#384244` 0.37 / 0.014 / 215 | `#2a3234` 0.31 / 0.012 / 215 | `#6a7376` 0.55 / 0.012 / 215 |

Ombre et voile :

| Token | Light | Dark | OLED | High-contrast |
|---|---|---|---|---|
| `--mr-shadow-overlay` | double ombre douce teintée neutre | double ombre noire forte | `none` | `none` |
| `--mr-scrim` | neutre à 40 % | noir à 60 % | noir à 72 % | noir à 60 % |

### 5.4 Rôle de chaque couleur

| Token | Utilisé pour | Interdit pour |
|---|---|---|
| `bg-canvas` | Fond de page | Composants |
| `bg-surface` | Cartes, topbar, sidebar | Contrôles de formulaire |
| `bg-raised` | Button secondary, case à cocher, segment actif | Fond de page |
| `bg-overlay` | Popover, menus, dialog, listbox, toast | Éléments dans le flux |
| `bg-sunken` | Champs de saisie, en-tête de table, conteneur segmented, badge neutre, Kbd, PreCode | Cartes |
| `bg-hover` | Survol, fond désactivé, skeleton | État sélectionné seul (toujours avec rail) |
| `bg-active` | Pression, piste de switch désactivé, piste de slider et de progress | Survol |
| `border-subtle` | Cartes, séparateurs, lignes de table | Bordure d'un contrôle interactif |
| `border-default` | Button secondary, overlays, carte interactive au survol | Séparateurs |
| `border-control` | Champ, case à cocher, radio, piste de switch off (≥ 3:1 garanti, 7:1 en high-contrast) | Décoration |
| `text-primary` | Contenu, titres, valeurs | — |
| `text-secondary` | Descriptions, aide, onglets inactifs | Titres |
| `text-tertiary` | Labels instrument, placeholders, métadonnées | Contenu principal |
| `text-disabled` | Tout contenu désactivé | Texte informatif actif |
| `accent` / `-hover` / `-active` | Fond du Button primary, case cochée, switch on, rail, portion remplie du slider et du progress | Texte long |
| `on-accent` | Texte et glyphes sur fond accent | Autre fond |
| `accent-text` | Liens, texte accentué | Fond |
| `accent-subtle` / `accent-border` | Badge accent, plage de dates sélectionnée | Fond de carte ou de section |
| `focus-color` | Anneau de focus uniquement | Autre usage |
| `{success,warning,danger,info}-text` | Texte de statut ; `danger-text` pour la bordure de champ invalide | Grands fonds |
| `{success,warning,danger,info}-subtle` / `-border` | Badge, Callout, Banner, élément de menu danger au survol | Cartes |
| `danger-solid` / `-hover` / `on-danger-solid` | Button `danger` uniquement | Statut d'erreur (utiliser `danger-text`) |
| `tooltip-bg` / `tooltip-text` | Tooltip (inversé par rapport au thème) | Autre overlay |
| `switch-thumb-off` | Pouce du switch à l'état off | — |
| `chart-muted` | Barres et séries non mises en avant | Texte |

### 5.5 Contrastes vérifiés

Valeur minimale mesurée (WCAG 2.1) sur tous les fonds concernés : `bg-canvas`, `bg-surface`, `bg-raised`, `bg-sunken`, `bg-hover`, `bg-overlay` pour les textes ; `bg-surface`, `bg-raised`, `bg-sunken`, `bg-hover` pour les bordures de contrôle (une case à cocher dans une ligne survolée est un cas réel). Au total : 4 thèmes × 2 marques, 624 paires, 0 échec.

| Paire (sur tous ses fonds) | Seuil | Light | Dark | OLED | Seuil HC | High-contrast | Studio (min. 4 thèmes) |
|---|---|---|---|---|---|---|---|
| Texte principal | 7:1 | 14.72 | 12.10 | 14.82 | 7:1 | 16.77 | 12.13 |
| Texte secondaire | 4.5:1 | 6.59 | 7.29 | 8.93 | 7:1 | 11.06 | 6.60 |
| Texte tertiaire (labels 11px) | 4.5:1 | 4.88 | 5.11 | 6.25 | 7:1 | 8.80 | 4.89 |
| Texte désactivé | 3:1 | 3.09 | 3.18 | 3.90 | 4.5:1 | 4.87 | 3.10 |
| Accent texte | 4.5:1 | 5.14 | 8.02 | 9.46 | 7:1 | 7.81 | 5.36 |
| Anneau de focus | 3:1 | 3.97 | 8.13 | 9.95 | 4.5:1 | 10.84 | 4.15 |
| Bordure de contrôle | 3:1 | 3.15 | 3.12 | 3.10 | 7:1 | 11.06 | 3.09 |
| Texte sur accent (3 états) | 4.5:1 | 5.29 | 9.41 | 9.41 | 7:1 | 8.81 | 5.53 |
| Texte sur danger-solid | 4.5:1 | 5.58 | 7.43 | 7.43 | 7:1 | 9.19 | 5.58 |
| Success | 4.5:1 | 5.50 | 7.68 | 9.16 | 7:1 | 7.15 | 5.49 |
| Warning | 4.5:1 | 5.29 | 8.22 | 9.74 | 7:1 | 7.71 | 5.29 |
| Danger | 4.5:1 | 5.16 | 5.96 | 7.30 | 7:1 | 7.49 | 5.15 |
| Info | 4.5:1 | 5.16 | 6.79 | 8.24 | 7:1 | 7.59 | 5.16 |
| Tooltip | 7:1 | 14.63 | 14.72 | 14.72 | 7:1 | 20.57 | 14.66 |
| Pouce de switch / piste off | 3:1 | 3.70 | 3.88 | 4.78 | 3:1 | 13.57 | 3.71 |

Toute modification d'une couleur doit être re-vérifiée avec le même jeu de paires, en CI (critère X2). Deux valeurs sont volontairement proches du seuil pour préserver la légèreté du thème light : `text-tertiary` (4.88:1) et `border-control` (3.15:1). Ne jamais les éclaircir.

### 5.6 Espacement

Grille de 4px. Nouveau nom `--mr-spacing-*` (numérotation × 4px) ; l'ancienne échelle `--mr-space-*` est conservée telle quelle dans le fichier déprécié, pour éviter tout changement de valeur silencieux. Les demi-pas 2px et 6px sont réservés à l'intérieur des petits composants.

| Token | Valeur | Usage type |
|---|---|---|
| `--mr-spacing-0-5` | 2px | Inset du pouce de switch, padding du segmented |
| `--mr-spacing-1` | 4px | Label → titre de carte, padding de menu, padding vertical de tooltip |
| `--mr-spacing-1-5` | 6px | Contrôle → texte d'aide, padding horizontal du badge sm, point → texte |
| `--mr-spacing-2` | 8px | Écart icône/texte, libellé → contrôle, actions groupées |
| `--mr-spacing-3` | 12px | Padding de cellule, pile par défaut |
| `--mr-spacing-4` | 16px | Section, écart entre cartes |
| `--mr-spacing-5` | 20px | Padding de carte (comfortable) |
| `--mr-spacing-6` | 24px | Padding de dialog, padding de page |
| `--mr-spacing-8` à `--mr-spacing-24` | 32 à 96px | Mise en page uniquement |

### 5.7 Rayons

| Token | Valeur (scale 1) | Attribué à |
|---|---|---|
| `--mr-radius-inline` | 4px | Badge, case à cocher, segment, skeleton, Kbd, marque de topbar |
| `--mr-radius-control` | 6px | Button, Input, Select, Textarea, conteneur segmented, élément de menu, tooltip |
| `--mr-radius-card` | 10px | Card, Callout, PreCode |
| `--mr-radius-overlay` | 12px | Popover, menus, listbox, dialog, drawer (bord intérieur), toast |
| `--mr-radius-full` | 9999px | Switch, radio, point de statut, spinner, avatar, slider, progress uniquement |

Aucun autre rayon. Un élément placé à 8px ou moins du bord d'un conteneur arrondi prend le rayon du conteneur moins cet écart, arrondi au token inférieur (segment : 6 − 2 = 4 ; élément de menu : 12 − 4 = 8 → `control`).

### 5.8 Bordures et focus

- Bordure : `--mr-border-width` (1px), `solid`. Seule exception : zone de dépôt de FileUpload en `dashed`.
- Tout contrôle interactif a une bordure de 1px, `transparent` si invisible : géométrie identique entre variantes, bordure visible en contraste forcé.
- Rail : `--mr-rail-width`, `--mr-accent`, rendu par pseudo-élément.
- Focus : `outline: var(--mr-focus-width) solid var(--mr-focus-color); outline-offset: var(--mr-focus-offset);` uniquement sur `:focus-visible`. Dans une liste (menu, ligne de table, onglet, cellule de calendrier) : `outline-offset: -2px`. Jamais `outline: none` sans remplacement, jamais de `box-shadow` pour le focus.

### 5.9 Typographie

Tailles en `rem` (respect de la taille de police choisie par l'utilisateur).

| Style | Token `font` | Taille / ligne (px) | Graisse | Police | Interlettrage | Usage |
|---|---|---|---|---|---|---|
| display | `--mr-type-display` | 32 / 40 | 600 | sans | `--mr-tracking-display` | Titre majeur |
| h1 | `--mr-type-h1` | 24 / 32 | 600 | sans | `--mr-tracking-h1` | Titre de page |
| h2 | `--mr-type-h2` | 18 / 24 | 600 | sans | 0 | Titre de dialog, de section |
| h3 | `--mr-type-h3` | 16 / 24 | 600 | sans | 0 | Titre de carte |
| body-lg | `--mr-type-body-lg` | 16 / 24 | 400 | sans | 0 | Introduction |
| body | `--mr-type-body` | 14 / 20 | 400 | sans | 0 | Texte par défaut, cellules |
| body-strong | `--mr-type-body-strong` | 14 / 20 | 500 | sans | 0 | Libellé de bouton md, onglet |
| small | `--mr-type-small` | 13 / 20 | 400 | sans | 0 | Descriptions, éléments compacts |
| small-strong | `--mr-type-small-strong` | 13 / 20 | 500 | sans | 0 | Libellé de champ, navigation |
| caption | `--mr-type-caption` | 12 / 16 | 400 | sans | 0 | Aide, tooltip |
| label | `--mr-type-label` | 11 / 16 | 500 | mono | `--mr-tracking-label` + majuscules | Label instrument, en-tête de table |
| code | `--mr-type-code` | 13 / 20 | 400 | mono | 0 | Identifiants, unités |
| code-sm | `--mr-type-code-sm` | 12 / 16 | 400 | mono | 0 | Métadonnées, versions, raccourcis |
| data-lg | `--mr-type-data-lg` | 32 / 40 | 600 | sans | `--mr-tracking-display` + `tabular-nums` | Valeur de métrique |

- Aucune taille hors de 11 / 12 / 13 / 14 / 16 / 18 / 24 / 32. Aucune graisse hors de 400 / 500 / 600 (`--mr-font-weight-bold` est déprécié). Minimum 11px. Plus de tailles fluides (`clamp`).
- La propriété `font` réinitialise `font-variant-numeric` : poser `tabular-nums` et `letter-spacing` après `font`.
- Polices : fichiers variables woff2 auto-hébergés, sous-ensemble latin, `font-display: swap`, préchargement de Geist uniquement, police de repli ajustée (`size-adjust`) pour éviter tout décalage de mise en page.

### 5.10 Icônes

- `--mr-icon-size-sm` 16px, `--mr-icon-size-md` 16px (anciennement 18px), `--mr-icon-size-lg` 20px.
- Trait rendu 1.5px quelle que soit la taille : `vector-effect: non-scaling-stroke` + `stroke-width: var(--mr-icon-stroke)`. Glyphes de coche et de tiret : `--mr-glyph-stroke` (2).
- Les icônes internes existantes (`strokeWidth="2"` en dur) sont alignées sur cette règle.
- `currentColor` ; icône décorative en `aria-hidden="true"`.

### 5.11 Mouvement

| Token | Valeur | Usage |
|---|---|---|
| `--mr-duration-fast` | 120ms (anciennement 150) | Couleurs de survol, tooltip, chevron |
| `--mr-duration-base` | 180ms (anciennement 200) | Rail, pouce de switch, popover, menu |
| `--mr-duration-slow` | 240ms (anciennement 300) | Dialog, drawer, transition de panneau |
| `--mr-duration-spin` | 800ms | Spinner (1600ms en mouvement réduit) |
| `--mr-duration-pulse` | 1200ms | Skeleton (0 en mouvement réduit) |
| `--mr-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Changements d'état |
| `--mr-ease-enter` | `cubic-bezier(0, 0, 0, 1)` | Apparitions |
| `--mr-ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Disparitions (durée `fast`) |

Propriétés animables : `opacity`, `transform`, `color`, `background-color`, `border-color`, `outline-color`. Jamais `transition: all`, jamais d'animation de dimension ou de position. Aucun rebond (`--mr-ease-spring` supprimé), aucune mise à l'échelle au clic. Les `@keyframes` sont placés à l'intérieur de leur `@layer` (convention existante).

### 5.12 Marque alternative de démonstration (« studio »)

Calée sur l'identité du site Monority Studio : accent or champagne, neutres bleutés, Inter + JetBrains Mono, rayons deux fois plus serrés. Uniquement les 6 primitives :

| Primitive | Valeur |
|---|---|
| `--mr-brand-hue` | `85` |
| `--mr-brand-chroma` | `0.1` |
| `--mr-neutral-hue` | `250` |
| `--mr-font-sans` | Inter + pile système |
| `--mr-font-mono` | JetBrains Mono + pile système |
| `--mr-radius-scale` | `0.5` |

### 5.13 Densité

`data-density` sur n'importe quel élément. `comfortable` par défaut.

| Token | Comfortable | Compact |
|---|---|---|
| `--mr-control-size-sm` / `-md` / `-lg` | 32 / 40 / 48 | 28 / 32 / 40 |
| `--mr-control-padding-inline-sm` / `-md` / `-lg` | 12 / 16 / 20 | 8 / 12 / 16 |
| `--mr-control-font-size-sm` / `-md` / `-lg` | 13 / 14 / 16 | 12 / 13 / 14 |
| `--mr-control-gap` | 8 | 6 |
| `--mr-card-padding` / `--mr-card-gap` | 20 / 16 | 16 / 12 |
| `--mr-table-head-height` / `--mr-table-row-height` | 32 / 40 | 28 / 32 |
| `--mr-table-cell-padding-inline` | 12 | 8 |
| `--mr-tabs-height` / `--mr-menu-item-height` | 40 / 32 | 32 / 28 |
| `--mr-stack-gap` / `--mr-section-gap` / `--mr-grid-gap` | 12 / 16 / 16 | 8 / 12 / 12 |
| `--mr-calendar-cell-size` | 32 | 28 |

Les tokens de composants (badge, switch, checkbox, avatar…) ne dépendent pas de la densité.

### 5.14 Mise en page et superposition

- `--mr-page-max-width` 1440px (anciennement 1600), `--mr-page-padding` 24px (16px sous 640px), `--mr-topbar-height` 48px.
- Points de rupture : 640px et 1100px, plus 1600px pour le moodboard. Largeur minimale supportée : 320px sans défilement horizontal de la page.
- `--mr-z-sticky` 100, `--mr-z-dropdown` 1000, `--mr-z-popover` 1100, `--mr-z-modal` 1200, `--mr-z-toast` 1300, `--mr-z-tooltip` 1400 : uniquement pour les éléments collants et les cas sans couche native.

### 5.15 Tokens supprimés

`--mr-blur-*` (aucun flou ni effet de verre), `--mr-ease-spring`, `--mr-opacity-*` (désactivé par couleur, jamais par opacité), `--mr-bg-canvas-rgb` (remplacé par `color-mix()`), `--mr-font-weight-bold`, tailles fluides `clamp()`. Ils passent dans le fichier déprécié avec leur valeur actuelle, puis sont retirés.

### 5.16 Correspondance des anciens tokens

Les tokens core sans équivalent (`--mr-space-*`, `--mr-radius-xs/sm/md/lg`, `--mr-text-*`, `--mr-dur-*`, `--mr-leading-*`, `--mr-color-neutral-*`, anciennes ombres) sont déplacés dans le fichier déprécié avec leur valeur actuelle. Correspondances sémantiques (« approx » : rôle proche, rendu différent, à signaler dans `MIGRATION.md`) :

| Ancien token | Nouveau token | Correspondance |
|---|---|---|
| `--mr-bg-subtle` | `--mr-bg-sunken` | exact |
| `--mr-bg-surface-elevated` | `--mr-bg-raised` | exact |
| `--mr-bg-surface-strong` | `--mr-bg-raised` | approx |
| `--mr-bg-control` | `--mr-bg-sunken` | approx |
| `--mr-bg-inverse` | `--mr-tooltip-bg` | approx |
| `--mr-bg-accent-soft` | `--mr-accent-subtle` | exact |
| `--mr-bg-accent-strong` | `--mr-accent-active` | approx |
| `--mr-border-strong` | `--mr-border-default` | exact |
| `--mr-border-accent` | `--mr-accent-border` | exact |
| `--mr-elevation-overlay` | `--mr-shadow-overlay` | exact |
| `--mr-info` | `--mr-info-text` | exact |
| `--mr-info-soft` | `--mr-info-subtle` | exact |
| `--mr-info-contrast` | `--mr-info-text` | approx |
| `--mr-success` | `--mr-success-text` | exact |
| `--mr-success-soft` | `--mr-success-subtle` | exact |
| `--mr-success-contrast` | `--mr-success-text` | approx |
| `--mr-warning` | `--mr-warning-text` | exact |
| `--mr-warning-soft` | `--mr-warning-subtle` | exact |
| `--mr-warning-contrast` | `--mr-warning-text` | approx |
| `--mr-danger` | `--mr-danger-solid` | exact |
| `--mr-danger-soft` | `--mr-danger-subtle` | exact |
| `--mr-danger-contrast` | `--mr-on-danger-solid` | exact |
| `--mr-fg-strong` | `--mr-text-primary` | exact |
| `--mr-fg-base` | `--mr-text-primary` | approx |
| `--mr-fg-muted` | `--mr-text-secondary` | approx |
| `--mr-fg-inverse` | `--mr-tooltip-text` | approx |
| `--mr-fg-accent` | `--mr-accent-text` | exact |
| `--mr-accent-strong` | `--mr-accent-hover` | exact |
| `--mr-accent-contrast` | `--mr-on-accent` | exact |
| `--mr-accent-foreground` | `--mr-on-accent` | approx |
| `--mr-accent-soft` | `--mr-accent-subtle` | exact |
| `--mr-state-hover` | `--mr-bg-hover` | exact |
| `--mr-state-active` | `--mr-bg-active` | exact |
| `--mr-state-disabled` | `--mr-text-disabled` | approx |
| `--mr-state-focus-ring` | `--mr-focus-color` | exact |
| `--mr-surface-default` | `--mr-bg-surface` | exact |
| `--mr-surface-strong` | `--mr-bg-raised` | approx |
| `--mr-surface-control` | `--mr-bg-sunken` | approx |
| `--mr-btn-radius` | `--mr-radius-control` | exact |
| `--mr-btn-height-sm` | `--mr-control-size-sm` | exact |
| `--mr-btn-height-md` | `--mr-control-size-md` | exact |
| `--mr-btn-height-lg` | `--mr-control-size-lg` | exact |
| `--mr-btn-padding-x` | `--mr-control-padding-inline-md` | exact |
| `--mr-input-radius` | `--mr-radius-control` | exact |
| `--mr-input-height` | `--mr-control-size-md` | exact |
| `--mr-input-padding-inline` | `--mr-control-padding-inline-md` | exact |
| `--mr-textarea-min-height-md` | `--mr-textarea-min-height` | exact |
| `--mr-card-radius` | `--mr-radius-card` | exact |
| `--mr-card-padding-md` | `--mr-card-padding` | exact |
| `--mr-card-gap-md` | `--mr-card-gap` | exact |
| `--mr-modal-radius` | `--mr-radius-overlay` | exact |
| `--mr-modal-width` | `--mr-dialog-width-md` | exact |
| `--mr-modal-padding` | `--mr-spacing-6` | exact |
| `--mr-font-body` | `--mr-font-sans` | exact |
| `--mr-font-display` | `--mr-font-sans` | exact |
| `--mr-border-width-focus` | `--mr-focus-width` | exact |
| `--mr-ease-in-out` | `--mr-ease-standard` | approx |
| `--mr-ease-out` | `--mr-ease-enter` | approx |
| `--mr-ease-decelerate` | `--mr-ease-enter` | approx |
| `--mr-ease-in` | `--mr-ease-exit` | approx |
| `--mr-ease-accelerate` | `--mr-ease-exit` | exact |
| `--mr-ease-spring` | `--mr-ease-standard` | approx |
| `--mr-duration-normal` | `--mr-duration-base` | exact |
| `--mr-duration-enter` | `--mr-duration-base` | approx |
| `--mr-duration-exit` | `--mr-duration-fast` | approx |
| `--mr-duration-loop` | `--mr-duration-spin` | approx |

Tokens conservés sous le même nom et le même rôle : `--mr-bg-canvas`, `--mr-bg-surface`, `--mr-border-subtle`, `--mr-accent`, `--mr-danger-text`, `--mr-border-width`, `--mr-focus-width`, `--mr-focus-offset`, `--mr-font-mono`, `--mr-font-weight-regular/medium/semibold`, `--mr-control-size-*`, `--mr-control-padding-inline-*`, `--mr-icon-size-*`, `--mr-duration-fast/base/slow`, `--mr-ease-standard`, `--mr-radius-full`, `--mr-shadow-overlay`, `--mr-card-padding`, `--mr-card-gap`, `--mr-page-max-width`. Ceux dont la valeur change sont listés dans `MIGRATION.md`.

---

## 6. Règles d'état communes

| État | Déclencheur | Règle |
|---|---|---|
| Survol | `:hover` dans `@media (hover: hover) and (pointer: fine)` | Aucun effet de survol sur écran tactile |
| Pression | `:active` | Fond `bg-active` ou variante `-active` ; aucune transformation |
| Focus | `:focus-visible` | Section 5.8 |
| Désactivé | `disabled` natif, sinon `aria-disabled="true"` | `cursor: not-allowed`, aucun changement au survol, couleurs `text-disabled` / `bg-hover` / `border-subtle`. Jamais d'opacité |
| Chargement | `loading` | `aria-busy="true"`, interactions bloquées, géométrie inchangée |
| Invalide | `invalid` → `aria-invalid="true"` | Bordure `danger-text`, message lié par `aria-describedby` |
| Lecture seule | `readOnly` | Pas de survol, bordure `border-subtle`, fond transparent, texte `text-primary`, focusable |
| Sélectionné | `aria-selected`, `aria-current`, `aria-checked`, `aria-pressed` | Rail d'accent (section 4) |

- **Un seul jeu de sélecteurs** : les états et variantes sont stylés par attributs `data-*` (`[data-variant="primary"]`, `[data-size="md"]`). Les classes modificatrices BEM (`.mr-btn--primary`) sont supprimées. Une classe de base par composant (`.mr-btn`) reste l'unique crochet de classe.
- **Prévisualisation d'état** : chaque composant interactif accepte `data-mr-preview="hover | active | focus"`, et ses sélecteurs sont écrits `:is(:hover, [data-mr-preview="hover"])`, etc. Réservé à la documentation et aux tests ; aucun autre moyen de forcer un état.
- **Contraste forcé** (`@media (forced-colors: active)`) : bordures `CanvasText`, rail et focus `Highlight`, glyphes `CanvasText`. Aucun état ne repose uniquement sur un fond.

---

## 7. Spécifications des composants

Chaque composant de l'inventaire reçoit une spec dans `docs/design/components/<nom>.md`. Les familles de 7.1 à 7.17 sont définies intégralement ; 7.18 donne la spec de toutes les autres par référence ; 7.19 liste les fusions.

### 7.1 Button, IconButton, CopyButton

Anatomie : `[iconLeading] libellé [iconTrailing]`, spinner superposé en chargement.

| Taille | Hauteur | Padding horizontal | Police | Icône | Écart | Rayon |
|---|---|---|---|---|---|---|
| sm | `--mr-control-size-sm` | `--mr-control-padding-inline-sm` | 500, `--mr-control-font-size-sm`, ligne 20 | `--mr-icon-size-sm` | `--mr-control-gap` | `control` |
| md | `--mr-control-size-md` | `--mr-control-padding-inline-md` | 500, `--mr-control-font-size-md`, ligne 20 | `--mr-icon-size-md` | `--mr-control-gap` | `control` |
| lg | `--mr-control-size-lg` | `--mr-control-padding-inline-lg` | 500, `--mr-control-font-size-lg`, ligne 24 | `--mr-icon-size-lg` | `--mr-control-gap` | `control` |

Hauteur fixe (`block-size`), pas déduite du padding. IconButton : carré (largeur = hauteur), `label` obligatoire. Libellé sur une ligne. `fullWidth` conservé.

| Variante | Repos (fond / texte / bordure) | Survol | Pression | Désactivé |
|---|---|---|---|---|
| primary | `accent` / `on-accent` / transparent | fond `accent-hover` | fond `accent-active` | `bg-hover` / `text-disabled` / `border-subtle` |
| secondary | `bg-raised` / `text-primary` / `border-default` | fond `bg-hover` | fond `bg-active` | idem |
| ghost | transparent / `text-secondary` / transparent | `bg-hover` / `text-primary` | `bg-active` / `text-primary` | transparent / `text-disabled` / transparent |
| danger | `danger-solid` / `on-danger-solid` / transparent | fond `danger-solid-hover` | fond `danger-solid-hover` | `bg-hover` / `text-disabled` / `border-subtle` |

Variantes retirées (alias dépréciés avec avertissement en développement) : `muted` → `secondary`, `subtle` → `ghost`, `warning` → `secondary`. Variante par défaut : `secondary` (anciennement `primary`).

Chargement : couleurs de la variante conservées ; libellé et icônes en `opacity: 0` (restent dans l'arbre d'accessibilité) ; spinner centré à la taille de l'icône, `currentColor` ; `aria-busy="true"`, `aria-disabled="true"`, clics ignorés ; largeur identique au repos.

Les modes `copyValue` et `iconOnly` sont retirés de Button : CopyButton et IconButton sont les seules APIs pour ces usages (P8). CopyButton : IconButton ou Button ghost, icône copie → coche pendant `duration`, annonce « Copié » dans une région `aria-live="polite"`.

Transitions : `background-color`, `border-color`, `color` en `--mr-duration-fast` / `--mr-ease-standard`.

API : `variant`, `size` (défaut `md`), `loading`, `disabled`, `type` (défaut `button`), `fullWidth`, `iconLeading`, `iconTrailing`, contenu. `as` retiré ; un bouton-lien s'obtient avec `ButtonLink` (rend un `<a>` stylé comme Button, mêmes variantes).

### 7.2 Toggle et ToggleGroup

- Toggle : Button `secondary` + `aria-pressed`. Pressé : fond `bg-active`, texte `text-primary`, rail inférieur 2px `accent` en retrait de `--mr-spacing-2`.
- ToggleGroup mode `single` = segmented control :

| Taille | Conteneur | Segment | Padding horizontal du segment |
|---|---|---|---|
| sm | `--mr-control-size-sm` | conteneur − 4px | `--mr-spacing-2` |
| md | `--mr-control-size-md` | conteneur − 4px | `--mr-spacing-3` |
| lg | `--mr-control-size-lg` | conteneur − 4px | `--mr-spacing-4` |

Conteneur : `bg-sunken`, bordure `border-subtle`, rayon `control`, padding `--mr-spacing-0-5` (segment minimal : 24px en sm compact). Segment : rayon `inline`, `--mr-type-small-strong`, inactif `text-secondary` (survol `text-primary`), actif `bg-raised` + `text-primary` + bordure `border-subtle` + rail inférieur 2px `accent` en retrait de `--mr-spacing-2`. Mode `single` : `role="radiogroup"`, segments `role="radio"`, flèches. Mode `multiple` : groupe de Toggle, `role="group"`.

API : `type` (`single | multiple`), `items` (`{ value, label, icon?, disabled? }`), `value` / `defaultValue`, `onValueChange`, `size`, `name`.

### 7.3 Badge

| Taille | Hauteur | Padding horizontal | Police | Point |
|---|---|---|---|---|
| sm | `--mr-badge-height-sm` | `--mr-spacing-1-5` | 500, 11/16, sans | `--mr-badge-dot-size`, écart `--mr-spacing-1-5` |
| md | `--mr-badge-height-md` | `--mr-spacing-2` | 500, 12/16, sans | idem |

| Ton | Fond | Texte et point | Bordure |
|---|---|---|---|
| neutral | `bg-sunken` | `text-secondary` | `border-subtle` |
| accent | `accent-subtle` | `accent-text` | `accent-border` |
| success / warning / danger / info | `{ton}-subtle` | `{ton}-text` | `{ton}-border` |

Rayon `inline`, bordure 1px, `tabular-nums`. Jamais d'ombre, de survol ni de focus : un badge n'est pas interactif. Une variation chiffrée (« +4.8 % ») est un badge `success` ou `danger` selon le sens favorable, jamais `accent`.

API : `tone` (défaut `neutral`), `size` (défaut `sm`), `dot`, contenu.

### 7.4 Field et FormSection

- Libellé : `--mr-type-small-strong`, `text-primary`. Requis : astérisque `text-tertiary` en `aria-hidden`, attribut `required` sur le contrôle.
- Écarts : libellé → contrôle `--mr-spacing-2` ; contrôle → aide `--mr-spacing-1-5` ; entre deux champs `--mr-section-gap`.
- Aide : `--mr-type-caption`, `text-secondary`. Erreur : `--mr-type-caption`, `danger-text`, remplace l'aide, liée par `aria-describedby`, contrôle en `aria-invalid="true"`.
- Identifiants générés et reliés automatiquement (pattern Provider existant conservé : FieldLabel, FieldContent, FieldError…).
- Disposition horizontale (Checkbox, Radio, Switch) : contrôle puis libellé `--mr-type-body`, écart `--mr-spacing-2`, description `--mr-type-caption` `text-secondary`, rangée d'au moins `--mr-min-target`, rangée entière cliquable.
- FormSection : label instrument, titre `h3`, description `small` `text-secondary`, champs séparés par `--mr-section-gap`, sections séparées par un Divider.

### 7.5 Input, Textarea, NumberInput, PasswordInput

Dimensions identiques au Button de même taille ; police 400 à `--mr-control-font-size-*`. Icône en début ou fin : padding du côté concerné = padding horizontal + icône + `--mr-spacing-2`. Textarea : hauteur minimale `--mr-textarea-min-height`, padding vertical `--mr-spacing-2` (obligatoire, pas de padding natif), redimensionnement vertical.

| État | Fond | Texte | Bordure |
|---|---|---|---|
| repos | `bg-sunken` | `text-primary` (placeholder `text-tertiary`) | `border-control` |
| survol | `bg-sunken` | idem | `text-tertiary` |
| focus | `bg-sunken` | idem | `focus-color` + anneau |
| invalide | `bg-sunken` | idem | `danger-text` (anneau `danger-text` au focus) |
| désactivé | `bg-hover` | `text-disabled` | `border-subtle` |
| lecture seule | transparent | `text-primary` | `border-subtle` |

NumberInput : boutons − / + en IconButton ghost sm intégrés à droite, `tabular-nums`, flèches haut / bas. PasswordInput : IconButton ghost sm de révélation avec libellé « Afficher / Masquer le mot de passe ».

API : `size`, `invalid`, `disabled`, `readOnly`, `required`, `name`, `value` / `defaultValue`, `placeholder`, `iconLeading`, `iconTrailing`. `onChange` natif conservé ; `onValueChange(value)` ajouté.

### 7.6 Select et Combobox

Déclencheur : mêmes dimensions et états qu'Input. Chevron : icône `--mr-icon-size-*`, `text-secondary`, aligné sur le padding horizontal, centré, rotation de 180° à l'ouverture (`fast`). Padding droit = padding horizontal + icône + `--mr-spacing-2`.

Liste (popover natif) : mêmes styles que les menus (7.10), largeur minimale = déclencheur, hauteur maximale `--mr-listbox-max-height`. Option sélectionnée : rail gauche + coche en fin de ligne. Combobox : Input + même liste, filtrage, état vide « Aucun résultat » en `text-secondary`.

Clavier : flèches, Home / End, saisie rapide, Entrée et Espace, Échap ferme et rend le focus. Pattern ARIA listbox / combobox complet.

API : `items` (`{ value, label, description?, disabled?, group? }`), `value` / `defaultValue`, `onValueChange`, `open` / `defaultOpen`, `onOpenChange`, `size`, `invalid`, `disabled`, `required`, `name`, `placeholder`. Participe au formulaire natif.

### 7.7 Checkbox et RadioGroup

| Taille | Boîte | Glyphe | Point radio |
|---|---|---|---|
| sm, md | `--mr-checkbox-size-md` | `--mr-checkbox-glyph-md`, trait `--mr-glyph-stroke` | `--mr-radio-dot-md` |
| lg | `--mr-checkbox-size-lg` | `--mr-checkbox-glyph-lg` | `--mr-radio-dot-lg` |

Rayon : `inline` (Checkbox), `full` (Radio).

| État | Fond | Bordure | Glyphe |
|---|---|---|---|
| non coché | `bg-raised` | `border-control` | — |
| non coché, survol | `bg-raised` | `text-tertiary` | — |
| coché / indéterminé | `accent` | `accent` | `on-accent` |
| coché, survol | `accent-hover` | `accent-hover` | `on-accent` |
| invalide (non coché) | `bg-raised` | `danger-text` | — |
| désactivé | `bg-hover` | `border-subtle` | `text-disabled` (libellé `text-disabled`) |

Focus : anneau autour de la boîte. Cible : rangée entière. État interne contrôlé / non contrôlé selon le pattern existant (`isControlled`).

API Checkbox : `checked` / `defaultChecked`, `onCheckedChange`, `indeterminate`, `invalid`, `disabled`, `required`, `name`, `value`, contenu. RadioGroup : `items`, `value` / `defaultValue`, `onValueChange`, `orientation`, `name` ; flèches.

### 7.8 Switch et Slider

Switch :

| Taille | Piste (L × H) | Pouce | Déplacement |
|---|---|---|---|
| sm | `--mr-switch-track-w-sm` × `--mr-switch-track-h-sm` | hauteur − 4px | largeur − hauteur |
| md | `-w-md` × `-h-md` | hauteur − 4px | largeur − hauteur |
| lg | `-w-lg` × `-h-lg` | hauteur − 4px | largeur − hauteur |

Pouce inséré de `--mr-spacing-0-5`, rayon `full`. Off : piste `border-control`, pouce `switch-thumb-off` (survol : piste `text-tertiary`). On : piste `accent`, pouce `on-accent` (survol : `accent-hover`). Désactivé : piste `bg-active`, pouce `text-disabled`. Déplacement par `transform`, `base` / `standard`. `role="switch"`, `aria-checked`. API : `checked` / `defaultChecked`, `onCheckedChange`, `disabled`, `size`, `name`, `value`, contenu.

Slider : piste `--mr-slider-track-h`, `bg-active`, rayon `full` ; portion remplie `accent` ; pouce `--mr-slider-thumb-size`, `bg-raised`, bordure `border-control`, rayon `full`, focus sur le pouce ; valeur en `--mr-type-code` `tabular-nums` si affichée. Flèches, Page Up / Down, Home / End. API : `value` / `defaultValue`, `onValueChange`, `min`, `max`, `step`, `disabled`, `name`.

### 7.9 Tabs

- Conteneur : bordure inférieure `border-subtle`, onglets alignés à gauche, sans écart. `fullWidth` répartit l'espace.
- Onglet : hauteur `--mr-tabs-height`, padding horizontal `--mr-spacing-3`, `--mr-type-body-strong` (`small-strong` en compact). Inactif `text-secondary`, survol `text-primary`, actif `text-primary`, désactivé `text-disabled`.
- Rail : 2px `accent`, bas de l'onglet actif, superposé à la bordure, retrait `--mr-spacing-3` de chaque côté, déplacement par `transform` (`base` / `standard`).
- Focus : `outline-offset: -2px`. Panneau : padding supérieur `--mr-section-gap` ; seul le panneau actif est rendu visible, le contenu change réellement.
- Clavier : activation automatique aux flèches, Home / End. Pattern ARIA tabs complet.

API : `items` (`{ value, label, content, disabled? }`), `value` / `defaultValue`, `onValueChange` (remplace `onChange`), `size`, `fullWidth`. La prop `tone` est retirée (l'accent est fixé par le système).

### 7.10 Popover, DropdownMenu, ContextMenu, Menubar, HoverCard, NavigationMenu (panneaux)

- Conteneur : attribut `popover` natif, `bg-overlay`, bordure `border-default`, rayon `overlay`, padding `--mr-spacing-1`, `--mr-shadow-overlay`, largeur `--mr-menu-min-width` à `--mr-menu-max-width`, hauteur maximale `--mr-menu-max-height`, écart `--mr-popover-offset`.
- Apparition : `opacity` + `scale(0.98 → 1)`, `base` / `enter` ; disparition `fast` / `exit`.
- Élément : hauteur `--mr-menu-item-height`, padding horizontal `--mr-spacing-2`, rayon `control`, `--mr-type-body` (`small` en compact), icône 16 en début avec écart `--mr-spacing-2`, raccourci en fin en `--mr-type-code-sm` `text-tertiary` dans un Kbd.
- États d'élément : survol et élément actif au clavier `bg-hover` ; sélectionné : rail gauche 2px (retrait vertical 4px) + coche en fin ; `tone="danger"` : texte `danger-text`, survol `danger-subtle` ; désactivé `text-disabled`.
- Séparateur : 1px `border-subtle`, marge verticale `--mr-spacing-1`. Titre de groupe : style `label`, hauteur `--mr-menu-group-label-height`, padding horizontal `--mr-spacing-2`.
- Fermeture au clic extérieur et à Échap, retour du focus au déclencheur. Menus : flèches, Home / End, saisie rapide, Entrée. Menubar : navigation horizontale par flèches, élément ouvert avec rail inférieur. HoverCard : ouverture après `--mr-hover-card-delay`, aussi au focus.

API : `open` / `defaultOpen`, `onOpenChange`, `placement` (`top | bottom | left | right` + `-start | -end`), `items` (`{ value, label, icon?, shortcut?, tone?, disabled?, type?: 'item' | 'separator' | 'group', items? }`), `onSelect(value)`.

### 7.11 Tooltip

- `tooltip-bg`, `tooltip-text`, `--mr-type-caption`, padding `--mr-spacing-1` × `--mr-spacing-2`, rayon `control`, largeur maximale `--mr-tooltip-max-width`, écart `--mr-tooltip-offset`, sans flèche, `--mr-shadow-overlay`, attribut `popover="manual"`.
- Ouverture après `--mr-tooltip-delay` au survol, immédiate au focus ; fermeture immédiate ; Échap ferme ; reste affiché au survol du tooltip (comportement Échap existant conservé).
- Apparition : `opacity` + `translateY(4px → 0)`, `fast` / `enter`.
- `role="tooltip"`, `aria-describedby`. Jamais d'information indispensable ni de contenu interactif.

API : `content` (texte), `placement`, `delay`, contenu (déclencheur).

### 7.12 Modal, AlertDialog, Drawer, CommandPalette

- `<dialog>` natif ouvert par `showModal()`, sans portail. Largeurs Modal : `--mr-dialog-width-sm` / `-md` / `-lg`, maximum `calc(100vw - 32px)` et `calc(100dvh - 64px)`.
- `bg-overlay`, bordure `border-default`, rayon `overlay`, `--mr-shadow-overlay`, padding `--mr-spacing-6`, voile `::backdrop` en `--mr-scrim`.
- En-tête : label instrument facultatif, titre `h2`, description `small` `text-secondary` (écart `--mr-spacing-1`). Corps : écart `--mr-spacing-4`. Pied : actions à droite, écart `--mr-spacing-2`, action principale en dernier, padding supérieur `--mr-spacing-4`.
- Apparition : `opacity` + `translateY(8px → 0)`, `slow` / `enter` ; disparition `fast` / `exit` (remplace le délai fixe de 200ms du Drawer).
- Piège de focus natif, Échap ferme, retour du focus.
- AlertDialog : `role="alertdialog"`, pas de fermeture au clic sur le voile, action principale `danger` si destructive.
- Drawer : pleine hauteur, largeur `--mr-drawer-width-md` / `-lg`, côté `start | end | bottom`, rayon `overlay` sur le bord intérieur seulement, translation depuis le bord.
- CommandPalette : Modal md, Input en tête sans bordure extérieure, liste en styles de menu, groupes en labels instrument, raccourcis en Kbd.

API : `open` / `defaultOpen`, `onOpenChange` (`onClose` et `onCancel` dépréciés → `onOpenChange(false)`), `size`, `title`, `description`, `footer`, contenu ; AlertDialog : `onConfirm` conservé.

### 7.13 Card

- `bg-surface`, bordure `border-subtle`, rayon `card`, padding `--mr-card-padding`, aucune ombre.
- En-tête : rangée « label instrument … action » ; titre `h3` (écart `--mr-spacing-1`) ; description `small` `text-secondary`. En-tête → corps : `--mr-card-gap`.
- Pied : bordure supérieure `border-subtle`, padding supérieur `--mr-spacing-3`, métadonnées en `--mr-type-code-sm` `text-tertiary`, réparties aux extrémités.
- Contenu pleine largeur (Table, Divider) : marges horizontales négatives égales au padding ; une table en bas de carte a une marge inférieure négative et la carte masque le débordement.
- Variante `interactive` : survol bordure `border-default`, anneau de focus, carte entière cliquable.
- Jamais de carte dans une carte. Les tailles de padding `sm / md / lg` sont remplacées par la densité.

API : `variant` (`default | interactive`), `label`, `title`, `description`, `action`, `footer`, contenu.

### 7.14 StatCard et MetricGrid

- StatCard = Card + métrique. Label instrument ; valeur `--mr-type-data-lg` + `tabular-nums` + `text-primary` ; unité `--mr-type-code` `text-secondary` sur la ligne de base, écart `--mr-spacing-1` ; variation en Badge sm `success` / `danger` / `neutral` à droite du label ; légende `small` `text-secondary`.
- Mini-graphique : barres égales, écart `--mr-spacing-1`, hauteur `--mr-metric-chart-height`, `chart-muted`, barre mise en avant `accent`, sans rayon, `aria-hidden="true"`.
- MetricGrid : grille de StatCard, écart `--mr-grid-gap`, 1 à 4 colonnes selon la largeur.

API StatCard : `label`, `value`, `unit`, `delta`, `trend` (`up | down | flat`), `favorable` (`up | down`), `chart` (valeurs numériques), `description`.

### 7.15 Table, DataTable, DataList

- Conteneur à défilement horizontal propre.
- En-tête : `--mr-table-head-height`, `bg-sunken`, style `label`, padding `--mr-table-cell-padding-inline`, bordure inférieure `border-subtle`.
- Ligne : `--mr-table-row-height`, `--mr-type-body` (`small` en compact), bordure inférieure `border-subtle` sauf la dernière, survol `bg-hover`. Sélectionnée : rail gauche (pseudo-élément) + `bg-hover`.
- Cellules : texte à gauche ; identifiant `--mr-type-code` ; nombre à droite en `tabular-nums` ; statut en Badge sm avec texte ; actions en IconButton ghost sm à droite.
- Statuts : Operational → `success`, Degraded → `warning`, Down → `danger`, Maintenance → `info`, Unknown → `neutral`.
- Tri : bouton dans l'en-tête, icône 16, `aria-sort`.
- États : vide (hauteur `--mr-table-empty-height`, EmptyState compact), chargement (3 lignes de Skeleton), erreur (message `danger-text` + Button secondary sm « Réessayer »).
- DataTable : Table + tri, sélection (Checkbox en première colonne), Pagination. DataList : paires clé / valeur, clés en style `label`, valeurs `body`, séparateurs `border-subtle`.

API : `columns` (`{ key, header, align?, kind?: 'text' | 'id' | 'number' | 'status' | 'actions', sortable?, render? }`), `rows`, `getRowId`, `selectedRowIds` / `onSelectionChange` (remplace `onSelectedRowIdsChange`), `sort` / `onSortChange`, `state` (`ready | loading | empty | error`), `onRetry`.

### 7.16 Topbar, SidebarLayout, NavigationMenu, Breadcrumb, Pagination

- Topbar : `--mr-topbar-height`, padding `--mr-spacing-4`, `bg-surface`, bordure inférieure `border-subtle`, collante. Marque : carré `--mr-brand-mark-size`, rayon `inline`, bordure `border-default` ; nom en style `label` mais `text-primary` 600.
- Élément de navigation : `--mr-nav-item-height`, padding `--mr-spacing-3`, `--mr-type-small-strong`, `text-secondary`, survol `text-primary` + `bg-hover` + rayon `control`, actif `text-primary` + rail (inférieur à l'horizontale, aligné sur la bordure de la topbar ; gauche à la verticale), `aria-current="page"`. Un élément sans destination n'est pas un lien.
- Indicateur d'état : point `--mr-status-dot-size` + texte `--mr-type-code-sm`, couleur `{ton}-text`.
- SidebarLayout : barre latérale `--mr-sidebar-width`, `bg-surface`, bordure `border-subtle`.
- Breadcrumb : `small`, séparateur « / » en `text-tertiary` mono, page courante `text-primary` + `aria-current`.
- Pagination : IconButton ghost sm précédent / suivant, numéros en Button ghost sm `tabular-nums`, page courante `text-primary` + rail inférieur, `aria-current`. API : `page`, `pageCount`, `onPageChange`.

### 7.17 Spinner, Skeleton, Divider, Progress

- Spinner : 12 / 16 / 20, trait 2px, arc de 270°, `currentColor`, `--mr-duration-spin` linéaire. Seul : `role="status"` + libellé ; dans un bouton : `aria-hidden="true"`.
- Skeleton : `bg-hover`, rayon `inline`, pulsation d'opacité 1 → 0.55 sur `--mr-duration-pulse`, statique en mouvement réduit. Ligne : `--mr-skeleton-line-height`, écart `--mr-spacing-2`, dernière ligne à 60 %. `aria-hidden="true"`, conteneur `aria-busy="true"`.
- Divider (absorbe Separator) : 1px `border-subtle`, horizontal ou vertical, `role="separator"` si porteur de sens, sinon décoratif ; label facultatif en style `label` centré.
- Progress : piste `--mr-progress-h`, `bg-active`, rayon `full`, portion `accent` (ou `{ton}-text` si `tone`), `role="progressbar"`, valeur en `tabular-nums` si affichée ; indéterminé : translation, statique en mouvement réduit.

### 7.18 Familles par référence

| Famille | Spec de base | Spécificités |
|---|---|---|
| Accordion, Collapsible | 7.9 (typographie) | Déclencheur hauteur `--mr-control-size-md`, chevron comme Select, séparateurs `border-subtle`, `aria-expanded`, contenu animé en `opacity` uniquement |
| Avatar | 5.7 | `--mr-avatar-size-sm/md/lg`, rayon `full`, initiales `--mr-type-small-strong` sur `bg-sunken`, image avec `alt` |
| Carousel | 7.1 (contrôles) | Précédent / suivant en IconButton secondary, pas de défilement automatique sans bouton pause, flèches, `aria-roledescription="carousel"` |
| Banner | 7.3 (tons) | Bande pleine largeur, fond `{ton}-subtle`, bordure inférieure `{ton}-border`, icône 16, action et fermeture en IconButton ghost sm, `role="status"` ou `alert` |
| Callout (absorbe InlineAlert) | 7.3 (tons) | Bloc dans le flux, fond `{ton}-subtle`, bordure `{ton}-border`, rayon `card`, padding `--mr-spacing-3` × `--mr-spacing-4`, titre `small-strong`, texte `small` ; `size="sm"` remplace InlineAlert |
| EmptyState (absorbe AsyncStateNotice) | 7.13 | Label instrument, titre `h3`, description `small` `text-secondary`, action Button secondary ; `state` : `empty | loading | error` |
| Toast | 7.10 (surface) | `bg-overlay`, rayon `overlay`, ombre, bord gauche rail 2px `{ton}-text`, en bas à droite, `role="status"`, durée par défaut 5s, pause au survol et au focus, `--mr-z-toast` |
| Calendar, DatePicker, DateRangePicker | 7.6 (déclencheur) + 7.10 (surface) | Cellules `--mr-calendar-cell-size`, rayon `control`, sélection `accent` / `on-accent`, jour courant rail inférieur, plage `accent-subtle`, en-têtes de jours en style `label`, grille ARIA, flèches |
| FileUpload | 7.5 (états) | Zone `bg-sunken`, bordure `dashed` `border-control`, survol de dépôt bordure `focus-color` + `bg-hover`, liste des fichiers en DataList |
| AspectRatio, Container, Grid, Stack, Section, PageHeader, Toolbar, ScrollArea, Resizable | 5 (tokens seuls) | Écarts par tokens de densité ; `as` limité à une liste fermée ; PageHeader = label instrument + `h1` + description + actions ; Toolbar `role="toolbar"` avec flèches ; ScrollArea : barres natives fines, `scrollbar-color` `text-tertiary` ; Resizable : poignée de 8px de zone de saisie, trait 1px `border-default`, focusable, flèches |
| FilterBar | Toolbar + 7.5 / 7.6 | Composition uniquement |
| Text, Title | 5.9 | `variant` = un style de 5.9 ; Title : `as` limité à `h1`–`h6` ; Text : `as` limité à `p | span | div | label | strong | em | small` |
| Kbd | 5.9 | `--mr-type-code-sm`, hauteur `--mr-kbd-height`, padding `--mr-spacing-1-5`, `bg-sunken`, bordure `border-default`, rayon `inline` |
| PreCode | 5.9 | `--mr-type-code`, `bg-sunken`, bordure `border-subtle`, rayon `card`, padding `--mr-spacing-4`, défilement horizontal ; coloration syntaxique uniquement avec `accent-text`, `success-text`, `warning-text`, `danger-text`, `info-text`, `text-secondary`, `text-tertiary` |
| InfiniteScroll (experimental) | — | Hors grille de qualité ; tokens uniquement, sentinelle `IntersectionObserver`, annonce du chargement en `aria-live` |

### 7.19 Fusions et retraits (alias dépréciés pendant une version majeure, avertissement en développement)

| Ancien | Nouveau |
|---|---|
| InlineAlert | Callout `size="sm"` |
| AsyncStateNotice | EmptyState `state` |
| Separator | Divider |
| Button `copyValue` | CopyButton |
| Button `iconOnly` | IconButton |
| Button `as` | ButtonLink |
| Variantes Button `muted`, `subtle`, `warning` | `secondary`, `ghost`, `secondary` |
| Thème `dim` | `dark` |
| `.monority-theme-root` | `[data-theme]` sur n'importe quel élément |

---

## 8. Moodboard

### Règle fondatrice

Le moodboard n'utilise que des composants publics. Son CSS ne contient que de la mise en page (grilles, panneaux, écarts entre blocs) et aucun sélecteur qui restyle un composant. Les états figés passent exclusivement par `data-mr-preview`.

### Structure

- Barre de contrôle globale collante (hauteur `--mr-topbar-height`, `bg-surface`, bordure inférieure) : titre en label instrument ; ToggleGroup « Densité » (Comfortable / Compact) ; ToggleGroup « Marque » (Monority / Studio), appliqué aux quatre panneaux ; Button secondary sm « Réinitialiser l'état ».
- Quatre panneaux : `01 / LIGHT`, `02 / DARK`, `03 / OLED`, `04 / HIGH CONTRAST`. Chaque panneau porte son `data-theme` (et `data-brand`), fond `bg-canvas`, padding `--mr-spacing-6`, en-tête en label instrument.
- Disposition : 4 colonnes à partir de 1600px, 2 de 1100 à 1599px, 1 en dessous.
- État partagé entre panneaux : onglet actif, région, cases cochées, switch, ligne sélectionnée.

### Sections de chaque panneau (dans cet ordre)

1. Topbar avec navigation et indicateur d'état.
2. PageHeader : label (fil d'Ariane), `h1`, description, actions (Button primary + Button ghost).
3. MetricGrid de deux StatCard (une avec variation et mini-graphique).
4. Card de réglages : Switch et Checkbox en Field horizontal.
5. Card table : 4 lignes couvrant success / warning / danger / info, une ligne sélectionnée, une colonne numérique.
6. Card de formulaire : Input, Select, Textarea, Checkbox invalide avec message, ToggleGroup, Tabs dont le contenu change.
7. Matrice d'états : Button (4 variantes × repos, survol, pression, focus, désactivé, chargement) ; Input (6 états) ; Checkbox, Radio, Switch (tous états) ; Badge (6 tons × 2 tailles).
8. Tailles : Button, Input, Select, ToggleGroup en sm / md / lg sur une même ligne de base.
9. Overlays figés ouverts : Tooltip, DropdownMenu (groupe, séparateur, sélection, danger), surface de Modal dans le flux.
10. États de données : StatCard en skeleton, table vide, table en erreur, Callout de chaque ton.
11. Token strip.

### Token strip

Chaque ligne affiche nom, valeur et rendu : surfaces (5 échantillons), textes (4 niveaux), bordures (3 traits), accent (7 échantillons), statuts (4 tons × 3 rôles), espacement (barres de 4 à 32px), rayons (4 carrés de 32px au rayon réel, sans cercle), hauteurs de contrôle (3 blocs), typographie (un échantillon par style), mouvement (3 durées), ombre (un overlay).

---

## 9. Conventions d'API (tous composants)

- P1. Noms uniformes : `size` (`sm | md | lg`), `variant` (forme et emphase), `tone` (`neutral | accent | success | warning | danger | info`), booléens positifs (`disabled`, `loading`, `invalid`, `readOnly`, `required`, `selected`).
- P2. Props de configuration exprimables en attribut HTML (chaîne, booléen, énumération, nombre). Données : tableaux d'objets simples sérialisables (`items`, `columns`, `rows`). Fonctions de rendu (`render`) autorisées uniquement sur Table, DataTable, Combobox et Select, et listées dans la note X6.
- P3. `as` interdit sur tout composant interactif. Autorisé sur les primitives de mise en page et de texte avec une union fermée de balises (7.18).
- P4. Les contrôles de formulaire participent au formulaire natif : soumission, validation, reset.
- P5. Contrôlé et non contrôlé : `value` / `defaultValue`, `checked` / `defaultChecked`, `open` / `defaultOpen`, `pressed` / `defaultPressed`.
- P6. Callbacks : `onValueChange`, `onCheckedChange`, `onPressedChange`, `onOpenChange`, `onSortChange`, `onSelectionChange`, `onPageChange`, `onSelect`. `onChange` est réservé à l'événement natif de l'élément natif. Chaque callback correspond à un futur événement DOM en kebab-case (`value-change`, `open-change`…).
- P7. Aucun composant ne lit le thème, la marque ou la densité en JavaScript.
- P8. Un composant, une responsabilité : pas de prop « mode » qui bascule vers le comportement d'un autre composant.
- P9. `ref` transmise à l'élément racine interactif ; `className` et attributs HTML natifs acceptés et fusionnés.

---

## 10. Grille de qualité

Un niveau n'est atteint que si TOUS ses critères et ceux des niveaux inférieurs sont validés avec preuve.

### « Bien » (7/10) — état de départ

Build, typecheck, tests unitaires et E2E serial passent.

### « Parfait » (9/10)

**Tokens (T)**
- T1. Tokens du fichier de référence implémentés sans écart (valeurs calculées comparées automatiquement dans le navigateur, par thème et par densité).
- T2. Zéro valeur en dur dans le CSS des composants et des utilitaires hors exceptions de la section 2 (commande exacte, 0 résultat).
- T3. Aucun hex ni teinte en dur pour l'accent et les neutres.
- T4. Thème, marque et densité par attribut uniquement, à n'importe quel niveau de l'arbre.
- T5. Une seule source de tokens (`packages/tokens`) ; `packages/styles/src/tokens` généré.
- T6. Fichier déprécié complet : chaque ancien token public a un alias ou sa valeur conservée.

**Thèmes (H)**
- H1. Les 4 thèmes fonctionnent sur un sous-arbre (test E2E : panneau light dans une page dark et inversement).
- H2. `getThemeScript()` : aucun flash au chargement (capture au premier rendu) ; aucune alerte d'hydratation en rendu serveur (test sur une page rendue côté serveur).
- H3. `system` résout `prefers-contrast: more` vers `high-contrast` (test avec émulation).

**Design (D)**
- D1. Une spec par composant dans `docs/design/components/<nom>.md`.
- D2. Tailles, graisses, rayons, durées : uniquement des tokens de l'échelle.
- D3. `box-shadow` absent du CSS des composants hors overlays.
- D4. Signature appliquée dans chaque composant concerné (liste dans le bilan).
- D5. Aucune `transition: all`, aucune animation de dimension ou de position, aucune opacité pour l'état désactivé.
- D6. Captures avant / après de chaque composant.
- D7. Un seul jeu de sélecteurs (`data-*`) ; zéro classe modificatrice BEM restante.

**Composants (C)**
- C1. Chaque composant respecte ses dimensions et ses états, vérifiés par mesure en E2E (hauteur, padding, rayon, couleurs calculées).
- C2. Button en chargement : largeur identique au repos, libellé annoncé.
- C3. États de données disponibles (skeleton, vide, erreur) là où la spec les prévoit.
- C4. `data-mr-preview` fonctionne sur chaque composant interactif.
- C5. Fusions et retraits de 7.19 effectués avec alias et avertissement.
- C6. Overlays sur couche native (`<dialog>`, `popover`), zéro `createPortal` restant.

**Accessibilité (A)**
- A1. Contrastes de 5.5 respectés dans l'implémentation (mesurés sur couleurs calculées), 4 thèmes × 2 marques.
- A2. Focus conforme à 5.8 partout.
- A3. Cible interactive ≥ `--mr-min-target`.
- A4. Clavier complet conforme à chaque spec.
- A5. axe-core : 0 violation sur `/moodboard`, chaque panneau, chaque densité, chaque marque.
- A6. `prefers-reduced-motion` et `forced-colors` respectés (captures).

**API (P)** : P1 à P9 respectées, table props / attributs / callbacks par composant.

**Moodboard (M)**
- M1. Règle fondatrice respectée (revue du CSS jointe).
- M2. Structure, sections et token strip conformes à la section 8.
- M3. État partagé entre panneaux, réinitialisable.

**Tests et qualité (Q)**
- Q1. Régression visuelle : composant × thème × état × densité.
- Q2. Build (y compris parallèle), typecheck, unitaires, E2E serial, consumer TypeScript et runtime, `npm pack --dry-run` : pass.
- Q3. Linter configuré et exécuté (`pnpm lint` ne renvoie plus « 0 tasks »).
- Q4. Tests d'overlays en navigateur (Vitest browser ou tests de composants Playwright), jsdom ne gérant ni `showModal()` ni `popover`.

**Migration (G)**
- G1. `MIGRATION.md` : chaque changement cassant et chaque changement de valeur, avec exemple avant / après.
- G2. Alias dépréciés pendant une version majeure, avertissement en développement pour props, variantes et composants.
- G3. `CHANGELOG.md` et changeset à jour.

### « 10/10 »

Tout le niveau Parfait, plus :
- X1. Marque studio : A1 à A5 passent, aucun composant modifié.
- X2. Tokens en DTCG générant CSS et types TypeScript ; test de contraste de 5.5 en CI sur les sources.
- X3. Performance : point d'entrée par composant ; `sideEffects` limité aux CSS ; size-limit en CI sans régression > 5 % par rapport à la phase 0 ; CLS = 0 sur `/moodboard` ; changement de thème, marque et densité sans re-render (test) ; polices conformes à 5.9.
- X4. E2E parallèle stable sur trois exécutions consécutives ; course `tsup ENOENT` du build parallèle corrigée à la source.
- X5. Codemod pour props, variantes, callbacks et composants renommés ou fusionnés, avec tests.
- X6. Note de préparation Web Components : par composant, ce qui se transpose tel quel et ce qui demandera un travail spécifique.
- X7. Revue design finale : chaque capture vérifiée contre sa spec ; zéro écart non justifié.
- X8. Code mort supprimé : ancien contenu de `packages/tokens`, `packages/ui/src/styles/recipes` s'il n'est plus importé, icônes internes dupliquées.

---

## 11. Phases

**Phase 0 bis — Compléter l'audit** (aucune modification de code)
- Captures de référence de chaque composant actuel, thèmes existants, via `toHaveScreenshot`.
- Poids min+gzip de chaque point d'entrée (commande citée).
- `docs/design/audit/inventory.md` : chaque famille, exports, nombre d'imports dans `apps/web`, classement « spec 7.1–7.17 / par référence 7.18 / fusion 7.19 », valeurs en dur par fichier.
- `docs/design/audit/migration-table.md` : props, variantes, callbacks et tokens actuels vers cibles.
- Classement des accès JavaScript au thème : utilitaire applicatif ou intérieur de composant.

**Phase 1 — Specs et conventions** (documentation uniquement)
- `docs/design/language.md` : sections 3 à 6 et 9.
- `docs/design/components/<nom>.md` pour chaque famille.
- Mise à jour de `docs/conventions.md`, `memory-ai/project-knowledge.md` et des instructions d'agents (retrait de « `as: ElementType` », des classes modificatrices, du Tooltip en CSS pur, etc.).
- Fin de phase : arrêt obligatoire pour validation humaine.

**Phase 2 — Tokens et thèmes** : T1 à T6, H1 à H3, X2, suppression du code mort de tokens.

**Phase 3 — Composants**, une famille par exécution :
Button / IconButton / CopyButton / ButtonLink / Spinner → Toggle / ToggleGroup → Badge → Field / FormSection / Input / Textarea / NumberInput / PasswordInput → Select / Combobox → Checkbox / RadioGroup / Switch / Slider → Tabs → Popover / DropdownMenu / ContextMenu / Menubar / HoverCard / Tooltip → Modal / AlertDialog / Drawer / CommandPalette → Card / StatCard / MetricGrid → Table / DataTable / DataList / Pagination → Topbar / SidebarLayout / NavigationMenu / Breadcrumb → Callout / Banner / Toast / EmptyState / Progress / Skeleton / Divider → Calendar / DatePicker / DateRangePicker / FileUpload → Accordion / Collapsible / Avatar / Carousel → primitives de mise en page et de texte / Kbd / PreCode.
Pour chaque famille : critères C, D, A, P concernés et captures avant / après.

**Phase 4 — Moodboard reconstruit** : M1 à M3.

**Phase 5 — Preuve du système** : X1, X3.

**Phase 6 — Finalisation** : Q1 à Q4, X4 à X8, G1 à G3.

---

## 12. Format du bilan (obligatoire, rien d'autre)

```
Bilan <Phase> — <titre>
Statut : terminé | bloqué (raison)

Changements
- <fichier> : <ce qui change, une ligne>

Grille
| ID | Statut | Preuve |
|----|--------|--------|
| T2 | pass   | <commande> → 0 résultat |
| A1 | fail   | badge accent, light : 2.9:1 |

Niveau atteint : Bien | Parfait | 10/10 (uniquement si tous les critères du niveau sont pass)

Validation
- <commande> : <résultat chiffré>

Changements cassants introduits
- <avant> → <après> (entrée MIGRATION.md : oui/non)

Écarts avec la spec
- <composant> : <écart> — <justification> (ou « aucun »)

Bruit connu
- <problème préexistant, non introduit par cette phase>

Questions / blocages
- <question précise, ou « aucun »>

Contrôle d'alphabet
- rg -n '[\p{Han}\p{Hiragana}\p{Katakana}\p{Hangul}]' <fichiers> → 0 résultat

Commit proposé
<type(scope): message>
```

Un critère non vérifiable dans la phase courante est noté `n/a` avec la phase où il sera vérifié, jamais `pass`. Un critère qui porte sur un livrable de la phase courante n'est jamais `n/a` : il est produit.
