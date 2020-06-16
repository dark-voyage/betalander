import { exec } from "./deps.ts"
import { success } from "./utils.ts";

export const launcher = async () => {
    success(`The server is being started!`)
    Deno.chdir(Deno.cwd())
    Deno.chdir('server')
    await exec(
        "java -jar server.jar nogui"
    )
}
