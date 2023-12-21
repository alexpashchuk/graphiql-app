export const parseStringToJSON = (objAsString: string) => {
  try {
    const obj = JSON.parse(objAsString.trim().replace('/n', ''));
    if (obj && (typeof obj === 'object' || typeof obj === 'string')) {
      return obj;
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
  return undefined;
};
