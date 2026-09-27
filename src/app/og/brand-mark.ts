import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Isotipo 3D como data URL, para incrustarlo en las tarjetas de /og. */
export async function brandMarkDataUrl(): Promise<string> {
  const file = await readFile(
    join(process.cwd(), "public/brand/isotipo-3d-360.png")
  );
  return `data:image/png;base64,${file.toString("base64")}`;
}
