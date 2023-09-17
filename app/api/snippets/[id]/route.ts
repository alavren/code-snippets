import Snippet, { SnippetFromDB } from '@models/snippet';
import { connectToDB } from '@utils/database';

export const GET = async (_, { params }) => {
  try {
    await connectToDB();

    const snippet = await Snippet.findById(params.id).populate('creator');
    if (!snippet) return new Response('Snippet Not Found', { status: 404 });

    return new Response(JSON.stringify(snippet), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { snippet, title, description } = await request.json();

  try {
    await connectToDB();

    const existingSnippet = await Snippet.findById(params.id);

    if (!existingSnippet) {
      return new Response('Snippet not found', { status: 404 });
    }

    existingSnippet.snippet = snippet;
    existingSnippet.title = title;
    existingSnippet.description = description;

    await existingSnippet.save();

    return new Response('Successfully updated the snippet', { status: 200 });
  } catch (error) {
    return new Response('Error while updating snippet', { status: 500 });
  }
};

export const DELETE = async (_, { params }) => {
  try {
    await connectToDB();

    await Snippet.findByIdAndRemove(params.id);

    return new Response('Snippet deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Error deleting snippets', { status: 500 });
  }
};
