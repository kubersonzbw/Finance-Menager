const btnAddTransaction = document.querySelector(".add-transaction");
const btnDeleteAllTransaction = document.querySelector(".delete-all");
const incomeArea = document.querySelector(".income-area");
const expensesArea = document.querySelector(".expenses-area");
const availableMoney = document.querySelector(".available-money");
const addTransactionPanel = document.querySelector(".add-transaction-panel");
const btnSaveTransaction = document.querySelector(".save");
const btnCancelTransaction = document.querySelector(".cancel");
const btnColorLight = document.querySelector(".light");
const btnColorDark = document.querySelector(".dark");
const textInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");
const category = document.querySelector("#category");

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

const transplate = (textInput, categoryIcon) => {
  return `<p class="transaction-name">${categoryIcon} ${textInput.value}</p>
<p class="transaction-amount">${amountInput.value}zł<button class="delete">
    <i class="fas fa-times"> </i>
  </button></p>`;
};

const showPanel = () => {
  addTransactionPanel.style.display = "flex";
};

const closePanel = () => {
  addTransactionPanel.style.display = "none";
  clearInputs();
};

const checkForm = () => {
  if (
    textInput.value === "" ||
    amountInput.value === "" ||
    category.value === "none"
  ) {
    alert("Wypełnij wszystkie pola!");
  } else {
    createNewTransaction();
  }
};

const clearInputs = () => {
  textInput.value = "";
  amountInput.value = "";
  category.value = "none";
};

const createNewTransaction = () => {
  const newTransaction = document.createElement("div");
  newTransaction.classList.add("transaction");
  newTransaction.setAttribute("id", ID);
  checkCategory(selectedCategory);
  newTransaction.insertAdjacentHTML(
    "beforeend",
    transplate(textInput, categoryIcon)
  );

  amountInput.value > 0
    ? incomeArea.appendChild(newTransaction) &&
      newTransaction.classList.add("income")
    : expensesArea.appendChild(newTransaction) &&
      newTransaction.classList.add("expense");
  moneyArr.push(parseFloat(amountInput.value));
  countMoney(moneyArr);
  closePanel();
  ID++;
  clearInputs();
  newTransaction.addEventListener("click", deleteTransaction);
};

const checkCategory = (transaction) => {
  switch (transaction) {
    case "[ + ] Przychód":
      categoryIcon = `<i class="fas fa-money-bill-wave"></i>`;
      break;
    case "[ - ] Zakupy":
      categoryIcon = `<i class="fas fa-cart-arrow-down"></i>`;
      break;
    case "[ - ] Jedzenie":
      categoryIcon = `<i class="fas fa-hamburger"></i>`;
      break;
    case "[ - ] Kino":
      categoryIcon = `<i class="fas fa-film"></i>`;
      break;
  }
};

const selectCategory = () => {
  selectedCategory = category.options[category.selectedIndex].text;
};

const countMoney = (money) => {
  const newMoney = money.reduce((a, b) => a + b);
  availableMoney.textContent = `${newMoney} zł`;
  changeMoneyColor();
};

const changeMoneyColor = () => {
  if (availableMoney.textContent.charAt(0) === "-") {
    availableMoney.style.color = "red";
  } else if (availableMoney.textContent.charAt(0) === "0") {
    availableMoney.style.color = "black";
  } else {
    availableMoney.style.color = "green";
  }
};

const deleteTransaction = (e) => {
  const deleteButton = e.target.closest(".delete");
  if (deleteButton) {
    const id = e.target.parentElement.parentElement.parentElement;
    const transactionAmount = parseFloat(id.childNodes[2].innerText);
    const indexOfTransaction = moneyArr.indexOf(transactionAmount);
    moneyArr.splice(indexOfTransaction, 1);
    id.remove();
    countMoney(moneyArr);
  }
};

const deleteAllTransaction = (e) => {
  const incomeArea = document.querySelectorAll(".transaction");
  incomeArea.forEach((e) => e.remove());
  availableMoney.textContent = "0zł";
  changeMoneyColor();
  moneyArr = [0];
};

const changeColorToDark = () => {
  root.style.setProperty("--first-color", "#14161f");
  root.style.setProperty("--second-color", "#f9f9f9");
  root.style.setProperty("--border-color", "rgba(255,255,255,0.4");
};

const changeColorToLight = () => {
  root.style.setProperty("--first-color", "#f9f9f9");
  root.style.setProperty("--second-color", "#14161f");
  root.style.setProperty("--border-color", "rgba(0,0,0,0.2");
};

btnColorDark.addEventListener("click", changeColorToDark);
btnColorLight.addEventListener("click", changeColorToLight);
btnDeleteAllTransaction.addEventListener("click", deleteAllTransaction);
category.addEventListener("change", selectCategory);
btnSaveTransaction.addEventListener("click", checkForm);
btnCancelTransaction.addEventListener("click", closePanel);
btnAddTransaction.addEventListener("click", showPanel);
