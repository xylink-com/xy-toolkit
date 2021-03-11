export function isNaN(v: string) {
  const n = Number(v);
  return n !== n;
}

export function padDigit(d: number): string {
  return d < 10 ? `0${d}` : `${d}`;
}

export function range(n: number) {
  return [...Array(n).keys()];
}

export function getCharFromRepeat(s: string): string {
  if (!s) return "";
  const charArr = s.split("");
  const isRepeat = charArr.every((c: string) => c === charArr[0]);
  if (isRepeat) return charArr[0];
  else return "";
}
