
// const message: string = 'Hola mundo!';

//console.log(message);

import fs from 'fs'; // const fs = require('fs');
import { yarg } from './config/plugins/args.plugin';


const borderGenerator = (limit: number): string => {
  let border:string = '';
  for (let i: number = 0; i < limit; i++) {
    border += '=';
  }
  
  return border;
}

const buildHeader = (limit: number, table: number): string => {

  const border:string = borderGenerator(limit);

  // console.log(border);

  let header:string = border + '\n'
  const title: string = `     Tabla del ${table}\n`; 
  // console.log(title);
  header += title;

  // console.log(border);

  // console.log();

  header += border + '\n\n';

  return header;
}

const multiplicationTableGenerator = (table: number, limit: number):string => {
  let multiplicationTable = ''
  for (let i:number = 1; i <= limit; i++) {
    // console.log(`${table} X ${i} = ${table*i}`);
    multiplicationTable += `${table} X ${i} = ${table*i}\n`;    
  }
  return multiplicationTable;
}

const saveMultiplicationTableInFile = (content: string, table:number) => {

  // __dirname representa el directorio actual del archivo que contiene este código.
  const outputDirectory = 'outputs';
  const filePath = `${outputDirectory}/tabla-${table}.txt`;
  fs.mkdirSync(outputDirectory, {recursive: true});// crear directorio outputs en caso de que no exista
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Archivo creado!');
  } catch (error) {
    console.error('Error al escribir el archivo:', error);
  }
}



// const limit: number = 40;
// const base:number = 5;

const { l:limit, b:base, s:showTable } = yarg;// l, b y s son propiedades de yarg que se obtienen por destructuring. limit, base y showTable son alias de l, b y s respectivamente

// yarg es un objeto que tiene los argumentos u opciones (propiedades a nivel codigo) con sus valores correspondientes enviados por consola al proceso que ejecuta este archivo app.logic.ts. Ejemplo de ejecucion: npx ts-node src/app.logic.ts --base 5 -s. El anterior comando, por defecto, establece el valor de limit en 10 porque no se envió por consola. Si se quiere establecer un valor diferente al por defecto, se debe enviar por consola. Ejemplo: npx ts-node src/app.logic.ts --base 5 -s -l 20

const headerLimit:number = 40;
let output:string = buildHeader(headerLimit, base);

const multiplicationTableContent:string = multiplicationTableGenerator(base, limit);
// console.log(multiplicationTableContent);

output += multiplicationTableContent;

if (showTable) {
  console.log(output);
}

saveMultiplicationTableInFile(output, base);



