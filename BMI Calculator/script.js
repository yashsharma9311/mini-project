document.addEventListener('DOMContentLoaded', () => {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const calculateBtn = document.getElementById('calculate-btn');
    const bmiValue = document.getElementById('bmi-value');
    const bmiStatus = document.getElementById('bmi-status');

    // Calculate BMI on button click
    calculateBtn.addEventListener('click', calculateBMI);

    // Auto-calculate if inputs change
    heightInput.addEventListener('input', calculateBMI);
    weightInput.addEventListener('input', calculateBMI);

    function calculateBMI() {
        const height = parseFloat(heightInput.value) / 100; // Convert cm to m
        const weight = parseFloat(weightInput.value);

        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            bmiValue.textContent = '0';
            bmiStatus.textContent = 'Enter valid details';
            return;
        }
 
        const bmi = (weight / (height * height)).toFixed(1);
        bmiValue.textContent = bmi;
        updateStatus(bmi);                          
    } 

    function updateStatus(bmi) {
        let status = '';
        let color = '';

        if (bmi < 18.5) {
            status = 'Underweight';
            color = '#3498db'; // Blue
        } else if (bmi >= 18.5 && bmi < 25) {
            status = 'Normal';
            color = '#2ecc71'; // Green
        } else if (bmi >= 25 && bmi < 30) {
            status = 'Overweight';
            color = '#f39c12'; // Orange
        } else {
            status = 'Obese';
            color = '#e74c3c'; // Red
        }

        bmiStatus.textContent = status;
        bmiStatus.style.color = color;
    }
});