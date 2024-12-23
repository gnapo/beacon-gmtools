import Papa from 'papaparse';
import {allShopsCsv} from "@/shops/all-shops.ts";
import type {ShopItem, ShopItemRaw, ShopType} from "@/shops/types.ts";

export const shopParseResult = Papa.parse(allShopsCsv, {header: true})

let shopItemIddIterator = 0
const getNextShopItemId = ():number => {
  return shopItemIddIterator++
}

const sanitizeShopItem = (input: ShopItemRaw): ShopItem => {
  return {
    id: getNextShopItemId(),
    Source: input.Source.toLowerCase() as ShopType,
    Name: input.Name,
    Cost: input.Cost,
    Effect: input.Effect
  }
}

export const allShopItems: ShopItem[] = (shopParseResult.data as ShopItemRaw[]).map((i) => sanitizeShopItem(i))

export const allGeneral = allShopItems.filter((i) => i.Source === 'general store')
export const allAlchemy = allShopItems.filter((i) => i.Source === 'alchemy')
export const allBlacksmith = allShopItems.filter((i) => i.Source === 'blacksmith')
export const allLeatherworker = allShopItems.filter((i) => i.Source === 'leatherworker / clothier')
export const allEngineer = allShopItems.filter((i) => i.Source === 'engineer')
export const allTavern = allShopItems.filter((i) => i.Source === 'tavern')

export const shopItemsByShopType: Map<ShopType, ShopItem[]> = new Map<ShopType, ShopItem[]>([
  ['general store',allGeneral],
  ['alchemy',allAlchemy],
  ['blacksmith',allBlacksmith],
  ['leatherworker / clothier',allLeatherworker],
  ['engineer',allEngineer],
  ['tavern',allTavern]
])
