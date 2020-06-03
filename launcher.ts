import { exec } from "./deps.ts"

let message = {
    "start": "The Launcher is being started!"
}

export const launcher = async () => {
    console.log(message["start"])
    await exec(
        "server/java -jar server.jar"
    )
}
