import { Path } from "./deps.ts";
import { copy_dir, download } from "./utils.ts";

export async function getLatestP5jsUrl(): Promise<string | undefined> {
  const url = await fetch("https://github.com/processing/p5.js/releases/").then(
    (r) => r.text(),
  );
  const re = new RegExp(
    "processing/p5.js/releases/download/v\\d+.\\d+.\\d+/p5.min.js",
  );

  return re.exec(url)?.map((e) => "https://github.com/" + e)[0];
}

export async function createP5(
  skelsPath: Path,
  dstPath: Path,
) {
  const p5SkelPath = skelsPath.join("p5-ts");
  const url = await getLatestP5jsUrl();
  await copy_dir(p5SkelPath, dstPath);
  await download(url!, dstPath.join("p5.js").toString());
  await Deno.run({
    cmd: ["npm", "install", "-D", "@types/p5"],
    cwd: dstPath.toString(),
  }).status();
}
