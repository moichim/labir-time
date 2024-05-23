"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  TimeFormat: () => TimeFormat,
  TimePeriod: () => TimePeriod,
  TimeRound: () => TimeRound
});
module.exports = __toCommonJS(src_exports);

// src/utils/periods.ts
var TimePeriod = /* @__PURE__ */ ((TimePeriod2) => {
  TimePeriod2["HOUR"] = "jednu hodinu";
  TimePeriod2["DAY"] = "jeden den";
  TimePeriod2["WEEK"] = "jeden t\xFDden";
  TimePeriod2["MONTH"] = "jeden m\u011Bs\xEDc";
  TimePeriod2["YEAR"] = "jeden rok";
  return TimePeriod2;
})(TimePeriod || {});

// src/utils/rounding.ts
var import_date_fns = require("date-fns");

// src/utils/base.ts
var TimeUtilsBase = class {
};
/** Convert an input to a date object */
TimeUtilsBase.inputToDate = (value) => {
  if (typeof value === "number") {
    const d = /* @__PURE__ */ new Date();
    d.setTime(value);
    return d;
  }
  return value;
};

// src/utils/rounding.ts
var _TimeRound = class _TimeRound extends TimeUtilsBase {
};
_TimeRound.down = (value, roundTo) => {
  if (roundTo === "jednu hodinu" /* HOUR */)
    return (0, import_date_fns.startOfHour)(value);
  else if (roundTo === "jeden den" /* DAY */)
    return (0, import_date_fns.startOfDay)(value);
  else if (roundTo === "jeden t\xFDden" /* WEEK */)
    return (0, import_date_fns.startOfWeek)(value);
  else if (roundTo === "jeden m\u011Bs\xEDc" /* MONTH */)
    return (0, import_date_fns.startOfMonth)(value);
  return (0, import_date_fns.startOfYear)(value);
};
_TimeRound.up = (value, roundTo) => {
  if (roundTo === "jednu hodinu" /* HOUR */)
    return (0, import_date_fns.endOfHour)(value);
  else if (roundTo === "jeden den" /* DAY */)
    return (0, import_date_fns.endOfDay)(value);
  else if (roundTo === "jeden t\xFDden" /* WEEK */)
    return (0, import_date_fns.endOfWeek)(value);
  else if (roundTo === "jeden m\u011Bs\xEDc" /* MONTH */)
    return (0, import_date_fns.endOfMonth)(value);
  return (0, import_date_fns.endOfYear)(value);
};
_TimeRound.pick = (value, period) => {
  return [
    _TimeRound.down(value, period),
    _TimeRound.up(value, period)
  ];
};
_TimeRound.modify = (value, amount, period) => {
  switch (period) {
    case "jednu hodinu" /* HOUR */:
      return (0, import_date_fns.addHours)(value, amount);
    case "jeden den" /* DAY */:
      return (0, import_date_fns.addDays)(value, amount);
    case "jeden t\xFDden" /* WEEK */:
      return (0, import_date_fns.addDays)(value, amount * 7);
    case "jeden m\u011Bs\xEDc" /* MONTH */:
      return (0, import_date_fns.addMonths)(value, amount);
    case "jeden rok" /* YEAR */:
      return (0, import_date_fns.addYears)(value, amount);
  }
};
var TimeRound = _TimeRound;

// src/utils/formatting.ts
var import_date_fns2 = require("date-fns");
var _TimeFormat = class _TimeFormat extends TimeUtilsBase {
  /** Range */
  static humanRangeDates(from, to) {
    from = _TimeFormat.inputToDate(from);
    to = _TimeFormat.inputToDate(to);
    if (from.getUTCDate() === to.getUTCDate()) {
      return _TimeFormat.humanDate(from);
    }
    return [
      _TimeFormat.humanDate(from),
      _TimeFormat.humanDate(to)
    ].join(" - ");
  }
  static human(date) {
    return `${_TimeFormat.humanDate(date)} ${_TimeFormat.humanTime(date, true)} `;
  }
};
/** YYYY-MM-DD */
_TimeFormat.isoDate = (value) => {
  value = _TimeFormat.inputToDate(value);
  return (0, import_date_fns2.formatISO9075)(value, { representation: "date" });
};
/** HH:MM:SS */
_TimeFormat.isoTime = (value) => {
  value = _TimeFormat.inputToDate(value);
  return (0, import_date_fns2.formatISO9075)(value, { representation: "time" });
};
/** YYYY-MM-DD HH:MM:SS */
_TimeFormat.isoComplete = (value) => {
  value = _TimeFormat.inputToDate(value);
  return (0, import_date_fns2.formatISO9075)(value);
};
/** HH:mm */
_TimeFormat.humanTime = (value, showSeconds = false) => {
  value = _TimeFormat.inputToDate(value);
  return (0, import_date_fns2.format)(value, showSeconds ? "HH:mm:ss" : "HH:mm");
};
/** j. M. ???? (y) */
_TimeFormat.humanDate = (value, includeYear = false) => {
  value = _TimeFormat.inputToDate(value);
  return (0, import_date_fns2.format)(value, includeYear ? "d. M." : "d. M. yyyy");
};
var TimeFormat = _TimeFormat;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TimeFormat,
  TimePeriod,
  TimeRound
});
