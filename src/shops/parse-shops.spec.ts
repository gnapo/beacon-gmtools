import {describe, expect, it} from "vitest";
import {allGeneral, shopParseResult} from "@/shops/parse-shops.ts";

describe('parse shop csv', () => {

  it('should find the correct columns', () => {
    expect(shopParseResult.meta.delimiter).toBe(',')
    expect(shopParseResult.errors.length).toBe(0)
    console.log(shopParseResult.data[0])
    console.log(allGeneral)
  });
});
