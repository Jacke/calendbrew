import { readFile } from 'fs/promises';

const configLoader = async (path: string) => {
  let configContent = JSON.parse(await readFile(path, "utf8"));

  console.error(`Not implemented in ${path} \n`, JSON.stringify(configContent, null, 4));
};
export default configLoader;