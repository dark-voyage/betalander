#!/usr/bin/env deno

import { red, bold, green } from "./deps.ts";
import { builder } from "./builder.ts";

const mode = Deno.args[0];

if (!mode) {
  console.log(
    red("Missing directory name. Please provide a name for the directory"),
  );
  console.log(green("Example: betacraft help"));
  Deno.exit(1);
}
if (mode == "build") {
  await builder();
}
else if (mode == "help") {
  console.log(bold(`Available commands to use: \n`))
  console.log(`help - show this message \n`)
  console.log(`build - create new server \n`)
}
// else if (mode == "launch") {

// }
// else if (mode == "update") {

// }
else {
  console.log(red("Invalid command. Please, try 'betacraft help'"))
}
