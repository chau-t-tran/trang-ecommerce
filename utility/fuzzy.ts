export interface RankedItem<T> {
  item: T;
  matchScore: number;
}

export function FuzzyMatchRank<T>(searchString: string, list: T[], targetProperty: keyof T): T[] {
  const rankedList: RankedItem<T>[] = [];

  for (const item of list) {
    const targetValue = (item[targetProperty] as unknown as string) || "";
    const matchScore = calculateMatchScore(searchString, targetValue);
    rankedList.push({ item, matchScore });
  }

  rankedList.sort((a, b) => b.matchScore - a.matchScore);

  return rankedList.map((entry) => entry.item);
}

function calculateMatchScore(searchString: string, targetValue: string): number {
  const search = searchString.toLowerCase();
  const target = targetValue.toLowerCase();

  if (search === target) {
    return Number.MAX_SAFE_INTEGER;
  }

  let score = 0;
  let prevIndex = -1;

  for (const char of search) {
    const index = target.indexOf(char, prevIndex + 1);

    if (index === -1) {
      return score;
    }

    score += 1 / (index + 1);
    prevIndex = index;
  }

  return score;
}
