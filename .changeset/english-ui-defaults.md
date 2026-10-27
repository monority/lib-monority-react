---
'@monority/ui': major
---

- Les libellés et noms accessibles par défaut passent du français à l'anglais : `Banner`, `Toast`, `Combobox`, `Input`, `AlertDialog`, `Drawer`, `Sheet`, `SlidePanel`, `Modal`, `Topbar`, `Carousel`, `CommandPalette`, `InputOTP` et `SidebarLayout`. La librairie reste sans i18n ; toute valeur par défaut reste remplaçable par une prop.
- Prise en charge native de la locale (`Intl.DateTimeFormat`) sur `DatePicker`, `DateRangePicker` et `Calendar` via la prop `locale?: string`.
- Ajout de props de personnalisation des libellés et labels ARIA sur `Pagination` (`previousLabel`, `nextLabel`, `previousAriaLabel`, `nextAriaLabel`), `DatePicker` (`dialogAriaLabel`), `InputOTP` (`aria-label`) et `SidebarLayout.Toggle` (`aria-label`).
- Détail avant/après et consignes de migration dans `MIGRATIONS.md`, section « Libellés par défaut en anglais ».
