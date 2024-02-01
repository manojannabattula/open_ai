import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import OpenAI from "openai";

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(`prompt to openai: ${prompt}`);

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `${prompt}` }],
      model: "gpt-3.5-turbo",
    });

    const jsonString = JSON.stringify(completion, null, 2);
    console.log(`printing response from openai:${jsonString}`)
 
    console.log(`response from openai: ${completion.choices[0].message.content}`);

    res.status(200).send({
      bot: completion.choices[0]
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error);
  }
})

app.listen(5174, () => console.log('Server is running on port http://localhost:5174'));
