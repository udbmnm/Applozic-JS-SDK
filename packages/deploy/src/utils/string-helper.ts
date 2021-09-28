//Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
const escapeRegExp = (string: string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

export const replaceAll = (str: string, match: string, replacement: string) =>
  str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement);
