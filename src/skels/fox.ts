import { Path } from "../deps.ts";
import { copy_dir } from "../utils.ts";

export async function createFox(
  skelsPath: Path,
  dstPath: Path,
) {
  const p5SkelPath = skelsPath.join("fox");
  await copy_dir(p5SkelPath, dstPath);
}
