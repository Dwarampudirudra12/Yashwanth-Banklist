'use strict';
const calcAvgHumanAge = dog =>
  dog.map((curr, i) => {
    let humanAge;
    const logic =
      curr <= 2 ? (humanAge = 2 * curr) : (humanAge = 16 + curr * 4);
    ages = `Dog num: ${i + 1} human age is ${logic}`;
  });
