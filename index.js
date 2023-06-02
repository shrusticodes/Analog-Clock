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
createDivs();
createButton();
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
      minDiv.className = "minutes";
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
function createButton()
{
  const button = document.createElement('button');
  button.style.marginLeft = "20%";
  button.style.marginTop = "30px";
  button.innerText="Change Mode";
  button.className="light-mode";
  button.style.borderRadius="10px";
  button.addEventListener("click", setMode);
  mainDiv.appendChild(button);
}
function setMode()
{
  console.log("button clicked")
  const buttonElement = document.querySelector("button");
  const body = document.body;
  let minutes = document.getElementsByClassName('minutes')
  if ( buttonElement.className=="light-mode"){
  buttonElement.className="dark-theme";
  body.className="dark";
  clockDiv.className = "clock dark-theme";
  clockDiv.style.border = `7px solid rgb(215, 213, 213)`
  hours.style.backgroundColor = `hsl(224, 42%, 57%)`;
  min.style.backgroundColor = `hsl(224, 42%, 57%)`;
  second.style.backgroundColor = `rgb(215, 213, 213)`;
  clockDiv.style.setProperty("--circleColor", `hsl(224, 42%, 57%)`);
  for(let i=0;i<minutes.length;i++)
  {
    minutes[i].style.backgroundColor = `rgb(215, 213, 213)`;
  }
  }
  else{
  buttonElement.className="light-mode";
  body.className="light";
  clockDiv.className = "clock light-mode";
  hours.style.backgroundColor = "black";
  min.style.backgroundColor = "black";
  clockDiv.style.border = `7px solid black`;
  second.style.backgroundColor = "red";
  clockDiv.style.setProperty("--circleColor", `black`);
  for(let i=0;i<minutes.length;i++)
  {
    minutes[i].style.backgroundColor = `black`;
  }
  minutes.forEach(element => {
    element.style.backgroundColor = 'black';
  });
}
}
