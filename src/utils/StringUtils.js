const Utils = {
  includesIgnoreCase(target, value) {
    const lowCaseTarget = target.toLocaleLowerCase();
    const lowCaseValue = value.toLocaleLowerCase();
    return lowCaseTarget.includes(lowCaseValue);
  }
}

export default Utils
