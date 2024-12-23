
export interface ShopItemRaw {
  Source: ShopType
  Name: string;
  Cost: string,
  Effect: string
}
export interface ShopItem extends ShopItemRaw {
  id: number
}

export interface ShopInfo {
  name: string
  description: string
  type: ShopType
}

export type ShopType = 'general store' | 'alchemy' | 'blacksmith' | 'leatherworker / clothier' | 'engineer' | 'tavern' | 'magic shop' | 'dojo'

export type ShopItemsSelection = Set<number>
export type AvailableShopsSelection = Set<ShopType>

