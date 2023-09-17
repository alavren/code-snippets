'use client';

import Feed from '@components/Feed';

const Home = () => (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">Discover & Share</h1>
    <h2 className="head_text orange_gradient text-center">Code Snippets</h2>
    <p className="desc text-center">
      Snippet Library is an open-source library for modern world to discover,
      create and share useful code snippets
    </p>

    <Feed />
  </section>
);

export default Home;
