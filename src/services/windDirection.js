export function getWindDirection(degrees) {
  const directions = ['N', 'NØ', 'Ø', 'SØ', 'S', 'SV', 'V', 'NV'];
  const index = Math.round(degrees / 45) % 8;
  let direction = directions[index];
  if (degrees % 45 < 10 || degrees % 45 > 35) {
    const neighbor = directions[(index + (degrees % 45 < 10 ? 7 : 1)) % 8];
    direction += `/${neighbor}`;
  }
  return direction;
}
