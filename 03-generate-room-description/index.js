import { ChatOllama } from "@langchain/ollama";
import prompts from 'prompts'
import { PromptTemplate } from '@langchain/core/prompts';


const llm = new ChatOllama({
    model: 'qwen2.5:0.5b',
    //model: 'qwen2.5:1.5b',
    baseUrl: "http://ollama-service:11434",
    temperature: 1.5,
    repeatLastN: 2,         // repeat_last_n in snake_case becomes camelCase
    repeatPenalty: 2.2,     // repeat_penalty becomes camelCase
    topK: 10,               // top_k becomes camelCase
    topP: 0.5,              // top_p becomes camelCase    
})


console.log("LLM Configuration:", llm);

var systemInstructions = `
You are an expert for games like D&D 5th edition. 
You have freedom to be creative to get the best possible output.
`

var generationInstructions = `
Your job is to generate a description of a room in a fantasy setting using the name given by the user.
The output is the description of the room.
Speak only in English, avoid Chinese ideogram.
Ensure the description is fantasy-themed.
`
const prompt = new PromptTemplate({
    inputVariables:['roomName'],
    template: "Generate a room description for the name '{roomName}' with the above instructions."
})

var userContent = await prompt.format({roomName: "The Chamber of Echoes"})

/*
    The Grand Entrance
    The Hall of Whispers
    The Chamber of Echoes
    The Forgotten Library
    The Dark Cave
*/

var messages = [
    ["system", systemInstructions],
    ["system", generationInstructions],
    ["user", userContent]
 ]

 console.log("Messages:", messages)

var answer = ""
const stream = await llm.stream(messages)
for await (const chunk of stream) {
    answer = answer + chunk.content
    process.stdout.write(chunk.content)
}

console.log("")