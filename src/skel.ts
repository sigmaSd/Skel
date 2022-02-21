import { Path } from "https://raw.githubusercontent.com/sigmaSd/Path/master/path.ts";
import { createP5 } from "./p5.ts";
import { createWeb } from "./web.ts";

async function newProject(
  { projectPath, skel }: { projectPath: Path; skel: string },
) {
  const skelsPath = new Path(Deno.env.get("SKELS") || "skels");
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
    case "web-ts": {
      await createWeb(skelsPath, projectPath);
      console.log(`successfully created ${projectPath.toString()}`);
      console.log(`To start:
                  - cd in ${projectPath.toString()}
                  - run 'tsc -w index.ts'
                  - run 'npx browser-sync start --server -f -w'
                  - vim index.ts
                  `);
      break;
    }
    default: {
      console.log("Unknown project name");
    }
  }
}

const args = Deno.args;
if (args.length !== 2) {
  console.log("skels projectName [p5-ts|web-ts]");
  Deno.exit(1);
}
await newProject({ projectPath: args[0].asPath(), skel: args[1] });
