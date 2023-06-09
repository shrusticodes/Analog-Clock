// import './style.css';
class ClockApp {
  constructor() {
    this.clock = null;
    this.hourHand = null;
    this.minutesHand = null;
    this.secondsHand = null;
    this.containerDiv = null;
    this.options = {
      timeZone: 'Asia/Kolkata',
      isDayMode: true,
      countries: ['Select Country', 'India', 'UTC', 'USA', 'Japan', 'South Africa']
    };

    this.initializeClock();
  }

  initializeClock() {
    this.containerDiv = document.createElement('div');
    this.containerDiv.className = 'clock-container';
    document.querySelector('.main').appendChild(this.containerDiv);

    this.createClockFace();
    this.createCountryOptions();
    this.startInterval();
  }

  startInterval() {
    this.secRevolutions = 0;
    this.secLastAngle = 0;
    this.minRevolutions = 0;
    this.minLastAngle = 0;
    this.hourRevolutions = 0;
    this.hourLastAngle = 0;
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

    let firstHalfNumber = 1, secondHalfNumber = 7;

    for (let i = 1; i <= 30; i++) {
      const newDiv = document.createElement('div');
      newDiv.className = 'number';
      const innerDiv1 = document.createElement('div');
      const innerDiv2 = document.createElement('div');

      if (i % 5 == 0) {
        innerDiv1.innerText = firstHalfNumber;
        innerDiv1.style.transform = `rotate(${-i * 6}deg)`;
        firstHalfNumber++;

        innerDiv2.innerText = secondHalfNumber;
        innerDiv2.style.bottom = '0';
        innerDiv2.style.position = 'absolute';
        innerDiv2.style.marginLeft = '45%';
        innerDiv2.style.transform = `rotate(${-i * 6}deg)`;
        secondHalfNumber++;
      }
      else {
        const minuteDiv1 = document.createElement('div');
        minuteDiv1.className = 'minutes';
        innerDiv1.appendChild(minuteDiv1);

        const minuteDiv2 = document.createElement('div');
        minuteDiv2.className = 'minutes';
        minuteDiv2.style.width = '1.5px';
        innerDiv2.appendChild(minuteDiv2);
        innerDiv2.style.marginLeft = '50%';
        innerDiv2.style.bottom = '0';
        innerDiv2.style.position = 'absolute';

      }
      newDiv.appendChild(innerDiv1);
      newDiv.appendChild(innerDiv2);
      newDiv.style.transform = `rotate(${i * 6}deg)`;

      numbersDiv.appendChild(newDiv);

    }
    this.clock.appendChild(numbersDiv);
    this.containerDiv.appendChild(this.clock);
    
    this.changeThemeButton = document.createElement('button');
    this.changeThemeButton.innerText = 'Change Mode';
    this.changeThemeButton.style.marginTop = '10px';
    this.changeThemeButton.style.fontSize = '1rem';
    this.changeThemeButton.className = 'light-mode';
    this.changeThemeButton.addEventListener('click', () => { this.updateTheme(); });
  }

  createCountryOptions() {
    this.optionsDiv = document.createElement('div');
    this.optionsDiv.id = 'form';
    this.optionsDiv.className = 'light-mode';
    this.optionsDiv.innerText = 'Timezone: ';

    const select = document.createElement('select');

    this.options.countries.forEach((country) => {
      const option = document.createElement('option');
      option.value = country;
      option.innerText = country;
      select.appendChild(option);
    });

    this.optionsDiv.appendChild(select);
    this.optionsDiv.appendChild(this.changeThemeButton);

    this.containerDiv.appendChild(this.optionsDiv);

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
    const minutesDiv = this.containerDiv.querySelectorAll('.minutes');
    if (this.options.isDayMode) {
      this.options.isDayMode = false;

      this.clock.className = 'clock dark-theme';
      this.clock.style.border = `7px solid rgb(215, 213, 213)`;
      this.clock.style.setProperty('--circleColor', `hsl(224, 42%, 57%)`);

      this.optionsDiv.className = 'dark-theme';
      this.hourHand.style.backgroundColor = `hsl(224, 42%, 57%)`;
      this.minutesHand.style.backgroundColor = `hsl(224, 42%, 57%)`;
      this.secondsHand.style.backgroundColor = `rgb(215, 213, 213)`;

      for (let i = 0; i < minutesDiv.length; i++) {
        minutesDiv[i].style.backgroundColor = `rgb(215, 213, 213)`;
      }
    } else {
      this.options.isDayMode = true;

      this.clock.className = 'clock light-mode';
      this.clock.style.border = `7px solid black`;
      this.clock.style.setProperty('--circleColor', 'black');

      this.optionsDiv.className = 'light-mode';
      this.hourHand.style.backgroundColor = 'black';
      this.minutesHand.style.backgroundColor = 'black';
      this.secondsHand.style.backgroundColor = 'red';

      for (let i = 0; i < minutesDiv.length; i++) {
        minutesDiv[i].style.backgroundColor = `black`;
      }
    }
  }
}

function renderClockApp() {
  new ClockApp();
}

const addClock = document.querySelector('#add');
addClock.addEventListener('click', renderClockApp);