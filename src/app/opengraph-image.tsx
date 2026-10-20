import { ogSize, renderOg } from "@/lib/og";

export const alt = "Upper-Intermediate English: interactive lessons";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    title: "Upper-Intermediate English",
    subtitle: "Interactive lessons. Learn by doing, with instant feedback.",
  });
}
