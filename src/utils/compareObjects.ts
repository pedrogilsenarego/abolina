
export function getObjectDifferences<T extends Record<string, any>>(
  oldObject: T,
  newObject: T
): Partial<T> {
  const diff: Partial<T> = {};

  for (const key in oldObject) {
    if (oldObject.hasOwnProperty(key) && newObject.hasOwnProperty(key)) {
      if (oldObject[key] !== newObject[key]) {
        diff[key] = newObject[key];
      }
    }
  }

  return diff;
}
