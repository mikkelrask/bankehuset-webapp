// src/services/svgUpscale.js

function upscaleSVG(svgString, newWidth, newHeight) {
  // Parse the SVG string into an SVG document
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, "image/svg+xml");

  // Get the root SVG element and its current dimensions
  const svgElem = svgDoc.documentElement;
  const oldWidth = parseInt(svgElem.getAttribute("width"));
  const oldHeight = parseInt(svgElem.getAttribute("height"));

  // Calculate the scaling factors for the width and height
  const scaleX = newWidth / oldWidth;
  const scaleY = newHeight / oldHeight;

  // Scale all path elements in the SVG
  const pathElems = svgElem.querySelectorAll("path");
  for (let i = 0; i < pathElems.length; i++) {
    const pathElem = pathElems[i];
    const pathData = pathElem.getAttribute("d");
    const scaledPathData = scalePath(pathData, scaleX, scaleY);
    pathElem.setAttribute("d", scaledPathData);
  }

  // Update the width and height attributes of the root SVG element
  svgElem.setAttribute("width", newWidth);
  svgElem.setAttribute("height", newHeight);

  // Serialize the SVG document back to a string and return it
  const serializer = new XMLSerializer();
  const newSvgString = serializer.serializeToString(svgDoc);
  return newSvgString;
}

function scalePath(pathData, scaleX, scaleY) {
  // Split the path data into individual commands and arguments
  const commands = pathData.split(/[ ,]/).filter(str => str.length > 0);
  const argsPerCommand = {
    M: 2,
    L: 2,
    H: 1,
    V: 1,
    C: 6,
    S: 4,
    Q: 4,
    T: 2,
    A: 7,
    Z: 0,
  };

  // Scale the arguments for each command
  let scaledCommands = [];
  let i = 0;
  while (i < commands.length) {
    const command = commands[i];
    const args = commands.slice(i + 1, i + 1 + argsPerCommand[command]);
    const scaledArgs = args.map((arg, j) => {
      if (j % 2 === 0) {
        return arg * scaleX;
      } else {
        return arg * scaleY;
      }
    });
    scaledCommands.push(command, ...scaledArgs);
    i += 1 + argsPerCommand[command];
  }

  // Join the scaled commands and arguments back into a path string
  const scaledPathData = scaledCommands.join(" ");
  return scaledPathData;
}

export { upscaleSVG };

