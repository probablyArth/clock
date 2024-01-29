const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");

function toggleButtons() {
  startButton.toggleAttribute("disabled");
  pauseButton.toggleAttribute("disabled");
}

class Hand {
  element;
  tickPeriodInSec;
  tickDeg;
  counter;
  currDeg = 0;

  constructor(elementId, tickPeriodInSec, tickDeg) {
    this.element = document.getElementById(elementId);
    this.tickPeriodInSec = tickPeriodInSec;
    this.tickDeg = tickDeg;
  }

  stop() {
    clearInterval(this.counter);
  }

  start() {
    this.counter = setInterval(() => {
      this.currDeg += this.tickDeg;
      if (this.currDeg >= 360) this.currDeg %= 360;
      this.element.style.transform = `rotate(${this.currDeg - 90}deg)`;
    }, this.tickPeriodInSec * 1000);
  }
}

const secondsHand = new Hand("seconds-hand", 1, 6);
const minutesHand = new Hand("minutes-hand", 60, 6);
const hoursHand = new Hand("hours-hand", 3600, 6);

const hands = [secondsHand, minutesHand, hoursHand];

function stopClock() {
  hands.forEach((hand) => {
    hand.stop();
  });
  toggleButtons();
}

function startClock() {
  hands.forEach((hand) => {
    hand.start();
  });
  toggleButtons();
}
