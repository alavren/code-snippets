import Snippet from '@models/snippet';
import { connectToDB } from '@utils/database';

export const POST = async (request): Promise<Response> => {
  const { userId, snippet, title, description } = await request.json();

  try {
    await connectToDB();
    const newSnippet = new Snippet({
      creator: userId,
      snippet,
      title,
      description,
    });

    await newSnippet.save();
    return new Response(JSON.stringify(newSnippet), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Failed to create a new snippets',
        error: error,
      }),
      { status: 500 },
    );
  }
};
