import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Build artefacts and untouched source photographs.
    "dist/**",
    "assets/**",
  ]),
  {
    rules: {
      // Every photograph on this site is a pre-cropped WebP served at or below
      // its native pixel size — see docs/DIRECTION.md. There is nothing for an
      // image optimiser to do, and next/image would add a loader and a runtime
      // to resize files that must not be resized. Plain <img> with explicit
      // width/height is the correct element here.
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
