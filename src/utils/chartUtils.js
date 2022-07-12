
function createGraphData(graph) {
    // return {
    //     labels: graph.labels,
    //     datasets: graph.datasets
    // }
    let datasets = graph.datasets?.map(r => {
        return {
            type: r.type || 'bar',
            label: r.label || '',
            data: r.data || [],
            fill: r.fill || false,
            borderColor: r.borderColor || '#eee',
            backgroundColor: r.backgroundColor || '#eee',
            tension: r.tension || '0'
        }
    });

    return {
        labels: graph.labels || [],
        datasets
    }
}

function createDoughnutGraphOption(option) {
    return {
        responsive: option.responsive,
        plugins: option.plugins,
        maintainAspectRatio: option.maintainAspectRatio
    }
}

function createBarGraphOption(option) {
    return {
        responsive: option.responsive,
        indexAxis: option.indexAxis,
        maintainAspectRatio: option.maintainAspectRatio,
        interaction: option.interaction,
        maxBarThickness: option.maxBarThickness || 30,
        lineTension: option.lineTension || 0.3,
        borderWidth: option.borderWidth || 2,
        plugins: {
            legend: {
                labels: {
                    boxWidth: 12,
                }
            }
        }
    }
}

export {
    createGraphData,
    createDoughnutGraphOption,
    createBarGraphOption
}