const tryCatchDecorator = (fn, onRejected) => (...args) => {
    try {
        return fn(...args);
    }
    catch (err) {
        return onRejected(err);
    }
};
const defaultTryCatchDecorator = (fn) => tryCatchDecorator(fn, (err) => {
    console.error(err);
});
export const tcd = defaultTryCatchDecorator;
