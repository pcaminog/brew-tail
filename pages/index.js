import Inputnext from "../components/Inputnext";
import Tablenext from "../components/Tablenext";
import { supabase } from "../utils/supabase";
import  Head from 'next/head'

function Home({ brews }) {


  return (
    <div className="flex items-center justify-center h-screen bg-pri font-mono">
      <Head>
    <title>{`Brew it ☕️`}</title>
  </Head>
      <div className="grid place-items-center w-3/4 gap-10 m-5">
        <h1 className=" font-extrabold text-8xl text-cuar">Brew It ☕️</h1>
        <p className="font-extrabold text-2xl text-s text-cuar">
          A place for coffee lovers to share their brews.
        </p>
        <Tablenext brews={brews} />
        <h2 className="font-extrabold text-2xl text-cuar">
          Add your recipe 👇
        </h2>
        {}
        <Inputnext />
      </div>
      <footer className="bg-pri text-cuar w-full bottom-0 flex absolute  items-center justify-center text-2xl border-t-4 border-t-ter m-4 p-4">
          Powered with ❤️ by Th3st1gh
      </footer>
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
