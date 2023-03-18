


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
  //Отримуємо посилання на кнопки та body//
  const body = document.querySelector('body');
  const startBtn = document.querySelector('[data-start]');
  const stopBtn = document.querySelector('[data-stop]');
 
  //ідентифікатор зміни кольору//
  let intervalId;
  //При Start-запускаємо зміну кольорів 1сек//
  startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    intervalId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  });
  //при натисканні на Stop зупиняємо зміну кольорів//
  stopBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });
  


