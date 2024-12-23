import type {ShopInfo, ShopItem, ShopType} from "@/shops/types.ts";
import {allAlchemy, allBlacksmith, allEngineer, allGeneral, allLeatherworker, allTavern} from "@/shops/parse-shops.ts";
import type {Loot} from "@/loot/types.ts";
import {allSkills, allSpells} from "@/loot/parse-items.ts";

export const generalShopInfo: ShopInfo = {
  name: 'GENERAL STORE',
  description: 'Adventuring supplies and common goods.',
  type: 'general store'
}

export const alchemyShopInfo: ShopInfo = {
  name: 'ALCHEMY SHOP',
  description: 'Potions and elixirs with a variety of magical effects.',
  type: "alchemy"
}

export const blacksmithShopInfo: ShopInfo = {
  name: 'BLACKSMITH',
  description: 'Forged metal gear and equipment.',
  type: 'blacksmith'
}

export const leatherworkerShopInfo: ShopInfo = {
  name: 'LEATHERWORKER/CLOTHIER',
  description: 'Sturdy leather gear and lightweight clothing.',
  type: "leatherworker / clothier"
}

export const engineerShopInfo: ShopInfo = {
  name: 'ENGINEER',
  description: 'Cutting-edge tech and magitech.',
  type: 'engineer'
}

export const tavernShopInfo: ShopInfo = {
  name: 'TAVERN',
  description: 'Food and drink to keep you full and hydrated.',
  type: 'tavern'
}

export const magicShopInfo: ShopInfo = {
  name: 'MAGIC SHOP',
  description: 'Techniques received as Supplies are equipped for free, and are destroyed at the end of the quest\n' +
    'as normal.',
  type: 'magic shop'
}

export const dojoShopInfo: ShopInfo = {
  name: 'DOJO',
  description: 'Techniques received as Supplies are equipped for free, and are destroyed at the end of the quest\n' +
    'as normal.',
  type: 'dojo',
}

export const getShopSelection = (shopItems: ShopItem[], count: number = 5): Set<number> => {
  if (count > shopItems.length) {
    return new Set(shopItems.map((shopItem) => shopItem.id))
  }
  const selectedElements = new Set<number>();
  const indices = new Set<number>();

  while (selectedElements.size < count) {
    const randomIndex = Math.floor(Math.random() * shopItems.length);

    if (!indices.has(randomIndex)) {
      indices.add(randomIndex);
      selectedElements.add(shopItems[randomIndex].id);
    }
  }
  return selectedElements;
}

export const getTechniqueSelection = (loot: Loot[], count: number = 3): Set<number> => {
  if (count > loot.length) {
    return new Set(loot.map((i) => i.id))
  }
  const selectedElements = new Set<number>();
  const indices = new Set<number>();

  while (selectedElements.size < count) {
    const randomIndex = Math.floor(Math.random() * loot.length);

    if (!indices.has(randomIndex)) {
      indices.add(randomIndex);
      selectedElements.add(loot[randomIndex].id);
    }
  }
  return selectedElements;
}

export const getSelectionForAllSuppliesShops = (): Set<number> => {
  return new Set<number>([
    ...getShopSelection(allGeneral),
    ...getShopSelection(allAlchemy),
    ...getShopSelection(allBlacksmith),
    ...getShopSelection(allLeatherworker),
    ...getShopSelection(allEngineer),
    ...getShopSelection(allTavern),
  ]);
}

export const getInitialShopAvailablilty = (): Map<ShopType, boolean> => {
  return new Map<ShopType, boolean>([
    ['general store', true],
    ['alchemy', true],
    ['blacksmith', true],
    ['leatherworker / clothier', true],
    ['engineer', true],
    ['tavern', true],
    ['magic shop', true],
    ['dojo', true]
  ])
}

export const getInitialTechniqueSelection = (): Set<number> => {
  return new Set<number>([
    ...getTechniqueSelection(allSkills),
    ...getTechniqueSelection(allSpells)
  ])
}
