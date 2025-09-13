import { AIAgent, AIGNE } from "@aigne/core";
import { OpenAIChatModel } from "@aigne/openai";
import { initiate_negotiation, mediate_proposal, grant_approval } from './coordinator.js';
import { propose_terms as proposeTermsA, accept_terms as acceptTermsA, reject_terms as rejectTermsA } from './negotiating_agent_partyA.js';
import { propose_terms as proposeTermsB, accept_terms as acceptTermsB, reject_terms as rejectTermsB } from './negotiating_agent_partyB.js';
import { deploy_contract, acquire_signature } from './deployment_agent.js';
import { log_negotiation, log_contract, log_system_event } from './data_storage.js';

// Initialize the AI model (requires OPENAI_API_KEY environment variable)
const model = new OpenAIChatModel({
  apiKey: process.env.OPENAI_API_KEY,
  model: process.env.MODEL,
  temperature: 0.8
});

// Create the AIGNE instance
const aigne = new AIGNE({ model });

// Create agents
const coordinatorAgent = AIAgent.from({
  name: "Coordinator",
  instructions: `You are the Coordinator Agent. Your role is to supervise negotiation rounds, regulate process flow, initiate contracts, and grant approval for finalization.
  You will communicate with Negotiating Agents to manage the negotiation process and with the Deployment Agent for contract deployment.
  You are responsible for ensuring procedural fairness and preventing stalemates.`,
});

const negotiatingAgentA = AIAgent.from({
  name: "NegotiatingAgentPartyA",
  instructions: `You are Negotiating Agent Party A. Your role is to represent Party A in contract negotiations.
  You will receive proposals from the Coordinator Agent and respond with counter-proposals or acceptance based on Party A's preferences.
  Your goal is to reach a consensus that is favorable to Party A.`,
});

const negotiatingAgentB = AIAgent.from({
  name: "NegotiatingAgentPartyB",
  instructions: `You are Negotiating Agent Party B. Your role is to represent Party B in contract negotiations.
  You will receive proposals from the Coordinator Agent and respond with counter-proposals or acceptance based on Party B's preferences.
  Your goal is to reach a consensus that is favorable to Party B.`,
});

const deploymentAgent = AIAgent.from({
  name: "DeploymentAgent",
  instructions: `You are the Deployment Agent. Your role is to generate, validate, and deploy finalized contracts to the ArcBlock blockchain.
  You are also responsible for acquiring electronic signatures on behalf of the parties.`,
});

async function demonstrateNegotiation() {
  console.log("Starting Contract Negotiation System Demo");
  console.log("=".repeat(50));

  try {
    // Log system startup
    await log_system_event({
      event_type: "SYSTEM_START",
      description: "Contract negotiation system started",
      agent_name: "System"
    });

    // Sample negotiation preferences
    const partyAPrefs = "Looking for a 2-year service contract with monthly payments of $5000, flexible delivery schedule, and 24/7 support included. Priority on data security and compliance with industry standards.";
    const partyBPrefs = "Offering 18-month contract terms with quarterly payments of $15000, standard business hours support, and basic security measures. Prefer fixed delivery schedule and performance-based pricing model.";

    // Step 1: Initiate negotiation
    console.log("Step 1: Initiating negotiation...");
    const negotiationResult = await initiate_negotiation({
      partyA_preferences: partyAPrefs,
      partyB_preferences: partyBPrefs
    });
    console.log("Negotiation initiated:", negotiationResult);

    // Log the negotiation
    const negotiationId = `negotiation_${Date.now()}`;
    await log_negotiation({
      negotiation_id: negotiationId,
      party_a_preferences: partyAPrefs,
      party_b_preferences: partyBPrefs,
      status: "initiated"
    });

    // Step 2: Simulate proposal exchange
    console.log("\n Step 2: Simulating proposal exchange...");

    // Party A proposes terms
    const proposalA = await proposeTermsA({
      terms: "18-month contract with monthly payments of $4500, enhanced support during business hours, and industry-standard security measures"
    });
    console.log(" Party A proposal:", proposalA);

    // Mediate the proposal
    const mediationResult = await mediate_proposal({
      proposing_agent: "NegotiatingAgentPartyA",
      proposed_terms: proposalA.terms
    });
    console.log(" Coordinator mediation:", mediationResult);

    // Party B accepts (simulated consensus)
    const acceptanceB = await acceptTermsB({
      terms: proposalA.terms
    });
    console.log("Party B acceptance:", acceptanceB);

    // Step 3: Grant approval
    console.log("\n Step 3: Granting final approval...");
    const finalTerms = proposalA.terms;
    const approvalResult = await grant_approval({
      final_contract_terms: finalTerms
    });
    console.log("Final approval:", approvalResult);

    // Step 4: Deploy contract
    console.log("\n Step 4: Deploying contract to blockchain...");
    const deploymentResult = await deploy_contract({
      contract_terms: finalTerms
    });
    console.log(" Contract deployment:", deploymentResult);

    // Step 5: Acquire signatures
    console.log("  Step 5: Acquiring electronic signatures...");
    const signatureA = await acquire_signature({
      contract_id: deploymentResult.contract_id,
      party_name: "Party A"
    });
    const signatureB = await acquire_signature({
      contract_id: deploymentResult.contract_id,
      party_name: "Party B"
    });
    console.log(" Signatures acquired:", { signatureA, signatureB });

    // Log the final contract
    await log_contract({
      contract_id: deploymentResult.contract_id,
      contract_terms: finalTerms,
      deployment_status: "deployed"
    });

    // Log system completion
    await log_system_event({
      event_type: "NEGOTIATION_COMPLETE",
      description: `Contract ${deploymentResult.contract_id} successfully negotiated and deployed`,
      agent_name: "System"
    });

    console.log("\n Contract negotiation and deployment completed successfully!");
    console.log(` Contract ID: ${deploymentResult.contract_id}`);
    console.log("=".repeat(50));

  } catch (error) {
    console.error(" Error during negotiation:", error);

    // Log the error
    await log_system_event({
      event_type: "SYSTEM_ERROR",
      description: `Error during negotiation: ${error.message}`,
      agent_name: "System"
    });
  }
}

// Run the demonstration
if (import.meta.url === `file://${process.argv[1]}`) {
  demonstrateNegotiation();
}

