export function* range(min: number, max: number) {
  for (let index = min; index < max; index++) yield index
}
