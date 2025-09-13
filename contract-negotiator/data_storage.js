import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = './data';
const NEGOTIATIONS_FILE = path.join(DATA_DIR, 'negotiations.json');
const CONTRACTS_FILE = path.join(DATA_DIR, 'contracts.json');
const LOGS_FILE = path.join(DATA_DIR, 'system_logs.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

export async function log_negotiation({ negotiation_id, party_a_preferences, party_b_preferences, status, timestamp }) {
  await ensureDataDir();
  
  const negotiationData = {
    negotiation_id,
    party_a_preferences,
    party_b_preferences,
    status,
    timestamp: timestamp || new Date().toISOString()
  };

  try {
    let negotiations = [];
    try {
      const data = await fs.readFile(NEGOTIATIONS_FILE, 'utf8');
      negotiations = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, start with empty array
    }

    negotiations.push(negotiationData);
    await fs.writeFile(NEGOTIATIONS_FILE, JSON.stringify(negotiations, null, 2));
    
    console.log(`Data Storage: Logged negotiation ${negotiation_id}`);
    return { status: "Negotiation logged", negotiation_id };
  } catch (error) {
    console.error('Error logging negotiation:', error);
    return { status: "Error logging negotiation", error: error.message };
  }
}

log_negotiation.description = "Logs negotiation data for auditing and analysis.";
log_negotiation.input_schema = {
  type: "object",
  properties: {
    negotiation_id: { type: "string", description: "Unique identifier for the negotiation" },
    party_a_preferences: { type: "string", description: "Party A's preferences" },
    party_b_preferences: { type: "string", description: "Party B's preferences" },
    status: { type: "string", description: "Current status of the negotiation" },
    timestamp: { type: "string", description: "Timestamp of the log entry" }
  },
  required: ["negotiation_id", "party_a_preferences", "party_b_preferences", "status"]
};
log_negotiation.output_schema = {
  type: "object",
  properties: {
    status: { type: "string", description: "Status of the logging operation" },
    negotiation_id: { type: "string", description: "The negotiation ID that was logged" }
  },
  required: ["status"]
};

export async function log_contract({ contract_id, contract_terms, deployment_status, timestamp }) {
  await ensureDataDir();
  
  const contractData = {
    contract_id,
    contract_terms,
    deployment_status,
    timestamp: timestamp || new Date().toISOString()
  };

  try {
    let contracts = [];
    try {
      const data = await fs.readFile(CONTRACTS_FILE, 'utf8');
      contracts = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, start with empty array
    }

    contracts.push(contractData);
    await fs.writeFile(CONTRACTS_FILE, JSON.stringify(contracts, null, 2));
    
    console.log(`Data Storage: Logged contract ${contract_id}`);
    return { status: "Contract logged", contract_id };
  } catch (error) {
    console.error('Error logging contract:', error);
    return { status: "Error logging contract", error: error.message };
  }
}

log_contract.description = "Logs contract data for auditing and analysis.";
log_contract.input_schema = {
  type: "object",
  properties: {
    contract_id: { type: "string", description: "Unique identifier for the contract" },
    contract_terms: { type: "string", description: "The contract terms" },
    deployment_status: { type: "string", description: "Status of the contract deployment" },
    timestamp: { type: "string", description: "Timestamp of the log entry" }
  },
  required: ["contract_id", "contract_terms", "deployment_status"]
};
log_contract.output_schema = {
  type: "object",
  properties: {
    status: { type: "string", description: "Status of the logging operation" },
    contract_id: { type: "string", description: "The contract ID that was logged" }
  },
  required: ["status"]
};

export async function log_system_event({ event_type, description, agent_name, timestamp }) {
  await ensureDataDir();
  
  const logData = {
    event_type,
    description,
    agent_name,
    timestamp: timestamp || new Date().toISOString()
  };

  try {
    let logs = [];
    try {
      const data = await fs.readFile(LOGS_FILE, 'utf8');
      logs = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, start with empty array
    }

    logs.push(logData);
    await fs.writeFile(LOGS_FILE, JSON.stringify(logs, null, 2));
    
    console.log(`Data Storage: Logged system event - ${event_type}`);
    return { status: "System event logged", event_type };
  } catch (error) {
    console.error('Error logging system event:', error);
    return { status: "Error logging system event", error: error.message };
  }
}

log_system_event.description = "Logs system events for monitoring and debugging.";
log_system_event.input_schema = {
  type: "object",
  properties: {
    event_type: { type: "string", description: "Type of the system event" },
    description: { type: "string", description: "Description of the event" },
    agent_name: { type: "string", description: "Name of the agent that triggered the event" },
    timestamp: { type: "string", description: "Timestamp of the event" }
  },
  required: ["event_type", "description", "agent_name"]
};
log_system_event.output_schema = {
  type: "object",
  properties: {
    status: { type: "string", description: "Status of the logging operation" },
    event_type: { type: "string", description: "The event type that was logged" }
  },
  required: ["status"]
};

