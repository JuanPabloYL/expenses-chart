const url = "http://localhost:4000/movements";

const balance = document.querySelector(".balance__graphics");

let arr = [];

eventListeners();
function eventListeners() {
  window.addEventListener("DOMContentLoaded", showMovements);
}

function showMovements() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => showInfo(data));
}

function showInfo(data) {
  data.forEach((d) => {
    const { day, amount } = d;

    const balanceContainer = document.createElement("div");
    balanceContainer.classList.add("balance__graphic-container");

    const balanceGraphic = document.createElement("div");
    balanceGraphic.classList.add("balance__graphic");
    balanceGraphic.style.height = `${amount * 2}px`;
    balanceGraphic.dataset.title = `$${amount}`;

    const balanceText = document.createElement("p");
    balanceText.classList.add("balance__graphic-text");
    balanceText.textContent = day;

    balanceContainer.append(balanceGraphic);
    balanceContainer.append(balanceText);

    balance.append(balanceContainer);

    arr.push(parseFloat(balanceGraphic.style.height));
  });
  const max = Math.max(...arr);
  const elements = document.querySelectorAll(".balance__graphic");
  elements.forEach((element) => {
    if (element.style.height === `${max}px`) {
      element.style.backgroundColor = "hsl(186, 34%, 60%)";
    }
  });
}
