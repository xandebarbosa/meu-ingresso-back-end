export * from './generateRadomCode';
export * from './others';

export interface ExitWithDelayParams {
    exitCode?: number;
    timeout?: number;
}
export const exitWithDelay = ({
    exitCode = 1,
    timeout = 10_000,
}: ExitWithDelayParams) => {
    setTimeout(() => {
        process.exit(exitCode);
    }, timeout);
};
