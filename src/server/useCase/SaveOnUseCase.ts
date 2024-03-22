import { ILinkedInJobs } from "../interfaces/";
import fs from 'fs';

interface ISaveOn {
    data: ILinkedInJobs[],
    path?: string,
}


export default class SaveOnUseCase {
    private defaultPath: string

    constructor(defaultPath: string = 'temp/data.json') {
        this.defaultPath = defaultPath
    }

    async execute({ data, path }: ISaveOn): Promise<void> {
        const filePath = path || this.defaultPath
        try {
            const json = JSON.stringify(data, null, 2);
            fs.writeFileSync(filePath, json, { encoding: 'utf8' });
            this._console(`Total Data saved ${data.length} on ${filePath}`);
        } catch (error: any) {
            throw new Error(`Error on Save: ${error.message}`)
        }
    };

    private _console(message: any) {
        if (process.env.DEBUG === 'true') {
            console.log(message);
        }
    }
}