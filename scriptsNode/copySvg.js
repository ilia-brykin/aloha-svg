const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const PATHS_SVG = [
  {
    "node_modules": "./node_modules/bootstrap-icons/icons/",
    "dist": "./dist/svg/bootstrap/"
  },
];

PATHS_SVG.forEach(item => {
  copyCurrentSVGs({
    pathNodeModules: item.node_modules,
    pathDist: item.dist,
  })
});

function copyCurrentSVGs({ pathNodeModules, pathDist }) {
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
