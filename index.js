"use strict";
//**дата на мобильнике */
let today = new Date();
let year = today.getFullYear();
let monthNow = today.getMonth() + 1;

const getDay = () => {
  let daysArr = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  return daysArr[today.getDay()];
};

document.querySelector(".myDay").innerHTML = getDay();
const getDat = () => {
  let montsArr = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];
  return montsArr[today.getMonth()];
};

document.querySelector(".myData").innerHTML =
  today.getDate() + " " + getDat() + " " + year + " " + "г.";

//* бегущее время на мобильнике**//
setInterval(myTimer, 1000);
function myTimer() {
  let today = new Date();
  let second = today.getSeconds();
  let minut = today.getMinutes();
  if (+second < 10) {
    second = "0" + second;
  }
  if (+minut < 10) {
    minut = "0" + minut;
  }

  document.getElementById("myTime").innerHTML =
    today.getHours() + ":" + minut + ":" + second;
}

//**календарик на мобильнике**/
const getmonth = () => {
  let monthArr = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return monthArr[today.getMonth()];
};
document.querySelector(".month").innerHTML =
  getmonth() + " " + year + " " + "г.";

//**Таблица-месяц**//
function createCalendar(elem, year, month) {
  let mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
  let d = new Date(year, mon);

  let table =
    "<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>";

  // пробелы для первого ряда до первого дня месяца
  // * * * 1  2  3  4
  for (let i = 0; i < gettDay(d); i++) {
    table += "<td></td>";
  }

  // создаём <td> ячейки календаря с датами
  while (d.getMonth() == mon) {
    table += "<td>" + d.getDate() + "</td>";

    if (gettDay(d) % 7 == 6) {
      // вс, последний день - перевод строки
      table += "</tr><tr>";
    }

    d.setDate(d.getDate() + 1);
  }
  // добиваем таблицу пустыми ячейками, если нужно
  if (gettDay(d) != 0) {
    for (let i = gettDay(d); i < 7; i++) {
      table += "<td></td>";
    }
  }
  // закрываем таблицу
  table += "</tr></table>";
  elem.id = "tbl";
  elem.innerHTML = table;
}

function gettDay(date) {
  // получаем номер дня недели, от 0 (пн) до 6 (вс)
  let day = date.getDay();
  if (day == 0) day = 7; // делаем воскресенье (0) последним днем
  return day - 1;
}

createCalendar(calendar, year, monthNow);

// ***TODO list***/
let ul = document.querySelector("#list");
let input = document.getElementById("toDoInput"); 
let addBtn = document.getElementById("addBtn");
input.addEventListener("keypress", validationPress);
addBtn.addEventListener("click", validation);

let items = JSON.parse(localStorage.getItem("ToDo")) || [];

////*генерация ID*////
let setId = new Set();

function creatId() {
  let newId = Math.floor(Math.random() * 10000000);
  if (!setId.has(newId)) {
    setId.add(newId);
    return newId;
  } else {
    return creatId();
  }
}

function validationPress(event) {
  if (event.keyCode == 13) {
    if (input.value === "" || input.value === null) {
      alert("Введите данные");
    } else {
      createObj();
    }
  }
}

function validation() {
  if (input.value === "" || input.value === null) {
    alert("Введите данные");
  } else {
    createObj();
  }
}

function createObj() {
  let idtodo = creatId();
  let todoItem = { value: input.value, checked: false, id: idtodo };
  items.push(todoItem);
  localStorage.setItem("ToDo", JSON.stringify(items));
  input.value = "";
  createTodo();
}

function createTodo() {
  ul.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    let li = document.createElement("li");
    li.prepend(items[i].value);
    li.setAttribute("id", +items[i].id);
    li.className = items[i].checked ? "checked" : "";

    let deleteIcon = document.createElement("span");
    deleteIcon.className = "icon__delit";
    li.append(deleteIcon);
    ul.prepend(li);
    setId.add(items[i].id); //нужно при перезагрузке страницы
  }
}

ul.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    event.stopPropagation();
    for (let i = 0; i < items.length; ++i) {
      if (items[i].id == event.target.getAttribute("id")) {
        items[i].checked = !items[i].checked;
        localStorage.setItem("ToDo", JSON.stringify(items));
      }
    }
  } else if (event.target.tagName === "SPAN") {
    event.target.parentNode.remove();
    event.stopPropagation();
    let iD = +event.target.parentNode.getAttribute("id");
    items = items.filter((val) => +val.id != iD);
    localStorage.setItem("ToDo", JSON.stringify(items));
  }
});

if (localStorage.getItem("ToDo")) {
  createTodo();
}
