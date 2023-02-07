import { React, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const TITLE = "iCS Discover's OpenAI Chatbot";
const PLACEHOLDER = "Enter your question";
const STARTER = "I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n";

export default function Home() {

  const [active, setActive] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [currentChat, setCurrentChat] = useState(STARTER);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    setActive(true);
    e.preventDefault();

    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: currentChat + "\nQ: " + prompt + "\n",
      }),
    });

    let result = await response.json();
    if (response.status !== 201) {
      setActive(false);
      setError(error);
    }
    else {
      setResult(result);

      //console.log(result);
      if (result.currentChat) {
        setCurrentChat(result.currentChat);
      }
    }
    setActive(false);
    setPrompt("");
  };

  return (
    <div className="container">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{TITLE}</title>
      </Head>
      {
        result && (
          <div className="row">
            <div className="my-3 border border-info rounded">
              {result && currentChat && (
                <code className="text-justify d-flex flex-lg-wrap" style={{ whiteSpace: "pre" }}><strong className="small">{currentChat.replace(STARTER, "").trim()}</strong></code>
              )}
            </div>
          </div>
        )}
      <div className="row alert alert-info border border-info">
        <h1 className="text-center text-primary">
          {TITLE}
        </h1>
        <form className="form-ai" encType="multipart/form-data" onSubmit={handleSubmit}>
          <h6 className="m-3">{STARTER.split("Q:")[0]}</h6>
          <div className="form-floating mx-3">
            <input
              required
              id="prompt"
              className="form-control border border-info"
              type="text"
              name="prompt"
              value={prompt}
              onChange={handlePrompt}
              placeholder={PLACEHOLDER}
            />
            <label htmlFor="prompt">{PLACEHOLDER}</label>
          </div>
          <br />
          <div className="text-center">
            <button className="btn btn-lg btn-primary text-center" disabled={active} type="submit">Chat!</button>
          </div>
        </form>
      </div>
      <div className="row">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
      </div>
    </div>
  );
}
