import { Path } from "../deps.ts";

export async function createDps(projectPath: Path) {
  const helloWorld =
    `import { Denops } from "https://deno.land/x/denops_std/mod.ts";

// deno-lint-ignore require-await
export async function main(denops: Denops): Promise<void> {
  console.log("Hello World!");
  denops.dispatcher = {
    async echo(text: unknown): Promise<unknown> {
      return await Promise.resolve(text);
    },
  };
};

`;

  const dstPath = projectPath
    .join("denops")
    .join(projectPath.fileName()!);

  await Deno.mkdir(dstPath.toString(), { recursive: true });
  await Deno.writeTextFile(dstPath.join("main.ts").toString(), helloWorld);
}
