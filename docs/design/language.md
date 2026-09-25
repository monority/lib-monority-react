# Monority UI — Langage de design

Statut : spec v4 — à valider
Source : prompt maître v4, sections 3, 4, 5, 6 et 9 (copiées telles quelles, sans reformulation ni arrondi).
Référence versionnée : `docs/design/reference/` (prompt maître v4 et deux CSS de référence).
Phase : 1a et 1b.

Ce document fait foi pour le langage visuel, les fondations, les règles d'état et les conventions d'API. Les specs par composant (`docs/design/components/`) détaillent l'application de ces règles.

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

## Positionnement des overlays (décision phase 1b)

- Utilitaire interne sans dépendance `packages/ui/src/internal/position`, créé en phase 3 comme étape dédiée avant la famille Select / Combobox.
- 12 placements ; écart au déclencheur par `--mr-popover-offset` (4px), `--mr-tooltip-offset` (8px) pour le Tooltip.
- Retournement et décalage maintenus dans la fenêtre ; mise à jour au défilement et au redimensionnement uniquement tant que l'overlay est ouvert, limitée à une fois par image.
- Utilisé par Popover, menus (DropdownMenu, ContextMenu, Menubar), Tooltip, HoverCard, Select, Combobox, DatePicker.
- Pas d'anchor positioning CSS pour l'instant (mentionné dans la note X6).

---

## Décisions issues de l'audit

Décisions arrêtées en phase 0 bis (`docs/design/audit/inventory.md`, `docs/design/audit/migration-table.md`) et intégrées ici :

- `--mr-combobox-list-min-width` remplacé par `--mr-menu-min-width` ;
- HoverCard sans flèche : `--mr-hovercard-arrow-left` et `--mr-hovercard-arrow-top` supprimés ;
- `--mr-code-bg`, `--mr-code-fg`, `--mr-code-scrollbar`, `--mr-code-shadow`, `--mr-code-padding` remplacés par la spec PreCode (7.18) en phase 1b ;
- tokens core sans équivalent : valeurs actuelles reportées dans le fichier déprécié en phase 2 ;
- captures d'audit non versionnées, reproductibles depuis le tag `refonte-baseline` (procédure dans `docs/design/audit/inventory.md`).
