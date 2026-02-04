type ValueOfTuple<T extends readonly unknown[]> = T[number];

interface UrlObject {
  url: string;
}

export type { UrlObject, ValueOfTuple };
