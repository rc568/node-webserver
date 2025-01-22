import express from "express";
import path from "node:path";

export interface Options {
    port: number
    publicPath?: string
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, publicPath = 'public' } = options;
        this.port = port
        this.publicPath = publicPath
    }

    async start() {
        // * Middlewares

        // * Public Folder - Servir archivos estáticos
        this.app.use(express.static(this.publicPath))

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
            res.sendFile(indexPath)
            return
        })


        this.app.listen(this.port, () => {
            console.log(`server running on port ${this.port}`);
        })
    }

}
