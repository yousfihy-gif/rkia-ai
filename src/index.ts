import "dotenv/config";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { initStorage } from "./memory.js";
import { toolCreateLead, toolGetContext, toolSaveMemory } from "./tools.js";
import { askAgent } from "./llm.js";
import type { AdvisorId } from "./types.js";

const rl = readline.createInterface({ input, output });

function printHelp() {
  console.log(`
Rkia Council Starter Commands

/agent rkia|abdelouahed|oufae|taha|yasmine|zahra   Switch active advisor
/memory your note here                               Save a memory note
/lead client | service | notes                       Save a lead
/context                                             Show saved local context
/help                                                Show help
/exit                                                Quit
`);
}

async function main() {
  initStorage();
  let activeAgent: AdvisorId = "rkia";

  console.log("Welcome to Rkia Council Starter.");
  console.log("Beginner mode is on. Type /help to see commands.");

  while (true) {
    const line = (await rl.question(`\n[${activeAgent}] > `)).trim();

    if (!line) continue;
    if (line === "/exit") break;
    if (line === "/help") {
      printHelp();
      continue;
    }

    if (line.startsWith("/agent ")) {
      const maybeAgent = line.replace("/agent ", "").trim() as AdvisorId;
      const allowed: AdvisorId[] = ["rkia", "abdelouahed", "oufae", "taha", "yasmine", "zahra"];
      if (!allowed.includes(maybeAgent)) {
        console.log("Unknown advisor.");
        continue;
      }
      activeAgent = maybeAgent;
      console.log(`Switched to ${activeAgent}.`);
      continue;
    }

    if (line.startsWith("/memory ")) {
      const note = line.replace("/memory ", "").trim();
      const result = toolSaveMemory(activeAgent, note);
      console.log(result.message);
      continue;
    }

    if (line.startsWith("/lead ")) {
      const raw = line.replace("/lead ", "");
      const [clientName, serviceType, notes] = raw.split("|").map((s) => s.trim());
      if (!clientName || !serviceType || !notes) {
        console.log("Use: /lead client | service | notes");
        continue;
      }
      const result = toolCreateLead(clientName, serviceType, notes);
      console.log(`Lead saved for ${result.lead.clientName}.`);
      continue;
    }

    if (line === "/context") {
      console.log(JSON.stringify(toolGetContext(), null, 2));
      continue;
    }

    try {
      const context = JSON.stringify(toolGetContext(), null, 2);
      const reply = await askAgent(activeAgent, line, context);
      console.log(`\n${reply}`);
    } catch (error) {
      console.error("Something went wrong.");
      console.error(error);
    }
  }

  rl.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
