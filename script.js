const form = document.querySelector('.calculator-form');
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const daysSpan = document.querySelector('.calculator-days');
const monthsSpan = document.querySelector('.calculator-months');
const yearsSpan = document.querySelector('.calculator-years');

const setError = (input, errorText) => {
  const label = input.parentElement.children[0];
  const error = input.parentElement.children[2];
  //Set error text
  error.innerText = errorText;
  //Set error styles
  label.classList.add('active');
  input.classList.add('active');
  error.classList.add('active');
};

const unsetError = (input) => {
  const label = input.parentElement.children[0];
  const error = input.parentElement.children[2];
  //Unset error text
  error.innerText = '';
  //Unset error styles
  label.classList.remove('active');
  input.classList.remove('active');
  error.classList.remove('active');
};

const dayIsValid = (day, month, year) => {
  //number of days in that specific month
  const date = new Date(year, month, 0);
  const daysInMonth = date.getDate();
  let isValid;

  if (Number.isNaN(day)) {
    setError(dayInput, 'This field is required');
  } else if (day < 1 || day > 31) {
    setError(dayInput, 'Must be a valid day');
  } else if (day > daysInMonth) {
    setError(dayInput, 'Must be a valid day');
  } else {
    unsetError(dayInput);
    isValid = true;
    return isValid;
  }
};

const monthIsValid = (month) => {
  let isValid;
  if (Number.isNaN(month)) {
    setError(monthInput, 'This field is required');
  } else if (month < 1 || month > 12) {
    setError(monthInput, 'Must be a valid month');
  } else {
    unsetError(monthInput);
    isValid = true;
    return isValid;
  }
};

const yearIsValid = (year) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  let isValid;
  if (Number.isNaN(year)) {
    setError(yearInput, 'This field is required');
  } else if (year > currentYear) {
    setError(yearInput, 'Must be in the past');
  } else {
    unsetError(yearInput);
    isValid = true;
    return isValid;
  }
};

const calculateAge = (day, month, year) => {
  // Get the current date
  var currentDate = new Date();

  // Create a new Date object with the provided date
  var providedDate = new Date(year, month - 1, day);

  // Calculate the time difference in milliseconds
  var timeDifference = currentDate - providedDate;

  // Calculate the number of milliseconds in a day, month, and year
  var millisecondsPerDay = 1000 * 60 * 60 * 24;
  var millisecondsPerMonth = millisecondsPerDay * 30.436875; // Average month length
  var millisecondsPerYear = millisecondsPerDay * 365.25; // Average year length

  // Calculate the number of years, months, and days that have passed
  var yearsPassed = Math.floor(timeDifference / millisecondsPerYear);
  var monthsPassed = Math.floor(
    (timeDifference % millisecondsPerYear) / millisecondsPerMonth
  );
  var daysPassed = Math.floor(
    ((timeDifference % millisecondsPerYear) % millisecondsPerMonth) /
      millisecondsPerDay
  );

  // Return the result
  return {
    years: yearsPassed,
    months: monthsPassed,
    days: daysPassed,
  };
};

const appendData = (data) => {
  yearsSpan.innerText = data.years;
  monthsSpan.innerText = data.months;
  daysSpan.innerText = data.days;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const day = parseInt(formData.get('day'));
  const month = parseInt(formData.get('month'));
  const year = parseInt(formData.get('year'));
  const dIsValid = dayIsValid(day, month, year);
  const mIsValid = monthIsValid(month);
  const yIsValid = yearIsValid(year);

  if (dIsValid && mIsValid && yIsValid) {
    const data = calculateAge(day, month, year);
    appendData(data);
  }
});
