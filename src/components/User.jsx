import { useState } from "react";
import { POST_URL } from "../constants/constant";
import Loader from "./Loader";
import Footer from "./Footer";

const User = () => {
  const [fullName, setFullName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState(""); // added email state
  const [loaderState, setLoaderState] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [text, setText] = useState("Submitting Your Feedback");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if(!fullName || !feedback){
      return setErr("Please Enter your feedback")
    }

    setLoaderState(true);

    if (fullName && feedback) {
      const data = {
        fullName,
        email,
        feedBackMsg: feedback,
        dateTime: Date.now(),
      };
      try {
        const response = await fetch(POST_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();

        if (!response.ok) {
          setSubmitted(true);
          setText(result.message);
          setErr(result.message);
          return;
        }

        setSubmitted(true);
        setText("Thankyou. Submitted Successfully");
        setFullName("");
        setEmail("");
        setFeedback("");
      } catch (error) {
        setErr(error.message);
      }
    }
  };

  return (
    <>
      {loaderState && (
        <Loader
          text={text}
          submitted={submitted}
          setloaderState={setLoaderState}
        />
      )}
      <div className="min-h-screen flex justify-center items-center bg-pink-50 px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-pink-200 p-8 rounded-3xl shadow-xl w-full max-w-md space-y-6 font-serif"
        >
          <h2 className="text-3xl font-semibold text-center text-pink-700">
            Share Your Thoughts 💭
          </h2>

          <input
            placeholder="Your Full Name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-pink-300 bg-white text-pink-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <div>
            <textarea
              maxLength={300}
              placeholder="Tell us what you think..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-pink-300 bg-white text-pink-800 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
              rows={5}
            />
            <p className="text-xs text-pink-600 text-right mt-1">
              {feedback.length}/300
            </p>
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className={`w-full bg-pink-600 text-white py-2 rounded-xl  hover:bg-pink-500 transition duration-300`}
            >
              Submit
            </button>
          </div>

          {err && <p className="text-red-500 text-sm text-center">{err}</p>}
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default User;
