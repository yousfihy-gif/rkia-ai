export type AdvisorId =
  | "rkia"
  | "abdelouahed"
  | "oufae"
  | "taha"
  | "yasmine"
  | "zahra";

export interface MemoryNote {
  id: string;
  agent: AdvisorId;
  note: string;
  createdAt: string;
}

export interface LeadRecord {
  id: string;
  clientName: string;
  serviceType: string;
  status: "new" | "quoted" | "won" | "lost";
  notes: string;
  createdAt: string;
}
