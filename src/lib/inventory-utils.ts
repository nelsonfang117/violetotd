// src/lib/inventory-utils.ts
import { InventoryItem } from '@/types/inventory-types';

export function validateInventoryItem(item: any): item is InventoryItem {
  const validStatuses = ["available", "reserved", "sold", "in-transit"];
  return validStatuses.includes(item.status);
}

export function getValidInventory(items: any[]): InventoryItem[] {
  return items.filter(validateInventoryItem);
}

export function getBrandInventory(items: any[], brand: string): InventoryItem[] {
    return items.filter(car => car.brand === brand)
}