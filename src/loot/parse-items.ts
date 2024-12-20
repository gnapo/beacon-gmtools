import Papa from 'papaparse';
import {allItemsCsv} from "@/loot/all-loot.ts";
import type {Loot, LootRaw, Rarity} from "@/loot/types.ts";

export const itemParseResult = Papa.parse(allItemsCsv, {header: true})

const removeSingleDash = (input: string): string => {
  return input === '-' ? '' : input
}
const formatRange = (input: string): string => {
    return input.replace(/[\[\]()0]/g, '')

}

let idIterator = 0
const getNextId = ():number => {
  return idIterator++
}

const sanitizeLoot = (input: LootRaw):Loot => {
  return {
    id: getNextId(),
    Name: input.Name,
    Type: input.Type,
    Rarity: input.Rarity.toLowerCase() as Rarity,
    Size: input.Size,
    Type2: input.Type2,
    MEM: input.MEM,
    Action: removeSingleDash(input.Action),
    Tags: removeSingleDash(input.Tags),
    "Range/reach": formatRange(input["Range/reach"]),
    Damage: removeSingleDash(input.Damage),
    Desc: removeSingleDash(input.Desc)
  }
}


export const allItems: Loot[] = (itemParseResult.data as LootRaw[]).map((i) => sanitizeLoot(i))
export const allItemsSorted: Loot[] =  [...allItems].sort((a, b) => a.Name.localeCompare(b.Name));

export const allSkills = allItems.filter((i) => i.Type === 'Skill')
export const allSpells = allItems.filter((i) => i.Type === 'Spell')
export const allSupport = allItems.filter((i) => i.Type === 'Support')
export const allWeapons = allItems.filter((i) => i.Type === 'Weapon')

export const uncommonSkills = allSkills.filter((i) => i.Rarity === 'uncommon')
export const rareSkills = allSkills.filter((i) => i.Rarity === 'rare')
export const legendarySkills = allSkills.filter((i) => i.Rarity === 'legendary')

export const uncommonSpells = allSpells.filter((i) => i.Rarity === 'uncommon')
export const rareSpells = allSpells.filter((i) => i.Rarity === 'rare')
export const legendarySpells = allSpells.filter((i) => i.Rarity === 'legendary')

export const uncommonSupport = allSupport.filter((i) => i.Rarity === 'uncommon')
export const rareSupport = allSupport.filter((i) => i.Rarity === 'rare')
export const legendarySupport = allSupport.filter((i) => i.Rarity === 'legendary')

export const uncommonWeapons = allWeapons.filter((i) => i.Rarity === 'uncommon')
export const rareWeapons = allWeapons.filter((i) => i.Rarity === 'rare')
export const legendaryWeapons = allWeapons.filter((i) => i.Rarity === 'legendary')

export const idsAreValid = (ids: number[]): boolean => {
  return ids.length === 3 && ids.every(n => {
    return 0 <= n && n < allItems.length
  });
}

export const findLoot = (id: number): Loot | undefined => {
  return allItems.filter(item => item.id === id)[0]
}
