import { medicines, type Medicine, type StockStatus } from "@/lib/data";

/**
 * Stock status is derived, never stored: the same medicine can be healthy in
 * one branch and critical in another, and a cached status is how those drift.
 */
export function stockStatus(medicine: Medicine): StockStatus {
  if (medicine.stock === 0) return "out";
  if (medicine.stock <= medicine.reorderLevel * 0.5) return "critical";
  if (medicine.stock <= medicine.reorderLevel) return "low";
  return "healthy";
}

export function stockValue() {
  return medicines.reduce((sum, medicine) => sum + medicine.stock * medicine.cost, 0);
}

export function lowStockCount() {
  return medicines.filter((medicine) => {
    const status = stockStatus(medicine);
    return status === "low" || status === "critical" || status === "out";
  }).length;
}

export function weeksOfCover(medicine: Medicine) {
  if (medicine.dispensing30d === 0) return 0;
  return (medicine.stock / medicine.dispensing30d) * 4.3;
}
