const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const PATHS_SVG = [
  {
    "node_modules": "./node_modules/bootstrap-icons/icons/",
    "dist": path.join("dist", "svg", "bootstrap"),
  },
  {
    "node_modules": "./node_modules/flag-icons/flags/4x3/",
    "dist": path.join("dist", "svg", "flags", "4x3"),
  },
  {
    "node_modules": "./node_modules/flag-icons/flags/1x1/",
    "dist": path.join("dist", "svg", "flags", "1x1"),
  },
];

PATHS_SVG.forEach(item => {
  copyCurrentSVGs({
    pathNodeModules: item.node_modules,
    pathDist: item.dist,
  })
});

function copyCurrentSVGs({ pathNodeModules, pathDist }) {
  if (fs.existsSync(pathDist)) {
    fs.rmSync(pathDist, { recursive: true });
  }
  fs.mkdirSync(pathDist, {
    recursive: true
  });

  fs.readdir(pathNodeModules, (err, files) => {
    files.forEach(fileName => {
      copyCurrentSVG({ fileName, pathNodeModules, pathDist });
    });
  });
}

function copyCurrentSVG({ fileName, pathNodeModules, pathDist }) {
  if (!_.endsWith(fileName, ".svg")) {
    return;
  }

  const SVG_FILE_PATH = path.join(pathNodeModules, fileName);
  const SVG_FILE_PATH_NEW = path.join(pathDist, fileName);
  fs.copyFile(SVG_FILE_PATH, SVG_FILE_PATH_NEW, (err) => {
    if (err) {
      console.error("Error copying file:", err);
    }
  });
}
