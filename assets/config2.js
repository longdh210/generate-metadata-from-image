const fs = require("fs");
const dir = __dirname;
const width = 1000;
const height = 1000;
const path = require('path');
const directoryPath = path.join(__dirname, 'images');

// const rarity = [
//   { key: "", val: "original" },
//   { key: "_r", val: "rare" },
//   { key: "_sr", val: "super rare" },
// ];

// const addRarity = (_str) => {
//   let itemRarity;
//   rarity.forEach((r) => {
//     if(_str.includes(r.key)) {
//       itemRarity = r.val;
//     }
//   });
//   return itemRarity;
// };

// const cleanName = (_str) => {
//   let name = _str.slice(0, -4);
//   rarity.forEach((r) => {
//     name = name.replace(r.key, "");
//   });
//   return name;
// };

const getElements = (path) => {
  return fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      return {
        id: index + 1,
        name: i,
        fileName: i,
      };
    });
};

const layers = [
  {
    id: 1,
    name: "images",
    location: `${dir}/images/`,
    elements: getElements(`${dir}/images/`),
    position: { x: 0, y: 0 },
    size: { width: width, height: height },
  },
//   {
//     id: 2,
//     name: "ball",
//     location: `${dir}/ball/`,
//     elements: getElements(`${dir}/ball/`),
//     position: { x: 0, y: 0 },
//     size: { width: width, height: height },
//   },
//   {
//     id: 3,
//     name: "eye color",
//     location: `${dir}/eye color/`,
//     elements: getElements(`${dir}/eye color/`),
//     position: { x: 0, y: 0 },
//     size: { width: width, height: height },
//   },
//   {
//     id: 4,
//     name: "iris",
//     location: `${dir}/iris/`,
//     elements: getElements(`${dir}/iris/`),
//     position: { x: 0, y: 0 },
//     size: { width: width, height: height },
//   },
//   {
//     id: 5,
//     name: "shine",
//     location: `${dir}/shine/`,
//     elements: getElements(`${dir}/shine/`),
//     position: { x: 0, y: 0 },
//     size: { width: width, height: height },
//   },
//   {
//     id: 6,
//     name: "bottom lid",
//     location: `${dir}/bottom lid/`,
//     elements: getElements(`${dir}/bottom lid/`),
//     position: { x: 0, y: 0 },
//     size: { width: width, height: height },
//   },
//   {
//     id: 7,
//     name: "top lid",
//     location: `${dir}/top lid/`,
//     elements: getElements(`${dir}/top lid/`),
//     position: { x: 0, y: 0 },
//     size: { width: width, height: height },
//   },
]

// console.log(dir);
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
});

module.exports = {
  layers,
  width,
  height,
};
