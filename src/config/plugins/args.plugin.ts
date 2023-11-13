import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
    .option('b', { // Argumento b es obligatorio porque demandOption es true. Si no se envía por parte del usuario, yargs arroja un error
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Base de la tabla de multiplicar'
     })
    .option('l', { // Argumento l es opcional porque demandOption es false. Si no se envía por parte del usuario, yargs asigna el valor por defecto que es 10
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'Límite de la tabla de multiplicar'
     })
    .option('s', {  // Argumento s es opcional porque demandOption es false. Si no se envía por parte del usuario, yargs asigna el valor por defecto que es false
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'Muestra la tabla de multiplicar en consola'
     })
    .option('n', { 
        alias: 'name',
        type: 'string',
        default: 'multiplication-table',
        describe: 'Nombre del archivo'
    })
    .option('d', { 
        alias: 'destination',
        type: 'string',
        default: './outputs',
        describe: 'Destino del archivo'
     })
    .check((argv, options) => { 
        //console.log({argv, options});// options muestra los valores por defecto de los argumentos, mientras que argv muestra los valores enviados por consola
        if (isNaN(argv.b)) throw  'Error: La base tiene que ser un número';
        if (isNaN(argv.l)) throw  'Error: El límite tiene que ser un número';
        if (typeof argv.s !== 'boolean') throw  'Error: El show tiene que ser un booleano';
        // if (argv.l < 1 || argv.l > 10) throw new Error('El límite tiene que estar entre 1 y 10');
        if (argv.b < 1) throw 'Error: La base tiene que ser mayor a 0';
        if (argv.l < 1) throw 'Error: El limite tiene que ser mayor a 0';

        if (typeof argv.d !== 'string') throw 'Error: El destino tiene que ser una cadena de texto';
        if (typeof argv.n !== 'string') throw 'Error: El nombre del archivo tiene que ser una cadena de texto';
        
        return true;// Este true es necesario para que yargs no arroje un error por defecto tras pasar todas las validaciones

        
     } ) // Callback que se ejecuta para validar los argumentos enviados por consola
    .parseSync();

// process.argv es un arreglo que contiene los argumentos enviados por consola a la app app.ts
// Ejemplo de ejecucion: npx ts-node src/app.ts --base 5 -s

