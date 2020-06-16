#!/usr/bin/env bash
cd "$(dirname "$0")"
exec deno run --allow-all --unstable https://raw.githubusercontent.com/genemators/betalander/master/mod.ts update
