export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout | null;
  return function(...args: any[]) {
    // @ts-ignore
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
};