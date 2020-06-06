import { info, success, ask, err } from "./utils.ts";
import {green, bold, walkSync, download, Destination, exec, OutputMode } from "./deps.ts";

let serverName: string

const start = async () => {
  const prompt = green(bold(`Please, enter the server name: `));
  const name = await ask(prompt);
  serverName = name
  Deno.mkdirSync(name);
  Deno.chdir(name);
};

const build = async () => {
  Deno.chdir(Deno.cwd());

  try {
    Deno.mkdirSync(`builds`);
    success(`Build directory has been created`);
  } catch (error) {
    err(error.message)
  }

  Deno.chdir(`builds`);
  info(`Downloading necessary build tools...`);

  const destination: Destination = {
    file: "BuildTools.jar",
    dir: "./",
  };

  await download(`https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar`, destination)
  info(`Building stage is gettin started. Please, be patient! It might take a long time...`);
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
    await Deno.rename(entry.path, "server.jar");
  }
  success(`Server executable has been successfully built and ready to be ported!`);
  Deno.chdir("..");

  success(`Finishing building process.`);
};

const init = async () => {
  info(`Initializing the server files with startup files...`);
  try {
    Deno.mkdirSync(`server`);
    success(`The server folder has been initialized`);
  } catch (error) {
    err(error.message);
  }

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

  Deno.chdir("../");

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
  success(bold(`Your server is ready! Enjoy (☞ﾟヮﾟ)☞`))
};

export const builder = async () => {
  await start();
  await build();
  await init();
  Deno.exit(1);
};
