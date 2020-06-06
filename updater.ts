import {walkSync, download, exec } from "./deps.ts";

import { info, success } from "./utils.ts";


const build = async () => {

    Deno.chdir(`builds`)
    info(`Downloading necessary files to proceed...`)

    await download(
        `https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar`, {
            file: "BuildTools.jar",
            dir: "./",
        })
    info(`Starting build stage, please be patient!`)
    await exec(
        `java -jar "BuildTools.jar"`,
    )
    for await (
        const entry of walkSync(
        ".",
        { exts: [".jar"], match: [/spigot-*.*.*.jar/] },
    )
        ) {
        await Deno.rename(entry.path, "server.jar");
    }
    success(`New server executable has been built and ready for execution`);
    Deno.chdir("..");

    success(`Finishing build stage...`);
};

const init = async () => {
    info(`Updating executable`);

    await Deno.chdir("./server");
    await Deno.remove("./server.jar")
    await Deno.copyFileSync("../builds/server.jar", "./server.jar");
    await Deno.remove("../builds/server.jar")

    Deno.chdir("../");
};

export const updater = async () => {
    await build();
    await init();
    Deno.exit(1);
};
