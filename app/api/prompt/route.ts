import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (_request: any) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to Fetch the Prompt", { status: 500 });
  }
};
