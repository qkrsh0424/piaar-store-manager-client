
function createGraphData(graph) {
    let datasets = graph.datasets?.map(r => {
        return {
            type: r.type || 'bar',
            label: r.label || '',
            data: r.data || [],
            fill: r.fill || false,
            borderColor: r.borderColor || '#eee',
            backgroundColor: r.backgroundColor || '#eee',
            order: r.order || 0,
            borderWidth: r.borderWidth ?? 1,
            borderDash: r.borderDash || [0, 0],
            pointRadius: r.pointRadius ?? 3,
        }
    });

    return {
        labels: graph.labels || [],
        datasets
    }
}

function createGraphOption(option) {
    // console.log(option.plugins?.datalabels)
    return {
        responsive: option.responsive,
        indexAxis: option.indexAxis,
        maintainAspectRatio: option.maintainAspectRatio,
        interaction: option.interaction,
        maxBarThickness: option.maxBarThickness || 23,
        lineTension: option.lineTension ?? 0.3,
        cutout: option.cutout ?? 30,
        // borderWidth: option.borderWidth || 1,
        plugins: {
            legend: {
                ...option.plugins?.legend,
                position: option.plugins?.legend?.position || 'top',
                labels: {
                    ...option.plugins?.legend?.labels,
                    boxWidth: option.plugins?.lengend?.labels || 12,
                }
            },
            tooltip: {
                callbacks: {
                    label: option.plugins?.tooltip?.callbacks?.label
                }
            }
        },
        onClick: option.onClick,
        onHover: option.onHover,
        scales: option.scales
    }
}

export {
    createGraphData,
    createGraphOption
}