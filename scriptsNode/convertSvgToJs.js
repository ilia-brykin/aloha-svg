const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const PATHS_SVG = [
  {
    "src": path.join("dist", "svg", "bootstrap"),
    "dist": path.join("dist", "js", "bootstrap"),
  },
  {
    "src": path.join("dist", "svg", "bootstrap3"),
    "dist": path.join("dist", "js", "bootstrap3"),
  },
  {
    "src": path.join("dist", "svg", "flags", "4x3"),
    "dist": path.join("dist", "js", "flags", "4x3"),
  },
  {
    "src": path.join("dist", "svg", "flags", "1x1"),
    "dist": path.join("dist", "js", "flags", "1x1"),
  },
];

PATHS_SVG.forEach(item => {
  convertCurrentSVGs({
    pathSrc: item.src,
    pathDist: item.dist,
  })
});

function convertCurrentSVGs({ pathSrc, pathDist }) {
  if (fs.existsSync(pathDist)) {
    fs.rmSync(pathDist, { recursive: true });
  }
  fs.mkdirSync(pathDist, {
    recursive: true
  });

  fs.readdir(pathSrc, (err, files) => {
    files.forEach(fileName => {
      convertCurrentSVG({ fileName, pathSrc, pathDist });
    });
  });
}

function convertCurrentSVG({ fileName, pathSrc, pathDist }) {
  if (!_.endsWith(fileName, ".svg")) {
    return;
  }

  const SVG_FILE_PATH = path.join(pathSrc, fileName);
  const JS_FILE_NAME = `${ _.upperFirst(_.camelCase(fileName.split(".")[0])) }.js`;
  const JS_FILE_PATH = path.join(pathDist, JS_FILE_NAME);
  fs.readFile(SVG_FILE_PATH, "utf8", function(err, data) {
    if (err) {
      throw err;
    }
    const JS_TEXT = setJsFromSvg(data);
    fs.writeFileSync(JS_FILE_PATH, JS_TEXT, "utf8");
  });
}

function setJsFromSvg(svgText) {
  return `export default \`${ svgText }\`;\n`;
}