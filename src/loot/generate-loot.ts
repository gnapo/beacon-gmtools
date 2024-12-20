import type {Loot, LootType, Rarity} from "@/loot/types.ts";
import {
  legendarySkills,
  legendarySpells, legendarySupport, legendaryWeapons,
  rareSkills,
  rareSpells, rareSupport, rareWeapons,
  uncommonSkills,
  uncommonSpells, uncommonSupport, uncommonWeapons
} from "@/loot/parse-items.ts";

const randomInt =(min:number, max: number): number  => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const getType = (): LootType => {
  const roll = randomInt(1,100)
  if (roll <= 17) return 'Skill'
  if (roll <= 34) return 'Spell'
  if (roll <= 67) return 'Weapon'
  return 'Support'
}

export const getRaritySlot1 = (): Rarity => {
  const roll = randomInt(1,100)
  if (roll <= 75) return 'uncommon'
  return 'rare'
}

export const getRaritySlot2= (): Rarity => {
  const roll = randomInt(1,100)
  if (roll <= 30) return 'uncommon'
  if (roll <= 90) return 'rare'
  return 'legendary'
}

export const getRaritySlot3 = (): Rarity => {
  const roll = randomInt(1,100)
  if (roll <= 75) return 'rare'
  return 'legendary'
}

const selectRandomElement = (list: Loot[]): Loot => {
  return list[randomInt(0, list.length - 1)]
}

export const getLootOfType = (type: LootType, rarity: Rarity):Loot => {
  switch (type) {
    case "Skill":
      switch (rarity) {
        case 'uncommon':
          return selectRandomElement(uncommonSkills)
        case 'rare':
          return selectRandomElement(rareSkills)
        case 'legendary':
          return selectRandomElement(legendarySkills)
      }
    case "Spell":
      switch (rarity) {
        case 'uncommon':
          return selectRandomElement(uncommonSpells)
        case 'rare':
          return selectRandomElement(rareSpells)
        case 'legendary':
          return selectRandomElement(legendarySpells)
      }
    case "Weapon":
      switch (rarity) {
        case 'uncommon':
          return selectRandomElement(uncommonWeapons)
        case 'rare':
          return selectRandomElement(rareWeapons)
        case 'legendary':
          return selectRandomElement(legendaryWeapons)
      }
    case "Support":
      switch (rarity) {
        case 'uncommon':
          return selectRandomElement(uncommonSupport)
        case 'rare':
          return selectRandomElement(rareSupport)
        case 'legendary':
          return selectRandomElement(legendarySupport)
      }
  }
}

export const getLootCrateSlot1 = ():Loot => {
  return getLootOfType(getType(),getRaritySlot1())
}
export const getLootCrateSlot2 = ():Loot => {
  return getLootOfType(getType(),getRaritySlot2())
}
export const getLootCrateSlot3 = ():Loot => {
  return getLootOfType(getType(),getRaritySlot3())
}

export const getLootCrates = (): Loot[] => {
  return [getLootCrateSlot1(), getLootCrateSlot2(), getLootCrateSlot3()]
}
