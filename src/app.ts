import { yarg as argv } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";

// console.log(process.argv);

// const [executer, file , ...args] = process.argv;

// console.log(args);

// yarg literalmente ya contiene los argumentos enviados por consola a ala app app.ts

// console.log(argv); // imprimiendo los argumentos enviados por consola a la app app.ts. Estos argumentos ya están parseados por el paquete yargs
// console.log(argv.b);



(async() => {// Funcion anonima autoejecutable asincrona
  await main();
})();

async function main() {
  // console.log(argv);
  const { b:base, l:limit, s:showTable, n:fileName, d:fileDestination } = argv;
  ServerApp.run({ base, limit, showTable, fileName, fileDestination});
}
