import Snippet from '@models/snippet';
import { connectToDB } from '@utils/database';

export const GET = async () => {
  try {
    await connectToDB();

    const snippets = await Snippet.find({}).populate('creator');

    return new Response(JSON.stringify(snippets), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all snippets', { status: 500 });
  }
};
