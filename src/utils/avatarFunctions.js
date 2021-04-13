export function hashCode(str) {
  // java String#hashCode
  let hash = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function intToRGB(i) {
  // eslint-disable-next-line no-bitwise
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
}

export function displayName(name) {
  const arrName = name.split(' ');
  if (arrName.length > 0) {
    const letter1 = arrName[0][0];
    const letter2 = arrName[1] !== undefined ? arrName[1][0] : '';
    const dName = letter1 + letter2;
    return dName.toUpperCase();
  }
  return '';
}
