export function mapPlaygroundMetricResponse(metric) {
    return {
        id: metric.id,
        label: metric.label,
        value: metric.value,
        detail: metric.detail,
    }
}

export function mapPlaygroundMetricsResponse(metrics = []) {
    return metrics.map(mapPlaygroundMetricResponse)
}
