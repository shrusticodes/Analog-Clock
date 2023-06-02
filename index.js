// import './style.css';
const hours = document.querySelector('.hour');
const min = document.querySelector('.min');
const second = document.querySelector('.second');
const clockDiv = document.querySelector('.clock');
let secRevolutions = 0;
let secLastAngle = 0;
let minRevolutions = 0;
let minLastAngle = 0;
let hourRevolutions = 0;
let hourLastAngle = 0;
createDivs();
setInterval(() => {
  const date = new Date();
  const secDegree = 6 * date.getSeconds();
  const minDegree = 6 * date.getMinutes();
  const hourDegree = 30 * date.getHours() + date.getMinutes() / 2;
  if (secDegree < secLastAngle) secRevolutions = secRevolutions + 1;
  if (minDegree < minLastAngle) minRevolutions = minRevolutions + 1;
  if (hourDegree < hourLastAngle) hourRevolutions = hourRevolutions + 1;
  let secondDegreeFinal = secRevolutions * 360 + secDegree;
  let minDegreeFinal = minRevolutions * 360 + minDegree;
  let hourDegreeFinal = hourRevolutions * 360 + hourDegree;
  secLastAngle = secDegree;
  minLastAngle = minDegree;
  hourLastAngle = hourDegree;
  hours.style.transform = `rotate(${hourDegreeFinal}deg)`;
  min.style.transform = `rotate(${minDegreeFinal}deg)`;
  second.style.transform = `rotate(${secondDegreeFinal}deg)`;
}, 1000);

function createDivs() {
  const numbersDiv = document.createElement('div');
  for (let i = 1; i <= 12; i++) {
    const newDiv = document.createElement('div');
    newDiv.className = `number number${i}`;
    const innerDiv = document.createElement('div');
    innerDiv.innerText = i;
    newDiv.appendChild(innerDiv);
    numbersDiv.appendChild(newDiv);
    newDiv.style.transform=`rotate(${i*6*5}deg)`;
    innerDiv.style.transform=`rotate(${-i*6*5}deg)`;
  }
  clockDiv.appendChild(numbersDiv);
}


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
 // for (let j = 1; j <= 4; j++) {
    //   minDiv = document.createElement('div');
    //   minDiv.className = `upperMinDiv`
    //   const minutesDiv = document.createElement('div');
    //   minutesDiv.className = 'minutes';
    //   minDiv.style.transform = `rotate(${j * 6}deg)`;
    //   minutesDiv.style.transform = `rotate(${-j * 6}deg)`;
    //   minDiv.appendChild(minutesDiv);
    //   numbersDiv.appendChild(minDiv);
    // }
