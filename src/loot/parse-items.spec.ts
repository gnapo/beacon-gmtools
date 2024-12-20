import {describe, it, expect} from "vitest";
import {itemParseResult} from "@/loot/parse-items.ts";

describe('parse csv', () => {

  it('should find the correct columns', () => {
    expect(itemParseResult.meta.delimiter).toBe(',')
    expect(itemParseResult.errors.length).toBe(0)
    console.log(itemParseResult.data[0])
  });
});
