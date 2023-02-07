import { Configuration, OpenAIApi } from 'openai';

const MODEL = "text-davinci-003";

export default async function handler(req, res) {

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_DEMO_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createCompletion({
      model: MODEL,
      prompt: req.body.prompt,
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["\n"],
    });

    //console.log(completion.data);
    res.status(201).json({ currentChat: req.body.prompt + completion.data.choices[0].text });
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
