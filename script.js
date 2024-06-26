'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Vinay',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 1992,
};

const account3 = {
  owner: 'Shyam',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Yashwanth',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Gandreti Satya Lasya Bharathi',
  movements: [430, 1000000000, 700, 50, 90],
  interestRate: 1,
  pin: 2005,
};

const account6 = {
  owner: 'Vinthra Srinivas',
  movements: [435, 1000000000, 760, 50, 90],
  interestRate: 1,
  pin: 2905,
};

const accounts = [account1, account2, account3, account4, account5, account6];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (now, i) {
    const type = now > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${now}</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcbalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur, i, arr) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcdisplaySummary = dep => {
  const income = dep.movements
    .filter((now, i) => now > 0)
    .reduce((acc, now, i) => acc + now, 0);
  labelSumIn.textContent = `${income}€`;

  const out = dep.movements
    .filter((now, i) => now < 0)
    .reduce((acc, now, i) => acc + now, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = dep.movements
    .filter(mov => mov >= 0)
    .map(now => (now * dep.interestRate) / 100)
    .filter(now => now >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = acc => {
  displayMovements(acc.movements);
  calcbalance(acc);
  calcdisplaySummary(acc);
};

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    now => now.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `welcome back,${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
  }
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();
  updateUI(currentAccount);
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = inputTransferAmount.value;
  const reciver = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    reciver?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    reciver.movements.push(+amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(acc => acc >= amount * 0.1)) {
    // Add amount
    currentAccount.movements.push(+amount);
    // updateUI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Deleting Account
    accounts.splice(index, 1);

    // Add UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
const overalBalence = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, curr) => acc + curr, 0);
console.log(overalBalence);

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const createUsername = accs => {
  accs.forEach(
    accs =>
      (accs.username = accs.owner
        .toLowerCase()
        .split(' ')
        .map(now => now[0])
        .join(''))
  );
};

createUsername(accounts);
console.log(accounts);

const deposits = movements.filter(now => now > 0);
console.log(deposits);

const withdrawals = movements.filter(now => now < 0);
console.log(withdrawals);

const max = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);
console.log(max);

const dog1 = [5, 2, 4, 1, 15, 8, 3];
const dog2 = [16, 6, 10, 5, 6, 1, 4];

const dogs = [...dog1, ...dog2];
const calcAvgHumanAge = dogs => {
  const set = dogs
    .map(now => (now <= 2 ? 2 * now : 16 + now * 4))
    .filter(now => now > 18)
    .reduce((acc, now, i, arr) => acc + now / arr.length, 0);
  return set;
};

const avg1 = calcAvgHumanAge(dog1);
const avg2 = calcAvgHumanAge(dog2);
console.log(avg1, avg2);
