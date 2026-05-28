export const inventoryStorageKey = "pantryInventoryItems";

export function readInventoryItems() {
  const storedValue = window.localStorage.getItem(inventoryStorageKey);

  if (!storedValue) {
    return [];
  }

  try {
    const parsedItems = JSON.parse(storedValue);
    return Array.isArray(parsedItems) ? parsedItems : [];
  } catch {
    return [];
  }
}

export function saveInventoryItems(items) {
  window.localStorage.setItem(inventoryStorageKey, JSON.stringify(items));
}
