export const validatorPositive = (value) => {
  if (value >= 0) {
    return true;
  }
  return false;
};

export const validatorPassword = (password) => {
  /* eslint-disable no-useless-escape */
  const regExp = /^.{6,}$/;
  /* eslint-enable no-useless-escape */
  const validPassword = regExp.test(password);
  return validPassword;
};

export const validatorCreditCard = (creditnum) => {
  /* eslint-disable no-useless-escape */
  const cRegExp = /^(?:3[47][0-9]{13})$/;
  /* eslint-enable no-useless-escape */
  const validCreditCard = cRegExp.test(creditnum);
  return validCreditCard;
};

export const validatorUrlValidator = (val) => {
  if (val === undefined || val === null || val.length === 0) {
    return true;
  }
  /* eslint-disable no-useless-escape */
  const re =
    /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  /* eslint-enable no-useless-escape */
  return re.test(val);
};
// 手机号码
export const validatorPhone = (phone) => {
  const pRegExp = /^[1][3-9][0-9]{9}$/;
  const validPhone = pRegExp.test(phone);
  return validPhone;
};
// 验证码
export const validatorCode = (code) => {
  if (code.length === 6 || code.length === 3) {
    return true;
  }
};
// IP地址
export const validatorIp = (ip) => {
  const iRegExp =
    /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}(\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])){0,1}$/;
  const validIp = iRegExp.test(ip);
  return validIp;
};
