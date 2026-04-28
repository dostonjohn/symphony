// Simple Node.js app for Symphony testing

function greet(name) {
  return `Hello, ${name}!`;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }

  return a / b;
}

module.exports = { greet, divide };
