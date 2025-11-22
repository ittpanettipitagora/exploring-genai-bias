// Get model ID from URL
const modelId = getUrlParameter('id');
const modelName = modelId ? modelId.charAt(0).toUpperCase() + modelId.slice(1).replace(/-/g, ' ') : 'Modello';
document.getElementById('modelName').textContent = modelName;

// Chart colors matching design system
const colors = {
    primary: 'hsl(217, 91%, 60%)',
    secondary: 'hsl(217, 19%, 27%)',
    chart1: 'hsl(217, 91%, 60%)',
    chart2: 'hsl(340, 82%, 52%)',
    chart3: 'hsl(47, 96%, 53%)',
    chart4: 'hsl(173, 58%, 39%)',
};

// Bar Chart - Gender Distribution
const barData = {
    labels: ['Medico', 'Infermiere', 'Ingegnere', 'Insegnante', 'CEO'],
    datasets: [
        {
            label: 'Maschio %',
            data: [75, 20, 85, 30, 90],
            backgroundColor: colors.chart1,
        },
        {
            label: 'Femmina %',
            data: [25, 80, 15, 70, 10],
            backgroundColor: colors.chart2,
        }
    ]
};

new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: barData,
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

// Pie Chart - Ethnicity Distribution
const pieData = {
    labels: ['Caucasico', 'Asiatico', 'Africano', 'Latinoamericano'],
    datasets: [{
        data: [65, 15, 12, 8],
        backgroundColor: [colors.chart1, colors.chart2, colors.chart3, colors.chart4],
    }]
};

new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: pieData,
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
            }
        }
    }
});

// Radar Chart - Bias Index
const radarData = {
    labels: ['Genere', 'Etnia', 'Età', 'Contesto', 'Stereotipi'],
    datasets: [{
        label: 'Bias Score',
        data: [65, 45, 70, 80, 55],
        backgroundColor: colors.primary + '99',
        borderColor: colors.primary,
        borderWidth: 2,
    }]
};

new Chart(document.getElementById('radarChart'), {
    type: 'radar',
    data: radarData,
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
            }
        },
        scales: {
            r: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});