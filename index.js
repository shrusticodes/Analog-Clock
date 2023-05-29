import './style.css';
const hours = document.querySelector('.hour');
const min = document.querySelector('.min');
const second = document.querySelector('.second');
setInterval(() => {
  const date = new Date();
  const secDegree = 6 * date.getSeconds();
  const minDegree = 6 * date.getMinutes();
  const hourDegree = 30 * date.getHours() + date.getMinutes() / 2;
  hours.style.transform = `rotate(${hourDegree}deg)`;
  min.style.transform = `rotate(${minDegree}deg)`;
  second.style.transform = `rotate(${secDegree}deg)`;
}, 1000);
