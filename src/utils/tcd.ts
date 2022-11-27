const tryCatchDecorator =
  (fn: Function, onRejected: (err: unknown) => any) =>
  (...args: any[]) => {
    try {
      return fn(...args);
    } catch (err) {
      return onRejected(err);
    }
  };

const defaultTryCatchDecorator = (fn: Function) =>
  tryCatchDecorator(fn, (err) => {
    console.error(err);
  });

export const tcd = defaultTryCatchDecorator;
