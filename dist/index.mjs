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
import { addDays, addHours, addMonths, addYears, endOfDay, endOfHour, endOfMonth, endOfWeek, endOfYear, startOfDay, startOfHour, startOfMonth, startOfWeek, startOfYear } from "date-fns";

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
    return startOfHour(value);
  else if (roundTo === "jeden den" /* DAY */)
    return startOfDay(value);
  else if (roundTo === "jeden t\xFDden" /* WEEK */)
    return startOfWeek(value);
  else if (roundTo === "jeden m\u011Bs\xEDc" /* MONTH */)
    return startOfMonth(value);
  return startOfYear(value);
};
_TimeRound.up = (value, roundTo) => {
  if (roundTo === "jednu hodinu" /* HOUR */)
    return endOfHour(value);
  else if (roundTo === "jeden den" /* DAY */)
    return endOfDay(value);
  else if (roundTo === "jeden t\xFDden" /* WEEK */)
    return endOfWeek(value);
  else if (roundTo === "jeden m\u011Bs\xEDc" /* MONTH */)
    return endOfMonth(value);
  return endOfYear(value);
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
      return addHours(value, amount);
    case "jeden den" /* DAY */:
      return addDays(value, amount);
    case "jeden t\xFDden" /* WEEK */:
      return addDays(value, amount * 7);
    case "jeden m\u011Bs\xEDc" /* MONTH */:
      return addMonths(value, amount);
    case "jeden rok" /* YEAR */:
      return addYears(value, amount);
  }
};
var TimeRound = _TimeRound;

// src/utils/formatting.ts
import { format, formatISO9075 } from "date-fns";
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
  return formatISO9075(value, { representation: "date" });
};
/** HH:MM:SS */
_TimeFormat.isoTime = (value) => {
  value = _TimeFormat.inputToDate(value);
  return formatISO9075(value, { representation: "time" });
};
/** YYYY-MM-DD HH:MM:SS */
_TimeFormat.isoComplete = (value) => {
  value = _TimeFormat.inputToDate(value);
  return formatISO9075(value);
};
/** HH:mm */
_TimeFormat.humanTime = (value, showSeconds = false) => {
  value = _TimeFormat.inputToDate(value);
  return format(value, showSeconds ? "HH:mm:ss" : "HH:mm");
};
/** j. M. ???? (y) */
_TimeFormat.humanDate = (value, includeYear = false) => {
  value = _TimeFormat.inputToDate(value);
  return format(value, includeYear ? "d. M." : "d. M. yyyy");
};
var TimeFormat = _TimeFormat;

// src/index.ts
var src_default = {
  TimePeriod,
  TimeRound,
  TimeFormat
};
export {
  src_default as default
};
