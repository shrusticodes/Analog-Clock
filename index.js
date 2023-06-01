import './style.css';
const hours = document.querySelector('.hour');
const min = document.querySelector('.min');
const second = document.querySelector('.second');
const clockDiv = document.querySelector('.clock');
createDivs();
setInterval(() => {
  const date = new Date();
  const secDegree = 6 * date.getSeconds();
  const minDegree = 6 * date.getMinutes();
  const hourDegree = 30 * date.getHours();
  hours.style.transform = `rotate(${hourDegree}deg)`;
  min.style.transform = `rotate(${minDegree}deg)`;
  second.style.transform = `rotate(${secDegree}deg)`;
}, 1000);

function createDivs() {
  const numbersDiv = document.createElement('div');
  for (let i = 1; i <= 12; i++) {
    const newDiv = document.createElement('div');
    newDiv.className = `number number${i}`;
    newDiv.innerText = i;
    numbersDiv.appendChild(newDiv);
  }
  clockDiv.appendChild(numbersDiv);
}
