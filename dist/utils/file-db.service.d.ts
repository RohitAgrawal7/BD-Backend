export declare class FileDbService {
    private filePath;
    constructor();
    private ensureFile;
    read(): Promise<any>;
    write(data: any): Promise<void>;
}
