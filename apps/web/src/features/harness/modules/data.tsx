import { useState } from 'react'
import { DataList, DataTable, MetricGrid, StatCard, Table } from '@monority/ui'
import { Sample } from '../Sample'

export function TableHarness() {
    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status' },
    ]

    const rows = [
        { id: '1', name: 'Alice Martin', role: 'Staff Engineer', status: 'Active' },
        { id: '2', name: 'Bob Dupont', role: 'Designer', status: 'Away' },
        { id: '3', name: 'Charlie Vance', role: 'Product Manager', status: 'Offline' },
    ]

    return (
        <>
            <Sample label="Basic Table">
                <Table columns={columns} rows={rows} getRowId={(r) => String(r.id)} />
            </Sample>
            <Sample label="Empty Table">
                <Table columns={columns} rows={[]} emptyState="No team members found." />
            </Sample>
        </>
    )
}

export function DataTableHarness() {
    interface UserRow {
        id: string
        name: string
        department: string
        score: number
    }

    const columns = [
        { key: 'name', header: 'Name', sortable: true },
        { key: 'department', header: 'Department', sortable: true },
        { key: 'score', header: 'Score', align: 'right' as const, sortable: true },
    ]

    const rows: UserRow[] = [
        { id: '1', name: 'Alice Martin', department: 'Core Infra', score: 98 },
        { id: '2', name: 'Bob Dupont', department: 'Design System', score: 85 },
        { id: '3', name: 'Charlie Vance', department: 'Product', score: 92 },
    ]

    const [selectedIds, setSelectedIds] = useState<string[]>(['1'])

    return (
        <>
            <Sample label="Data Table Selectable">
                <DataTable<UserRow>
                    columns={columns}
                    rows={rows}
                    getRowId={(r) => r.id}
                    selectable
                    selectedRowIds={selectedIds}
                    onSelectedRowIdsChange={setSelectedIds}
                />
            </Sample>
        </>
    )
}

export function DataListHarness() {
    const items = [
        { key: 'name', label: 'Package Name', value: '@monority/ui' },
        { key: 'version', label: 'Version', value: '0.1.0' },
        { key: 'license', label: 'License', value: 'MIT' },
        { key: 'engine', label: 'React Engine', value: 'React 19' },
    ]

    return (
        <>
            <Sample label="Data List Auto">
                <DataList items={items} columns="auto" />
            </Sample>
            <Sample label="Data List Split">
                <DataList items={items} columns="split" />
            </Sample>
        </>
    )
}

export function StatCardHarness() {
    return (
        <>
            <Sample label="Stat Card Neutral">
                <StatCard
                    label="Total Users"
                    value="12,450"
                    description="Registered accounts this month"
                />
            </Sample>
            <Sample label="Stat Card Success">
                <StatCard
                    label="Monthly Recurring Revenue"
                    value="$48,200"
                    trend="+14.2%"
                    trendTone="success"
                />
            </Sample>
            <Sample label="Stat Card Warning">
                <StatCard label="API Latency" value="320ms" trend="+40ms" trendTone="warning" />
            </Sample>
            <Sample label="Stat Card Danger">
                <StatCard label="Error Rate" value="3.8%" trend="+1.2%" trendTone="danger" />
            </Sample>
        </>
    )
}

export function MetricGridHarness() {
    const metrics = [
        {
            key: 'users',
            label: 'Active Users',
            value: '8,920',
            trend: '+5.4%',
            trendTone: 'success' as const,
        },
        {
            key: 'sessions',
            label: 'Daily Sessions',
            value: '24,100',
            trend: '+12%',
            trendTone: 'success' as const,
        },
        {
            key: 'bounce',
            label: 'Bounce Rate',
            value: '42.1%',
            trend: '-2.3%',
            trendTone: 'warning' as const,
        },
        {
            key: 'issues',
            label: 'Critical Issues',
            value: '0',
            trend: 'None',
            trendTone: 'neutral' as const,
        },
    ]

    return (
        <>
            <Sample label="Metric Grid">
                <MetricGrid items={metrics} />
            </Sample>
        </>
    )
}
