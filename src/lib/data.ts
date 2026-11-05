import { daysUntil } from "@/lib/utils";

/* ------------------------------------------------------------------ types */

export type StockStatus = "healthy" | "low" | "critical" | "out";

export type Medicine = {
  id: string;
  name: string;
  generic: string;
  brand: string;
  strength: string;
  form: string;
  category: string;
  manufacturer: string;
  unit: string;
  price: number;
  cost: number;
  reorderLevel: number;
  stock: number;
  shelf: string;
  rxOnly: boolean;
  dispensing30d: number;
};

export type Batch = {
  id: string;
  batchNo: string;
  medicineId: string;
  medicine: string;
  strength: string;
  qty: number;
  expiry: string;
  supplier: string;
  received: string;
  cost: number;
  location: string;
};

export type Prescription = {
  id: string;
  patient: string;
  age: number;
  prescriber: string;
  facility: string;
  items: string[];
  status: "awaiting" | "verifying" | "ready" | "collected";
  received: string;
  channel: "Walk-in" | "WhatsApp" | "Referral" | "Phone";
  insurance: string;
  flag?: string;
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  leadTime: number;
  reliability: number;
  outstanding: number;
  lastOrder: string;
  categories: string[];
};

export type AlertItem = {
  id: string;
  medicineId: string;
  medicine: string;
  strength: string;
  type: "low-stock" | "expiring" | "out-of-stock" | "recall";
  severity: "high" | "medium" | "low";
  message: string;
  suggestedQty: number;
  supplier: string;
  value?: number;
};

/* ----------------------------------------------------------------- catalog */

export const medicines: Medicine[] = [
  {
    id: "amox-500",
    name: "Amoxicillin",
    generic: "Amoxicillin trihydrate",
    brand: "Amoxil",
    strength: "500 mg",
    form: "Capsule",
    category: "Antibiotic",
    manufacturer: "GSK Nigeria",
    unit: "pack of 21",
    price: 4200,
    cost: 2950,
    reorderLevel: 40,
    stock: 128,
    shelf: "A1-03",
    rxOnly: true,
    dispensing30d: 96,
  },
  {
    id: "coartem-80",
    name: "Artemether / Lumefantrine",
    generic: "Artemether 80 mg + Lumefantrine 480 mg",
    brand: "Coartem",
    strength: "80/480 mg",
    form: "Tablet",
    category: "Antimalarial",
    manufacturer: "Novartis",
    unit: "pack of 6",
    price: 6800,
    cost: 4900,
    reorderLevel: 50,
    stock: 34,
    shelf: "B2-01",
    rxOnly: false,
    dispensing30d: 142,
  },
  {
    id: "para-500",
    name: "Paracetamol",
    generic: "Paracetamol",
    brand: "Panadol",
    strength: "500 mg",
    form: "Tablet",
    category: "Analgesic",
    manufacturer: "GSK Nigeria",
    unit: "pack of 20",
    price: 1200,
    cost: 780,
    reorderLevel: 80,
    stock: 412,
    shelf: "A3-02",
    rxOnly: false,
    dispensing30d: 318,
  },
  {
    id: "metformin-500",
    name: "Metformin",
    generic: "Metformin hydrochloride",
    brand: "Glucophage",
    strength: "500 mg",
    form: "Tablet",
    category: "Antidiabetic",
    manufacturer: "Merck",
    unit: "pack of 30",
    price: 3500,
    cost: 2400,
    reorderLevel: 30,
    stock: 22,
    shelf: "C1-04",
    rxOnly: true,
    dispensing30d: 61,
  },
  {
    id: "amlo-5",
    name: "Amlodipine",
    generic: "Amlodipine besylate",
    brand: "Norvasc",
    strength: "5 mg",
    form: "Tablet",
    category: "Antihypertensive",
    manufacturer: "Pfizer",
    unit: "pack of 30",
    price: 3900,
    cost: 2680,
    reorderLevel: 30,
    stock: 76,
    shelf: "C1-02",
    rxOnly: true,
    dispensing30d: 74,
  },
  {
    id: "omeprazole-20",
    name: "Omeprazole",
    generic: "Omeprazole",
    brand: "Losec",
    strength: "20 mg",
    form: "Capsule",
    category: "Gastrointestinal",
    manufacturer: "AstraZeneca",
    unit: "pack of 14",
    price: 2800,
    cost: 1850,
    reorderLevel: 25,
    stock: 18,
    shelf: "B1-03",
    rxOnly: false,
    dispensing30d: 83,
  },
  {
    id: "salbutamol",
    name: "Salbutamol",
    generic: "Salbutamol sulfate",
    brand: "Ventolin",
    strength: "100 mcg",
    form: "Inhaler",
    category: "Respiratory",
    manufacturer: "GSK Nigeria",
    unit: "200 doses",
    price: 7600,
    cost: 5600,
    reorderLevel: 12,
    stock: 9,
    shelf: "D2-01",
    rxOnly: true,
    dispensing30d: 27,
  },
  {
    id: "ceftriaxone-1g",
    name: "Ceftriaxone",
    generic: "Ceftriaxone sodium",
    brand: "Rocephin",
    strength: "1 g",
    form: "Injection",
    category: "Antibiotic",
    manufacturer: "Roche",
    unit: "vial",
    price: 3200,
    cost: 2240,
    reorderLevel: 20,
    stock: 0,
    shelf: "E1-02",
    rxOnly: true,
    dispensing30d: 44,
  },
  {
    id: "ibuprofen-400",
    name: "Ibuprofen",
    generic: "Ibuprofen",
    brand: "Brufen",
    strength: "400 mg",
    form: "Tablet",
    category: "Analgesic",
    manufacturer: "Abbott",
    unit: "pack of 20",
    price: 1600,
    cost: 1020,
    reorderLevel: 40,
    stock: 208,
    shelf: "A3-05",
    rxOnly: false,
    dispensing30d: 187,
  },
  {
    id: "vitc-1000",
    name: "Vitamin C",
    generic: "Ascorbic acid",
    brand: "Emzor",
    strength: "1000 mg",
    form: "Tablet",
    category: "Supplement",
    manufacturer: "Emzor",
    unit: "pack of 30",
    price: 1800,
    cost: 980,
    reorderLevel: 30,
    stock: 154,
    shelf: "F1-02",
    rxOnly: false,
    dispensing30d: 122,
  },
  {
    id: "loratadine-10",
    name: "Loratadine",
    generic: "Loratadine",
    brand: "Claritin",
    strength: "10 mg",
    form: "Tablet",
    category: "Antihistamine",
    manufacturer: "Bayer",
    unit: "pack of 10",
    price: 2100,
    cost: 1380,
    reorderLevel: 20,
    stock: 63,
    shelf: "B3-04",
    rxOnly: false,
    dispensing30d: 39,
  },
  {
    id: "ors",
    name: "Oral rehydration salts",
    generic: "Sodium chloride + potassium chloride + glucose",
    brand: "ORS Plus",
    strength: "20.5 g",
    form: "Sachet",
    category: "Rehydration",
    manufacturer: "Fidson",
    unit: "sachet",
    price: 700,
    cost: 380,
    reorderLevel: 60,
    stock: 96,
    shelf: "F2-01",
    rxOnly: false,
    dispensing30d: 214,
  },
  {
    id: "insulin-glargine",
    name: "Insulin glargine",
    generic: "Insulin glargine",
    brand: "Lantus",
    strength: "100 IU/mL",
    form: "Injection pen",
    category: "Antidiabetic",
    manufacturer: "Sanofi",
    unit: "3 mL pen",
    price: 18500,
    cost: 14200,
    reorderLevel: 8,
    stock: 11,
    shelf: "COLD-01",
    rxOnly: true,
    dispensing30d: 18,
  },
  {
    id: "azithro-500",
    name: "Azithromycin",
    generic: "Azithromycin dihydrate",
    brand: "Zithromax",
    strength: "500 mg",
    form: "Tablet",
    category: "Antibiotic",
    manufacturer: "Pfizer",
    unit: "pack of 3",
    price: 5200,
    cost: 3700,
    reorderLevel: 15,
    stock: 12,
    shelf: "A1-06",
    rxOnly: true,
    dispensing30d: 33,
  },
  {
    id: "ferrous-200",
    name: "Ferrous sulphate",
    generic: "Ferrous sulphate + folic acid",
    brand: "Haematinic",
    strength: "200 mg",
    form: "Tablet",
    category: "Supplement",
    manufacturer: "Vitabiotics",
    unit: "pack of 30",
    price: 2400,
    cost: 1500,
    reorderLevel: 25,
    stock: 88,
    shelf: "F1-05",
    rxOnly: false,
    dispensing30d: 58,
  },
  {
    id: "diclofenac-gel",
    name: "Diclofenac",
    generic: "Diclofenac sodium",
    brand: "Voltaren",
    strength: "1%",
    form: "Topical gel",
    category: "Analgesic",
    manufacturer: "Novartis",
    unit: "50 g tube",
    price: 3400,
    cost: 2250,
    reorderLevel: 20,
    stock: 41,
    shelf: "A4-02",
    rxOnly: false,
    dispensing30d: 47,
  },
];

/* ------------------------------------------------------------------ batches */

export const batches: Batch[] = [
  {
    id: "b-1042",
    batchNo: "AMX-4471",
    medicineId: "amox-500",
    medicine: "Amoxicillin",
    strength: "500 mg",
    qty: 64,
    expiry: "2026-11-18",
    supplier: "Emzor Distribution",
    received: "2026-06-12",
    cost: 2950,
    location: "Ikeja City",
  },
  {
    id: "b-1043",
    batchNo: "ART-2208",
    medicineId: "coartem-80",
    medicine: "Artemether / Lumefantrine",
    strength: "80/480 mg",
    qty: 22,
    expiry: "2026-12-02",
    supplier: "Novartis Direct",
    received: "2026-05-28",
    cost: 4900,
    location: "Ikeja City",
  },
  {
    id: "b-1044",
    batchNo: "OME-7710",
    medicineId: "omeprazole-20",
    medicine: "Omeprazole",
    strength: "20 mg",
    qty: 10,
    expiry: "2026-12-19",
    supplier: "Fidson Healthcare",
    received: "2026-07-02",
    cost: 1850,
    location: "Yaba Central",
  },
  {
    id: "b-1045",
    batchNo: "SAL-3320",
    medicineId: "salbutamol",
    medicine: "Salbutamol",
    strength: "100 mcg",
    qty: 9,
    expiry: "2027-01-08",
    supplier: "GSK Nigeria",
    received: "2026-08-16",
    cost: 5600,
    location: "Lekki Phase 1",
  },
  {
    id: "b-1046",
    batchNo: "MET-5512",
    medicineId: "metformin-500",
    medicine: "Metformin",
    strength: "500 mg",
    qty: 22,
    expiry: "2027-02-14",
    supplier: "Merck Distribution",
    received: "2026-09-04",
    cost: 2400,
    location: "Ikeja City",
  },
  {
    id: "b-1047",
    batchNo: "AMX-4488",
    medicineId: "amox-500",
    medicine: "Amoxicillin",
    strength: "500 mg",
    qty: 64,
    expiry: "2027-03-08",
    supplier: "Emzor Distribution",
    received: "2026-09-19",
    cost: 2950,
    location: "Ikeja City",
  },
  {
    id: "b-1048",
    batchNo: "ART-2251",
    medicineId: "coartem-80",
    medicine: "Artemether / Lumefantrine",
    strength: "80/480 mg",
    qty: 12,
    expiry: "2027-03-30",
    supplier: "Novartis Direct",
    received: "2026-10-01",
    cost: 4900,
    location: "Yaba Central",
  },
  {
    id: "b-1049",
    batchNo: "PAR-9014",
    medicineId: "para-500",
    medicine: "Paracetamol",
    strength: "500 mg",
    qty: 210,
    expiry: "2027-06-11",
    supplier: "Emzor Distribution",
    received: "2026-08-21",
    cost: 780,
    location: "Ikeja City",
  },
  {
    id: "b-1050",
    batchNo: "PAR-9021",
    medicineId: "para-500",
    medicine: "Paracetamol",
    strength: "500 mg",
    qty: 202,
    expiry: "2027-09-27",
    supplier: "Emzor Distribution",
    received: "2026-10-02",
    cost: 780,
    location: "Yaba Central",
  },
  {
    id: "b-1051",
    batchNo: "IBU-1140",
    medicineId: "ibuprofen-400",
    medicine: "Ibuprofen",
    strength: "400 mg",
    qty: 208,
    expiry: "2027-05-04",
    supplier: "Abbott Nigeria",
    received: "2026-07-14",
    cost: 1020,
    location: "Lekki Phase 1",
  },
  {
    id: "b-1052",
    batchNo: "INS-0081",
    medicineId: "insulin-glargine",
    medicine: "Insulin glargine",
    strength: "100 IU/mL",
    qty: 11,
    expiry: "2027-01-22",
    supplier: "Sanofi Direct",
    received: "2026-09-09",
    cost: 14200,
    location: "Cold room A",
  },
  {
    id: "b-1053",
    batchNo: "AZI-6630",
    medicineId: "azithro-500",
    medicine: "Azithromycin",
    strength: "500 mg",
    qty: 12,
    expiry: "2027-04-18",
    supplier: "Pfizer Nigeria",
    received: "2026-09-23",
    cost: 3700,
    location: "Ikeja City",
  },
  {
    id: "b-1054",
    batchNo: "VIT-4420",
    medicineId: "vitc-1000",
    medicine: "Vitamin C",
    strength: "1000 mg",
    qty: 154,
    expiry: "2027-08-15",
    supplier: "Fidson Healthcare",
    received: "2026-08-02",
    cost: 980,
    location: "Yaba Central",
  },
  {
    id: "b-1055",
    batchNo: "ORS-2210",
    medicineId: "ors",
    medicine: "Oral rehydration salts",
    strength: "20.5 g",
    qty: 96,
    expiry: "2027-07-09",
    supplier: "Fidson Healthcare",
    received: "2026-06-30",
    cost: 380,
    location: "Lekki Phase 1",
  },
  {
    id: "b-1056",
    batchNo: "LOR-8890",
    medicineId: "loratadine-10",
    medicine: "Loratadine",
    strength: "10 mg",
    qty: 63,
    expiry: "2027-10-02",
    supplier: "Bayer Nigeria",
    received: "2026-09-27",
    cost: 1380,
    location: "Ikeja City",
  },
  {
    id: "b-1057",
    batchNo: "AMLO-7712",
    medicineId: "amlo-5",
    medicine: "Amlodipine",
    strength: "5 mg",
    qty: 76,
    expiry: "2027-02-28",
    supplier: "Pfizer Nigeria",
    received: "2026-05-11",
    cost: 2680,
    location: "Lekki Phase 1",
  },
  {
    id: "b-1058",
    batchNo: "DIC-3314",
    medicineId: "diclofenac-gel",
    medicine: "Diclofenac",
    strength: "1%",
    qty: 41,
    expiry: "2027-06-22",
    supplier: "Novartis Direct",
    received: "2026-07-25",
    cost: 2250,
    location: "Yaba Central",
  },
  {
    id: "b-1059",
    batchNo: "FER-1192",
    medicineId: "ferrous-200",
    medicine: "Ferrous sulphate",
    strength: "200 mg",
    qty: 88,
    expiry: "2028-01-19",
    supplier: "Vitabiotics West Africa",
    received: "2026-10-04",
    cost: 1500,
    location: "Ikeja City",
  },
  {
    id: "b-1060",
    batchNo: "AMX-4510",
    medicineId: "amox-500",
    medicine: "Amoxicillin",
    strength: "500 mg",
    qty: 0,
    expiry: "2026-10-29",
    supplier: "Emzor Distribution",
    received: "2026-04-04",
    cost: 2950,
    location: "Quarantine",
  },
];

/* ------------------------------------------------------------------ expiry */

/** Batches inside the 90-day window, ordered FEFO (earliest expiry first). */
export const expiringBatches = batches
  .filter((batch) => {
    const days = daysUntil(batch.expiry);
    return batch.qty > 0 && days <= 120;
  })
  .sort((a, b) => a.expiry.localeCompare(b.expiry));

export const expiryBuckets = [
  {
    id: "0-30",
    label: "0–30 days",
    tone: "rose" as const,
    note: "Pull now, return or discount",
    batches: expiringBatches.filter((batch) => daysUntil(batch.expiry) <= 30),
  },
  {
    id: "31-60",
    label: "31–60 days",
    tone: "amber" as const,
    note: "Prioritise in FEFO queue",
    batches: expiringBatches.filter((batch) => {
      const days = daysUntil(batch.expiry);
      return days > 30 && days <= 60;
    }),
  },
  {
    id: "61-90",
    label: "61–90 days",
    tone: "mint" as const,
    note: "Plan promotions this cycle",
    batches: expiringBatches.filter((batch) => {
      const days = daysUntil(batch.expiry);
      return days > 60 && days <= 90;
    }),
  },
].map((bucket) => ({
  ...bucket,
  units: bucket.batches.reduce((sum, batch) => sum + batch.qty, 0),
  value: bucket.batches.reduce((sum, batch) => sum + batch.qty * batch.cost, 0),
}));

export const valueAtRisk = expiryBuckets
  .filter((bucket) => bucket.id !== "61-90")
  .reduce((sum, bucket) => sum + bucket.value, 0);

/* ------------------------------------------------------------ prescriptions */

export const prescriptions: Prescription[] = [
  {
    id: "RX-20931",
    patient: "Adaeze Nwosu",
    age: 34,
    prescriber: "Dr. O. Balogun",
    facility: "Ikeja General Hospital",
    items: ["Amoxicillin 500 mg · 21 caps", "Paracetamol 500 mg · 20 tabs"],
    status: "awaiting",
    received: "10:24",
    channel: "Walk-in",
    insurance: "AXA Mansard",
    flag: "Penicillin allergy noted in profile",
  },
  {
    id: "RX-20930",
    patient: "Emeka Okafor",
    age: 58,
    prescriber: "Dr. F. Adeyemi",
    facility: "St. Mary's Clinic",
    items: ["Metformin 500 mg · 60 tabs", "Amlodipine 5 mg · 30 tabs"],
    status: "verifying",
    received: "10:08",
    channel: "WhatsApp",
    insurance: "Self-pay",
  },
  {
    id: "RX-20929",
    patient: "Fatima Bello",
    age: 41,
    prescriber: "Dr. S. Ibrahim",
    facility: "Yaba Medical Centre",
    items: ["Artemether/Lumefantrine 80/480 mg · 6 tabs"],
    status: "ready",
    received: "09:52",
    channel: "Referral",
    insurance: "Hygeia HMO",
  },
  {
    id: "RX-20928",
    patient: "Tunde Adebayo",
    age: 29,
    prescriber: "Dr. C. Eze",
    facility: "Lekki Wellness",
    items: ["Salbutamol inhaler · 1", "Loratadine 10 mg · 10 tabs"],
    status: "awaiting",
    received: "09:40",
    channel: "Walk-in",
    insurance: "Reliance HMO",
    flag: "Inhaler technique counselling required",
  },
  {
    id: "RX-20927",
    patient: "Chiamaka Obi",
    age: 26,
    prescriber: "Dr. A. Lawal",
    facility: "Ikeja General Hospital",
    items: ["Ferrous sulphate 200 mg · 30 tabs", "Vitamin C 1000 mg · 30 tabs"],
    status: "collected",
    received: "09:12",
    channel: "Walk-in",
    insurance: "Self-pay",
  },
  {
    id: "RX-20926",
    patient: "Musa Danjuma",
    age: 63,
    prescriber: "Dr. K. Ojo",
    facility: "Diabetes Care Clinic",
    items: ["Insulin glargine 100 IU/mL · 2 pens"],
    status: "ready",
    received: "08:58",
    channel: "Phone",
    insurance: "AXA Mansard",
    flag: "Cold chain: collect within 30 min",
  },
  {
    id: "RX-20925",
    patient: "Ngozi Eze",
    age: 37,
    prescriber: "Dr. P. Nnamdi",
    facility: "Yaba Medical Centre",
    items: ["Azithromycin 500 mg · 3 tabs", "Omeprazole 20 mg · 14 caps"],
    status: "collected",
    received: "08:31",
    channel: "Referral",
    insurance: "Hygeia HMO",
  },
  {
    id: "RX-20924",
    patient: "Segun Alabi",
    age: 45,
    prescriber: "Dr. B. Oyelaran",
    facility: "Lekki Wellness",
    items: ["Diclofenac 1% gel · 1", "Ibuprofen 400 mg · 20 tabs"],
    status: "verifying",
    received: "08:14",
    channel: "WhatsApp",
    insurance: "Self-pay",
  },
];

export const prescriptionFlow = [
  { key: "awaiting", label: "Awaiting", count: 2 },
  { key: "verifying", label: "Verifying", count: 2 },
  { key: "ready", label: "Ready", count: 2 },
  { key: "collected", label: "Collected", count: 2 },
] as const;

/* ---------------------------------------------------------------- suppliers */

export const suppliers: Supplier[] = [
  {
    id: "sup-01",
    name: "Emzor Distribution",
    contact: "orders@emzor.example",
    leadTime: 2,
    reliability: 96,
    outstanding: 1840000,
    lastOrder: "2026-10-28",
    categories: ["Analgesics", "Antibiotics", "Supplements"],
  },
  {
    id: "sup-02",
    name: "Fidson Healthcare",
    contact: "supply@fidson.example",
    leadTime: 3,
    reliability: 92,
    outstanding: 940000,
    lastOrder: "2026-10-21",
    categories: ["Gastro", "Rehydration", "Supplements"],
  },
  {
    id: "sup-03",
    name: "Novartis Direct",
    contact: "ng.orders@novartis.example",
    leadTime: 5,
    reliability: 88,
    outstanding: 2650000,
    lastOrder: "2026-10-16",
    categories: ["Antimalarials", "Cardiovascular"],
  },
  {
    id: "sup-04",
    name: "GSK Nigeria",
    contact: "trade@gsk.example",
    leadTime: 4,
    reliability: 94,
    outstanding: 1210000,
    lastOrder: "2026-10-30",
    categories: ["Respiratory", "Analgesics"],
  },
  {
    id: "sup-05",
    name: "Sanofi Direct",
    contact: "care@sanofi.example",
    leadTime: 6,
    reliability: 91,
    outstanding: 0,
    lastOrder: "2026-09-30",
    categories: ["Diabetes", "Cold chain"],
  },
];

/* ------------------------------------------------------------------- alerts */

export const alerts: AlertItem[] = [
  {
    id: "al-1",
    medicineId: "ceftriaxone-1g",
    medicine: "Ceftriaxone",
    strength: "1 g injection",
    type: "out-of-stock",
    severity: "high",
    message: "Stock-out · 0 vials on hand, 44 dispensed in 30 days",
    suggestedQty: 40,
    supplier: "Roche",
  },
  {
    id: "al-2",
    medicineId: "amox-500",
    medicine: "Amoxicillin",
    strength: "500 mg",
    type: "expiring",
    severity: "high",
    message: "Batch AMX-4471 expires in 13 days · 64 packs",
    suggestedQty: 0,
    supplier: "Emzor Distribution",
    value: 188800,
  },
  {
    id: "al-3",
    medicineId: "metformin-500",
    medicine: "Metformin",
    strength: "500 mg",
    type: "low-stock",
    severity: "high",
    message: "22 packs left · below reorder point of 30",
    suggestedQty: 60,
    supplier: "Merck Distribution",
  },
  {
    id: "al-4",
    medicineId: "salbutamol",
    medicine: "Salbutamol",
    strength: "100 mcg inhaler",
    type: "low-stock",
    severity: "medium",
    message: "9 inhalers left · 27 dispensed in 30 days",
    suggestedQty: 24,
    supplier: "GSK Nigeria",
  },
  {
    id: "al-5",
    medicineId: "omeprazole-20",
    medicine: "Omeprazole",
    strength: "20 mg",
    type: "low-stock",
    severity: "medium",
    message: "18 packs left · below reorder point of 25",
    suggestedQty: 48,
    supplier: "Fidson Healthcare",
  },
  {
    id: "al-6",
    medicineId: "coartem-80",
    medicine: "Artemether / Lumefantrine",
    strength: "80/480 mg",
    type: "expiring",
    severity: "medium",
    message: "Batch ART-2208 expires in 27 days · 22 packs",
    suggestedQty: 0,
    supplier: "Novartis Direct",
    value: 107800,
  },
  {
    id: "al-7",
    medicineId: "insulin-glargine",
    medicine: "Insulin glargine",
    strength: "100 IU/mL",
    type: "recall",
    severity: "low",
    message: "Manufacturer notice: verify batch INS-0081 cold-chain log",
    suggestedQty: 0,
    supplier: "Sanofi Direct",
  },
  {
    id: "al-8",
    medicineId: "azithro-500",
    medicine: "Azithromycin",
    strength: "500 mg",
    type: "low-stock",
    severity: "medium",
    message: "12 packs left · 33 dispensed in 30 days",
    suggestedQty: 24,
    supplier: "Pfizer Nigeria",
  },
];

/* ------------------------------------------------------------------ metrics */

export const dispensingSeries = [
  { label: "Mon", value: 412000, units: 86 },
  { label: "Tue", value: 386000, units: 79 },
  { label: "Wed", value: 468000, units: 94 },
  { label: "Thu", value: 441000, units: 88 },
  { label: "Fri", value: 522000, units: 104 },
  { label: "Sat", value: 611000, units: 121 },
  { label: "Sun", value: 298000, units: 62 },
];

export const monthlyDispensing = [
  { month: "Jun", revenue: 8.4, scripts: 1810 },
  { month: "Jul", revenue: 9.1, scripts: 1924 },
  { month: "Aug", revenue: 8.8, scripts: 1866 },
  { month: "Sep", revenue: 10.2, scripts: 2048 },
  { month: "Oct", revenue: 11.4, scripts: 2196 },
  { month: "Nov", revenue: 4.2, scripts: 812 },
];

export const categoryMix = [
  { label: "Antibiotics", value: 28, color: "#3ddc97" },
  { label: "Analgesics", value: 22, color: "#3ddbd0" },
  { label: "Antimalarials", value: 17, color: "#a78bfa" },
  { label: "Cardiometabolic", value: 15, color: "#f7b955" },
  { label: "Gastro", value: 10, color: "#5b8cff" },
  { label: "Other", value: 8, color: "#4d635c" },
];

export const topMovers = [
  { name: "Paracetamol 500 mg", units: 318, revenue: 381600, change: 12.4 },
  { name: "ORS sachets", units: 214, revenue: 149800, change: 8.1 },
  { name: "Ibuprofen 400 mg", units: 187, revenue: 299200, change: 4.6 },
  { name: "Artemether/Lumefantrine", units: 142, revenue: 965600, change: -3.2 },
  { name: "Vitamin C 1000 mg", units: 122, revenue: 219600, change: 6.8 },
];

export const slowMovers = [
  { name: "Ceftriaxone 1 g", units: 44, cover: 0, note: "Stock-out" },
  { name: "Diclofenac 1% gel", units: 47, cover: 26, note: "26 days cover" },
  { name: "Loratadine 10 mg", units: 39, cover: 48, note: "Seasonal" },
];

export const assistantPrompts = [
  "Which medicines expire in the next 30 days?",
  "What should I reorder for Ikeja City?",
  "Is amoxicillin safe for a patient with a penicillin allergy?",
  "How much did we dispense this week?",
];

export const assistantAnswers: Record<string, { body: string[]; sources?: string[]; meta?: string }> = {
  "Which medicines expire in the next 30 days?": {
    body: [
      "Four batches fall inside 30 days, worth ₦296,600 at cost.",
      "• Amoxicillin 500 mg · AMX-4471 · 64 packs · 18 Nov 2026 (13 days)\n• Artemether/Lumefantrine 80/480 mg · ART-2208 · 22 packs · 02 Dec 2026 (27 days)\n• Omeprazole 20 mg · OME-7710 · 10 packs · 19 Dec 2026 (44 days — outside window)",
      "Recommended: move AMX-4471 to the front of the FEFO queue at Ikeja City, and raise a return request for any packs not dispensed by 12 Nov.",
    ],
    meta: "Scanned 19 live batches across 3 branches",
  },
  "What should I reorder for Ikeja City?": {
    body: [
      "Three items need action at Ikeja City this week:",
      "• Ceftriaxone 1 g — stock-out. Suggest 40 vials (44 dispensed in 30 days, 5-day supplier lead time).\n• Metformin 500 mg — 22 packs. Suggest 60 packs (2.9 weeks of cover).\n• Salbutamol 100 mcg — 9 inhalers. Suggest 24 (move 3 from Lekki to cover the weekend).",
      "Estimated purchase value: ₦412,800. I can draft the purchase orders for your approval.",
    ],
    meta: "Based on 30-day dispensing velocity and supplier lead times",
  },
  "Is amoxicillin safe for a patient with a penicillin allergy?": {
    body: [
      "No — amoxicillin is a penicillin and is contraindicated in a documented penicillin allergy. Reactions range from rash to anaphylaxis, and cross-reactivity extends to other beta-lactams.",
      "Consider a non-penicillin alternative only after the prescriber reviews the history and severity of the reaction. Do not substitute independently.",
    ],
    sources: ["BNF (amoxicillin, contraindications)", "WHO Model Formulary", "Manufacturer SmPC"],
    meta: "Clinical reference · verify against the patient record and prescriber",
  },
  "How much did we dispense this week?": {
    body: [
      "This week: ₦3,138,000 across 634 dispensed units, up 9.4% on last week.",
      "Saturday was the strongest day (₦611,000). Antibiotics and analgesics accounted for 51% of revenue.",
      "Expiry-adjusted margin is 31.2%, down 0.6 points because of two discounted short-dated batches.",
    ],
    meta: "Chain-wide · 3 branches · week to 05 Nov 2026",
  },
};

/* ------------------------------------------------------------------ branch */

export const branchPerformance = [
  { branch: "Ikeja City", revenue: 1840000, scripts: 268, cover: 92, lowStock: 4 },
  { branch: "Yaba Central", revenue: 940000, scripts: 194, cover: 96, lowStock: 3 },
  { branch: "Lekki Phase 1", revenue: 1280000, scripts: 172, cover: 84, lowStock: 2 },
];

export const trustLogos = [
  "Cedar Pharmacy",
  "Wellspring Chemists",
  "Atlas Care",
  "Bloom Health Mart",
  "Northline Pharmacy",
  "Meridian Drugs",
];

export const testimonials = [
  {
    quote:
      "We used to find expired stock during the monthly count. Now it is on a screen before it costs us. The first quarter paid for the subscription twice over.",
    name: "Adaeze Nwankwo",
    role: "Superintendent Pharmacist, Cedar Pharmacy",
    initials: "AN",
  },
  {
    quote:
      "FEFO is the feature I did not know I needed. The counter staff stopped arguing about which pack to pick, and our short-dated losses fell by two thirds.",
    name: "Yusuf Adeleke",
    role: "Owner, Northline Pharmacy (4 branches)",
    initials: "YA",
  },
  {
    quote:
      "The assistant is careful. It cites what it used, and it refuses to answer when the record is incomplete. That is exactly the behaviour I want behind my counter.",
    name: "Chinelo Okeke",
    role: "Clinical Pharmacist, Atlas Care",
    initials: "CO",
  },
];

export const pricing = [
  {
    name: "Counter",
    price: 18000,
    annual: 15000,
    description: "One branch, one pharmacist, everything you need at the till.",
    features: [
      "1 branch · up to 3 users",
      "1,500 medicine catalog entries",
      "Batch & expiry tracking",
      "FEFO dispensing",
      "Prescription queue",
      "Email support",
    ],
    cta: "Start free for 14 days",
    featured: false,
  },
  {
    name: "Group",
    price: 42000,
    annual: 35000,
    description: "Multi-branch groups that need one view of stock and expiry.",
    features: [
      "Up to 5 branches · unlimited users",
      "Unlimited catalog and batches",
      "Inter-branch stock transfers",
      "Reorder intelligence & POs",
      "Clinical assistant with sources",
      "Analytics and board export",
      "Priority support",
    ],
    cta: "Talk to our team",
    featured: true,
  },
  {
    name: "Network",
    price: 0,
    annual: 0,
    description: "Hospitals, distributors and chains with custom requirements.",
    features: [
      "Unlimited branches",
      "SSO and audit trail",
      "Custom roles and approvals",
      "Dedicated implementation",
      "Data residency options",
      "99.9% uptime SLA",
    ],
    cta: "Book a scoping call",
    featured: false,
  },
];

export const faqs = [
  {
    q: "Does Pharmiq diagnose patients or prescribe medicines?",
    a: "No. Pharmiq is software for pharmacy professionals. It organises stock, dispensing records and reference information, and it surfaces clinical references with their sources. Every clinical decision stays with the pharmacist and the prescriber.",
  },
  {
    q: "Where does the clinical information come from?",
    a: "The assistant retrieves from a curated reference set — national formularies, WHO guidance and manufacturer summaries — and shows the source behind every claim. When it cannot find a reliable source, it says so instead of guessing.",
  },
  {
    q: "How does FEFO actually work at the counter?",
    a: "When a prescription is dispensed, Pharmiq ranks available batches by expiry date and puts the earliest-expiring valid batch first. If a user overrides the recommendation, the reason is recorded in the audit trail.",
  },
  {
    q: "Can I import my existing inventory?",
    a: "Yes. Upload a CSV or Excel export from your current system; we map medicine names, strengths, brands and batch numbers, then flag anything ambiguous for review before it goes live.",
  },
  {
    q: "Does it work when the internet drops?",
    a: "The counter keeps a local cache of the active catalog and current batches, so dispensing can continue offline. Records sync when the connection returns, with conflicts surfaced for review.",
  },
  {
    q: "How is patient data protected?",
    a: "Records are encrypted in transit and at rest, access is role-based, and every clinical record view is logged. We do not sell data, and we do not use patient records to train third-party models.",
  },
];
