import { exec } from "./deps.ts"

let message = {
    "start": "The Launcher is being started!"
}

export const launcher = async () => {
    console.log(message["start"])
    Deno.chdir(Deno.cwd())
    Deno.chdir('server')
    await exec(
        "java -jar server.jar nogui"
    )
}
