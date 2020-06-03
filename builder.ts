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

const start = async () => {
  const prompt = green(bold(`Please, enter the server name: `));
  const name = await ask(prompt);
  mkdirSync(name);
  chdir(name);
};

const build = async () => {
  chdir(cwd());

  try {
    mkdirSync(builds);
    success(messages["directory_created"]);
  } catch (error) {
    error(error.message);
  }

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
    { output: OutputMode.Capture },
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
  try {
    Deno.mkdirSync(server);
    success(messages["directory_created"]);
  } catch (error) {
    error(error.message);
  }
  success(messages["directory_created"]);

  Deno.chdir("./server");
  Deno.copyFileSync("../builds/server.jar", "./server.jar");
  await download(
    "https://raw.githubusercontent.com/genemators/betacraft/master/assets/server/eula.txt",
    {
      file: "eula.txt",
      dir: "./",
    },
  );
  await download(
    "https://raw.githubusercontent.com/genemators/betacraft/master/assets/server/server.properties",
    {
      file: "server.properties",
      dir: "./",
    },
  );
  await download(
      "https://github.com/genemators/betacraft/raw/master/assets/server/server-icon.png",
      {
        file: "server-icon.png",
        dir: "./",
      },
    );

  chdir("../");
};

export const builder = async () => {
  await start();
  await build();
  await init();
  exit(1);
};
