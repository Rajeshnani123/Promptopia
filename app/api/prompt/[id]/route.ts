import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

interface RequestType {
  json():
    | { prompt: string; tag: string }
    | PromiseLike<{ prompt: string; tag: string }>;
}

export const GET = async (
  _request: RequestType,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to Fetch the Prompt", { status: 500 });
  }
};

export const PATCH = async (
  _request: RequestType,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await _request.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the Prompt", { status: 500 });
  }
};

export const DELETE = async (
  _request: RequestType,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findByIdAndDelete(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to update the Prompt", { status: 500 });
  }
};
