import { describe, it, expect } from 'vitest'

// ──────────────────────────────────────────────
// Root barrel import — verifies `@monority/ui` resolves correctly
// Uses `resolve.conditions: ['development']` to match the exports map
// ──────────────────────────────────────────────
import {
  // Actions
  Button, CopyButton, IconButton,
  // Typography
  Text, Title,
  // Feedback
  Badge, Banner, Callout, InlineAlert, Progress, Skeleton, Spinner, Toast, AsyncStateNotice, EmptyState,
  // Display
  Accordion, Avatar, Card, MetricGrid, StatCard, Table,
  // Data-display
  DataList, DataTable,
  // Layout
  Container, Divider, Grid, PageHeader, Section, Stack, Toolbar,
  // Navigation
  Breadcrumb, FilterBar, Pagination, SidebarLayout, Tabs, Topbar,
  // Forms
  Checkbox, Combobox, DatePicker, DateRangePicker, FileUpload, FormSection, Input, NumberInput, PasswordInput, RadioGroup, Select, Slider, Switch, Textarea, Field,
  // Overlays
  AlertDialog, Drawer, DropdownMenu, Modal, Popover, Tooltip, CommandPalette,
  // Experimental
  InfiniteScroll,
} from '@monority/ui'

describe('root barrel import (@monority/ui)', () => {
  const components: Record<string, unknown> = {
    Button, CopyButton, IconButton,
    Text, Title,
    Badge, Banner, Callout, InlineAlert, Progress, Skeleton, Spinner, Toast, AsyncStateNotice, EmptyState,
    Accordion, Avatar, Card, MetricGrid, StatCard, Table,
    DataList, DataTable,
    Container, Divider, Grid, PageHeader, Section, Stack, Toolbar,
    Breadcrumb, FilterBar, Pagination, SidebarLayout, Tabs, Topbar,
    Checkbox, Combobox, DatePicker, DateRangePicker, FileUpload, FormSection, Input, NumberInput, PasswordInput, RadioGroup, Select, Slider, Switch, Textarea, Field,
    AlertDialog, Drawer, DropdownMenu, Modal, Popover, Tooltip, CommandPalette,
    InfiniteScroll,
  }

  for (const [name, component] of Object.entries(components)) {
    it(`exports ${name}`, () => {
      expect(component).toBeDefined()
    })
  }
})

// ──────────────────────────────────────────────
// Sub-path imports — verifies every `@monority/ui/<name>` resolves
// ──────────────────────────────────────────────
describe('sub-path imports (@monority/ui/<name>)', () => {
  it('imports Accordion from @monority/ui/accordion', async () => {
    const { Accordion } = await import('@monority/ui/accordion')
    expect(Accordion).toBeDefined()
  })

  it('imports AlertDialog from @monority/ui/alert-dialog', async () => {
    const { AlertDialog } = await import('@monority/ui/alert-dialog')
    expect(AlertDialog).toBeDefined()
  })

  it('imports AsyncStateNotice from @monority/ui/async-state-notice', async () => {
    const { AsyncStateNotice } = await import('@monority/ui/async-state-notice')
    expect(AsyncStateNotice).toBeDefined()
  })

  it('imports Avatar from @monority/ui/avatar', async () => {
    const { Avatar } = await import('@monority/ui/avatar')
    expect(Avatar).toBeDefined()
  })

  it('imports Badge from @monority/ui/badge', async () => {
    const { Badge } = await import('@monority/ui/badge')
    expect(Badge).toBeDefined()
  })

  it('imports Banner from @monority/ui/banner', async () => {
    const { Banner } = await import('@monority/ui/banner')
    expect(Banner).toBeDefined()
  })

  it('imports Breadcrumb from @monority/ui/breadcrumb', async () => {
    const { Breadcrumb } = await import('@monority/ui/breadcrumb')
    expect(Breadcrumb).toBeDefined()
  })

  it('imports Button from @monority/ui/button', async () => {
    const { Button } = await import('@monority/ui/button')
    expect(Button).toBeDefined()
  })

  it('imports Callout from @monority/ui/callout', async () => {
    const { Callout } = await import('@monority/ui/callout')
    expect(Callout).toBeDefined()
  })

  it('imports Card from @monority/ui/card', async () => {
    const { Card } = await import('@monority/ui/card')
    expect(Card).toBeDefined()
  })

  it('imports Checkbox from @monority/ui/checkbox', async () => {
    const { Checkbox } = await import('@monority/ui/checkbox')
    expect(Checkbox).toBeDefined()
  })

  it('imports Combobox from @monority/ui/combobox', async () => {
    const { Combobox } = await import('@monority/ui/combobox')
    expect(Combobox).toBeDefined()
  })

  it('imports CommandPalette from @monority/ui/command-palette', async () => {
    const { CommandPalette } = await import('@monority/ui/command-palette')
    expect(CommandPalette).toBeDefined()
  })

  it('imports Container from @monority/ui/container', async () => {
    const { Container } = await import('@monority/ui/container')
    expect(Container).toBeDefined()
  })

  it('imports CopyButton from @monority/ui/copy-button', async () => {
    const { CopyButton } = await import('@monority/ui/copy-button')
    expect(CopyButton).toBeDefined()
  })

  it('imports DataList from @monority/ui/data-list', async () => {
    const { DataList } = await import('@monority/ui/data-list')
    expect(DataList).toBeDefined()
  })

  it('imports DataTable from @monority/ui/data-table', async () => {
    const { DataTable } = await import('@monority/ui/data-table')
    expect(DataTable).toBeDefined()
  })

  it('imports DatePicker from @monority/ui/date-picker', async () => {
    const { DatePicker } = await import('@monority/ui/date-picker')
    expect(DatePicker).toBeDefined()
  })

  it('imports DateRangePicker from @monority/ui/date-range-picker', async () => {
    const { DateRangePicker } = await import('@monority/ui/date-range-picker')
    expect(DateRangePicker).toBeDefined()
  })

  it('imports Divider from @monority/ui/divider', async () => {
    const { Divider } = await import('@monority/ui/divider')
    expect(Divider).toBeDefined()
  })

  it('imports Drawer from @monority/ui/drawer', async () => {
    const { Drawer } = await import('@monority/ui/drawer')
    expect(Drawer).toBeDefined()
  })

  it('imports DropdownMenu from @monority/ui/dropdown-menu', async () => {
    const { DropdownMenu } = await import('@monority/ui/dropdown-menu')
    expect(DropdownMenu).toBeDefined()
  })

  it('imports EmptyState from @monority/ui/empty-state', async () => {
    const { EmptyState } = await import('@monority/ui/empty-state')
    expect(EmptyState).toBeDefined()
  })

  it('imports Field from @monority/ui/field', async () => {
    const { Field } = await import('@monority/ui/field')
    expect(Field).toBeDefined()
  })

  it('imports FileUpload from @monority/ui/file-upload', async () => {
    const { FileUpload } = await import('@monority/ui/file-upload')
    expect(FileUpload).toBeDefined()
  })

  it('imports FilterBar from @monority/ui/filter-bar', async () => {
    const { FilterBar } = await import('@monority/ui/filter-bar')
    expect(FilterBar).toBeDefined()
  })

  it('imports FormSection from @monority/ui/form-section', async () => {
    const { FormSection } = await import('@monority/ui/form-section')
    expect(FormSection).toBeDefined()
  })

  it('imports Grid from @monority/ui/grid', async () => {
    const { Grid } = await import('@monority/ui/grid')
    expect(Grid).toBeDefined()
  })

  it('imports IconButton from @monority/ui/icon-button', async () => {
    const { IconButton } = await import('@monority/ui/icon-button')
    expect(IconButton).toBeDefined()
  })

  it('imports InfiniteScroll from @monority/ui/infinite-scroll', async () => {
    const { InfiniteScroll } = await import('@monority/ui/infinite-scroll')
    expect(InfiniteScroll).toBeDefined()
  })

  it('imports InlineAlert from @monority/ui/inline-alert', async () => {
    const { InlineAlert } = await import('@monority/ui/inline-alert')
    expect(InlineAlert).toBeDefined()
  })

  it('imports Input from @monority/ui/input', async () => {
    const { Input } = await import('@monority/ui/input')
    expect(Input).toBeDefined()
  })

  it('imports MetricGrid from @monority/ui/metric-grid', async () => {
    const { MetricGrid } = await import('@monority/ui/metric-grid')
    expect(MetricGrid).toBeDefined()
  })

  it('imports Modal from @monority/ui/modal', async () => {
    const { Modal } = await import('@monority/ui/modal')
    expect(Modal).toBeDefined()
  })

  it('imports NumberInput from @monority/ui/number-input', async () => {
    const { NumberInput } = await import('@monority/ui/number-input')
    expect(NumberInput).toBeDefined()
  })

  it('imports PageHeader from @monority/ui/page-header', async () => {
    const { PageHeader } = await import('@monority/ui/page-header')
    expect(PageHeader).toBeDefined()
  })

  it('imports Pagination from @monority/ui/pagination', async () => {
    const { Pagination } = await import('@monority/ui/pagination')
    expect(Pagination).toBeDefined()
  })

  it('imports PasswordInput from @monority/ui/password-input', async () => {
    const { PasswordInput } = await import('@monority/ui/password-input')
    expect(PasswordInput).toBeDefined()
  })

  it('imports Popover from @monority/ui/popover', async () => {
    const { Popover } = await import('@monority/ui/popover')
    expect(Popover).toBeDefined()
  })

  it('imports Progress from @monority/ui/progress', async () => {
    const { Progress } = await import('@monority/ui/progress')
    expect(Progress).toBeDefined()
  })

  it('imports RadioGroup from @monority/ui/radio-group', async () => {
    const { RadioGroup } = await import('@monority/ui/radio-group')
    expect(RadioGroup).toBeDefined()
  })

  it('imports Section from @monority/ui/section', async () => {
    const { Section } = await import('@monority/ui/section')
    expect(Section).toBeDefined()
  })

  it('imports Select from @monority/ui/select', async () => {
    const { Select } = await import('@monority/ui/select')
    expect(Select).toBeDefined()
  })

  it('imports SidebarLayout from @monority/ui/sidebar-layout', async () => {
    const { SidebarLayout } = await import('@monority/ui/sidebar-layout')
    expect(SidebarLayout).toBeDefined()
  })

  it('imports Skeleton from @monority/ui/skeleton', async () => {
    const { Skeleton } = await import('@monority/ui/skeleton')
    expect(Skeleton).toBeDefined()
  })

  it('imports Slider from @monority/ui/slider', async () => {
    const { Slider } = await import('@monority/ui/slider')
    expect(Slider).toBeDefined()
  })

  it('imports Spinner from @monority/ui/spinner', async () => {
    const { Spinner } = await import('@monority/ui/spinner')
    expect(Spinner).toBeDefined()
  })

  it('imports Stack from @monority/ui/stack', async () => {
    const { Stack } = await import('@monority/ui/stack')
    expect(Stack).toBeDefined()
  })

  it('imports StatCard from @monority/ui/stat-card', async () => {
    const { StatCard } = await import('@monority/ui/stat-card')
    expect(StatCard).toBeDefined()
  })

  it('imports Switch from @monority/ui/switch', async () => {
    const { Switch } = await import('@monority/ui/switch')
    expect(Switch).toBeDefined()
  })

  it('imports Tabs from @monority/ui/tabs', async () => {
    const { Tabs } = await import('@monority/ui/tabs')
    expect(Tabs).toBeDefined()
  })

  it('imports Text from @monority/ui/text', async () => {
    const { Text } = await import('@monority/ui/text')
    expect(Text).toBeDefined()
  })

  it('imports Textarea from @monority/ui/textarea', async () => {
    const { Textarea } = await import('@monority/ui/textarea')
    expect(Textarea).toBeDefined()
  })

  it('imports Title from @monority/ui/title', async () => {
    const { Title } = await import('@monority/ui/title')
    expect(Title).toBeDefined()
  })

  it('imports Toast from @monority/ui/toast', async () => {
    const { Toast } = await import('@monority/ui/toast')
    expect(Toast).toBeDefined()
  })

  it('imports Toolbar from @monority/ui/toolbar', async () => {
    const { Toolbar } = await import('@monority/ui/toolbar')
    expect(Toolbar).toBeDefined()
  })

  it('imports Tooltip from @monority/ui/tooltip', async () => {
    const { Tooltip } = await import('@monority/ui/tooltip')
    expect(Tooltip).toBeDefined()
  })

  it('imports Topbar from @monority/ui/topbar', async () => {
    const { Topbar } = await import('@monority/ui/topbar')
    expect(Topbar).toBeDefined()
  })
})

// ──────────────────────────────────────────────
// CSS imports — verifies style sheets resolve
// ──────────────────────────────────────────────
describe('CSS imports', () => {
  it('imports @monority/ui/index.css', async () => {
    await expect(import('@monority/ui/index.css')).resolves.toBeDefined()
  })

  it('imports @monority/ui/styles.css', async () => {
    await expect(import('@monority/ui/styles.css')).resolves.toBeDefined()
  })
})

// ──────────────────────────────────────────────
// Type re-exports — compile-time check (can't fully test at runtime)
// Full type checking requires tsc --noEmit
// ──────────────────────────────────────────────
describe('type re-exports', () => {
  it('re-exports types from root barrel', () => {
    expect(true).toBe(true)
  })
})
