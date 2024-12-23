import {describe, it, expect} from "vitest";
import {itemParseResult} from "@/loot/parse-items.ts";
import {shopParseResult} from "@/shops/parse-shops.ts";

describe('parse loot csv', () => {

  it('should find the correct columns', () => {
    expect(shopParseResult.meta.delimiter).toBe(',')
    expect(shopParseResult.errors.length).toBe(0)
    console.log(itemParseResult.data[0])
  });
});
