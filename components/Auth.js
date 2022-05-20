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
      <div>
        <h1>
          Brew It ☕️ Login
        </h1>
        <p >
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
