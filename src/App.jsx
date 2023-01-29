import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.scss";
import twitter from "./assets/icons8-twitter.svg";
import github from "./assets/icons8-github.svg";

function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const genImg = async () => {
    const res = await openai.createImage({
      prompt: userPrompt,
      n: 2,
      size: "1024x1024",
    });

    setImageUrl(res.data.data[0].url);
  };

  return (
    <>
      <header>
        <nav>
          <div className="nav__logo">
            <a href="/">Dall-E clone</a>
          </div>
          <div className="nav__links">
            <ul>
              <li>
                <a href="https://twitter.com/lokeshkavisth" target="_blank">
                  <img src={twitter} alt="twitter" />
                </a>
              </li>
              <li>
                <a href="https://github.com/lokeshkavisth" target="_blank">
                  <img src={github} alt="github" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <article>
          <h1>Generate images using OpenAI API</h1>
          <p>
            The Doll-E clone can create realistic images based on the user's
            prompts. It uses OpenAI API to generate images. You have to put your
            prompt inside the input box and then OpenAI will do the rest for
            you.
          </p>

          <input
            type="text"
            name="userinput"
            id="userinput"
            placeholder="A man on a beach.."
            onChange={(e) => setUserPrompt(e.target.value)}
          />

          {imageUrl.length > 0 ? <img src={imageUrl} alt="imageUrl" /> : <></>}

          <button onClick={genImg} className="btn">
            Click to generate Image
          </button>

          <div className="warning">
            <p>
              <b>Note: </b> Wait for 10 seconds after clicking the generate
              button.
            </p>
          </div>
        </article>
      </main>

      <footer>
        <div>
          <p>
            Made with ♥ by{" "}
            <b>
              <a href="https://github.com/lokeshkavisth">Lokesh</a>
            </b>{" "}
            and Powred By{" "}
            <b>
              <a href="">OpenAI</a>
            </b>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
