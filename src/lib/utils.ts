import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Nigerian naira, no decimals unless the caller asks for them. */
export function naira(value: number, decimals = 0) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  })
    .format(value)
    .replace("NGN", "₦")
    .replace(/\s/g, "");
}

export function compactNaira(value: number) {
  if (Math.abs(value) >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}m`;
  if (Math.abs(value) >= 1_000) return `₦${(value / 1_000).toFixed(0)}k`;
  return `₦${value}`;
}

export function number(value: number) {
  return new Intl.NumberFormat("en-NG").format(value);
}

export function percent(value: number, decimals = 1) {
  return `${value > 0 ? "+" : ""}${value.toFixed(decimals)}%`;
}

/** Days between two ISO dates, floored. Negative means already expired. */
export function daysUntil(iso: string, from = new Date("2026-11-05")) {
  const target = new Date(`${iso}T00:00:00`);
  const diff = target.getTime() - from.getTime();
  return Math.ceil(diff / 86_400_000);
}

export function shortDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
