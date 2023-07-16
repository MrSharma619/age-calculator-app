import "./main.css";
import { ReactComponent as CustomSvg } from "./svg/icon-arrow.svg";
import { useState } from "react";

function Main() {
  const [inputs, setInputs] = useState({ day: "", month: "", year: "" });
  const [dayVal, setDayVal] = useState(" - - ");
  const [monthVal, setMonthVal] = useState(" - - ");
  const [yearVal, setYearVal] = useState(" - - ");
  const [errorDay, setErrorDay] = useState("");
  const [errorMonth, setErrorMonth] = useState("");
  const [errorYear, setErrorYear] = useState("");
  const [emptyErrorDay, setEmptyErrorDay] = useState(false);
  const [emptyErrorMonth, setEmptyErrorMonth] = useState(false);
  const [emptyErrorYear, setEmptyErrorYear] = useState(false);

  const handleChange = (event) => {
    setEmptyErrorDay(false);
    setEmptyErrorMonth(false);
    setEmptyErrorYear(false);
    setErrorDay("");
    setErrorMonth("");
    setErrorYear("");

    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = () => {
    //    console.log(inputs);

    document.activeElement.blur();

    // days of every month
    var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var date = new Date();
    var current_date = date.getDate();
    var current_month = date.getMonth() + 1;
    var current_year = date.getFullYear();

    // if birth date is greater than current date
    // then do not count this month and add 30
    // to the date so as to subtract the date and
    // get the remaining days
    if (inputs.day > current_date) {
      current_date = current_date + month[inputs.month - 1];
      current_month = current_month - 1;
    }

    //console.log(current_month);
    //console.log(current_year);

    // if birth month exceeds current month, then do
    // not count this year and add 12 to the month so
    // that we can subtract and find out the difference
    if (inputs.month > current_month) {
      current_year = current_year - 1;
      current_month = current_month + 12;
    }

    //console.log(inputs);
    //console.log(current_date);

    // calculate date, month, year
    var calculated_date = current_date - inputs.day;
    var calculated_month = current_month - inputs.month;
    var calculated_year = current_year - inputs.year;

    setDayVal(calculated_date);
    setMonthVal(calculated_month);
    setYearVal(calculated_year);
  };

  const validateDate = () => {
    if (inputs.day < 1 || inputs.day > 31) {
      setErrorDay("Must be a valid day");
      setEmptyErrorDay(true);

      document.activeElement.blur();
      return false;
    }

    return true;
  };

  const validateMonth = () => {
    if (inputs.month < 1 || inputs.month > 12) {
      setErrorMonth("Must be a valid month");
      setEmptyErrorMonth(true);

      document.activeElement.blur();
      return false;
    }

    return true;
  };

  const validateYear = () => {
    if (inputs.year > new Date().getFullYear()) {
      setErrorYear("Must be in the past");
      setEmptyErrorYear(true);

      document.activeElement.blur();
      return false;
    }

    return true;
  };

  const validateFinalDate = () => {
    var month;
    if (checkLeapYear(inputs.year)) {
      month = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
      month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    if (inputs.day <= month[inputs.month - 1]) return true;

    setErrorDay("Must be a valid date");
    setEmptyErrorDay(true);
    setEmptyErrorMonth(true);
    setEmptyErrorYear(true);

    document.activeElement.blur();

    return false;
  };

  // program to check leap year
  const checkLeapYear = (year) => {
    //three conditions to find out the leap year
    if ((0 === year % 4 && 0 !== year % 100) || 0 === year % 400) {
      return true;
    } else {
      return false;
    }
  };

  const validateNonEmptyInputs = () => {
    var emptyDate = false;
    var emptyMonth = false;
    var emptyYear = false;

    //console.log(inputs.day === null);

    if (inputs.day.length === 0) {
      //console.log("a");
      document.activeElement.blur();

      setErrorDay("This field is required");
      setEmptyErrorDay(true);

      emptyDate = true;
    }
    if (inputs.month.length === 0) {
      document.activeElement.blur();

      setErrorMonth("This field is required");
      setEmptyErrorMonth(true);

      emptyMonth = true;
    }
    if (inputs.year.length === 0) {
      document.activeElement.blur();

      setErrorYear("This field is required");
      setEmptyErrorYear(true);

      emptyYear = true;
    }

    if (emptyDate || emptyMonth || emptyYear) return false;

    return true;
  };

  const validateInputs = (event) => {
    event.preventDefault();

    var nonEmptyInputData = validateNonEmptyInputs();

    if (nonEmptyInputData) {
      var properDate = validateDate();
      var properMonth = validateMonth();
      var properYear = validateYear();
      var properFullDate = validateFinalDate();
    }

    if (properDate && properMonth && properYear && properFullDate)
      handleSubmit();
    else {
      setDayVal(" - - ");
      setMonthVal(" - - ");
      setYearVal(" - - ");
    }
  };

  return (
    <div className="main-div">
      <div className="d-flex">
        <form id="my-form" onSubmit={validateInputs} className="d-flex">
          <div className="p-2 flex-fill day-div">
            <span className={emptyErrorDay ? "day-span-error" : "day-span"}>
              DAY
            </span>
            <br></br>
            <input
              type="number"
              name="day"
              value={inputs.day || ""}
              onChange={handleChange}
              className={emptyErrorDay ? "day-input-error" : "day-input"}
              placeholder="DD"
            />
            <br></br>
            <span className="error-day">{errorDay}</span>
          </div>

          <div className="p-2 flex-fill month-div">
            <span
              className={emptyErrorMonth ? "month-span-error" : "month-span"}
            >
              MONTH
            </span>
            <br></br>
            <input
              type="number"
              name="month"
              value={inputs.month || ""}
              onChange={handleChange}
              className={emptyErrorMonth ? "month-input-error" : "month-input"}
              placeholder="MM"
            />
            <br></br>
            <span className="error-month">{errorMonth}</span>
          </div>

          <div className="p-2 flex-fill year-div">
            <span className={emptyErrorYear ? "year-span-error" : "year-span"}>
              YEAR
            </span>
            <br></br>
            <input
              type="number"
              name="year"
              value={inputs.year || ""}
              onChange={handleChange}
              className={emptyErrorYear ? "year-input-error" : "year-input"}
              placeholder="YYYY"
            />
            <br></br>
            <span className="error-year">{errorYear}</span>
          </div>
        </form>
      </div>

      <div className="d-flex2">
        <div className="p-2 flex-fill">
          <hr className="hr-cls" />
        </div>
        <div className="p-2 flex-fill">
          <div className="circle-purple">
            <button form="my-form" type="submit" className="btn-sub">
              <CustomSvg />
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex3">
        <div className="p-2 flex-fill years_val">{yearVal}</div>
        <div className="p-2 flex-fill years_def">years</div>
      </div>

      <div className="d-flex3">
        <div className="p-2 flex-fill month_val">{monthVal}</div>
        <div className="p-2 flex-fill month_def">months</div>
      </div>

      <div className="d-flex3">
        <div className="p-2 flex-fill days_val">{dayVal}</div>
        <div className="p-2 flex-fill days_def">days</div>
      </div>
    </div>
  );
}

export default Main;
