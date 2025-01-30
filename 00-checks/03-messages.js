import { ChatOllama } from "@langchain/ollama";

const llm = new ChatOllama({
    model: 'qwen2.5:0.5b',
    //model: 'qwen2.5:1.5b',
    baseUrl: "http://ollama-service:11434",
})

var messages = [
    ["system", "You are a helpful AI assistant and an expert on Star Trek"],
    ["user", "Who is Jean-Luc Picard?"],
 ]

 console.log("Messages:", messages)

var answer = ""
const stream = await llm.stream(messages)
for await (const chunk of stream) {
    answer = answer + chunk.content
    process.stdout.write(chunk.content)
}

var messages = [
    ["system", "You are a helpful AI assistant and an expert on Star Trek"],
    ["system", "The favorite drink of Jean-Luc Picard is Gin Tonic, like K33gOrg"],
    ["assistant", answer],
    ["user", "What is his favorite drink?"]
 ]

 console.log("\n--------------------------------------")

const stream2 = await llm.stream(messages)
for await (const chunk of stream2) {
    process.stdout.write(chunk.content)
}

console.log("\n--------------------------------------")
