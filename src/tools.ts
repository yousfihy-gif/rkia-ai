import { randomUUID } from "node:crypto";
import { saveLead, saveMemory, readLeads, readMemory } from "./memory.js";
import type { AdvisorId, LeadRecord } from "./types.js";

export function toolSaveMemory(agent: AdvisorId, note: string) {
  saveMemory({
    id: randomUUID(),
    agent,
    note,
    createdAt: new Date().toISOString()
  });
  return { ok: true, message: "Memory saved." };
}

export function toolCreateLead(clientName: string, serviceType: string, notes: string) {
  const lead: LeadRecord = {
    id: randomUUID(),
    clientName,
    serviceType,
    status: "new",
    notes,
    createdAt: new Date().toISOString()
  };

  saveLead(lead);
  return { ok: true, lead };
}

export function toolGetContext() {
  return {
    memory: readMemory().slice(-10),
    leads: readLeads().slice(-10)
  };
}
