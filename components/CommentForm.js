import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

const CommentForm = ({ handleSubmit, submitLabel, initialText = "" }) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  const [session, setSession] = useState(null);

  const router = useRouter();


  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      {!session ? (
        <button
          onClick={() => router.push("/auth")}
          className="flex font-extrabold justify-center items-center border-2 border-ter rounded-lg p-2 w-full bg-sec hover:border-4 hover:border-ter hover:bg-sec hover:text-cuar shadow-ter shadow-md text-xl"
        >
          {" "}
          Sign Up to write a comment
        </button>
      ) : (
        <div>
          <h4 className="font-extrabold text-2xl text-cuar">Write comment</h4>
          <form onSubmit={onSubmit}>
            <textarea
              className="bg-ter text-cuar text-xl m-2 p-2 w-full"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="bg-sec text-cuar text-xl m-2 p-2 rounded-lg shadow-ter shadow-md"
              disabled={isTextareaDisabled}
            >
              {submitLabel}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
