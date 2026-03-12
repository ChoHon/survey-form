export function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

export function parseFormData(formData: FormData): Record<string, any> {
  const flatObject: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    if (flatObject.hasOwnProperty(key)) {
      if (!Array.isArray(flatObject[key])) {
        flatObject[key] = [flatObject[key]];
      }
      flatObject[key].push(value);
    } else {
      flatObject[key] = value;
    }
  }

  const deepObject: Record<string, any> = {};

  for (const key in flatObject) {
    const path = key.match(/[^.\[\]]+/g) || [];

    let current = deepObject;

    for (let i = 0; i < path.length; i++) {
      const segment = path[i];

      if (i === path.length - 1) {
        current[segment] = flatObject[key];
        break;
      }

      const nextSegmentIsNumber = /^\d+$/.test(path[i + 1]);

      if (!current.hasOwnProperty(segment)) {
        current[segment] = nextSegmentIsNumber ? [] : {};
      }

      current = current[segment];
    }
  }

  return deepObject;
}

export const createCounter = () => {
  let count = 0;
  return () => ++count;
};
