import * as atob from 'atob';

export function base64ToBytArray(base64: any): number[] {
  const binary_string = atob(base64);
  const len = binary_string.length;

  const result: number[] = [];
  for (let i = 0; i < len; i++) {
    result.push(binary_string.charCodeAt(i));
  }
  return result;
}
