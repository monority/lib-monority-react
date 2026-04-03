export function mapDashboardOverviewResponse(data) {
    return {
        topbarContent: data.topbar,
        headerContent: data.header,
        metrics: data.metrics ?? [],
        alert: data.alert ?? null,
        tableColumns: data.table?.columns ?? [],
        tableRows: data.table?.rows ?? [],
        sidebarData: {
            highlights: data.sidebar?.highlights ?? [],
            tasks: data.sidebar?.tasks ?? [],
        },
    }
}
