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
  {
    "src": path.join("dist", "svg", "tabler", "filled"),
    "dist": path.join("dist", "js", "tabler", "filled"),
  },
  {
    "src": path.join("dist", "svg", "tabler", "outline"),
    "dist": path.join("dist", "js", "tabler", "outline"),
  },
];

PATHS_SVG.forEach((item) => {
  convertCurrentSVGs({
    pathSrc: item.src,
    pathDist: item.dist,
  });
});

function convertCurrentSVGs({ pathSrc, pathDist }) {
  if (!fs.existsSync(pathDist)) {
    fs.mkdirSync(pathDist, {
      recursive: true,
    });
  }

  fs.readdir(pathSrc, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((fileName) => {
      convertCurrentSVG({ fileName, pathSrc, pathDist });
    });
  });
}

function convertCurrentSVG({ fileName, pathSrc, pathDist }) {
  if (!_.endsWith(fileName, ".svg")) {
    return;
  }

  const SVG_FILE_PATH = path.join(pathSrc, fileName);
  const JS_FILE_NAME = `${_.upperFirst(_.camelCase(fileName.split(".")[0]))}.js`;
  const JS_FILE_PATH = path.join(pathDist, JS_FILE_NAME);

  if (fs.existsSync(JS_FILE_PATH)) {
    return;
  }

  try {
    const fd = fs.openSync(SVG_FILE_PATH, "r");
    const data = fs.readFileSync(fd, "utf8");
    fs.closeSync(fd);

    const JS_TEXT = setJsFromSvg(data);

    const fdOut = fs.openSync(JS_FILE_PATH, "w");
    fs.writeSync(fdOut, JS_TEXT, "utf8");
    fs.closeSync(fdOut);
    console.log(`File converted: ${ SVG_FILE_PATH }`);
  } catch (err) {
    console.error("Error processing file:", SVG_FILE_PATH, err);
  }
}

function setJsFromSvg(svgText) {
  return `export default \`${svgText}\`;\n`;
}
