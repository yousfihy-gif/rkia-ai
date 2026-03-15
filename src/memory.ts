import fs from "node:fs";
import path from "node:path";
import { MemoryNote, LeadRecord } from "./types.js";

const dataDir = path.join(process.cwd(), "data");
const memoryFile = path.join(dataDir, "memory.json");
const leadsFile = path.join(dataDir, "leads.json");

function ensureFile(filePath: string, defaultValue: unknown) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2), "utf-8");
  }
}

export function initStorage() {
  ensureFile(memoryFile, []);
  ensureFile(leadsFile, []);
}

export function readMemory(): MemoryNote[] {
  initStorage();
  return JSON.parse(fs.readFileSync(memoryFile, "utf-8")) as MemoryNote[];
}

export function saveMemory(note: MemoryNote) {
  const all = readMemory();
  all.push(note);
  fs.writeFileSync(memoryFile, JSON.stringify(all, null, 2), "utf-8");
}

export function readLeads(): LeadRecord[] {
  initStorage();
  return JSON.parse(fs.readFileSync(leadsFile, "utf-8")) as LeadRecord[];
}

export function saveLead(lead: LeadRecord) {
  const all = readLeads();
  all.push(lead);
  fs.writeFileSync(leadsFile, JSON.stringify(all, null, 2), "utf-8");
}
