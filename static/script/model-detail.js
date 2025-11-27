document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const modelId = urlParams.get('id');

    loadModelDetails(modelId);
    loadChartData(modelId); // Load data for the chart
    setupScrollNavigation();
});

// Maps model ID from URL to JSON filename
function getJsonFileName(modelId) {
    const mapping = {
        'gemini': 'Gemini.json',
        'leonardo-ai': 'Leo.json',
        'chatgpt': 'Chat.json',
        'canva': 'Canva.json',
        'bing-image-creator': 'Bing.json'
    };
    return mapping[modelId] || 'Gemini.json'; // Default to Gemini if not found
}

// Calculates the Gini-Simpson diversity index for a single category
function calculateSimpsonIndex(categoryData) {
    const values = Object.values(categoryData);
    const total = values.reduce((sum, value) => sum + value, 0);
    if (total === 0) return 0;

    const sumOfSquares = values.reduce((sum, value) => sum + Math.pow(value / total, 2), 0);
    return 1 - sumOfSquares;
}

// Renders the radar chart
function renderRadarChart(indexes) {
    const ctx = document.getElementById('diversityChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Sex',
                'Race',
                'Skin Tone',
                'Age',
                'Facial Expression'
            ],
            datasets: [{
                label: 'Diversity Index',
                data: [
                    indexes.sex,
                    indexes.race,
                    indexes.skin,
                    indexes.age,
                    indexes.facialExp
                ],
                backgroundColor: 'rgba(26, 115, 232, 0.2)',
                borderColor: 'rgba(26, 115, 232, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(26, 115, 232, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(26, 115, 232, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    pointLabels: {
                        color: '#fff',
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        color: '#fff',
                        backdropColor: 'rgba(0, 0, 0, 0.5)',
                        beginAtZero: true,
                        max: 1,
                        stepSize: 0.2
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}


// Fetches data, calculates indexes, and renders the chart
async function loadChartData(modelId) {
    const fileName = getJsonFileName(modelId);
    try {
        const response = await fetch(`json/${fileName}`);
        const data = await response.json();

        const professions = Object.keys(data);
        const numProfessions = professions.length;

        if (numProfessions === 0) return;

        const totalIndexes = {
            sex: 0,
            race: 0,
            skin: 0,
            age: 0,
            facialExp: 0
        };

        const indexKeys = {
            sex: 'Sesso',
            race: 'Etnia',
            skin: 'Tonalità della pelle',
            age: 'Età (stimata)',
            facialExp: 'Umore (esp. facciale)'
        };

        for (const profession of professions) {
            const professionData = data[profession];
            totalIndexes.sex += calculateSimpsonIndex(professionData[indexKeys.sex] || {});
            totalIndexes.race += calculateSimpsonIndex(professionData[indexKeys.race] || {});
            totalIndexes.skin += calculateSimpsonIndex(professionData[indexKeys.skin] || {});
            totalIndexes.age += calculateSimpsonIndex(professionData[indexKeys.age] || {});
            totalIndexes.facialExp += calculateSimpsonIndex(professionData[indexKeys.facialExp] || {});
        }

        const avgIndexes = {
            sex: totalIndexes.sex / numProfessions,
            race: totalIndexes.race / numProfessions,
            skin: totalIndexes.skin / numProfessions,
            age: totalIndexes.age / numProfessions,
            facialExp: totalIndexes.facialExp / numProfessions
        };

        renderRadarChart(avgIndexes);

    } catch (error) {
        console.error('Error loading or processing chart data:', error);
    }
}


// Function to load model details dynamically
function loadModelDetails(modelId) {
    // Step 4: Get the DOM elements where the content will be updated
    const logo = document.getElementById('logo1');
    const modelTitle = document.getElementById('model-title');
    const modelSummary = document.getElementById('model-summary');
    const modelDescription = document.getElementById('model-description');
    const strengthsText = document.getElementById('strengths-text');
    const weaknessesText = document.getElementById('weaknesses-text');
    const analysisText = document.getElementById('analysis-text');
    const conclusionsText = document.getElementById('conclusions-text');

    // Step 5: Switch content based on the 'id' in the URL
    switch (modelId) {
        case 'leonardo-ai':
            logo.textContent = "L";
            modelTitle.textContent = "Leonardo AI";
            modelSummary.textContent = "Leonardo AI è un modello noto per la sua creatività e varietà stilistica nelle generazioni.";
            modelDescription.textContent = "Leonardo AI è un modello che eccelle nell'arte visiva, noto per la generazione di immagini artistiche e variegate.";
            strengthsText.textContent = "Punti di forza: Creatività, varietà stilistica.";
            weaknessesText.textContent = "Punti di debolezza: Talvolta presenta artefatti visivi.";
            analysisText.textContent = "Analisi qualitativa di Leonardo AI.";
            conclusionsText.textContent = "Conclusioni su Leonardo AI.";
            break;
        case 'chatgpt':
            logo.textContent = "C";
            modelTitle.textContent = "ChatGPT";
            modelSummary.textContent = "ChatGPT è un modello di OpenAI, noto per la sua comprensione del linguaggio e la generazione di immagini coerenti.";
            modelDescription.textContent = "ChatGPT è ampiamente utilizzato per generare immagini da descrizioni dettagliate, ottimo per il linguaggio naturale.";
            strengthsText.textContent = "Punti di forza: Eccellente per linguaggio naturale, buona coerenza nelle immagini.";
            weaknessesText.textContent = "Punti di debolezza: Può fallire nei dettagli complessi e nelle immagini molto precise.";
            analysisText.textContent = "Analisi qualitativa di ChatGPT.";
            conclusionsText.textContent = "Conclusioni su ChatGPT.";
            break;
        case 'gemini':
            logo.textContent = "G";
            modelTitle.textContent = "Gemini";
            modelSummary.textContent = "Gemini è sviluppato da Google ed è apprezzato per la sua modernità nelle generazioni di ambienti futuristici.";
            modelDescription.innerHTML = "Gemini è molto abile nella creazione di paesaggi futuristici e ambienti altamente dettagliati.";
            strengthsText.textContent = "Punti di forza: Eccellente per scenari futuristici e ambienti moderni.";
            weaknessesText.textContent = "Punti di debolezza: Meno versatile in altri tipi di immagini, come i ritratti.";
            analysisText.textContent = "Analisi qualitativa di Gemini.";
            conclusionsText.textContent = "Conclusioni su Gemini.";
            break;

        case 'canva':
            logo.textContent = "C";
            modelTitle.textContent = "CANVA";
            modelSummary.textContent = "DALL·E 3 è un modello avanzato di OpenAI, noto per la sua capacità di generare immagini dettagliate e creative.";
            modelDescription.textContent = "DALL·E 3 eccelle nella generazione di immagini complesse e creative, con un'attenzione particolare ai dettagli.";
            strengthsText.textContent = "Punti di forza: Alta qualità delle immagini, creatività elevata.";
            weaknessesText.textContent = "Punti di debolezza: Può essere lento nella generazione di immagini complesse.";
            analysisText.textContent = "Analisi qualitativa di DALL·E 3.";
            conclusionsText.textContent = "Conclusioni su DALL·E 3.";
            break;

        case 'bing-image-creator':
            logo.textContent = "B";
            modelTitle.textContent = "BING Image Creator";
            modelSummary.textContent = "Non sono disponibili informazioni per questo modello.";
            modelDescription.textContent = "Descrizione non disponibile.";
            strengthsText.textContent = "Punti di forza non disponibili.";
            weaknessesText.textContent = "Punti di debolezza non disponibili.";
            analysisText.textContent = "Analisi non disponibile.";
            conclusionsText.textContent = "Conclusioni non disponibili.";
            break;
    }
}

// Function to enable scroll navigation
function setupScrollNavigation() {
    // Step 6: Add event listeners to scroll navigation buttons
    document.querySelectorAll('nav.top-nav button[data-scroll]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('nav.top-nav button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const target = document.querySelector(btn.getAttribute('data-scroll'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Step 7: Activate the first button on page load
    const firstBtn = document.querySelector('nav.top-nav button');
    if (firstBtn) firstBtn.classList.add('active');
}
