const saveWorld = async (world, targetPath = "./EoS//worlds/last.json") => {
  await Neutralino.filesystem.writeFile(targetPath, JSON.stringify(world));
};

const loadWorld = async (targetPath = "./EoS/worlds/last.json") => {
  return JSON.parse(await Neutralino.filesystem.readFile(targetPath));
};

export { saveWorld, loadWorld };
