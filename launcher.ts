import { exec } from "./deps.ts"

export const launcher = async () => {
    console.log(`The Launcher is being started!`)
    Deno.chdir(Deno.cwd())
    Deno.chdir('server')
    await exec(
        "java -jar server.jar nogui"
    )
}
