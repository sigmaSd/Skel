import { Path } from "https://raw.githubusercontent.com/sigmaSd/Path/master/path.ts";

export async function download(url: string, filename: string) {
  const data = (await fetch(url)).arrayBuffer();

  console.log(`Saving ${url} to ${filename}`);
  return Deno.writeFile(filename, new Uint8Array(await data));
}

export async function copy_dir(srcPath: Path, dstPath: Path) {
  if (srcPath.isFile()) {
    throw "Incorrect usage";
  }
  const convert_path: (path: Path) => Path = (path) => {
    return dstPath.join(path.stripPrefix(srcPath)!);
  };
  const dcb = async (dp: Path) => await Deno.mkdir(convert_path(dp).toString());
  const fcb = async (fp: Path) =>
    await Deno.copyFile(fp.toString(), convert_path(fp).toString());
  await visit_dirs(srcPath, dcb, fcb);
}

async function visit_dirs(
  dir: Path,
  dcb: (p: Path) => Promise<void>,
  fcb: (p: Path) => Promise<void>,
) {
  if (dir.isDir()) {
    await dcb(dir);
    for await (const entry of Deno.readDir(dir.toString())) {
      const epath = dir.join(entry.name);
      if (epath.isDir()) {
        visit_dirs(epath, dcb, fcb);
      } else {
        await fcb(epath);
      }
    }
  }
}
