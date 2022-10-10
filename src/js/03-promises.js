import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function onSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const dataForm = new FormData(form);
  const resultData = {};
  for (const [key, value] of dataForm.entries()) {
    resultData[key] = Number(value);
  }
  form.reset();
  for (let position = 1; position <= resultData.amount; position += 1) {
    createPromise(position, resultData.delay).then(onSuccess).catch(onError);
    resultData.delay = resultData.delay + resultData.step;
  }
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

formRef.addEventListener('submit', onSubmit);