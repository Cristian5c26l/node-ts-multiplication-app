export interface CreateTableUseCase { 
    execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
    base: number;
    limit?: number; // limit es opcional
}

export class CreateTable implements CreateTableUseCase{
    constructor(
        /**
         * DI -- Dependency Injection
         */
    ) {}

    execute({ base, limit = 10 }: CreateTableOptions) {
        let multiplicationTable = '';
        for (let i:number = 1; i <= limit; i++) {
            // console.log(`${table} X ${i} = ${table*i}`);
            multiplicationTable += `${base} X ${i} = ${base*i}\n`;    
        }
        return multiplicationTable;
    }
}