export function mapAdminOverviewResponse(data) {
    return {
        headerContent: data.header,
        filters: data.filters ?? [],
        columns: data.table?.columns ?? [],
        rows: data.table?.rows ?? [],
        sidebarData: {
            summary: data.sidebar?.summary ?? [],
            actions: data.sidebar?.actions ?? [],
        },
    }
}
