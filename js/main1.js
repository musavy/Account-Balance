const inpkey = document.querySelector("#inputkey");
const inpvalue = document.querySelector("#inputvalue");
const button = document.querySelector("#btn-one");
const incomeOut = document.querySelector(".income");
const expanseOut = document.querySelector(".expanse");
const selectInput = document.querySelector("select");
const resultbox = document.querySelector(".result");
let storedData = [];

const displayDateTime = () => {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let dateMonthYear = date + "." + month + "." + year;
  let time = hours + ":" + minutes;
  let fullTime = dateMonthYear + " " + time;
  return fullTime;
};

// localStorage.clear();
if (localStorage.getItem("storedData") === null) {
  storedData = [];
} else {
  storedData = JSON.parse(localStorage.getItem("storedData"));
}

const createList = (id, title, num, time) => {
  let listItem = `<li>
    <span>${title}</span>
    <span>${num} €</span>
    <span>${time}</span>
  </li>
  `;
  if (id == "Income") {
    incomeOut.insertAdjacentHTML("beforeend", listItem);
  } else if (id == "Expense") {
    expanseOut.insertAdjacentHTML("beforeend", listItem);
  }
};

function getData() {
  const data = JSON.parse(localStorage.getItem("storedData"));
  if (data) {
    data.forEach((storedData) => {
      return (storedData += createList(
        storedData.id,
        storedData.title,
        storedData.num,
        storedData.time
      ));
    });
  } else {
    return data;
  }
}
getData();

button.addEventListener("click", function(event) {
  event.preventDefault();
  let result = [];
  let data = {
    id: selectInput.value,
    title: inpkey.value,
    num: inpvalue.value,
    time: displayDateTime()
  };

  console.log(data);

  // Destructuring
  let { title, num, time } = data;
  // create UI
  createList(data.id, title, num, time);
  // Store to localStorage

  storedData.push(data);
  console.log(storedData);

  const storedDataStringify = JSON.stringify(storedData);
  localStorage.setItem("storedData", storedDataStringify);
  incomeOut.value = "";
  expanseOut.value = "";

  resultbox.innerHTML = "My account balance is:";
  let span = document.createElement("span");
  span.textContent = calculateBalance(storedData);
  resultbox.appendChild(span);
});

resultbox.innerHTML = "My account balance is:";
let span = document.createElement("span");
span.textContent = calculateBalance(storedData);
resultbox.appendChild(span);
// Reset input UI

function calculateBalance(storedData) {
  console.log(storedData);

  let totalexpense = 0;
  let totalincome = 0;
  storedData.forEach((data) => {
    if (data.id === "Expense") {
      totalexpense = totalexpense + Number(data.num);
    } else {
      totalincome = totalincome + Number(data.num);
    }
  });
  console.log(totalexpense, totalincome);
  return totalincome - totalexpense;
}
