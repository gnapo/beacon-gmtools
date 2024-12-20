

export async function callWithVaryingFrequency(cb: () => void, duration: number = 2000): Promise<void> {
  let interval = 30;
  const maxInterval = 300;
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    cb();

    await new Promise(resolve => setTimeout(resolve, interval));
    interval = Math.min(interval * 1.1, maxInterval);
  }
}
