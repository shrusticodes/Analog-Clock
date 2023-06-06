// import './style.css';
const hours = document.querySelector('.hour');
const min = document.querySelector('.min');
const second = document.querySelector('.second');
const clockDiv = document.querySelector('.clock');
const mainDiv = document.querySelector('.main');
let secRevolutions = 0;
let secLastAngle = 0;
let minRevolutions = 0;
let minLastAngle = 0;
let hourRevolutions = 0;
let hourLastAngle = 0;
let options;
createDivs();
createButton();
setInterval(() => {
  let currentDate = new Date();
  let localDateTime = currentDate.toLocaleString('en-US', options);
  let date = new Date(localDateTime);
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
  let k = 1;
  for (let i = 1; i <= 60; i++) {
    const newDiv = document.createElement('div');
    newDiv.className = `number number${i}`;
    const innerDiv = document.createElement('div');
    if (i % 5 == 0) {
      innerDiv.innerText = k;
      k++;
      innerDiv.style.transform = `rotate(${-i * 6}deg)`;
    } else {
      const minDiv = document.createElement('div');
      minDiv.className = 'minutes';
      minDiv.style.margin = 'auto';
      minDiv.style.width = '1.5px';
      minDiv.style.height = '7px';
      minDiv.style.backgroundColor = `black`;
      innerDiv.appendChild(minDiv);
    }
    newDiv.appendChild(innerDiv);
    numbersDiv.appendChild(newDiv);
    newDiv.style.transform = `rotate(${i * 6}deg)`;
  }
  clockDiv.appendChild(numbersDiv);
}
function createButton() {
  const button = document.createElement('button');
  button.style.marginLeft = '28%';
  button.style.marginTop = '10px';
  button.innerText = 'Change Mode';
  button.className = 'light-mode';
  button.style.borderRadius = '10px';
  button.addEventListener('click', setMode);
  mainDiv.appendChild(button);
}
function setMode() {
  const buttonElement = document.querySelector('button');
  const body = document.body;
  const form = document.querySelector('form');
  const input = document.querySelector('input');
  let minutes = document.getElementsByClassName('minutes');
  if (buttonElement.className == 'light-mode') {
    buttonElement.className = 'dark-theme';
    body.className = 'dark';
    clockDiv.className = 'clock dark-theme';
    form.className ="dark-theme";
    input.className = "dark-theme";
    clockDiv.style.border = `7px solid rgb(215, 213, 213)`;
    hours.style.backgroundColor = `hsl(224, 42%, 57%)`;
    min.style.backgroundColor = `hsl(224, 42%, 57%)`;
    second.style.backgroundColor = `rgb(215, 213, 213)`;
    clockDiv.style.setProperty('--circleColor', `hsl(224, 42%, 57%)`);
    for (let i = 0; i < minutes.length; i++) {
      minutes[i].style.backgroundColor = `rgb(215, 213, 213)`;
    }
  } else {
    buttonElement.className = 'light-mode';
    body.className = 'light';
    clockDiv.className = 'clock light-mode';
    form.className ="light-mode";
    input.className = "light-mode";
    hours.style.backgroundColor = 'black';
    min.style.backgroundColor = 'black';
    clockDiv.style.border = `7px solid black`;
    second.style.backgroundColor = 'red';
    clockDiv.style.setProperty('--circleColor', `black`);
    for (let i = 0; i < minutes.length; i++) {
      minutes[i].style.backgroundColor = `black`;
    }
  }
}

function setTime()
{
  const selectElement = document.querySelector("select");
  if(selectElement.value=="America")
  { 
    options = {
      timeZone: 'America/New_York'
    };
  }
  else if(selectElement.value=="Japan")
  {
    options = {
      timeZone: 'Asia/Tokyo'
    };
  }
  else if(selectElement.value=="India")
  {
    options = {
      timeZone: 'Asia/Kolkata'
    };
  }
  else if(selectElement.value=="South Africa")
  {
    options = {
      timeZone: 'Africa/Johannesburg'
    };
  }
  else{
    options = {
      timeZone: 'UTC'
    };
  }
}
