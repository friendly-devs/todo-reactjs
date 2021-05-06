import slugify from 'slugify';

const config = {
  replacement: '-',
  lower: true,
  remove: /[*+~.,()'"!:@]/g,
  locale: 'vi',
};

const Utils = {
  includesIgnoreCase(target, value) {
    const slugTarget = slugify(target, config);
    const slugValue = slugify(value, config);
    return slugTarget.includes(slugValue);
  },
  toSlug(str) {
    return slugify(str, config);
  },
  convertDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  },
};

export default Utils;
