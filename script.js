const display = document.getElementById('display');
let displayValue = '';
let firstOperand = null;
let secondOperand = null;
let operator = null;

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const btnValue = e.target.id;

        if (btnValue >= '0' && btnValue <= '9' || btnValue === 'dot') {
            displayValue += (btnValue === 'dot') ? '.' : btnValue;
            display.innerText = displayValue;
        } else if (btnValue === 'clear') {
            displayValue = '';
            firstOperand = null;
            secondOperand = null;
            operator = null;
            display.innerText = '';
        } else if (btnValue === 'delete') {
            displayValue = displayValue.slice(0, -1);
            display.innerText = displayValue;
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(btnValue)) {
            operator = btnValue;
            firstOperand = parseFloat(displayValue);
            displayValue = '';
        } else if (btnValue === 'equals') {
            secondOperand = parseFloat(displayValue);
            if (operator && firstOperand != null && secondOperand != null) {
                switch (operator) {
                    case 'add':
                        displayValue = firstOperand + secondOperand;
                        break;
                    case 'subtract':
                        displayValue = firstOperand - secondOperand;
                        break;
                    case 'multiply':
                        displayValue = firstOperand * secondOperand;
                        break;
                    case 'divide':
                        displayValue = firstOperand / secondOperand;
                        break;
                }
                display.innerText = displayValue;
                firstOperand = displayValue;
                operator = null;
                displayValue = '';
            }
        }
    });
});
