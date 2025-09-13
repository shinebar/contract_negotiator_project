# AIGNE Default Template

This is the default project template for the AIGNE framework, providing a basic chat agent and JavaScript code execution functionality.

## Template Structure

- `aigne.yaml` - Project configuration file that defines the chat model used and references to agents
- `chat.yaml` - Chat agent configuration, including agent instructions and skills used
- `sandbox.js` - JavaScript code execution tool for running JavaScript code within conversations
- `sandbox.test.js` - Test file to verify the functionality of the code execution tool

## Quick Start

### Install AIGNE CLI

```bash
npm install -g aigne
```

### Setup Environment Variables

Copy the `.env.local.example` file to `.env.local` and set your OpenAI API key:

```shell
# OpenAI
MODEL="openai:gpt-4.1"
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

### Start the Project

```bash
aigne run
```

## Testing

Run the following command to execute test cases:

```bash
aigne test
```

```
npm install @aigne/openai @aigne/core

const Client = require('@abtnode/client');
const ensureServerEndpoint = require('@abtnode/util/lib/ensure-server-endpoint');
const { joinURL } = require('ufo');

const { endpoint } = await ensureServerEndpoint("https://www.didspaces.com");
const fullEndpoint = joinURL(endpoint, '/api/gql');

const client = new Client(fullEndpoint);
client.setAuthAccessKey({
  accessKeyId: "yours parameter",
  accessKeySecret: "yours parameter",
});

const rootDid = 'yours parameter';
const result = await client.getBlocklet(
  { input: { did: rootDid, attachRuntimeInfo: false } },
  { headers: { 'x-access-blocklet': rootDid } }
);
```
