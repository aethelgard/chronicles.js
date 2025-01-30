# Chronicles(.js) of Aethelgard 

# NoGPU!

## The Game ?

🚧 WIP

### Origins

- https://github.com/k33g/chronicles-of-aethelgard (GoLang)
- Dungeon crawler "Four against darkness"

> "A dungeon crawler is a video game genre where players navigate through maze-like environments (dungeons, caves, etc.), fighting enemies and collecting loot while progressing deeper into increasingly difficult levels. Common features include character progression, inventory management, and randomized or procedurally generated levels. Notable example: Diablo." - Claude

## Test the Ollama service

```bash
curl http://ollama-service:11434/api/generate -d '{
  "model": "qwen2.5:0.5b",
  "prompt": "Why is the sky blue?"
}'
```

## First part: Setup & LangchainJS Introduction

- Setup
- `00-checks`: verify if LangchainJS is well installed + basics
- `01-prompts`: `prompts` and `PromptTemplate`
- `02-lcel`: Langchain expression language 🚧

> I think we need only the `00-checks` part to start to develop the RPG helpers


