import OpenAI from "openai";
import { OPEN_AI_API_KEY } from "./keys";

const openai = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
});

/**
 * Verifies that api requests are appropriate
 */
export const moderate_requests = async (message) => {
  try {
    const moderation = await openai.moderations.create({ input: message });
    return moderation.results[0].flagged;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * AI Generated tags for business
 * @param {string} bis_name the name of the business
 * @param {string} bis_description the description of the business
 * @param {list} bis_pricing the pricing options availaible for the business
 * @returns
 */
export const generate_tags = async (
  acc_id,
  bis_name,
  bis_description,
  bis_pricing
) => {
  const user_request = `Please generate 5 comma-separated ONE WORD tags that best describe this business to the public: "${bis_name}", description: "${bis_description}, and pricing :"${bis_pricing}".`;
  if (await moderate_requests(user_request)) {
    return {
      status: false,
      message: "Business is not appropriate to be uploaded",
    };
  }
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. on seem silly or inappropriate, return ':/' for the tags, if the description seems too short return, ''",
        },
        {
          role: "user",
          content: user_request,
        },
      ],
      model: "gpt-3.5-turbo",
      user: `"${acc_id}"`,
    });

    return {
      status: true,
      message: completion.choices[0].message.content,
    };
  } catch (error) {
    console.error("Error fetching completion:", error);
    throw error;
  }
};
