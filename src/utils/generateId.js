let sessionCounter = 0;

export const generateId = () => Date.now() + sessionCounter++;

