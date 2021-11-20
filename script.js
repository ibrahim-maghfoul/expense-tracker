const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -60 },
//   { id: 4, text: "Camera", amount: 100 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

/*------------ FUNCTIONS ------------*/
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateValues();

    updateLocaleStorage();
    text.value = "";
    amount.value = "";
  }
}

// Generate random id
function generateID() {
  return Math.floor(Math.random() * 100000000000);
}

//Add transaction to the DOM
function addTransactionToDOM(transaction) {
  //get amount sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  // add class based on value
  item.classList.add(transaction.amount > 0 ? "minus" : "plus");
  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onclick="remouveTransaction(${
    transaction.id
  })" >X</button>
  `;
  list.appendChild(item);
}

// update the balance income and expence

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  console.log(income);
  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    (-1).toFixed(2);
  balance.innerHTML = `$${total}`;
  money_plus.innerHTML = `$${income}`;
  money_minus.innerHTML = `$${expense}`;
}
// Init App

// remouve transaction by id
function remouveTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocaleStorage();
  init();
}

//update localstorage transactions

function updateLocaleStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
function init() {
  list.innerHTML = "";
  transactions.forEach((transaction) => {
    addTransactionToDOM(transaction);
  });
  updateValues();
}

init();
form.addEventListener("submit", addTransaction);
