/* Builds the Artifact version of the game from the same source as the web app.
   The only difference: Artifacts have no local files, so three.js comes from
   the CDN instead of public/vendor, and the page ships without its <html>
   wrapper (the Artifact host supplies one). */
const fs=require("fs"), path=require("path");
const src=fs.readFileSync(path.join(__dirname,"public/index.html"),"utf8");
const head=src.slice(src.indexOf("<title>"), src.indexOf("</head>"));
const body=src.slice(src.indexOf("<body>")+6, src.lastIndexOf("</body>"));
const out=(head+body).replace('<script src="vendor/three.min.js"></script>',
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>');
const dest=process.argv[2]||path.join(__dirname,"blob-mania-artifact.html");
fs.writeFileSync(dest,out);
console.log("built",dest,out.length,"bytes");
