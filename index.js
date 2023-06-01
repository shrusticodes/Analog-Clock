import './style.css';
const hours = document.querySelector('.hour');
const min = document.querySelector('.min');
const second = document.querySelector('.second');
const clockDiv = document.querySelector('.clock');
let revolutions = 0;
let lastAngle = 0;
createDivs();
setInterval(() => {
  const date = new Date();
  const secDegree = 6 * date.getSeconds();
  const minDegree = 6 * date.getMinutes();
  const hourDegree = 30 * date.getHours() + date.getMinutes() / 2;
  if (secDegree < lastAngle) revolutions = revolutions + 1;
  // console.log(revolutions);
  // console.log(secDegree);
  // console.log(lastAngle);
  let secondDegreeFinal = revolutions * 360 + secDegree;
  lastAngle = secDegree;
  hours.style.transform = `rotate(${hourDegree}deg)`;
  min.style.transform = `rotate(${minDegree}deg)`;
  second.style.transform = `rotate(${secondDegreeFinal}deg)`;
}, 1000);

function createDivs() {
  const numbersDiv = document.createElement('div');
  for (let i = 1; i <= 12; i++) {
    const newDiv = document.createElement('div');
    newDiv.className = `number number${i}`;
    let innerDiv = document.createElement('div');
    innerDiv.innerText = i;
    newDiv.appendChild(innerDiv);
    for (let j = 1; j <= 4; j++) {
      let minutesDiv = document.createElement('div');
      minutesDiv.className = `number${i} minutes${j}`;
      newDiv.appendChild(minutesDiv);
      console.log(minutesDiv);
    }
    numbersDiv.appendChild(newDiv);
  }
  clockDiv.appendChild(numbersDiv);
}
