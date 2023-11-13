import fs from 'fs'; // Por el momento, fs es necesario para grabar el archivo en el disco duro de la computadora (esto no deberia de estar aqui, sino en un repositorio como StorageRepository)

// "Definicion del caso de uso de guardar archivo"
export interface SaveFileUseCase { 
    execute: (options: Options) => boolean;
}

// Options son las opciones del caso de uso de guardar archivo (SaveFileUseCase)
export interface Options {
    fileContent : string;
    fileDestination?: string;
    fileName?   : string;
}

export class SaveFile implements SaveFileUseCase{ 
    constructor(
        /**
         * DI -- Dependency Injection like:
         * repository: StorageRepository
         */
    ) {}

    // Una inyeccion de dependencia posible puede ser el repositorio en el cual voy a grabar la informacion (StorageRepository). En StorageRepository se puede definir el metodo save que recibe el contenido del archivo, la ruta de destino y el nombre del archivo, y la informacion se guardará ya sea en un servicio en la nube como AWS S3 o en el disco duro de la computadora

    execute({
        fileContent,
        fileDestination = 'outputs',
        fileName = 'table'
    }: Options): boolean {
        // Aqui se mandaría a llamar el repositorio


        // Como fs está aqui, viola el principio de arquitectura limpia, y es que, la grabacion del archivo se deberia de hacer en el repositorio (StorageRepository) y no aqui en el caso de uso (SaveFileUseCase). Por lo tanto, se debe de inyectar el repositorio (StorageRepository) en el caso de uso (SaveFileUseCase) y llamar al metodo save del repositorio (StorageRepository) para grabar el archivo
        const filePath = `${fileDestination}/${fileName}.txt`;
        try {
            fs.mkdirSync(fileDestination, {recursive: true});// crear directorio outputs en caso de que no exista
            fs.writeFileSync(filePath, fileContent, 'utf8');
            // console.log('Archivo creado!');
            return true;
        } catch (error) {
            console.error('Error al escribir el archivo:', error);
            // Aqui podriamos usar winston para guardar el error en un archivo de logs
            return false;
        }
    }
}