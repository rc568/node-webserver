import { envs } from "./config/envs";
import { Options, Server } from "./presentation/server";

(() => {
    main();
})();


function main() {

    const options: Options = {
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH
    }

    const server = new Server(options)
    server.start()
}