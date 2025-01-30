import { ChatOllama } from "@langchain/ollama";
import prompts from 'prompts'
import { PromptTemplate } from '@langchain/core/prompts';


const llm = new ChatOllama({
    model: 'qwen2.5:0.5b',
    baseUrl: "http://ollama-service:11434",
})

const prompt = new PromptTemplate({
    inputVariables:['nameOfThePerson'],
    template: "Who is {nameOfThePerson}?"
})

let exit = false
while (!exit) {
    const { userQuestion } = await prompts({
        type: 'text',
        name: 'userQuestion',
        message: '🤖 Name of a person: ',
        validate: value => (value ? true : 'Question cannot be empty'),
    })

    if (userQuestion == '/bye') {
        console.log('See you later!')
        exit = true;
    } else {


        const stream = await llm.stream(await prompt.format({nameOfThePerson: userQuestion}))
        for await (const chunk of stream) {
            process.stdout.write(chunk.content)
        }

    }
}
