export default class Log {

    public static trace(msg: string): void {
        const timeNow: string = Log.currentTime();
        console.trace(`<T> ${timeNow}: ${msg}`)
    }

    public static info(msg: string): void {
        const timeNow: string = Log.currentTime();
        console.info(`<I> ${timeNow}: ${msg}`);
    }

    public static warn(msg: string): void {
        const timeNow: string = Log.currentTime();
        console.warn(`<W> ${timeNow}: ${msg}`);
    }

    public static error(msg: string): void {
        const timeNow: string = Log.currentTime();
        console.error(`<E> ${timeNow}: ${msg}`);
    }

    private static currentTime(): string {
        return new Date().toLocaleString();
    }
}