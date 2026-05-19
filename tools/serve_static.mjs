import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const port = Number(process.argv[3] || 4173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".bmp": "image/bmp",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  try {
    const parsed = new url.URL(req.url || "/", "http://127.0.0.1");
    let pathname = decodeURIComponent(parsed.pathname);
    if (pathname === "/") pathname = "/index.html";

    const resolved = path.resolve(root, `.${pathname}`);
    if (!resolved.startsWith(root)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    const filePath = fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()
      ? path.join(resolved, "index.html")
      : resolved;

    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    res.writeHead(500);
    res.end(String(error));
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Serving ${root} on ${port}`);
});
