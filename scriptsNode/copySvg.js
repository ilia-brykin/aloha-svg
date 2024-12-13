const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const PATHS_SVG = [
  {
    "src": path.join("node_modules", "bootstrap-icons", "icons"),
    "dist": path.join("dist", "svg", "bootstrap"),
  },
  {
    "src": path.join("node_modules", "flag-icons", "flags", "4x3"),
    "dist": path.join("dist", "svg", "flags", "4x3"),
  },
  {
    "src": path.join("node_modules", "flag-icons", "flags", "1x1"),
    "dist": path.join("dist", "svg", "flags", "1x1"),
  },
  {
    "src": path.join("node_modules", "@tabler", "icons", "icons", "filled"),
    "dist": path.join("dist", "svg", "tabler", "filled"),
  },
  {
    "src": path.join("node_modules", "@tabler", "icons", "icons", "outline"),
    "dist": path.join("dist", "svg", "tabler", "outline"),
  },
];

PATHS_SVG.forEach(item => {
  copyCurrentSVGs({
    pathSrc: item.src,
    pathDist: item.dist,
  })
});

function copyCurrentSVGs({ pathSrc, pathDist }) {
  if (fs.existsSync(pathDist)) {
    fs.rmSync(pathDist, { recursive: true });
  }
  fs.mkdirSync(pathDist, {
    recursive: true
  });

  fs.readdir(pathSrc, (err, files) => {
    files.forEach(fileName => {
      copyCurrentSVG({ fileName, pathSrc, pathDist });
    });
  });
}

function copyCurrentSVG({ fileName, pathSrc, pathDist }) {
  if (!_.endsWith(fileName, ".svg")) {
    return;
  }

  const SVG_FILE_PATH = path.join(pathSrc, fileName);
  const SVG_FILE_PATH_NEW = path.join(pathDist, fileName);
  fs.copyFile(SVG_FILE_PATH, SVG_FILE_PATH_NEW, (err) => {
    if (err) {
      console.error("Error copying file:", err);
    }
  });
}
