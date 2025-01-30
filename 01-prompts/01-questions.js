import { ChatOllama } from "@langchain/ollama";
import prompts from 'prompts'

const llm = new ChatOllama({
    model: 'qwen2.5:0.5b',
    baseUrl: "http://ollama-service:11434",
})

let exit = false
while (!exit) {
    const { userQuestion } = await prompts({
        type: 'text',
        name: 'userQuestion',
        message: '🤖 Your question: ',
        validate: value => (value ? true : 'Question cannot be empty'),
    })

    if (userQuestion == '/bye') {
        console.log('See you later!')
        exit = true;
    } else {


        const stream = await llm.stream(userQuestion)
        for await (const chunk of stream) {
            process.stdout.write(chunk.content)
        }
    }
}
