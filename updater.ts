import {
    green,
    bold,
    walkSync,
    download,
    Destination,
    exec,
    OutputMode,
} from "./deps.ts";

import {
    server,
    builds,
    url,
    messages,
    info,
    success,
    ask,
} from "./utils.ts";

const {
    cwd,
    chdir,
    exit,
    mkdirSync,
    rename,
} = Deno;

const build = async () => {

    chdir(builds);
    info(messages["downloading"]);

    const destination: Destination = {
        file: "BuildTools.jar",
        dir: "./",
    };

    await download(url, destination)
    info(messages["building"]);
    await exec(
        `java -jar "BuildTools.jar"`,
    );
    for await (
        const entry of walkSync(
        ".",
        { exts: [".jar"], match: [/spigot-*.*.*.jar/] },
    )
        ) {
        await rename(entry.path, "server.jar");
    }
    success(messages["renamed"]);
    chdir("..");

    success(messages["finishing"]);
};

const init = async () => {
    info(messages["init"]);

    await Deno.chdir("./server");
    await Deno.copyFileSync("../builds/server.jar", "./server.jar");
    await Deno.remove("../builds/server.jar")

    chdir("../");
};

export const updater = async () => {
    await build();
    await init();
    exit(1);
};
