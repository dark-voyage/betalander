#!/usr/bin/env deno

import { red, bold, green } from "./deps.ts";
import { builder } from "./builder.ts";
import { launcher } from "./launcher.ts";

const mode = Deno.args[0];

if (!mode) {
  console.log(
    red("Missing directory name. Please provide a name for the directory"),
  );
  console.log(green("Example: betacraft help"));
  Deno.exit(1);
} else if (mode == "build") {
  await builder();
} else if (mode == "launch") {
  await launcher()
} else if (mode == "update") {
  console.log("**Coming soon**");
} else if (mode == "help") {
  console.log(bold(green(`Available commands to use:`)));
  console.log()
  console.log(`help - show this message`);
  console.log(`build - create new server`);
  console.log(`launch - launch the server`);
  console.log(`update - coming soon`)
} else {
  console.log(red("Invalid command. Please, try 'betacraft help'"));
}
