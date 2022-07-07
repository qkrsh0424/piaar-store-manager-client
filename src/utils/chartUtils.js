
function createGraphData(graph) {
    return {
        labels: graph.labels,
        datasets: graph.datasets
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
        maintainAspectRatio: option.maintainAspectRatio
    }
}

function createStackedBarGraphOption(option) {
    return {
        responsive: option.responsive,
        maintainAspectRatio: option.maintainAspectRatio,
        indexAxis: option.indexAxis,
        plugins: option.plugins,
        scales: option.scales
    }
}

export {
    createGraphData,
    createDoughnutGraphOption,
    createBarGraphOption,
    createStackedBarGraphOption
}