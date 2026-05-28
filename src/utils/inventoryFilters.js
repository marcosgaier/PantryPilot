import { priorities } from "../data/inventoryOptions.js";

const priorityRankByValue = Object.fromEntries(
  priorities.map((priority) => [priority.value, priority.rank]),
);

export function filterInventoryItems(items, filters) {
  const searchTerm = filters.search.trim().toLowerCase();

  return items.filter((item) => {
    const matchesLocation =
      filters.location === "all" || item.location === filters.location;
    const matchesCategory =
      filters.category === "all" || item.category === filters.category;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);

    return matchesLocation && matchesCategory && matchesSearch;
  });
}

export function sortInventoryItems(items, sortBy) {
  return [...items].sort((firstItem, secondItem) => {
    if (sortBy === "priority") {
      return (
        (priorityRankByValue[secondItem.priority] || 0) -
        (priorityRankByValue[firstItem.priority] || 0)
      );
    }

    const firstDate = firstItem.storedDate || "";
    const secondDate = secondItem.storedDate || "";

    if (sortBy === "date_asc") {
      return firstDate.localeCompare(secondDate);
    }

    return secondDate.localeCompare(firstDate);
  });
}
