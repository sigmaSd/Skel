import { Path } from "./deps.ts";
import { createDenoWeb } from "./skels/deno_web.ts";
import { createFox } from "./skels/fox.ts";
import { createP5 } from "./skels/p5.ts";
import { createPuppet } from "./skels/puppet.ts";
import { createWeb } from "./skels/web.ts";

async function newProject(
  { projectPath, skel }: { projectPath: Path; skel: string },
) {
  const skelsPath = new Path(
    import.meta.url.replace("file://", ""),
  ).parent()!.parent()!.join("skels");
  switch (skel) {
    case "--p5": {
      await createP5(skelsPath, projectPath);
      console.log(`successfully created ${projectPath.toString()}`);
      console.log(`To start:
                  - cd ${projectPath.toString()}
                  - npx i
                  - npx start
                  - vim sketch.ts
                  `);

      break;
    }
    case "--web": {
      await createWeb(skelsPath, projectPath);
      console.log(`successfully created ${projectPath.toString()}`);
      console.log(`To start:
                  - cd ${projectPath.toString()}
                  - tsc -p tsconfig.json
                  - npx browser-sync start --server -f -w
                  - vim index.ts
                  `);
      break;
    }
    case "--puppet": {
      await createPuppet(skelsPath, projectPath);
      console.log(`successfully created ${projectPath.toString()}`);
      console.log(`To start:
                  - cd ${projectPath.toString()}
                  - deno run -A --no-check src/main.ts
                  - vim src/main.ts
                  `);
      break;
    }
    case "--fox": {
      await createFox(skelsPath, projectPath);
      console.log(`successfully created ${projectPath.toString()}`);
      console.log(`To start:
                  - cd ${projectPath.toString()}
                  - tsconfig -p tsconfig.json
                  - web-ext run
                  `);
      break;
    }
    case "--deno-web": {
      await createDenoWeb(skelsPath, projectPath);
      console.log(`successfully created ${projectPath.toString()}`);
      console.log(`To start:
                  - cd ${projectPath.toString()}
                  - deno task start
                  - firefox http://localhost:8000
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
  console.log("skels projectName --[p5|web|puppet|fox]");
  Deno.exit(1);
}
await newProject({ projectPath: args[0].asPath(), skel: args[1] });
