import slugify from "slugify";

const Utils = {
  includesIgnoreCase(target, value) {
    const lowCaseTarget = target.toLocaleLowerCase();
    const lowCaseValue = value.toLocaleLowerCase();
    return lowCaseTarget.includes(lowCaseValue);
  },
  toSlug(str) {

    return slugify(str, {
      replacement: "-",
      lower: true,
      remove: /[*+~.,()'"!:@]/g,
      locale: "vi",
    });
  },
};

export default Utils;
