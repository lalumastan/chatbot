import { Configuration, OpenAIApi } from 'openai';

const MODEL = "gpt-3.5-turbo";

export default async function handler(req, res) {

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_DEMO_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      messages: [{ role: "user", content: req.body.prompt }],
      model: MODEL,
    });

    //console.log(completion.data);
    res.status(201).json({ currentChat: req.body.prompt + completion.data.choices[0].message.content });
  } catch (error) {
    let errorMessage = "Failed: ";
    if (error.response) {
      console.log(error.response);
    } else {
      console.log(error.message);
      errorMessage += error.message;
    }
    res.status(500).json({ error: errorMessage });
  }
}
