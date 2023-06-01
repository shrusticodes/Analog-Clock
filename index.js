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
    for (let j=1;j<=4;j++)
    {
      
    }
    newDiv.appendChild(innerDiv);
    numbersDiv.appendChild(newDiv);
    // for (let j = 1; j <= 4; j++) {
    //   minutesDiv = document.createElement('div');
    //   mainMinutesDiv = document.createElement('div');
    //   mainMinutesDiv.className = `minutes`;
    //   minutesDiv.className = `minutes${k}`;
    //   let eachMinDegree = 6 * k;
    //   if (eachMinDegree % 5 == 0) {
    //     k++;
    //     eachMinDegree = 6 * k;
    //     mainMinutesDiv.style.transform = `rotate(${eachMinDegree})`;
    //   }
    //   console.log(eachMinDegree);
    //   console.log(k);
    //   k++;
    //   mainMinutesDiv.appendChild(minutesDiv);
    //   numbersDiv.appendChild(mainMinutesDiv);
    // }
  }
  clockDiv.appendChild(numbersDiv);
}
