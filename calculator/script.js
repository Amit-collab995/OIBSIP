const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');

let expression = '';
let lastResult = '';

function updateDisplay() {
  expressionEl.textContent = expression || '0';
  resultEl.textContent = lastResult || '0';
}

function isOperator(value) {
  return ['+', '-', '*', '/', '%'].includes(value);
}

function appendValue(value) {
  if (value === '.' && expression) {
    const parts = expression.split(/[-+*/]/);
    const currentNumber = parts[parts.length - 1];

    if (currentNumber.includes('.')) {
      return;
    }
  }

  if (expression === '' && value === '.') {
    expression = '0.';
    updateDisplay();
    return;
  }

  if (expression === '' && isOperator(value)) {
    if (value === '-') {
      expression = '-';
      updateDisplay();
    }
    return;
  }

  const lastChar = expression.slice(-1);

  if (isOperator(lastChar) && isOperator(value)) {
    expression = expression.slice(0, -1) + value;
    updateDisplay();
    return;
  }

  if (expression === '' && value === '0') {
    updateDisplay();
    return;
  }

  expression += value;
  updateDisplay();
}

function applyPercent() {
  if (!expression) {
    return;
  }

  const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
  const operatorChars = ['+', '-', '*', '/'];
  let lastOperatorIndex = -1;

  operatorChars.forEach((operator) => {
    const index = sanitized.lastIndexOf(operator);
    if (index > lastOperatorIndex) {
      lastOperatorIndex = index;
    }
  });

  if (lastOperatorIndex === -1) {
    const currentValue = Number(sanitized);
    expression = String(currentValue / 100);
    updateDisplay();
    return;
  }

  const leftSide = sanitized.slice(0, lastOperatorIndex);
  const rightSide = sanitized.slice(lastOperatorIndex + 1);

  if (!rightSide || Number.isNaN(Number(rightSide))) {
    return;
  }

  const baseValue = Number(leftSide.split(/[-+*/]/).filter(Boolean).pop() ?? 0);
  const percentValue = baseValue * (Number(rightSide) / 100);
  expression = `${sanitized.slice(0, lastOperatorIndex + 1)}${percentValue}`;
  updateDisplay();
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function clearExpression() {
  expression = '';
  lastResult = '';
  updateDisplay();
}

function evaluateExpression() {
  if (!expression) {
    return;
  }

  const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');

  if (!/^[0-9+\-*/.()]+$/.test(sanitized)) {
    lastResult = 'Error';
    updateDisplay();
    return;
  }

  try {
    const result = Function(`"use strict"; return (${sanitized})`)();

    if (!Number.isFinite(result)) {
      throw new Error('Invalid calculation');
    }

    lastResult = Number.isInteger(result) ? String(result) : String(result.toFixed(10)).replace(/0+$/, '').replace(/\.$/, '');
    expression = lastResult;
    updateDisplay();
  } catch (error) {
    lastResult = 'Error';
    updateDisplay();
  }
}

function handleButtonClick(button) {
  const action = button.dataset.action;
  const value = button.dataset.value;

  if (action === 'clear') {
    clearExpression();
    return;
  }

  if (action === 'delete') {
    deleteLast();
    return;
  }

  if (action === 'percent') {
    applyPercent();
    return;
  }

  if (action === 'equals') {
    evaluateExpression();
    return;
  }

  if (action === 'add') {
    appendValue('+');
    return;
  }

  if (action === 'subtract') {
    appendValue('-');
    return;
  }

  if (action === 'multiply') {
    appendValue('*');
    return;
  }

  if (action === 'divide') {
    appendValue('/');
    return;
  }

  if (value !== undefined) {
    appendValue(value);
  }
}

document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', () => handleButtonClick(button));
});

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (/^[0-9.]$/.test(key)) {
    appendValue(key);
    event.preventDefault();
    return;
  }

  if (['+', '-', '*', '/'].includes(key)) {
    appendValue(key);
    event.preventDefault();
    return;
  }

  if (key === 'Enter') {
    evaluateExpression();
    event.preventDefault();
    return;
  }

  if (key === 'Backspace') {
    deleteLast();
    event.preventDefault();
    return;
  }

  if (key === 'Escape') {
    clearExpression();
    event.preventDefault();
  }
});

updateDisplay();
