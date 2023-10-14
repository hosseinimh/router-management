import CryptoJS from "crypto-js";

import { THEMES } from "../constants";

function isValidEmail(value) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
  if (value === "" || isValidEmail(value)) setEmailError("");
  else setEmailError("Invalid Email");
}

function validatePassword(value, setPasswordError) {
  if (value.length < 9) setPasswordError("Password must be 9 characters");
  else setPasswordError("");
}

function parseJwt(token) {
  try {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

function clearLS() {
  localStorage.removeItem("theme");
  localStorage.removeItem("user");
  localStorage.removeItem("notifications");
}

const getLSVariable = (key) => {
  try {
    const text = localStorage.getItem(key);

    if (!text) return null;

    const bytes = CryptoJS.AES.decrypt(text, "ganjineh_dogharoon");
    const value = bytes.toString(CryptoJS.enc.Utf8);

    return value;
  } catch (error) {
    return null;
  }
};

const setLSVariable = (key, value) => {
  try {
    const text = CryptoJS.AES.encrypt(value, "ganjineh_dogharoon").toString();
    localStorage.setItem(key, text);
  } catch (error) {}
};

const getLSToken = () => {
  const token = getLSVariable("token");

  if (!token) {
    clearLS();

    return null;
  }

  const decodedToken = parseJwt(token);

  if (!decodedToken) {
    clearLS();

    return null;
  }

  return token;
};

const addCommas = (num) =>
  num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const removeNonNumeric = (num) => num?.toString().replace(/[^0-9]/g, "");

const digitInputChange = (setValue, field, event) => {
  setValue(field, addCommas(removeNonNumeric(event.target.value)));
};

const isNumber = (number) => !isNaN(parseInt(number));

const isId = (id) => !isNaN(parseInt(id)) && id > 0;

const initTheme = () => {
  const theme = getLSVariable("theme");
  if (![THEMES.DARK, THEMES.LIGHT].includes(theme)) {
    setLSVariable("theme", THEMES.DARK);
  }
  return getLSVariable("theme");
};

const setTheme = (theme) => {
  setLSVariable("theme", theme.name);
  document.documentElement.style.setProperty("--text", theme.colors.text);
  document.documentElement.style.setProperty("--light", theme.colors.light);
  document.documentElement.style.setProperty("--dark", theme.colors.dark);
  document.documentElement.style.setProperty("--body", theme.colors.body);
  document.documentElement.style.setProperty(
    "--light-body",
    theme.colors.lightBody
  );
  document.documentElement.style.setProperty("--link", theme.colors.link);
  document.documentElement.style.setProperty("--success", theme.colors.success);
  document.documentElement.style.setProperty("--danger", theme.colors.danger);
  document.documentElement.style.setProperty("--primary", theme.colors.primary);
  document.documentElement.style.setProperty(
    "--primary-light",
    theme.colors.primaryLight
  );
  document.documentElement.style.setProperty("--warning", theme.colors.warning);
  document.documentElement.style.setProperty(
    "--dark-warning",
    theme.colors.darkWarning
  );
  document.documentElement.style.setProperty(
    "--placeholder",
    theme.colors.placeholder
  );
  document.documentElement.style.setProperty("--border", theme.colors.border);
  document.documentElement.style.setProperty(
    "--border-error",
    theme.colors.borderError
  );
  document.documentElement.style.setProperty(
    "--border-error-light",
    theme.colors.borderErrorLight
  );
  document.documentElement.style.setProperty("--hover", theme.colors.hover);
  document.documentElement.style.setProperty(
    "--box-shadow",
    theme.colors.boxShadow
  );
  document.documentElement.style.setProperty(
    "--gradient-bg",
    theme.colors.gradientBg
  );
  document.documentElement.style.setProperty(
    "--dropdown-corner",
    theme.colors.dropdownCorner
  );
  document.documentElement.style.setProperty(
    "--table-btn",
    theme.colors.tableBtn
  );
  document.documentElement.style.setProperty(
    "--table-row-odd",
    theme.colors.tableRowOdd
  );
  document.documentElement.style.setProperty(
    "--table-row-odd-hover",
    theme.colors.tableRowOddHover
  );
  document.documentElement.style.setProperty(
    "--table-row-even",
    theme.colors.tableRowEven
  );
  document.documentElement.style.setProperty(
    "--table-row-even-hover",
    theme.colors.tableRowEvenHover
  );
  document.documentElement.style.setProperty(
    "--modal-overlay",
    theme.colors.modalOverlay
  );
  document.documentElement.style.setProperty(
    "--alert-sucess-background",
    theme.colors.alertSucessBackground
  );
  document.documentElement.style.setProperty(
    "--alert-success-border",
    theme.colors.alertSuccessBorder
  );
  document.documentElement.style.setProperty(
    "--alert-success-color",
    theme.colors.alertSuccessColor
  );
  document.documentElement.style.setProperty(
    "--alert-danger-background",
    theme.colors.alertDangerBackground
  );
  document.documentElement.style.setProperty(
    "--alert-danger-border",
    theme.colors.alertDangerBorder
  );
  document.documentElement.style.setProperty(
    "--alert-danger-color",
    theme.colors.alertDangerColor
  );
};

const getDateParams = (date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    totalInSeconds: Math.round(date / 1000),
  };
};

const relativeDate = (utcDate) => {
  try {
    const date = new Date(utcDate);
    const now = new Date(
      Date.now() + new Date().getTimezoneOffset() * 60 * 1000
    );
    const dateParams = getDateParams(date);
    const nowParams = getDateParams(now);
    let amount = 0;
    let isBefore =
      dateParams.totalInSeconds < nowParams.totalInSeconds ? true : false;
    let format = "";
    const olderParams = isBefore ? dateParams : nowParams;
    const newerParams = isBefore ? nowParams : dateParams;
    if (newerParams.year > olderParams.year) {
      amount = newerParams.year - olderParams.year;
      format = "year";
    } else if (newerParams.month > olderParams.month) {
      amount = newerParams.month - olderParams.month;
      format = "month";
    } else if (newerParams.day > olderParams.day) {
      amount = newerParams.day - olderParams.day;
      format = "day";
    } else if (newerParams.hour > olderParams.hour) {
      amount = newerParams.hour - olderParams.hour;
      format = "hour";
    } else if (newerParams.minute > olderParams.minute) {
      amount = newerParams.minute - olderParams.minute;
      format = "minute";
    } else if (newerParams.second > olderParams.second + 20) {
      amount = newerParams.second - olderParams.second;
      format = "second";
    } else {
      amount = 0;
      format = "second";
    }
    return {
      amount,
      isBefore,
      format,
    };
  } catch {}
  return {
    amount: 0,
    isBefore: true,
    format: "second",
  };
};

const toLocaleDateString = (date, locale = "fa-IR") => {
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(locale, options);
};

const toNumericLocaleDateString = (date, locale = "fa-IR") => {
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(locale, options);
};

const getTimezoneDate = (date, locale) => {
  const d = new Date(
    new Date(date).getTime() - new Date().getTimezoneOffset() * 60 * 1000
  );
  const time = d.toString().substring(16, 21);
  return { date: utils.toLocaleDateString(d, locale), time };
};

const getExtension = (filename) => {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};

const utils = {
  isValidEmail,
  validateEmail,
  validatePassword,
  getLSVariable,
  setLSVariable,
  getLSToken,
  clearLS,
  digitInputChange,
  addCommas,
  removeNonNumeric,
  isNumber,
  isId,
  initTheme,
  setTheme,
  relativeDate,
  toLocaleDateString,
  toNumericLocaleDateString,
  getTimezoneDate,
  getExtension,
};

export default utils;
