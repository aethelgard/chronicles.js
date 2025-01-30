# Options

LLM options are like control knobs that influence how the AI generates text. They exist for two main reasons:

1. **Control the Generation Process**
- The AI has many possible words it could choose at each step
- Without any controls, its outputs might be too random or too rigid
- Options let us tune how it makes these choices

2. **Customize for Different Use Cases**
- Sometimes you need precise, factual responses
- Other times you need creative, varied outputs
- Options let you adjust the AI's behavior for your specific needs

In practice:
```javascript
const llm = new ChatOllama({
    model: 'qwen2.5:0.5b',
    // Options here let you control HOW the model generates its response
    // Without changing WHAT you're asking it to do
});
```

The key point is: Options don't change what you're asking the AI to do, they change how it goes about doing it.


##  LLM options

In LangChain.js, you can pass these options when instantiating the ChatOllama class. Here's how you can modify your code:

```javascript
import { ChatOllama } from "@langchain/ollama";
import prompts from 'prompts'
import { PromptTemplate } from '@langchain/core/prompts';

const llm = new ChatOllama({
    model: 'qwen2.5:0.5b',
    baseUrl: "http://ollama-service:11434",
    // Add the options here
    temperature: 0.5,
    repeatLastN: 2,        // repeat_last_n in snake_case becomes camelCase
    repeatPenalty: 2.2,    // repeat_penalty becomes camelCase
    topK: 10,             // top_k becomes camelCase
    topP: 0.5,            // top_p becomes camelCase
});
```

The main differences from your Go example are:

1. JavaScript uses camelCase instead of snake_case for property names
2. The options are passed directly in the configuration object
3. There's no need to use a map/dictionary structure like in Go - you can include the options directly in the constructor options object

All the other parts of your code can remain the same. The LLM will now use these parameters when generating responses.

## See the default options

To see the default values set by LangChain.js for ChatOllama, I'll help you examine them. Here are a couple of approaches:

1. Log the LLM instance:
```javascript
const llm = new ChatOllama({
    model: 'qwen2.5:0.5b',
    baseUrl: "http://ollama-service:11434",
});

console.log("LLM Configuration:", llm);
```

2. More specifically, you can inspect just the options object:
```javascript
const llm = new ChatOllama({
    model: 'qwen2.5:0.5b',
    baseUrl: "http://ollama-service:11434",
});

// This will show all configurable options and their current values
console.log("LLM Options:", {
    temperature: llm.temperature,
    topK: llm.topK,
    topP: llm.topP,
    repeatLastN: llm.repeatLastN,
    repeatPenalty: llm.repeatPenalty,
    // Additional options
    mirostat: llm.mirostat,
    mirostatTau: llm.mirostatTau,
    mirostatEta: llm.mirostatEta,
    numCtx: llm.numCtx,
    numGpu: llm.numGpu,
    seed: llm.seed,
    numThread: llm.numThread,
    stops: llm.stops,
});
```

You can also check the source code directly on the LangChain.js GitHub repository to see the default values in the ChatOllama implementation. The default values are typically defined in the class implementation or in a default configuration object.

## How to change the options

You can change the options for subsequent requests in two ways:

1. By updating the properties of the existing LLM instance:
```javascript
// Update individual options
llm.temperature = 0.7;
llm.topP = 0.8;
llm.repeatPenalty = 1.8;

// Then make your request
const stream = await llm.stream(messages);
```

2. By creating a new LLM instance with different options:
```javascript
const newLlm = new ChatOllama({
    model: 'qwen2.5:0.5b',
    baseUrl: "http://ollama-service:11434",
    temperature: 0.7,
    topP: 0.8,
    repeatPenalty: 1.8
});

// Use the new instance
const stream = await newLlm.stream(messages);
```

3. Alternatively, you can pass options directly in the call method (if supported by the version of LangChain.js you're using):
```javascript
const stream = await llm.stream(messages, {
    temperature: 0.7,
    topP: 0.8,
    repeatPenalty: 1.8
});
```

The first approach is more efficient if you're making multiple calls with the same options, while the second approach is better for maintaining different configurations. The third approach is useful for one-off changes to the configuration.


## Examples


`temperature` (0.0 to 1.0): 
- Think of it like a "creativity knob"
- Low values (0.1): More focused, consistent, predictable outputs
- High values (0.8): More creative, varied, surprising outputs
- Default is often 0.7

`top_p` (0.0 to 1.0):
- Controls diversity of word choices
- Low values: Sticks to most likely words
- High values: Allows more unusual word choices
- Often used instead of temperature

`repeat_penalty` (1.0 and above):
- How much to penalize repeating the same words/phrases
- Higher values reduce repetition
- Lower values allow more repetition
- Useful to avoid the LLM getting stuck in loops

`top_k` (1 and above):
- Limits the number of word choices at each step
- Lower values (like 10): More focused, conservative text
- Higher values (like 50): More variety in word choice
- Helps balance between focus and creativity

A practical example:
- For generating D&D room descriptions:
  - Need creativity? Higher temperature (0.7-0.8)
  - Need consistency? Lower temperature (0.3-0.5)
  - Want to avoid repetitive descriptions? Increase repeat_penalty
  - Want more focused fantasy vocabulary? Lower top_k and top_p
