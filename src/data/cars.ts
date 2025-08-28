import { inventory } from "./inventory";

export const getInventoryModel = (modelKey: string) => {
    return inventory.filter(item => item.modelKey == modelKey);
};

export const getAvailableInventory = () => {
    return inventory.filter(item => item.status == "available")
}