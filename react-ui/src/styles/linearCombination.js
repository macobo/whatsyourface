export default function linearCombination(a0, a1, weight) {
  if (weight >= 1.0) {
    return a1
  }
  return a1.map((x,i) => weight*x + (1.0-weight)*a0[i])
}
