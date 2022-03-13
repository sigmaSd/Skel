import { Path } from "../deps.ts";
import { copy_dir } from "../utils.ts";

export async function createPuppet(
  skelsPath: Path,
  dstPath: Path,
) {
  const p5SkelPath = skelsPath.join("puppet");
  await copy_dir(p5SkelPath, dstPath);
}
