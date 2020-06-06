#!/usr/bin/env deno

import { helper } from "./help.ts";
import { err, success } from "./utils.ts";
import { builder } from "./builder.ts";
import { updater } from "./updater.ts";
import { launcher } from "./launcher.ts";

const mode = Deno.args[0];

if (!mode) {
  err("Missing directory name. Please provide a name for the directory"),
  success("Example: betacraft help")
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
  err("Invalid command. Please, try 'betacraft help'")
  Deno.exit(0)
}
