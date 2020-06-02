import { red, green, bold } from "./deps.ts"

export async function ask(question: string = '', stdin = Deno.stdin, stdout = Deno.stdout) {
  const buf = new Uint8Array(1024);

  // Write question to console
  await stdout.write(new TextEncoder().encode(question));

  // Read console's input into answer
  const n = <number>await stdin.read(buf);
  const answer = new TextDecoder().decode(buf.subarray(0, n));

  return answer.trim();
}

export const server: string = 'server'
export const builds: string = 'builds'
export const url: string = `https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar`

export const messages = {
    "downloading": `Starting to download build tools!`,
    "starting": `Starting to check everything before building.`,
    "building": `Building stage is being started. Please, be patient!`,
    "finishing": `Finishing building process.`,
    "error": `Some error occurred!`,
    "directory_created": `The directory ${builds} is created`,
    "directory_exists": `The directory ${builds} already exists, re-creating it!`,
    "renamed": `Server file has been successfully renamed and ready to be copied out!`,
    "cleanup": `Cleaning up all used files and trashes!`,
    "init": `Initializing the server with startup files...`,
    "end": `This is the end of the program, thanks for your patience!`,
}

export let error = (text: string) => {
    console.log(red(bold(text)))
} 

export let info = (text: string) => {
    console.log(bold(text))
}


export let success = (text: string) => {
    console.log(green(bold(text)))
}