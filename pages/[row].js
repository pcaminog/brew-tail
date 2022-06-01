import Head from "next/head";
import Header from "../components/Header";
import { supabase } from "../utils/supabase";
import Comments from "../components/Comments";
import Tablenext from "../components/Tablenext";

function row({ brews, commentss }) {
  return (
    <div className="flex items-center justify-center h-screen bg-pri font-mono">
      <Head>
        <title>{`Brew it ☕️`}</title>
      </Head>
      <Header />
      <div className="grid place-items-center w-3/4 gap-10 m-5">
        <h1 className=" font-extrabold text-8xl text-cuar">Brew 👇</h1>

        <Tablenext brews={brews} />
    <Comments data={commentss}/>
      </div>
      <footer className="bg-pri text-cuar w-full bottom-0 flex absolute  items-center justify-center text-2xl border-t-4 border-t-ter m-4 p-4">
        Powered with ❤️ by Th3st1gh
      </footer>
    </div>
  );
}

export default row;

export const getServerSideProps = async () => {
  const path = 31;

  const { data: brews, errorBrew } = await supabase
    .from("brews0")
    .select()
    .eq("id", path);

const { data: commentss, errorComment } = await supabase
  .from("comments")
  .select()
  .eq("brew_id", path);

  if (errorBrew || errorComment) {
    throw new Error(error.message);
  }

  return {
    props: {
      brews, commentss
    },
  };
};


