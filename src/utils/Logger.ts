import chalk, {ChalkInstance} from 'chalk';

export interface LoggerOptions {
    logLevel?: number,
    timestamps?: boolean,
    colors?: {
        error?: ChalkInstance,
        warn?: ChalkInstance,
        log?: ChalkInstance,
        info?: ChalkInstance,
        debug?: ChalkInstance,
        verbose?: ChalkInstance,
    },
    levels?: {
        error?: number,
        warn?: number,
        log?: number,
        info?: number,
        debug?: number,
        verbose?: number,
    }
}

interface LoggerSettings {
    logLevel: number,
    timestamps: boolean,
    colors: {
        error: ChalkInstance,
        warn: ChalkInstance,
        log: ChalkInstance,
        info: ChalkInstance,
        debug: ChalkInstance,
        verbose: ChalkInstance,
    },
    levels: {
        error: number,
        warn: number,
        log: number,
        info: number,
        debug: number,
        verbose: number,
    }
}

export type LogLevel = "error" | "warn" | "log" | "info" | "debug" | "verbose"

export class Logger {
    public settings: LoggerSettings;

    constructor(options?: LoggerOptions) {
        this.settings = {
            logLevel: options?.logLevel || 3,
            timestamps: options?.timestamps || true,
            colors: {
                error: options?.colors?.error || chalk.redBright,
                warn: options?.colors?.warn || chalk.yellowBright,
                log: options?.colors?.log || chalk.gray,
                info: options?.colors?.info || chalk.whiteBright,
                debug: options?.colors?.debug || chalk.blue,
                verbose: options?.colors?.verbose || chalk.greenBright,
            },
            levels: {
                error: options?.levels?.error || 0,
                warn: options?.levels?.warn || 1,
                log: options?.levels?.log || 2,
                info: options?.levels?.info || 3,
                debug: options?.levels?.debug || 4,
                verbose: options?.levels?.verbose || 5,
            }
        }
    }

    private generatePrefix(level: LogLevel): string {
        return `${this.settings.timestamps ? chalk.gray(`[${new Date(Date.now()).toLocaleTimeString([], {hour12: false})}] `) : ''}${chalk.gray(`[`)}${(this.settings.colors[level]).bold(`${level}`)}${chalk.gray(`]`)}`.padEnd(21, ' ');
    }

    public err(message: any): void {
        if(this.settings.logLevel >= this.settings.levels["error"])
            console.log(this.generatePrefix("error"), message);
    }

    public error(message: any): void {
        if(this.settings.logLevel >= this.settings.levels["error"])
            console.log(this.generatePrefix("error"), message);
    }

    public warn(message: any): void {
        if(this.settings.logLevel >= this.settings.levels["warn"])
            console.log(this.generatePrefix("warn"), message);
    }

    public log(message: any): void {
        if(this.settings.logLevel >= this.settings.levels["log"])
            console.log(this.generatePrefix("log"), message);
    }

    public info(message: any): void {
        if(this.settings.logLevel >= this.settings.levels["info"])
            console.log(this.generatePrefix("info"), message);
    }

    public debug(message: any): void {
        if(this.settings.logLevel >= this.settings.levels["debug"])
            console.log(this.generatePrefix("debug"), message);
    }

    public verbose(message: any): void {
        if(this.settings.logLevel >= this.settings.levels["verbose"])
            console.log(this.generatePrefix("verbose"), message);
    }
}

export const defaultLogger = new Logger({
    logLevel: 3,
});
