'use client';

import Feed from '@components/Feed';

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">Your Drafted Snippets</h1>

    <Feed isDrafts />
  </section>
);

export default Home;
