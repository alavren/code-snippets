import Snippets from '@models/snippet';
import { connectToDB } from '@utils/database';

export const GET = async (_, { params }) => {
  try {
    await connectToDB();

    const prompts = await Snippets.find({ creator: params.id }).populate(
      'creator',
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch snippets created by user', {
      status: 500,
    });
  }
};
