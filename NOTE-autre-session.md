# Note pour la session en cours sur apps/web + packages/ui

Suite au commit `2ecd2ef` (formatage Biome) et `3162479` (câblage Biome / CI),
voici l'impact exact sur **vos** fichiers. Rien de votre travail n'a été
écrasé, mais deux choses changent.

## 1. Bonne nouvelle : aucun de vos fichiers n'a été reformaté

J'ai vérifié les 62 fichiers non commités de votre périmètre
fichier par fichier (version HEAD vs version actuelle, passé par
`biome format`) :

| Constat | Nombre |
|---|---|
| Images (snapshots PNG) — nonConcernés par Biome | 37 |
| Sources déjà conformes à Biome avant et après | 25 |
| **Fichiers reformatés par moi** | **0** |

Autrement dit : mes 466 fichiers formatés étaient tous *en dehors* de
votre périmètre. J'ai volontairement exclu de ce commit tout fichier que
vous aviez modifié.

## 2. Ce qui change pour vous

- **`format:check` est désormais une étape BLOQUANTE de la CI.** Si vos
  fichiers ne sont pas conformes au formatage Biome, votre PR sera rouge.
- `pnpm lint` est câblé sur `biome lint .` mais reste **non bloquant**
  pour l'instant (dette préexistante). Ne vous worry pas pour celui-là.

## 3. Commande à lancer sur vos fichiers avant de commiter

```bash
# depuis la racine du monorepo
npx biome format --write apps/web/src packages/ui/src apps/web/e2e docs/design
git add -A
```

Ou, si vous préférez vérifier sans écrire :

```bash
npx biome format apps/web/src packages/ui/src apps/web/e2e docs/design
```

## 4. Vos fichiers toujours en attente de commit

### apps/web/e2e (specs + snapshots) (41)
  - `apps/web/e2e/audit-baseline.spec.ts`
  - `apps/web/e2e/components.visual.spec.ts`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/button--dark--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/button--dark--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/button--high-contrast--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/button--high-contrast--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/button--light--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/button--light--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/button--night--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/button--night--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/button--ocean--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/button--ocean--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/button--oled--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/button--oled--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/copy-button--dark--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/copy-button--dark--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/copy-button--high-contrast--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/copy-button--high-contrast--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/copy-button--light--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/copy-button--light--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/copy-button--night--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/copy-button--night--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/copy-button--ocean--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/copy-button--ocean--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/copy-button--oled--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/copy-button--oled--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/icon-button--dark--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/icon-button--dark--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/icon-button--high-contrast--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/icon-button--high-contrast--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/icon-button--light--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/icon-button--light--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/icon-button--night--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/icon-button--night--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/icon-button--ocean--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/icon-button--ocean--compact-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/icon-button--oled--comfortable-desktop-win32.png`
  - `apps/web/e2e/components.visual.spec.ts-snapshots/icon-button--oled--compact-desktop-win32.png`
  - `apps/web/e2e/design-customizer.spec.ts`
  - `apps/web/e2e/moodboard.visual.spec.ts-snapshots/moodboard--default--desktop-desktop-win32.png`
  - `apps/web/e2e/theme-runtime.spec.ts`

### apps/web/src (11)
  - `apps/web/src/app/AppLayout.tsx`
  - `apps/web/src/app/pages/MoodboardPage.test.tsx`
  - `apps/web/src/app/pages/MoodboardPage.tsx`
  - `apps/web/src/app/pages/moodboard.css`
  - `apps/web/src/layouts/AppHeader.css`
  - `apps/web/src/layouts/AppHeader.tsx`
  - `apps/web/src/layouts/AppPage.test.tsx`
  - `apps/web/src/layouts/AppPage.tsx`
  - `apps/web/src/layouts/AppShell.css`
  - `apps/web/src/layouts/AppShell.test.tsx`
  - `apps/web/src/layouts/AppShell.tsx`

### docs/design (2)
  - `docs/design/customization.md`
  - `docs/design/language.md`

### packages/tokens (1)
  - `packages/tokens/scripts/check-no-hardcoded.mjs`

### packages/ui/src (7)
  - `packages/ui/src/lib/constants.ts`
  - `packages/ui/src/lib/design-config.test.ts`
  - `packages/ui/src/lib/design-config.ts`
  - `packages/ui/src/lib/index.ts`
  - `packages/ui/src/providers/get-theme-script.ts`
  - `packages/ui/src/providers/theme-provider.tsx`
  - `packages/ui/src/providers/theme-scope.tsx`
