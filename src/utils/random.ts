export function createRng(seed: number): () => number {
  let value = seed >>> 0;

  return () => {
    value += 0x6d2b79f5;
    let next = Math.imul(value ^ (value >>> 15), value | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickOne<T>(items: T[], random: () => number): T {
  return items[Math.floor(random() * items.length)];
}

export function weightedPick<T>(
  items: T[],
  getWeight: (item: T) => number,
  random: () => number
): T {
  const weightedItems = items
    .map((item) => ({ item, weight: Math.max(0, getWeight(item)) }))
    .filter((entry) => entry.weight > 0);

  if (weightedItems.length === 0) {
    return pickOne(items, random);
  }

  const total = weightedItems.reduce((sum, entry) => sum + entry.weight, 0);
  const target = random() * total;
  let runningTotal = 0;

  for (const entry of weightedItems) {
    runningTotal += entry.weight;
    if (target <= runningTotal) {
      return entry.item;
    }
  }

  return weightedItems[weightedItems.length - 1].item;
}

export function sampleUnique<T>(
  items: T[],
  count: number,
  random: () => number
): T[] {
  const pool = [...items];
  const result: T[] = [];

  while (pool.length > 0 && result.length < count) {
    const index = Math.floor(random() * pool.length);
    result.push(pool[index]);
    pool.splice(index, 1);
  }

  return result;
}
