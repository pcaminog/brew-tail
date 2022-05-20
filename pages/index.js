import Inputnext from "../components/Inputnext";
import Tablenext from "../components/Tablenext";
import { supabase } from "../utils/supabase";
import Auth from "../components/Auth";
import { useState, useEffect } from "react";

function Home({ brews }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-pri font-mono">
      <div className="grid place-items-center w-3/4 gap-10">
        <h1 className=" font-extrabold text-8xl text-cuar">Brew It ☕️</h1>
        <p className="font-extrabold text-2xl text-s text-cuar">
          A place for coffee lovers to share their brews.
        </p>
        <Tablenext brews={brews} />
        <h2 className="font-extrabold text-2xl text-cuar">
          Add your recipe 👇
        </h2>
        <Inputnext />
      </div>
    </div>
  );
}

export default Home;

export const getServerSideProps = async () => {
  const { data: brews, error } = await supabase.from("brews0").select();

  if (error) {
    throw new Error(error.message);
  }

  return {
    props: {
      brews,
    },
  };
};
