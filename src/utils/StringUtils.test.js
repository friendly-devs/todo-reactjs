import Utils from './StringUtils'

test('it shout include', () => {
  expect(Utils.includesIgnoreCase('same', 'same')).toBe(true);
});

test('it shout include ignore case', () => {
  expect(Utils.includesIgnoreCase('Tra cuu', 'tra cuu')).toBe(true);
});

test('it shout include ignore case and different text', () => {
  expect(Utils.includesIgnoreCase('Tra cứu', 'cứu')).toBe(true);
});
