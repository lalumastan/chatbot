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
    <div>
      <Head className="site-navbar" role="banner">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes" />
        <title>{TITLE}</title>
      </Head>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark justify-content-between sticky-top fs-4" role="navigation">
          <div className="container-fluid">
            <a className="navbar-brand mx-2" href="#"><img src="/favicon.ico" alt="ICS Discover Logo" width="30%" className="border border-primary rounded" /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto text-nowrap">
                <li className="nav-item">
                  <a className="nav-link" href="https://www.youtube.com/channel/UCLZnGghxjldvhQSnno47Olw" target="_new">Tutorials</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://github.com/lalumastan" target="_new">Github</a>
                </li>                
                <li className="nav-item">
                  <a className="nav-link" href="https://www.linkedin.com/in/mohammed-islam-57264235" target="_new">Linkedin</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="mailto:lalumastan@gmail.com">Contact</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://www.youtube.com/@icsdiscover/about" target="_new">About</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="container my-3">
      {
        result && (
          <div className="row">
            <div className="my-3 border border-info rounded overflow-auto">
              {result && currentChat && (
                <code className="text-justify d-flex flex-lg-wrap" style={{ whiteSpace: "pre" }}><strong className="small">{currentChat.replace(STARTER, "").trim()}</strong></code>
              )}
            </div>
          </div>
        )}
      <div className="row alert alert-info border border-info">
        <h2 className="text-center text-primary">
          {TITLE}
        </h2>
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
      <footer>
        <div className="container text-white fw-bold">
          <p align="center">
            &copy; 2023 by ICS Discover
          </p>
        </div>
      </footer>
    </div>
  );
}
