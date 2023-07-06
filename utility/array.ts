export function takeRandom<T>(array: T[], n: number): T[] {
  const shuffled = array.slice(); // Create a shallow copy of the array
  let currentIndex = shuffled.length;
  const result: T[] = [];

  while (n > 0 && currentIndex > 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap the current element with the randomly selected element
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex]
    ];

    // Add the randomly selected element to the result array
    result.push(shuffled[currentIndex]);
    n--;
  }

  return result;
}
