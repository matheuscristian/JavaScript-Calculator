const calculator = {
    result: 0,
    currentValue: '',
    currentOperator: '',
    displayValue: '',
    lastValue: ''
}

const display = document.getElementById("display");

let lastOperationDid = false

function calculate() {
    const n1 = parseFloat(calculator.lastValue);
    const n2 = parseFloat(calculator.currentValue);

    if (!Number.isNaN(n1) && !Number.isNaN(n2)) {
        let res = 0;

        if (calculator.currentOperator == '+') {
            res = calculator.displayValue = n1 + n2;
        } else if (calculator.currentOperator == '–') {
            res = calculator.displayValue = n1 - n2;
        } else if (calculator.currentOperator == '×') {
            res = calculator.displayValue = n1 * n2;
        } else if (calculator.currentOperator == '÷') {
            res = calculator.displayValue = n1 / n2;
        }

        calculator.currentValue = '';
        calculator.lastValue = res;
        lastOperationDid = true;
        calculator.currentOperator = '';
    }
}

function updateDisplay(value) {
    if (value == '+' || value == '–' || value == '×' || value == '÷') {
        if (calculator.currentOperator == '') {
            calculator.displayValue = '';
            if (calculator.currentValue != '' && calculator.lastValue == '') calculator.lastValue = calculator.currentValue;
            calculator.currentValue = ''
        } else {
            calculate();
        }
        calculator.currentOperator = value;
    } else if (value == '=') {
        calculate();
    } else {
        if (lastOperationDid) {
            lastOperationDid = false;
            calculator.displayValue = '';
        }
        calculator.displayValue += value;
        calculator.currentValue += value;
    }

    display.innerText = calculator.displayValue;
}

const spans = document.querySelectorAll("span");

spans.forEach((v) => {
    v.addEventListener("click", (e) => {
        updateDisplay(e.path[0].innerText);
    })
})