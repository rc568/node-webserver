import { envs } from "./config/envs";
import { Options, Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";

(() => {
    main();
})();


function main() {
    
    const options: Options = {
        port: envs.PORT,
        router: AppRoutes.routes,
        publicPath: envs.PUBLIC_PATH
    }

    const server = new Server(options)
    server.start()
}