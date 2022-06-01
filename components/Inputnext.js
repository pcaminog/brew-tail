import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

function inputnext() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const [brew, setBrew] = useState({
    machine: "",
    water_type: "",
    coffee: "",
    grams: "",
    time: "",
    model: "",
    user: "",
  });
  const user = supabase.auth.user();

  const router = useRouter();

  function handleChange(event) {
    event.preventDefault();
    setBrew({
      ...brew,
      [event.target.id]: event.target.value,
      user: user.email,
    });
  }

  const postBrew = async () => {
    const { error } = await supabase.from("brews0").insert(brew);
    if (error) {
      throw new Error(error.message);
    }
    setBrew({
      machine: "",
      water_type: "",
      coffee: "",
      grams: "",
      time: "",
      model: "",
    });
    router.replace(router.asPath);
  };

  return (
    <div>
      {!session ? (
        <button
          onClick={() => router.push("/auth")}
          className="flex font-extrabold justify-center items-center border-2 border-ter rounded-lg p-2 w-full bg-sec hover:border-4 hover:border-ter hover:bg-sec hover:text-cuar shadow-ter shadow-md text-xl"
        >
          {" "}
          Sign Up
        </button>
      ) : (
        <div>
          <div className=" items-center justify-center grid grid-cols-6  grid-rows-2 gap-5 p-6 gap-y-0">
            <p className="font-extrabold text-2xl text-cuar">MACHINE 🤖</p>
            <p className="font-extrabold text-2xl text-cuar">MODEL ⚙️</p>
            <p className="font-extrabold text-2xl text-cuar">WATER 💧</p>
            <p className="font-extrabold text-2xl text-cuar">COFFEE 🫘</p>
            <p className="font-extrabold text-2xl text-cuar">GRAMS ⚖️</p>
            <p className="font-extrabold text-2xl text-cuar">TIME ⏱</p>

            <input
              className="rounded-lg p-2 w-full border-2 border-ter bg-sec hover:border-4 hover:border-ter hover:bg-sec hover:text-cuar shadow-ter shadow-md text-xl"
              id="machine"
              maxLength={50}
              minLength={5}
              placeholder="Brevilles, Nespresso,.."
              value={brew.machine}
              onChange={handleChange}
            />
            <input
              className=" border-2 border-ter rounded-lg p-2 w-full bg-sec hover:border-4 hover:border-ter hover:bg-sec hover:text-cuar shadow-ter shadow-md text-xl"
              id="model"
              maxLength={50}
              minLength={5}
              placeholder="Barista, Tassimo,.."
              value={brew.model}
              onChange={handleChange}
            />
            <input
              className=" border-2 border-ter rounded-lg p-2 w-full bg-sec hover:border-4 hover:border-ter hover:bg-sec hover:text-cuar shadow-ter shadow-md text-xl"
              id="water_type"
              maxLength={20}
              minLength={3}
              placeholder="Mineral, Fitered,.."
              value={brew.water_type}
              onChange={handleChange}
            />
            <input
              className=" border-2 border-ter rounded-lg p-2 w-full bg-sec hover:border-4 hover:border-ter hover:bg-sec hover:text-cuar shadow-ter shadow-md text-xl"
              id="coffee"
              maxLength={50}
              minLength={5}
              placeholder="Lavazza supreme, Seattle Coffee,.."
              value={brew.coffee}
              onChange={handleChange}
            />
            <input
              className=" border-2 border-ter rounded-lg p-2 w-full bg-sec hover:border-4 hover:border-ter hover:bg-sec hover:text-cuar shadow-ter shadow-md text-xl"
              id="grams"
              type="number"
              max={999}
              placeholder="In grams"
              value={brew.grams}
              onChange={handleChange}
            />
            <input
              className=" border-2 border-ter rounded-lg p-2 w-full bg-sec hover:border-4 hover:border-ter hover:bg-sec hover:text-cuar shadow-ter shadow-md text-xl"
              id="time"
              type="number"
              max={999}
              placeholder="In seconds"
              value={brew.time}
              onChange={handleChange}
            />
          </div>
          <button
            className="flex font-extrabold justify-center items-center border-2 border-ter rounded-lg p-2 w-full bg-sec hover:border-4 hover:border-ter hover:bg-sec hover:text-cuar shadow-ter shadow-md text-xl"
            onClick={() => postBrew(event)}
          >
            Add it ➕
          </button>
        </div>
      )}
    </div>
  );
}

export default inputnext;
