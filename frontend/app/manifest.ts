import type { MetadataRoute } from "next"

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "방방체크",
    short_name: "방방체크",
    description: "원하는 조건에 맞는 방을 쉽고 빠르게 찾아보세요",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d946ef", // fuchsia-600 색상
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      }
    ],
  }
}

