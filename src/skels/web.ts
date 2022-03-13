import { Path } from "../deps.ts";
import { copy_dir } from "../utils.ts";

export async function createWeb(
  skelsPath: Path,
  dstPath: Path,
) {
  const webSkelPath = skelsPath.join("web");
  await copy_dir(webSkelPath, dstPath);
}
