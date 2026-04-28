const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { power } = require('./index');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const getAttributeValues = (attributeName) => {
  const pattern = new RegExp(`${attributeName}="([^"]+)"`, 'g');
  return [...html.matchAll(pattern)].map((match) => match[1]);
};

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

test('site has a valid single-page document structure', () => {
  assert.match(html, /^<!DOCTYPE html>/);
  assert.equal((html.match(/<html\b/g) || []).length, 1);
  assert.equal((html.match(/<head\b/g) || []).length, 1);
  assert.equal((html.match(/<body\b/g) || []).length, 1);
  assert.equal((html.match(/<main\b/g) || []).length, 1);
  assert.equal((html.match(/<\/body>/g) || []).length, 1);
  assert.equal((html.match(/<\/html>/g) || []).length, 1);
  assert.doesNotMatch(html, /<(?:meta|img)\b[^>]*\/>/);
});

test('site navigation points to existing sections', () => {
  const ids = new Set(getAttributeValues('id'));
  const duplicateIds = getAttributeValues('id').filter((id, index, allIds) => allIds.indexOf(id) !== index);
  const pageAnchors = getAttributeValues('href').filter((href) => href.startsWith('#'));

  assert.deepEqual(duplicateIds, []);
  assert.ok(pageAnchors.length >= 5);
  pageAnchors.forEach((href) => {
    assert.ok(ids.has(href.slice(1)), `${href} should point to an existing id`);
  });
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

test('site includes progressive motion and interactivity enhancements', () => {
  assert.match(html, /data-reveal/);
  assert.match(html, /IntersectionObserver/);
  assert.match(html, /prefers-reduced-motion: reduce/);
  assert.match(html, /pointermove/);
  assert.match(html, /--tilt-x/);
  assert.match(html, /--magnet-x/);
});

test('site labels non-semantic interactive regions with explicit roles', () => {
  assert.match(html, /class="stats" role="group" aria-label="OpenClaw benefits"/);
  assert.match(html, /class="terminal" role="group" aria-label="Example OpenClaw run log"/);
});
