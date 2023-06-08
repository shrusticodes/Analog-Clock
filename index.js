import './style.css';
class ClockApp {
  constructor() {
    this.secRevolutions = 0;
    this.secLastAngle = 0;
    this.minRevolutions = 0;
    this.minLastAngle = 0;
    this.hourRevolutions = 0;
    this.hourLastAngle = 0;
    this.clock = null;
    this.hourHand = null;
    this.minutesHand = null;
    this.secondsHand = null;
    this.minutesDiv = null;
    this.changeThemeButton = null;
    this.containerDiv = null;
    this.optionsDiv = null;
    this.options = {
      timeZone: 'Asia/Kolkata',
    };

    this.initializeClock();
  }

  initializeClock() {
    this.containerDiv = document.createElement('div');
    this.containerDiv.className = 'clock-container';
    document.querySelector('.main').appendChild(this.containerDiv);

    this.changeThemeButton = document.createElement('button');
    this.changeThemeButton.innerText = 'Change Mode';
    this.changeThemeButton.style.marginTop = '10px';
    this.changeThemeButton.style.fontSize = '1rem';
    this.changeThemeButton.className = 'light-mode';

    this.createClockFace();
    this.createCountryOptions();
    this.startInterval();
  }

  startInterval() {
    setInterval(() => {
      const currentDate = new Date();
      const localDateTime = currentDate.toLocaleString('en-US', this.options);
      const date = new Date(localDateTime);

      const secDegree = 6 * date.getSeconds();
      const minDegree = 6 * date.getMinutes();
      const hourDegree = 30 * date.getHours() + date.getMinutes() / 2;

      if (secDegree < this.secLastAngle)
        this.secRevolutions = this.secRevolutions + 1;
      if (minDegree < this.minLastAngle)
        this.minRevolutions = this.minRevolutions + 1;
      if (hourDegree < this.hourLastAngle)
        this.hourRevolutions = this.hourRevolutions + 1;

      const secondDegreeFinal = this.secRevolutions * 360 + secDegree;
      const minDegreeFinal = this.minRevolutions * 360 + minDegree;
      const hourDegreeFinal = this.hourRevolutions * 360 + hourDegree;

      this.secLastAngle = secDegree;
      this.minLastAngle = minDegree;
      this.hourLastAngle = hourDegree;

      this.hourHand.style.transform = `rotate(${hourDegreeFinal}deg)`;
      this.minutesHand.style.transform = `rotate(${minDegreeFinal}deg)`;
      this.secondsHand.style.transform = `rotate(${secondDegreeFinal}deg)`;
    }, 1000);
  }

  createClockFace() {
    this.clock = document.createElement('div');
    this.clock.className = 'clock light-mode';

    this.hourHand = document.createElement('div');
    this.hourHand.className = 'hand hour';

    this.minutesHand = document.createElement('div');
    this.minutesHand.className = 'hand min';

    this.secondsHand = document.createElement('div');
    this.secondsHand.className = 'hand second';

    this.clock.appendChild(this.hourHand);
    this.clock.appendChild(this.minutesHand);
    this.clock.appendChild(this.secondsHand);

    const numbersDiv = document.createElement('div');
    numbersDiv.className = 'numbers-container';

    let k = 1;
    for (let i = 1; i <= 12; i++) {
      for (let j = 1; j <= 4; j++) {
        const newDiv = document.createElement('div');
        newDiv.className = 'number';

        const innerDiv = document.createElement('div');

        this.minutesDiv = document.createElement('div');
        this.minutesDiv.className = 'minutes';
        this.minutesDiv.style.margin = 'auto';
        this.minutesDiv.style.width = '1px';
        this.minutesDiv.style.height = '5px';
        this.minutesDiv.style.backgroundColor = 'black';

        innerDiv.appendChild(this.minutesDiv);
        newDiv.appendChild(innerDiv);
        newDiv.style.transform = `rotate(${k++ * 6}deg)`;

        numbersDiv.appendChild(newDiv);
      }
      const innerDiv = document.createElement('div');
      innerDiv.innerText = i;
      innerDiv.style.transform = `rotate(${-i * 6 * 5}deg)`;

      const newDiv = document.createElement('div');
      newDiv.className = 'number';
      newDiv.appendChild(innerDiv);
      newDiv.style.transform = `rotate(${i * 6 * 5}deg)`;

      numbersDiv.appendChild(newDiv);
      k++;
    }
    this.clock.appendChild(numbersDiv);
    this.containerDiv.appendChild(this.clock);
    this.changeThemeButton.addEventListener('click', this.updateTheme);
  }

  createCountryOptions() {
    this.optionsDiv = document.createElement('div');
    this.optionsDiv.id = 'form';
    this.optionsDiv.className = 'light-mode';
    this.optionsDiv.innerText = 'Timezone: ';
    const select = document.createElement('select');
    const countries = [
      'Select Country',
      'India',
      'UTC',
      'USA',
      'Japan',
      'South Africa',
    ];
    countries.forEach((country) => {
      const option = document.createElement('option');
      option.value = country;
      option.innerText = country;
      select.appendChild(option);
    });
    this.optionsDiv.appendChild(select);
    this.containerDiv.appendChild(this.optionsDiv);
    this.optionsDiv.appendChild(this.changeThemeButton);

    select.addEventListener('change', (event) => {
      const selectedCountry = event.target.value;
      this.updateTimezone(selectedCountry);
    });
  }

  updateTimezone(country) {
    switch (country) {
      case 'India':
        this.options.timeZone = 'Asia/Kolkata';
        break;
      case 'USA':
        this.options.timeZone = 'America/New_York';
        break;
      case 'Japan':
        this.options.timeZone = 'Asia/Tokyo';
        break;
      case 'South Africa':
        this.options.timeZone = 'Africa/Johannesburg';
        break;
      case 'UTC':
        this.options.timeZone = 'UTC';
        break;
      default:
        this.options.timeZone = 'Asia/Kolkata';
        break;
    }
  }

  updateTheme() {
    if (this.changeThemeButton.className === 'light-mode') {
      this.changeThemeButton.className = 'dark-theme';
      this.clock.className = 'clock dark-theme';
      this.optionsDiv.className = 'dark-theme';
    } else {
    }
  }
}

function renderClockApp() {
  new ClockApp();
}
const addClock = document.querySelector('#add');
addClock.addEventListener('click', renderClockApp);

// function setTheme() {
//   const themeButton = document.querySelector('#changeMode');
//   const addClockButton = document.querySelector('#addClock');
//   const form = document.querySelector('#form');
//   const clockDiv = document.querySelector('.clock');
//   const hours=document.querySelector('.hour');
//   const min = document.querySelector('.min');
//   const second = document.querySelector('.second');
//   let minutes = document.getElementsByClassName('minutes');
//   if (themeButton.className == 'light-mode') {
//     themeButton.className = 'dark-theme';
//     addClockButton.className = 'dark-theme';
//     body.className = 'dark';
//     clockDiv.className = 'clock dark-theme';
//     form.className = 'dark-theme';
//     clockDiv.style.border = `7px solid rgb(215, 213, 213)`;
//     min.style.backgroundColor = `hsl(224, 42%, 57%)`;
//     hours.style.backgroundColor = `hsl(224, 42%, 57%)`;
//     second.style.backgroundColor = `rgb(215, 213, 213)`;
//     clockDiv.style.setProperty('--circleColor', `hsl(224, 42%, 57%)`);
//     for (let i = 0; i < minutes.length; i++) {
//       minutes[i].style.backgroundColor = `rgb(215, 213, 213)`;
//     }
//   } else {
//     themeButton.className = 'light-mode';
//     addClockButton.className = 'light-mode';
//     body.className = 'light';
//     clockDiv.className = 'clock light-mode';
//     form.className = 'light-mode';
//     hours.style.backgroundColor = 'black';
//     min.style.backgroundColor = 'black';
//     hours.style.backgroundColor = `black`;
//     clockDiv.style.border = `7px solid black`;
//     second.style.backgroundColor = 'red';
//     clockDiv.style.setProperty('--circleColor', `black`);
//     for (let i = 0; i < minutes.length; i++) {
//       minutes[i].style.backgroundColor = `black`;
//     }
//   }
// }
