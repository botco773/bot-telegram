import fs from "fs";

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
    return data;
  } catch (error) {
    throw error;
  }
}

export { readFile };
