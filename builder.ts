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

export let serverName:string

const start = async () => {
  const prompt = green(bold(`Please, enter the server name: `));
  const name = await ask(prompt);
  serverName = name
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

  await Deno.chdir("./server");
  await Deno.copyFileSync("../builds/server.jar", "./server.jar");
  await Deno.remove("../builds/server.jar")
  await download(
    "https://raw.githubusercontent.com/genemators/betalander/master/assets/server/eula.txt",
    {
      file: "eula.txt",
      dir: "./",
    },
  );
  await download(
    "https://raw.githubusercontent.com/genemators/betalander/master/assets/server/server.properties",
    {
      file: "server.properties",
      dir: "./",
    },
  );
  await download(
      "https://github.com/genemators/betalander/raw/master/assets/server/server-icon.png",
      {
        file: "server-icon.png",
        dir: "./",
      },
    );

  const motd: string = `motd=\\u00A7\\u1360\\u00A72 Welcome to\\u00A7c ${serverName} \\u00A72Server\\u00A79       t.me/bsba_group\\u00A7r\\n\\u00A7a\\u1360\\u00A7e Start playing in our Server\\!\\!\\!\n`
  const encoder = new TextEncoder()
  const data = encoder.encode(motd)
  await Deno.writeFile("server.properties", data, {append: true})

  chdir("../");

  if (Deno.build.os === "windows") {
    await download(
        "https://raw.githubusercontent.com/genemators/betalander/master/actions/windows/start.cmd",
        {
          file: "start.cmd",
          dir: "./",
        }
    )
    await download(
        "https://raw.githubusercontent.com/genemators/betalander/master/actions/windows/update.cmd",
        {
          file: "update.cmd",
          dir: "./",
        }
    )
  } else {
    await download(
        "https://raw.githubusercontent.com/genemators/betalander/master/actions/unix/start.sh",
        {
          file: "start.sh",
          dir: "./",
        }
    )
    await download(
        "https://raw.githubusercontent.com/genemators/betalander/master/actions/unix/update.sh",
        {
          file: "update.sh",
          dir: "./",
        }
    )
  }
};

export const builder = async () => {
  await start();
  await build();
  await init();
  exit(1);
};
