import { Path } from "https://raw.githubusercontent.com/sigmaSd/Path/master/path.ts";
import { copy_dir } from "./utils.ts";

export async function createWeb(
  skelsPath: Path,
  dstPath: Path,
) {
  const webSkelPath = skelsPath.join("web");
  await copy_dir(webSkelPath, dstPath);
}
