import { parse } from "node-html-parser";
import { readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";

export class Compiler {
    cwd:string;

    constructor(cwd:string) {
        this.cwd = path.resolve(process.cwd(), cwd);
    }

    async compile_file(input_file:string, output_file:string) {
        const root = await this.load_file(input_file);

        var statics = root.getElementsByTagName("static-import");
        for (let i = 0; i < statics.length; i++) {
            const static_import = statics[i];
            if(static_import !== undefined) {
                const import_path = path.resolve(this.cwd, static_import.innerText);
                static_import.replaceWith(await this.load_file(import_path));
            }
        }

        await writeFile(output_file, root.outerHTML);
    }

    async load_file(file:string) {
        return parse(await readFile(file, "utf-8"));
    }
}