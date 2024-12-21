
export interface LootRaw {
  Name: string
  Type: LootType
  Rarity: Rarity
  Size: string
  Type2: string
  MEM: string
  Action: string
  Tags: string
  'Range/reach': string
  Damage: string
  Desc: string

}
export interface Loot extends LootRaw {
  id: number
  actionType: ActionType
}


export type Rarity = 'uncommon' | 'rare' | 'legendary'
export type LootType = 'Weapon' | 'Spell' | 'Support' | 'Skill'
export type ActionType = 'action' | 'passive' | 'reaction' | 'attack'
