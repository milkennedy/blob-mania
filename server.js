/* Blob Mania — a static file server with no dependencies.
   Railway sets PORT; everything else is a file on disk. */
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "public");
const PORT = process.env.PORT || 3000;
const TYPES = {
  ".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8",
  ".css":"text/css; charset=utf-8",   ".json":"application/json; charset=utf-8",
  ".png":"image/png", ".jpg":"image/jpeg", ".svg":"image/svg+xml",
  ".ico":"image/x-icon", ".webp":"image/webp", ".mp3":"audio/mpeg", ".woff2":"font/woff2"
};

http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || "/").split("?")[0]);
  let file = path.join(ROOT, url === "/" ? "index.html" : url);

  // never serve anything outside public/
  if (!file.startsWith(ROOT)) { res.writeHead(403).end("Forbidden"); return; }

  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) file = path.join(ROOT, "index.html");
    fs.readFile(file, (err2, buf) => {
      if (err2) { res.writeHead(404, {"content-type":"text/plain"}).end("Not found"); return; }
      const ext = path.extname(file).toLowerCase();
      res.writeHead(200, {
        "content-type": TYPES[ext] || "application/octet-stream",
        "cache-control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable"
      });
      res.end(buf);
    });
  });
}).listen(PORT, () => console.log("Blob Mania running on :" + PORT));
