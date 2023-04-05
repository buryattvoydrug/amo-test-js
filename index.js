

const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const createTimerAnimator = () => {
  return (seconds) => {
    timerEl.textContent = getTextContent(seconds);

    const start = performance.now();
    const end = start + seconds * 1000;
    if (end === start) return

    const interval = setInterval(() => {
      seconds--;
      timerEl.textContent = getTextContent(seconds);

      if (seconds == 0) {
        clearInterval(interval);
        buttonEl.disabled = false;
      }
    }, 1000)
  };
};

const getTextContent = (seconds) => {
  
  const sec = Math.floor(seconds % 60).toString().padStart(2,'0');
  const min = Math.floor((seconds / 60) % 60).toString().padStart(2,'0');
  const hours = Math.floor(seconds / 3600).toString().padStart(2,'0');

  return `${hours}:${min}:${sec}`;
}

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  let value = inputEl.value
  let filteredValue = value.replace(/[^0-9]/g, '')
  inputEl.value = filteredValue
})

buttonEl.addEventListener('click', (e) => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);
  buttonEl.disabled = true;

  inputEl.value = '';
});
