// Імпортуємо бібліотеку notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  let delay = Number(refs.delay.value);
  let step = Number(refs.step.value);
  let amount = Number(refs.amount.value);

  let position = 0;
  let promiseDelay = 0;

  for (let i = 1; i <= amount; i += 1) {
    position += i;
    promiseDelay = delay;
    promiseDelay += step;

    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
     }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
  if (shouldResolve) {
    // Fulfill
    resolve({ position, delay });
  } else {
    // Reject
    reject({ position, delay });
  }
}, delay);
  });
}


// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;

//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
//   return promise;
// }














// const form = document.querySelector('.form');
// form.addEventListener('submit', handleSubmit);

// function handleSubmit(event) {
//   event.preventDefault();
//   // Отримуємо значення з полів форми
//   const delay = Number(event.target.elements.delay.value);
//   const step = Number(event.target.elements.step.value);
//   const amount = Number(event.target.elements.amount.value);

//   // Створюємо проміси з використанням функції createPromise
//   const promises = Array.from({ length: amount }, (_, index) =>
//     createPromise(index + 1, delay + index * step)
//   );

//   // Виконуємо проміси та відображаємо повідомлення про результати їх виконання
//   notiflix.Loading.dots('Please wait...');
//   Promise.all(promises)
//     .then(results => {
//       notiflix.Loading.remove();
//       results.forEach(({ position, delay, fulfilled }) => {
//         const message = fulfilled
//           ? `✅ Fulfilled promise ${position} in ${delay}ms`
//           : `❌ Rejected promise ${position} in ${delay}ms`;
//         notiflix.Notify[fulfilled
