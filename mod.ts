#!/usr/bin/env deno

import { red, bold, green } from "./deps.ts";
import { builder } from "./builder.ts";
import { launcher } from "./launcher.ts";
import { updater } from "./updater.ts";
import { helper } from "./help.ts";

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
  await updater()
} else if (mode == "help") {
  await helper()
} else {
  console.log(red("Invalid command. Please, try 'betacraft help'"));
}
