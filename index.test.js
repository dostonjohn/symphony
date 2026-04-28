const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { power } = require('./index');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

test('power raises base to exponent', () => {
  assert.equal(power(2, 3), 8);
});

test('power returns 1 for zero exponent', () => {
  assert.equal(power(5, 0), 1);
});

test('power supports fractional exponents', () => {
  assert.equal(power(9, 0.5), 3);
});

test('site includes core OpenClaw content sections', () => {
  assert.match(html, /What is OpenClaw\?/);
  assert.match(html, /How does it work\?/);
  assert.match(html, /Why it feels different\./);
});

test('site is a self-contained responsive page', () => {
  assert.match(html, /<style>/);
  assert.match(html, /@media \(max-width: 900px\)/);
  assert.match(html, /<meta name="viewport"/);
});

test('site includes related real imagery with accessible descriptions', () => {
  const imageMatches = html.match(/<img\s/g) || [];

  assert.equal(imageMatches.length, 3);
  assert.match(html, /images\.unsplash\.com\/photo-/);
  assert.match(html, /alt="Developer workspace with code on multiple monitors"/);
  assert.match(html, /alt="Industrial robotic arm reaching through colored light"/);
  assert.match(html, /alt="Glowing data center racks representing connected infrastructure"/);
});
