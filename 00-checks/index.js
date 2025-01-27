import { ChatOllama } from "@langchain/ollama";

const llm = new ChatOllama({
    model: 'qwen2.5:0.5b',
    baseUrl: "http://ollama-service:11434",
})

const question = "Who is Jean-Luc Picard?"
console.log(`Question: ${question}`)

const response = await llm.invoke(question)
console.log(`Answer: ${response.content}`)
