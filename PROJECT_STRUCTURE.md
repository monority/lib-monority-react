# Project Structure — library-monority-react

```
library-monority-react/
├── .changeset/
│   └── config.json
├── .github/workflows/
│   └── ci.yml
├── .vscode/
│   └── settings.json
├── apps/
│   ├── docs/                              # (empty — docs app shell)
│   └── web/                               # Main web application
│       ├── public/
│       │   ├── fonts/
│       │   ├── icons/
│       │   ├── images/
│       │   └── og/
│       ├── src/
│       │   ├── app/                       # (empty)
│       │   ├── components/
│       │   │   ├── common/                # (empty)
│       │   │   ├── docs/                  # (empty — docs shared components)
│       │   │   ├── layout/                # (empty)
│       │   │   ├── marketing/             # (empty)
│       │   │   ├── navigation/            # (empty)
│       │   │   └── providers/             # (empty)
│       │   ├── config/
│       │   │   ├── app-routes.tsx
│       │   │   └── navigation.js
│       │   ├── docs/                      # Doc pages for UI kit
│       │   │   ├── components/
│       │   │   │   ├── AvatarDocs.tsx
│       │   │   │   ├── BadgeDocs.tsx
│       │   │   │   ├── ButtonDocs.tsx
│       │   │   │   ├── CardDocs.tsx
│       │   │   │   ├── CheckboxDocs.tsx
│       │   │   │   ├── InputDocs.tsx
│       │   │   │   ├── ModalDocs.tsx
│       │   │   │   ├── SelectDocs.tsx
│       │   │   │   ├── SpinnerDocs.tsx
│       │   │   │   ├── TableDocs.tsx
│       │   │   │   ├── TabsDocs.tsx
│       │   │   │   └── ToastDocs.tsx
│       │   │   ├── DocsLayout.tsx
│       │   │   ├── Introduction.tsx
│       │   │   └── index.css
│       │   ├── errors/
│       │   │   ├── AppErrorBoundary.test.jsx
│       │   │   └── AppErrorBoundary.tsx
│       │   ├── hooks/
│       │   │   ├── useAuth.js
│       │   │   └── useErrorToast.js
│       │   ├── layouts/
│       │   │   ├── AppPage.test.jsx
│       │   │   ├── AppPage.tsx
│       │   │   ├── AppShell.test.jsx
│       │   │   └── AppShell.tsx
│       │   ├── lib/
│       │   │   └── cn.js
│       │   ├── providers/
│       │   │   ├── auth-context.js
│       │   │   ├── AuthProvider.test.jsx
│       │   │   ├── AuthProvider.tsx
│       │   │   └── AppProviders.tsx
│       │   ├── routes/
│       │   │   ├── route-config.ts
│       │   │   └── router.tsx
│       │   ├── seo/
│       │   │   ├── site-config.js
│       │   │   └── usePageSeo.js
│       │   ├── services/
│       │   │   ├── auth/
│       │   │   │   └── mockAuthService.js
│       │   │   └── http/
│       │   │       └── httpErrorUtils.js
│       │   ├── styles/                    # (empty)
│       │   ├── test/
│       │   │   ├── setup.js
│       │   │   └── test-utils.jsx
│       │   ├── types/                     # (empty)
│       │   ├── App.tsx
│       │   ├── index.css
│       │   └── main.tsx
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.mjs
│       └── vitest.config.js
├── packages/
│   ├── eslint-config/                     # Shared ESLint config
│   ├── icons/                             # Icon package
│   ├── tailwind-config/                   # Shared Tailwind config
│   ├── tokens/                            # Design tokens package
│   ├── typescript-config/                 # Shared TS config
│   └── ui/                                # UI component library (@monority/ui)
│       ├── src/
│       │   ├── blocks/                    # (all empty — planned)
│       │   │   ├── auth/
│       │   │   ├── dashboard/
│       │   │   ├── marketing/
│       │   │   └── pricing/
│       │   ├── components/                # Legacy categorized structure
│       │   │   ├── actions/
│       │   │   │   ├── CopyButton.tsx
│       │   │   │   ├── IconButton.tsx
│       │   │   │   └── index.ts
│       │   │   ├── display/
│       │   │   │   ├── MetricGrid/        # Subfolder (composite)
│       │   │   │   │   ├── MetricGrid.tsx
│       │   │   │   │   └── index.js
│       │   │   │   ├── title/             # Subfolder (composite)
│       │   │   │   │   ├── Title.tsx
│       │   │   │   │   └── index.js
│       │   │   │   ├── Accordion.tsx
│       │   │   │   ├── Avatar.tsx
│       │   │   │   ├── Card.tsx
│       │   │   │   ├── DataGrid.tsx
│       │   │   │   ├── DataList.tsx
│       │   │   │   ├── index.ts
│       │   │   │   ├── Stats.tsx
│       │   │   │   ├── Table.tsx
│       │   │   │   └── Typography.tsx
│       │   │   ├── ecommerce/             # (empty)
│       │   │   ├── effects/               # (empty)
│       │   │   ├── feedback/
│       │   │   │   ├── Alert.tsx
│       │   │   │   ├── Banner.tsx
│       │   │   │   ├── EmptyState.tsx
│       │   │   │   ├── index.ts
│       │   │   │   ├── InlineAlert.tsx
│       │   │   │   ├── LoadingOverlay.tsx
│       │   │   │   ├── Progress.tsx
│       │   │   │   ├── Skeleton.tsx
│       │   │   │   ├── Spinner.tsx
│       │   │   │   ├── Toast.test.jsx
│       │   │   │   └── Toast.tsx
│       │   │   ├── forms/
│       │   │   │   ├── DateRangePicker/   # Subfolder (composite)
│       │   │   │   │   ├── DateRangePicker.test.jsx
│       │   │   │   │   ├── DateRangePicker.tsx
│       │   │   │   │   └── index.js
│       │   │   │   ├── field/             # Subfolder (composite)
│       │   │   │   │   ├── Field.tsx
│       │   │   │   │   └── index.js
│       │   │   │   ├── NumberInput/       # Subfolder (composite)
│       │   │   │   │   ├── NumberInput.test.jsx
│       │   │   │   │   └── NumberInput.tsx  ← duplicate (also root-level NumberInput.tsx)
│       │   │   │   ├── PasswordInput/     # Subfolder (composite)
│       │   │   │   │   ├── PasswordInput.test.jsx
│       │   │   │   │   ├── PasswordInput.tsx
│       │   │   │   │   └── index.js
│       │   │   │   ├── SearchInput/       # Subfolder (composite)
│       │   │   │   │   ├── SearchInput.test.jsx
│       │   │   │   │   ├── SearchInput.tsx
│       │   │   │   │   └── index.js
│       │   │   │   ├── TextInput/         # Subfolder (composite)
│       │   │   │   │   └── TextInput.tsx
│       │   │   │   ├── Checkbox.tsx
│       │   │   │   ├── Combobox.tsx
│       │   │   │   ├── DatePicker.tsx
│       │   │   │   ├── FileUpload.tsx
│       │   │   │   ├── FormField.tsx
│       │   │   │   ├── index.ts
│       │   │   │   ├── NumberInput.tsx    ← duplicate (also in NumberInput/)
│       │   │   │   ├── Radio.tsx
│       │   │   │   ├── Select.tsx
│       │   │   │   ├── Slider.tsx
│       │   │   │   ├── Switch.tsx
│       │   │   │   └── Textarea.tsx
│       │   │   ├── internal/             # Private hooks/utils (JS)
│       │   │   │   ├── dom.js
│       │   │   │   ├── dom.test.js
│       │   │   │   ├── useBodyScrollLock.js
│       │   │   │   ├── useFocusTrap.js
│       │   │   │   ├── usePortalTarget.js
│       │   │   │   └── usePortalTarget.test.js
│       │   │   ├── layout/
│       │   │   │   ├── Container.tsx
│       │   │   │   ├── Grid.tsx
│       │   │   │   ├── index.ts
│       │   │   │   ├── PageHeader.tsx
│       │   │   │   ├── Section.tsx
│       │   │   │   ├── Separator.tsx
│       │   │   │   ├── Stack.tsx
│       │   │   │   └── Toolbar.tsx
│       │   │   ├── media/                # (empty)
│       │   │   ├── navigation/
│       │   │   │   ├── Breadcrumb.tsx
│       │   │   │   ├── FilterBar.tsx
│       │   │   │   ├── index.ts
│       │   │   │   ├── Navbar.tsx
│       │   │   │   ├── Pagination.tsx
│       │   │   │   ├── Sidebar.tsx
│       │   │   │   └── Tabs.tsx
│       │   │   ├── overlays/
│       │   │   │   ├── AlertDialog.test.jsx
│       │   │   │   ├── AlertDialog.tsx
│       │   │   │   ├── Command.test.jsx
│       │   │   │   ├── Command.tsx
│       │   │   │   ├── Drawer.test.jsx
│       │   │   │   ├── Drawer.tsx
│       │   │   │   ├── DropdownMenu.tsx
│       │   │   │   ├── index.ts
│       │   │   │   ├── Modal.test.jsx
│       │   │   │   ├── Modal.tsx
│       │   │   │   ├── Popover.tsx
│       │   │   │   └── Tooltip.tsx
│       │   │   ├── ui/                   ← Stale duplicate of src/ui/
│       │   │   │   ├── badge.css
│       │   │   │   ├── badge.tsx
│       │   │   │   ├── button.css
│       │   │   │   ├── button.tsx
│       │   │   │   └── index.ts
│       │   │   └── index.ts
│       │   ├── core/
│       │   │   ├── accessibility/        # (empty)
│       │   │   ├── animations/           # (empty)
│       │   │   ├── config/
│       │   │   │   ├── index.ts
│       │   │   │   └── theme.js
│       │   │   ├── constants/            # (empty)
│       │   │   ├── hooks/
│       │   │   │   ├── index.ts
│       │   │   │   ├── useTheme.test.jsx
│       │   │   │   ├── useTheme.ts
│       │   │   │   ├── useToast.test.jsx
│       │   │   │   └── useToast.ts
│       │   │   ├── providers/
│       │   │   │   ├── index.ts
│       │   │   │   ├── theme-context.ts
│       │   │   │   ├── ThemeProvider.tsx
│       │   │   │   ├── ThemeRoot.tsx
│       │   │   │   ├── toast-context.ts
│       │   │   │   └── ToastProvider.tsx
│       │   │   ├── types/                # (empty)
│       │   │   └── utils/                # (empty)
│       │   ├── design-system/            # (all empty — tokens live in styles/)
│       │   │   ├── breakpoints/
│       │   │   ├── colors/
│       │   │   ├── motions/
│       │   │   ├── radius/
│       │   │   ├── shadows/
│       │   │   ├── spacing/
│       │   │   ├── themes/
│       │   │   ├── tokens/
│       │   │   └── typography/
│       │   ├── fonts/                    # (empty)
│       │   ├── icons/                    # (empty)
│       │   ├── lib/                      # Pure helpers
│       │   │   ├── cn.test.js
│       │   │   ├── cn.ts
│       │   │   └── variants.ts
│       │   ├── registry/                 # (empty)
│       │   ├── stories/                  # (empty)
│       │   ├── styles/                   # Global styles
│       │   │   ├── base.css
│       │   │   ├── components.css
│       │   │   ├── overrides.css
│       │   │   ├── styles.css            # Entry: imports tokens → base → utilities → components → overrides
│       │   │   ├── tokens.css
│       │   │   └── utilities.css
│       │   ├── templates/                # (empty)
│       │   ├── tests/                    # (empty)
│       │   ├── types/
│       │   │   └── declarations.d.ts
│       │   ├── ui/                       # Flattened component structure (target)
│       │   │   ├── badge.css
│       │   │   ├── badge.tsx
│       │   │   ├── button.css
│       │   │   ├── button.tsx
│       │   │   └── index.ts
│       │   ├── index.ts                  # Public API entry point
│       │   └── styles.css                # Root CSS entry (same as styles/styles.css)
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsup.config.ts
│       ├── vitest.config.ts
│       └── README.md
├── tooling/
│   ├── codemods/                         # (empty)
│   ├── generators/
│   │   ├── package.json
│   │   └── scripts/
│   │       ├── generate-component.js
│   │       ├── sync-showcase.js
│   │       └── validate.js
│   └── scripts/
│       ├── README.md
│       ├── generate-component.js
│       ├── sync-showcase.js
│       └── validate.js
├── docs/
│   └── REORGANIZATION_STATUS.md
├── package.json                          # Root workspace (pnpm workspace)
├── pnpm-workspace.yaml
├── turbo.json
├── biome.json
├── eslint.config.js
├── .gitignore
├── README.md
└── pnpm-lock.yaml
```

## Legend

- `(empty)` — directory exists but contains no files
- `(all empty)` — directory and all subdirs are empty
- `← duplicate` — file exists in two locations (cleanup needed)
- `(target)` — new flattened structure (migration in progress)
