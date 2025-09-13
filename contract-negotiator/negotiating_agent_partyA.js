export async function propose_terms({ terms }) {
  console.log(`Negotiating Agent Party A: Proposing terms: ${terms}`);
  // In a real scenario, this would send the terms to the Coordinator Agent.
  return { status: "Terms proposed", terms };
}

propose_terms.description = "Proposes terms for the contract negotiation.";
propose_terms.input_schema = {
  type: "object",
  properties: {
    terms: { type: "string", description: "The terms being proposed by Party A" },
  },
  required: ["terms"],
};
propose_terms.output_schema = {
  type: "object",
  properties: {
    status: { type: "string", description: "Status of the proposal" },
    terms: { type: "string", description: "The terms proposed" },
  },
  required: ["status", "terms"],
};

export async function accept_terms({ terms }) {
  console.log(`Negotiating Agent Party A: Accepting terms: ${terms}`);
  // In a real scenario, this would signal acceptance to the Coordinator Agent.
  return { status: "Terms accepted", terms };
}

accept_terms.description = "Accepts the proposed terms, signaling agreement.";
accept_terms.input_schema = {
  type: "object",
  properties: {
    terms: { type: "string", description: "The terms being accepted by Party A" },
  },
  required: ["terms"],
};
accept_terms.output_schema = {
  type: "object",
  properties: {
    status: { type: "string", description: "Status of the acceptance" },
    terms: { type: "string", description: "The terms accepted" },
  },
  required: ["status", "terms"],
};

export async function reject_terms({ reason }) {
  console.log(`Negotiating Agent Party A: Rejecting terms due to: ${reason}`);
  // In a real scenario, this would signal rejection and reason to the Coordinator Agent.
  return { status: "Terms rejected", reason };
}

reject_terms.description = "Rejects the proposed terms, signaling disagreement.";
reject_terms.input_schema = {
  type: "object",
  properties: {
    reason: { type: "string", description: "The reason for rejecting the terms" },
  },
  required: ["reason"],
};
reject_terms.output_schema = {
  type: "object",
  properties: {
    status: { type: "string", description: "Status of the rejection" },
    reason: { type: "string", description: "The reason for rejection" },
  },
  required: ["status", "reason"],
};


