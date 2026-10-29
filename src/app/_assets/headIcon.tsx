import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Ocean Calm "ocean" token — spelled out because generated images don't see the page CSS
const ocean = "rgb(46 139 119)";

export const readAsset = async (file: string) => {
  const data = await readFile(join(process.cwd(), "src/app/_assets", file));
  return `data:image/png;base64,${data.toString("base64")}`;
};

// Hero portrait's head inside a green circle; `round: false` fills the square for iOS,
// which applies its own rounded mask to home-screen icons
export async function renderHeadIcon(size: number, { round = true } = {}) {
  const head = await readAsset("profile-head.png");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
          background: ocean,
          borderRadius: round ? "50%" : 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
        <img src={head} width={size * 0.9} height={size * 0.93} alt="" style={{ marginBottom: -size * 0.02 }} />
      </div>
    ),
    { width: size, height: size }
  );
}
