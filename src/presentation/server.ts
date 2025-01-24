import express, { Router } from "express";
import path from "node:path";

export interface Options {
    port: number
    router: Router,
    publicPath?: string
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly router: Router;

    constructor(options: Options) {
        const { port, router, publicPath = 'public' } = options;
        this.port = port
        this.publicPath = publicPath
        this.router = router
    }

    async start() {

        // * Middlewares
        this.app.use(express.json()) // raw
        this.app.use(express.urlencoded({extended: true})) // x-www-form-urlencoded

        // * Public Folder - Servir archivos estáticos
        this.app.use(express.static(this.publicPath))

        // * Routes
        this.app.use(this.router)

        // * SPA
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
