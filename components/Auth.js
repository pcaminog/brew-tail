import { useState } from "react";
import { supabase } from "../utils/supabase";


export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex items-center justify-center h-screen bg-pri font-mono">
        <h1 className=" font-extrabold text-8xl text-cuar">
          Brew It ☕️ Login
        </h1>
        <p className="font-extrabold text-2xl text-s text-cuar">
          Sign in via magic link with your email below
        </p>
        <div >

        <input
            maxLength={50}
            minLength={5}
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
          <button 
          className="flex font-extrabold justify-center items-center border-2 border-ter rounded-lg p-2 w-full bg-sec hover:border-4 hover:border-ter hover:bg-sec hover:text-cuar shadow-ter shadow-md text-xl"

            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            disabled={loading}
          >
            <span>{loading ? "Loading" : "Send magic link"}</span>
          </button>
        </div>
  );
}
