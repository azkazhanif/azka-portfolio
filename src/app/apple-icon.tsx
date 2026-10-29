import { renderHeadIcon } from "./_assets/headIcon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return renderHeadIcon(size.width, { round: false });
}
