export const debounce = <T>(func: (a: T) => void, delay: number) => {
  let prevCall: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timerId: any;
  return (a: T) => {
    const lastCall = Date.now();

    if (!prevCall) prevCall = Date.now();
    if (timerId || (prevCall && lastCall - prevCall <= delay)) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => func(a), delay,)
  }

}
