import { exec } from "./deps.ts"
import { success } from "./utils.ts";

export const launcher = async () => {
    success(`The server is being started!`)
    Deno.chdir(Deno.cwd())
    Deno.chdir('server')
    notify({
        title: 'Betalander',
        message: 'Your server is getting started. Get ready!',
        icon: {
            app: "Terminal",
        }
    })
    await exec(
        "java -jar server.jar nogui"
    )
}
