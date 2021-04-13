import Utils from "./StringUtils";

test("it shout include", () => {
  expect(Utils.includesIgnoreCase("Truy vấn", "TRUY")).toBe(true);
});

test("it shout include ignore case", () => {
  expect(Utils.includesIgnoreCase("Tra cứu", "tra Cứu")).toBe(true);
});

test("it shout include ignore case and different text", () => {
  expect(Utils.includesIgnoreCase("Tra cứu", "Cuu")).toBe(true);
});

test("it shout to slug low case", () => {
  expect(Utils.toSlug(' Đây Là  Thông tIn  ')).toBe('day-la-thong-tin');
});

test("it shout to slug remove special character", () => {
  expect(Utils.toSlug(' Đây Là  Thông. tIn ,')).toBe('day-la-thong-tin');
});
