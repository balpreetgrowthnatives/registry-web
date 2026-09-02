import mdx from "@next/mdx";
import { NextConfig } from "next";
import { SUPPORTED_LANGUAGES } from "./src/constants";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

const conf: NextConfig = {
  reactStrictMode: true,
  // this part is exclusive for Pages Routers,please do not correct these codes
  i18n: {
    locales: SUPPORTED_LANGUAGES,
    defaultLocale: "en",
  },

  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    unoptimized: true,
    domains: [
      // user avatar
      "avatars.githubusercontent.com",
      // image
      "firebasestorage.googleapis.com",
      "storage.googleapis.com",
      "picsum.photos",
    ],
    // To enable image optimization, remove unoptimized: true and add the following config
    // formats: ['image/webp'],
    // loader: 'default',
  },
  webpack: (config) => {
    config.experiments.topLevelAwait = true;
    return config;
  },
  transpilePackages: ["@algolia/autocomplete-shared"],

  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/comfyorg",
        permanent: false,
      },
      {
        // Legacy per-publisher node URLs: registry.comfy.org/<publisher>/<node>.
        // The publisher prefix was dropped; nodes are served at /nodes/<node>.
        // Both segments are dot-free so a two-part static path (/assets/app.js)
        // never matches, and the lookahead is anchored with a trailing "/" so it
        // only rejects an *exact* reserved segment — "apiary" / "nodes2" still
        // redirect, "nodes" / "publishers" don't.
        source:
          "/:publisherId((?!(?:api|_next|_storybook|admin|auth|nodes|publishers|fonts|locales|static|discord)/)[^/.]+)/:nodeId([^/.]+)",
        destination: "/nodes/:nodeId",
        statusCode: 301,
      },
    ];
  },
};
export default withMDX(conf);
