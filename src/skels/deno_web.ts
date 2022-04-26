import { Path } from "../deps.ts";
import { copy_dir } from "../utils.ts";

export async function createDenoWeb(
  skelsPath: Path,
  dstPath: Path,
) {
  const denoWebPath = skelsPath.join("deno_web");
  await copy_dir(denoWebPath, dstPath);
}
