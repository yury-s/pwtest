import { AsyncLocalStorage } from 'async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

function logWithId(message) {
  const id = asyncLocalStorage.getStore();
  console.log(`[${id}] ${message}`);
}

async function createPromises() {
  asyncLocalStorage.run('1', () => {
    logWithId('direct 1');
    setTimeout(() => {
      Promise.resolve().then(() => {
        logWithId('timeout 1');
      });
    }, 100);
  });

  asyncLocalStorage.run('2', () => {
    logWithId('2');
    Promise.resolve().then(() => {
      logWithId('direct 2');
    });

    setTimeout(() => {
      Promise.resolve().then(() => {
        logWithId('timeout 2');
      });
    }, 30);
  });

  logWithId('inside createPromises');

  return await asyncLocalStorage.run('3', async () => {
    logWithId('3');
    Promise.resolve().then(() => {
      logWithId('direct 3');
    });

    return new Promise(resolve => {
      setTimeout(() => {
        logWithId('timeout 3');
        resolve('3 done');
      }, 800);
    })
  });
}

const r = await asyncLocalStorage.run('0', createPromises);
console.log(r);