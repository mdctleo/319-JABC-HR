export namespace Log{
    export type Level = 'VERBOSE' | 'INFO' | 'WARN' | 'ERROR' | 'SILENT'
}

export default class Log {

    static level: Log.Level = 'INFO';
    private static Reset = "\x1b[0m"
    private static Bright = "\x1b[1m"
    private static Dim = "\x1b[2m"
    private static Underscore = "\x1b[4m"
    private static Blink = "\x1b[5m"
    private static Reverse = "\x1b[7m"
    private static Hidden = "\x1b[8m"

    private static FgBlack = "\x1b[30m"
    private static FgRed = "\x1b[31m"
    private static FgGreen = "\x1b[32m"
    private static FgYellow = "\x1b[33m"
    private static FgBlue = "\x1b[34m"
    private static FgMagenta = "\x1b[35m"
    private static FgCyan = "\x1b[36m"
    private static FgWhite = "\x1b[37m"

    private static BgBlack = "\x1b[40m"
    private static BgRed = "\x1b[41m"
    private static BgGreen = "\x1b[42m"
    private static BgYellow = "\x1b[43m"
    private static BgBlue = "\x1b[44m"
    private static BgMagenta = "\x1b[45m"
    private static BgCyan = "\x1b[46m"
    private static BgWhite = "\x1b[47m"

    public static trace(msg: string, level?: Log.Level): void {
        level = (level) ? level : Log.level;
        if(level != 'VERBOSE') return;
        const timeNow: string = Log.currentTime();
        console.trace(`<T> ${timeNow}: ${msg}`)
    }

    public static info(msg: string, level?: Log.Level): void {
        level = (level) ? level : Log.level;
        if(level == 'SILENT') return;
        if(level != 'VERBOSE')
            if(level != 'INFO') return;
        const timeNow: string = Log.currentTime();
        console.log(`${Log.FgBlue}${Log.Dim}<I> %s: ${Log.Reset}${Log.FgBlue}${Log.Bright}%s${Log.Reset}`, timeNow, msg);
    }

    public static warn(msg: string, level?: Log.Level): void {
        level = (level) ? level : Log.level;
        if(level == 'SILENT') return;
        if(level != 'VERBOSE')
            if(level != 'WARN')
                if(level != 'INFO') return;
        const timeNow: string = Log.currentTime();
        console.log(`${Log.FgYellow}${Log.Dim}<W> %s: ${Log.Reset}${Log.FgYellow}${Log.Bright}%s${Log.Reset}`, timeNow, msg);
    }

    public static error(msg: string, level?: Log.Level): void {
        level = (level) ? level : Log.level;
        if(level == 'SILENT') return;
        const timeNow: string = Log.currentTime();
        console.log(`${Log.FgRed}${Log.Dim}<E> %s: ${Log.Reset}${Log.FgRed}${Log.Bright}%s${Log.Reset}`, timeNow, msg);
    }

    private static currentTime(): string {
        return new Date().toLocaleString();
    }
}