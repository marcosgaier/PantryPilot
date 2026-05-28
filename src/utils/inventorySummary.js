import { locations, priorities, units } from "../data/inventoryOptions.js";
import { formatDisplayDate } from "./dateFormat.js";

const labelByValue = (options) =>
  Object.fromEntries(options.map((option) => [option.value, option.label]));

const locationHeadingByValue = Object.fromEntries(
  locations.map((location) => [location.value, location.heading]),
);
const priorityLabelByValue = labelByValue(priorities);
const unitLabelByValue = Object.fromEntries(
  units.map((unit) => [unit.value, unit.shortLabel || unit.label]),
);

export function buildInventorySummary(items) {
  return locations
    .map((location) => {
      const locationItems = items
        .filter((item) => item.location === location.value)
        .sort((firstItem, secondItem) => firstItem.name.localeCompare(secondItem.name));

      if (locationItems.length === 0) {
        return `${locationHeadingByValue[location.value]}\n- Sin items`;
      }

      const itemLines = locationItems.map((item) => {
        const details = [`${item.quantity} ${unitLabelByValue[item.unit] || item.unit}`];

        if (item.storedDate) {
          details.push(`guardado ${formatDisplayDate(item.storedDate)}`);
        }

        if (item.priority && item.priority !== "normal") {
          details.push(`prioridad ${priorityLabelByValue[item.priority].toLowerCase()}`);
        }

        if (item.approximateWeight) {
          details.push(`peso aprox. ${item.approximateWeight}`);
        }

        if (item.note) {
          details.push(`nota: ${item.note}`);
        }

        return `- ${item.name}: ${details.join(", ")}`;
      });

      return `${locationHeadingByValue[location.value]}\n${itemLines.join("\n")}`;
    })
    .join("\n\n");
}
