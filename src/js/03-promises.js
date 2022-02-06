import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
let position = 0;

formRef.addEventListener('submit', onClickBtnCreatePromise);

function onClickBtnCreatePromise(e) {
  e.preventDefault();
  
  let delay = Number(e.currentTarget.delay.value);
  let step = Number(e.currentTarget.step.value);
  let amount = Number(e.currentTarget.amount.value);
  
  if (delay < 0 || step < 0 || amount <= 0) { 
    return Notiflix.Notify.warning('Enter a positive value!');
  }

  for (position = 1; position <= amount; position += 1) { 
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay)
  });
  return promise;
};