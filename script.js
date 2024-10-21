let growthChart; // Declare the chart variable outside the event listener

document.getElementById('calculator').addEventListener('submit', function(event) {
    event.preventDefault();

    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const time = parseFloat(document.getElementById('time').value);
    const compound = parseFloat(document.getElementById('compound').value);

    // Calculate total amount and interest
    const amount = principal * Math.pow((1 + (rate / compound)), (compound * time));
    const interest = amount - principal;

    document.getElementById('result').innerText = `Total Amount: $${amount.toFixed(2)}\nInterest Earned: $${interest.toFixed(2)}`;

    // Prepare data for the chart
    const years = [];
    const amounts = [];
    for (let t = 0; t <= time; t++) {
        const total = principal * Math.pow((1 + (rate / compound)), (compound * t));
        years.push(t);
        amounts.push(total);
    }

    // Create or update the chart
    const ctx = document.getElementById('growthChart').getContext('2d');

    if (growthChart) {
        // If the chart already exists, update its data
        growthChart.data.labels = years;
        growthChart.data.datasets[0].data = amounts;
        growthChart.update(); // Update the chart to reflect the new data
    } else {
        // If the chart does not exist, create it
        growthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: 'Growth of Investment Over Time',
                    data: amounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total Amount ($)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Years'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                    }
                }
            }
        });
    }
});

