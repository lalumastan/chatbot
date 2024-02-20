import OpenAI from 'openai';

const MODEL = "gpt-3.5-turbo";

export default async function handler(req, res) {

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_DEMO_API_KEY // This is the default and can be omitted
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: req.body.prompt }],
      model: MODEL
    });

    //console.log(completion.data);
    res.status(201).json({ currentChat: req.body.prompt + completion.choices[0].message.content });
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
