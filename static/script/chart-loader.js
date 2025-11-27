async function loadData() {
  const res = await fetch('json/models.json'); // Adjusted path
  return res.json();
}

function mapDataToChart(datasets) {
  const labels = [
    'Diversity Sex Index',
    'Diversity Race Index',
    'Diversity Skin Index',
    'Diversity Age Index',
    'Diversity Facial Exp Index'
  ];
  const colors = ['#2b7cff', '#ff9f43', '#34a853', '#ea4335', '#9333ea']; // Added more colors

  return datasets.map((d, i) => ({
    label: d.model,
    data: [
      d.diversity_sex_index,
      d.diversity_race_index,
      d.diversity_skin_index,
      d.diversity_age_index,
      d.diversity_facial_exp_index
    ],
    fill: true,
    backgroundColor: Chart.helpers.color(colors[i % colors.length]).alpha(0.15).rgbString(),
    borderColor: colors[i % colors.length],
    pointBackgroundColor: colors[i % colors.length],
    pointRadius: 4,
    tension: 0.1
  }));
}

async function createRadar() {
  const raw = await loadData();
  const ctx = document.getElementById('diversityRadar').getContext('2d');

  // Destroy previous chart instance if it exists
  if (window.myRadarChart) {
    window.myRadarChart.destroy();
  }

  window.myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        'Sex',
        'Race',
        'Skin',
        'Age',
        'Facial Exp.'
      ],
      datasets: mapDataToChart(raw)
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 1,
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
            stepSize: 0.2,
            color: '#fff',
            backdropColor: 'rgba(0, 0, 0, 0.5)',
          }
        }
      },
      plugins: {
        legend: {
          display: false // Using custom HTML legend
        },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.formattedValue}`
          }
        }
      }
    }
  });

  // Create custom HTML legend
  const legendEl = document.getElementById('radarLegend');
  legendEl.innerHTML = ''; // Clear previous legend
  raw.forEach((d, i) => {
    const color = window.myRadarChart.data.datasets[i].borderColor;
    const item = document.createElement('div');
    item.innerHTML = `<span style="display:inline-block; vertical-align: middle; width:36px;height:6px;background:${color};border-radius:3px; margin-right:8px"></span>${d.model}`;
    item.style.marginBottom = '12px';
    item.style.cursor = 'pointer';
    item.onclick = () => {
        const meta = window.myRadarChart.getDatasetMeta(i);
        meta.hidden = meta.hidden === null ? !window.myRadarChart.data.datasets[i].hidden : null;
        item.style.textDecoration = meta.hidden ? 'line-through' : '';
        item.style.opacity = meta.hidden ? '0.5' : '1';
        window.myRadarChart.update();
    };
    legendEl.appendChild(item);
  });
}

createRadar();
