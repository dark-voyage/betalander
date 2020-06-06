import { red, green, bold } from "./deps.ts";

export async function ask(
  question: string = "",
  stdin = Deno.stdin,
  stdout = Deno.stdout,
) {
  const buf = new Uint8Array(1024);

  // Write question to console
  await stdout.write(new TextEncoder().encode(question));

  // Read console's input into answer
  const n = <number> await stdin.read(buf);
  const answer = new TextDecoder().decode(buf.subarray(0, n));

  return answer.trim();
}

export let err = (text: string) => {
  console.log(red(bold(text)));
};

export let info = (text: string) => {
  console.log(bold(text));
};

export let success = (text: string) => {
  console.log(green(bold(text)));
};
