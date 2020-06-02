#!/usr/bin/env deno

import { red, bold, green } from "./deps.ts";
import { builder } from "./builder.ts";

const mode = Deno.args[1];

if (!mode) {
  console.log(
    red("Missing directory name. Please provide a name for the directory")
  );
  console.log(mode)
  console.log(green("Example: betacraft super_cool_project"));
  Deno.exit(1);
}  
if (mode == "build") {
    await builder()
}
