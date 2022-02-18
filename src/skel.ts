import { Path } from "https://raw.githubusercontent.com/sigmaSd/Path/master/path.ts";
import { createP5 } from "./p5.ts";

const args = Deno.args;
switch (args[0]) {
  case "new":
    await newProject({ projectPath: args[1].asPath(), skel: args[2] });
}

async function newProject(
  { projectPath, skel }: { projectPath: Path; skel: string },
) {
  const skelsPath = new Path(Deno.env.get("SKELS") || "../skels");
  switch (skel) {
    case "p5-ts": {
      await createP5(skelsPath, projectPath, false);
      console.log(`successfully created ${projectPath.toString()}`);
      console.log(`To start:
                  - cd in ${projectPath.toString()}
                  - run 'tsc -p tsconfig.json'
                  - run 'npx browser-sync start --server -f -w'
                  - vim sketch.ts
                  `);

      break;
    }
  }
}
