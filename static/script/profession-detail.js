const professionIdMap = {
    'medico': 'Doctor',
    'ingegnere': 'engineer',
    'contadino': 'Farmer',
    'insegnante': 'Teacher',
    'ceo': 'CEO',
    'avvocato': 'Lawyer',
    'architetto': 'Architect',
    'politico': 'Politician',
    'fast-food-worker': 'Fast food worker',
    'janitor': 'Janitor',
    'cashier': 'Cashier',
    'dishwasher': 'Dishwasher',
    'housekeeper': 'Housekeeper',
    'judge': 'Judge',
    'social-worker': 'Social Worker'
};


document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const professionId = urlParams.get('id'); // e.g., "medico"

    if (professionId) {
        const professionName = professionId.charAt(0).toUpperCase() + professionId.slice(1);
        updatePageTitles(professionName);
        loadComparisonChart(professionId);
    }
});

function updatePageTitles(professionName) {
    document.title = `${professionName} — Analisi AI`;
    const h1 = document.querySelector('h1');
    if (h1) {
        h1.textContent = `${professionName} — Analisi Generative AI`;
    }
}

function calculateSimpsonIndex(categoryData) {
    if (!categoryData || typeof categoryData !== 'object') {
        return 0;
    }
    const values = Object.values(categoryData);
    const total = values.reduce((sum, value) => sum + value, 0);
    if (total === 0) return 0;

    const sumOfSquares = values.reduce((sum, value) => sum + Math.pow(value / total, 2), 0);
    return 1 - sumOfSquares;
}

async function loadComparisonChart(professionId) {
    const englishProfession = professionIdMap[professionId.toLowerCase()];
    if (!englishProfession) {
        console.error(`No mapping found for profession ID: ${professionId}`);
        // Maybe display an error message to the user on the page
        return;
    }

    const models = [
        { name: 'Gemini', file: 'Gemini.json' },
        { name: 'Leo', file: 'Leo.json' },
        { name: 'Chat', file: 'Chat.json' },
        { name: 'Canva', file: 'Canva.json' },
        { name: 'Bing', file: 'Bing.json' }
    ];

    const chartData = {
        models: [],
        datasets: []
    };

    const colors = ['#2b7cff', '#ff9f43', '#34a853', '#ea4335', '#9333ea'];
    const indexKeys = {
        sex: 'Sesso',
        race: 'Etnia',
        skin: 'Tonalità della pelle',
        age: 'Età (stimata)',
        facialExp: 'Umore (esp. facciale)'
    };

    for (let i = 0; i < models.length; i++) {
        const model = models[i];
        try {
            const response = await fetch(`json/${model.file}`);
            const data = await response.json();
            
            // Use the mapped English name for lookup
            const professionKey = Object.keys(data).find(k => k.toLowerCase() === englishProfession.toLowerCase());
            const professionData = professionKey ? data[professionKey] : null;

            if (professionData) {
                const indexes = [
                    calculateSimpsonIndex(professionData[indexKeys.sex]),
                    calculateSimpsonIndex(professionData[indexKeys.race]),
                    calculateSimpsonIndex(professionData[indexKeys.skin]),
                    calculateSimpsonIndex(professionData[indexKeys.age]),
                    calculateSimpsonIndex(professionData[indexKeys.facialExp])
                ];

                chartData.models.push({ model: model.name });
                chartData.datasets.push({
                    label: model.name,
                    data: indexes,
                    fill: true,
                    backgroundColor: Chart.helpers.color(colors[i % colors.length]).alpha(0.15).rgbString(),
                    borderColor: colors[i % colors.length],
                    pointBackgroundColor: colors[i % colors.length],
                    pointRadius: 4,
                    tension: 0.1
                });
            } else {
                console.warn(`Profession '${englishProfession}' not found in ${model.file}`);
            }
        } catch (error) {
            console.error(`Error loading data for ${model.name}:`, error);
        }
    }

    renderComparisonChart(chartData);
}

function renderComparisonChart(chartData) {
    const ctx = document.getElementById('comparisonChart').getContext('2d');

    if (window.myComparisonChart) {
        window.myComparisonChart.destroy();
    }

    window.myComparisonChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Sex', 'Race', 'Skin', 'Age', 'Facial Exp.'],
            datasets: chartData.datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0,
                    max: 1,
                    angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                    grid: { color: 'rgba(255, 255, 255, 0.2)' },
                    pointLabels: { color: '#fff', font: { size: 14 } },
                    ticks: {
                        stepSize: 0.2,
                        color: '#fff',
                        backdropColor: 'rgba(0, 0, 0, 0.5)',
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => `${ctx.dataset.label}: ${ctx.formattedValue}`
                    }
                }
            }
        }
    });

    const legendEl = document.getElementById('radarLegend');
    legendEl.innerHTML = '';
    chartData.models.forEach((d, i) => {
        const color = window.myComparisonChart.data.datasets[i].borderColor;
        const item = document.createElement('div');
        item.innerHTML = `<span style="display:inline-block; vertical-align: middle; width:36px;height:6px;background:${color};border-radius:3px; margin-right:8px"></span>${d.model}`;
        item.style.marginBottom = '12px';
        item.style.cursor = 'pointer';
        item.onclick = () => {
            if (!window.myComparisonChart) return;
            const meta = window.myComparisonChart.getDatasetMeta(i);
            meta.hidden = meta.hidden === null ? !window.myComparisonChart.data.datasets[i].hidden : null;
            item.style.textDecoration = meta.hidden ? 'line-through' : '';
            item.style.opacity = meta.hidden ? '0.5' : '1';
            window.myComparisonChart.update();
        };
        legendEl.appendChild(item);
    });
}
