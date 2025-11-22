// Get profession ID from URL
const professionId = getUrlParameter('id');
const professionName = professionId ? professionId.charAt(0).toUpperCase() + professionId.slice(1) : 'Professione';
document.getElementById('professionName').textContent = professionName;
document.getElementById('chartDescription').textContent = `Distribuzione di genere e diversità nelle generazioni di ${professionName}`;

// Chart colors matching design system
const colors = {
    primary: 'hsl(217, 91%, 60%)',
    chart1: 'hsl(217, 91%, 60%)',
    chart2: 'hsl(340, 82%, 52%)',
    chart3: 'hsl(47, 96%, 53%)',
};

// Comparison Chart
const comparisonData = {
    labels: ['DALL-E', 'Midjourney', 'Stable Diffusion', 'Bing Image'],
    datasets: [
        {
            label: 'Maschio %',
            data: [75, 70, 80, 65],
            backgroundColor: colors.chart1,
        },
        {
            label: 'Femmina %',
            data: [25, 30, 20, 35],
            backgroundColor: colors.chart2,
        },
        {
            label: 'Diversità %',
            data: [15, 20, 12, 25],
            backgroundColor: colors.chart3,
        }
    ]
};

new Chart(document.getElementById('comparisonChart'), {
    type: 'bar',
    data: comparisonData,
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

// Trend Chart
const trendData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    datasets: [{
        label: 'Indice Bias',
        data: [85, 78, 72, 65, 60],
        borderColor: colors.primary,
        backgroundColor: colors.primary + '33',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
    }]
};

new Chart(document.getElementById('trendChart'), {
    type: 'line',
    data: trendData,
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