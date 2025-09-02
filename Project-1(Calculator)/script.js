const display = document.getElementById('display');
let currentInput = '';
let lastAnswer = '';
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    if (!value) return;
    if (value === 'C') {
      currentInput = '';
      display.value = '';
      return;
    }
    if (value === 'DEL') {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
      return;
    }
    if (value === 'ANS') {
      if (lastAnswer !== '') {
        currentInput = String(lastAnswer);
        display.value = currentInput;
      }
      return;
    }

    if (value === '=') {
      evaluateExpression();
      return;
    }
    currentInput += value;
    display.value = currentInput;
  });
});
function transformExpression(expr) {
  let e = expr.replace(/×/g, '*').replace(/÷/g, '/');
  e = e.replace(/√\s*\(/g, 'Math.sqrt(');
  e = e.replace(/√\s*([0-9]*\.?[0-9]+)/g, 'Math.sqrt($1)');
  return e;
}
function evaluateExpression() {
  try {
    if (currentInput.trim() === '') return;
    if (/^√\s*$/.test(currentInput) && lastAnswer !== '') {
      const res = Math.sqrt(Number(lastAnswer));
      lastAnswer = res;
      display.value = res;
      currentInput = String(res);
      return;
    }
    if (/√\s*$/.test(currentInput) && lastAnswer !== '') {
      currentInput = currentInput.replace(/√\s*$/, '√' + String(lastAnswer));
    }
    const toEval = transformExpression(currentInput);
    const result = eval(toEval);
    lastAnswer = result;
    display.value = result;
    currentInput = String(result);
  } catch (err) {
    display.value = 'Error';
    currentInput = '';
  }
}
