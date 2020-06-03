import { exec } from "./deps.ts"

let launcher_arguments: Array<string> = [
    'java',
    '-jar',
    'server.jar',
]
let message = {
    "start": "The Launcher is being started!"
}

export const launcher = async () => {
    console.log(message["start"])
    Deno.chdir(Deno.cwd())
    Deno.chdir('server')
    await exec(
        launcher_arguments.toString().replace(",", " ")
    )
}
