import { access, cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

const workerSource = `const cacheableMethods = new Set(["GET", "HEAD"]);

function cloneRequestWithPath(request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  return new Request(url, request);
}

async function fetchAsset(env, request) {
  if (!env?.ASSETS?.fetch) {
    return new Response("Missing ASSETS binding", { status: 500 });
  }

  return env.ASSETS.fetch(request);
}

export default {
  async fetch(request, env) {
    const initialResponse = await fetchAsset(env, request);

    if (initialResponse.status !== 404 || !cacheableMethods.has(request.method)) {
      return initialResponse;
    }

    const url = new URL(request.url);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    const looksLikeAsset = url.pathname.includes(".") || url.pathname.startsWith("/assets/");

    if (looksLikeAsset && !acceptsHtml) {
      return initialResponse;
    }

    return fetchAsset(env, cloneRequestWithPath(request, "/index.html"));
  },
};
`;

export function sites() {
  let root = process.cwd();

  return {
    name: "sites-static-vite",
    apply: "build",
    configResolved(config) {
      root = config.root;
    },
    async closeBundle() {
      const distDirectory = resolve(root, "dist");
      const outputDirectory = resolve(distDirectory, ".openai");
      const serverDirectory = resolve(distDirectory, "server");
      const hostingConfig = resolve(root, ".openai", "hosting.json");
      const drizzleSource = resolve(root, "drizzle");

      await rm(outputDirectory, { recursive: true, force: true });
      await mkdir(outputDirectory, { recursive: true });
      await mkdir(serverDirectory, { recursive: true });

      if (await exists(hostingConfig)) {
        await cp(hostingConfig, resolve(outputDirectory, "hosting.json"));
      }

      if (await exists(drizzleSource)) {
        await cp(drizzleSource, resolve(outputDirectory, "drizzle"), {
          recursive: true,
        });
      }

      await writeFile(resolve(serverDirectory, "index.js"), workerSource, "utf8");
    },
  };
}
