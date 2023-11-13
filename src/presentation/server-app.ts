import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";


interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}


export class ServerApp {
    // static run(options: RunOptions) {
        static run({ base, limit, showTable, fileName, fileDestination }: RunOptions) {
        console.log('Server is running...');
        // console.log({options});
        const table = new CreateTable().execute({ base, limit });// { base, limit } es un objeto de tipo CreateTableOptions. { base, limit } es { base: base, limit: limit }
        
        if (showTable) console.log(table);
        
        const wasCreated = new SaveFile().execute({ fileContent: table, fileName, fileDestination });// el caso de uso SaveFile me permite cambiar el fileDestination por otro diferente a outputs, el cual es el valor por defecto de fileDestination

        (wasCreated) 
            ? console.log('File created!') 
            : console.log('File was not created!');
        
    }
}