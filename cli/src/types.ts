declare module 'chalk' {
    type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray';
    
    interface Chalk {
        (text: string): string;
        black: Chalk;
        red: Chalk;
        green: Chalk;
        yellow: Chalk;
        blue: Chalk;
        magenta: Chalk;
        cyan: Chalk;
        white: Chalk;
        gray: Chalk;
        grey: Chalk;
    }

    const chalk: Chalk;
    export default chalk;
}