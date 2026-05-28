import { useMemo, useState } from "react";
import { inventoryStorageKey } from "../services/inventoryStorage.js";
import { filterInventoryItems, sortInventoryItems } from "../utils/inventoryFilters.js";
import { useLocalStorage } from "./useLocalStorage.js";

export function useInventory() {
  const [items, setItems] = useLocalStorage(inventoryStorageKey, []);
  const [filters, setFilters] = useState({
    location: "all",
    category: "all",
    search: "",
    sortBy: "date_desc",
  });

  const visibleItems = useMemo(() => {
    const filteredItems = filterInventoryItems(items, filters);
    return sortInventoryItems(filteredItems, filters.sortBy);
  }, [filters, items]);

  function addItem(item) {
    setItems((currentItems) => [
      {
        ...item,
        id: crypto.randomUUID(),
      },
      ...currentItems,
    ]);
  }

  function updateItem(updatedItem) {
    setItems((currentItems) =>
      currentItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  }

  function deleteItem(itemId) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  }

  function updateFilters(nextFilters) {
    setFilters((currentFilters) => ({ ...currentFilters, ...nextFilters }));
  }

  return {
    items,
    visibleItems,
    filters,
    addItem,
    updateItem,
    deleteItem,
    updateFilters,
  };
}
