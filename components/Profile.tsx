import React from 'react';
import { Snippet } from '@redux/snippets';
import SnippetCard from './SnippetCard';

type Props = {
  snippets: Snippet[];
  name?: string;
  handleEdit?: () => void;
  handleDelete?: () => Promise<void>;
};

const Profile = ({ snippets, name }: Props): React.ReactElement => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional code snippets`}</p>

      <div className="mt-10 snippet_layout">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
    </section>
  );
};

export default Profile;
