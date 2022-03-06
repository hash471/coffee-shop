export enum ItemType {
    BEVERAGE = "BEVERAGE",
    FOOD = "FOOD",
    SALAD = "SALAD"
  }

export interface BaseItemDto {
    title: string;
    description: string;
    price: number;
    taxRate: number;
    category: ItemType;
    availableQuantity: number;
    discount?: number;
    discountParentItem?: string;
}