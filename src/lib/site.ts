export const SITE = {
  name: "Pharmiq",
  domain: "pharmiq.online",
  tagline: "AI for pharmacy operations",
  description:
    "Batch-level inventory, expiry control, FEFO dispensing and a verified clinical assistant in one calm workspace.",
  company: "Pharmiq", // "Ivents",
  companyLine: "Pharmiq", // "Pharmiq is a product of Ivents.",
  email: "hello@pharmiq.online",
  phone: "+234 812 000 4488",
  city: "Lagos, Nigeria",
  location: "Lagos, Nigeria",
  lastUpdated: "4 November 2026",
};

export const MARKETING_NAV = [
  { label: "Platform", href: "/platform" },
  { label: "Expiry control", href: "/expiry" },
  { label: "Assistant", href: "/assistant" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
] as const;

export const PLATFORM_MENU = [
  {
    title: "Inventory & batches",
    description: "Every pack, every batch, every shelf location.",
    href: "/platform",
    icon: "boxes",
  },
  {
    title: "Expiry command centre",
    description: "See value at risk before it becomes a write-off.",
    href: "/expiry",
    icon: "calendar",
  },
  {
    title: "FEFO dispensing",
    description: "Earliest expiry first, enforced at the counter.",
    href: "/fefo",
    icon: "scan",
  },
  {
    title: "Prescription workflow",
    description: "Intake, verification, dispensing and handover.",
    href: "/platform",
    icon: "clipboard",
  },
  {
    title: "Reorder intelligence",
    description: "Suggested quantities from real dispensing velocity.",
    href: "/platform",
    icon: "trending",
  },
  {
    title: "Clinical assistant",
    description: "Answers with sources your pharmacist can audit.",
    href: "/assistant",
    icon: "sparkles",
  },
] as const;

export const DASHBOARD_NAV = [
  { label: "Overview", href: "/dashboard", icon: "layout" },
  { label: "Inventory", href: "/dashboard/inventory", icon: "boxes" },
  { label: "Catalog", href: "/dashboard/catalog", icon: "book" },
  { label: "Batches", href: "/dashboard/batches", icon: "layers" },
  { label: "Expiry", href: "/dashboard/expiry", icon: "calendar" },
  { label: "Prescriptions", href: "/dashboard/prescriptions", icon: "clipboard" },
  { label: "Reorders", href: "/dashboard/reorders", icon: "trending" },
  { label: "Assistant", href: "/dashboard/assistant", icon: "sparkles" },
] as const;

export const DASHBOARD_SECONDARY_NAV = [
  { label: "Suppliers", href: "/dashboard/suppliers", icon: "truck" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "chart" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
] as const;

export const BRANCHES = [
  { id: "ikeja", name: "Ikeja City", address: "Allen Avenue, Ikeja", staff: 6 },
  { id: "yaba", name: "Yaba Central", address: "Herbert Macaulay Way", staff: 4 },
  { id: "lekki", name: "Lekki Phase 1", address: "Admiralty Way", staff: 5 },
] as const;
