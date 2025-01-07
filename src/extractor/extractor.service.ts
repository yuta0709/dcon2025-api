import { Injectable } from '@nestjs/common';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { mealSchema } from './schema';
import { Meal } from '@prisma/client';

@Injectable()
export class ExtractorService {
  async extractData(transcript: string, currentMeal: Meal) {
    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are an expert extraction algorithm for meal records and care recipient observation.
      Your task is to update the meal record based on care worker's verbal notes in the transcript.
      
      For numerical fields (mainDish, sideDish, soup):
      - Extract eating amount ratios (0-10) when mentioned
      - Maintain existing values when no new information is provided
      
      For the note field:
      - Transform verbal notes into professional care record format covering:
        * Medical and health observations
        * Mood and emotional state
        * Social interactions and communication
        * Daily activities and preferences
        * Changes in routine or behavior
        * Quality of life indicators
        * Environmental adaptations
      - Do not include information already captured in mainDish/sideDish/soup fields
      - Focus on contextual information about eating behavior rather than amounts
      - Summarize observations concisely and objectively
      - Use appropriate care terminology
      - Maintain chronological order
      - Combine related observations into coherent notes
      - Keep previous notes if no new observations are mentioned
      
      Return the complete updated meal record in Japanese.`,
      ],
      ['human', `Current meal state: {currentMeal}\nNew transcript: {text}`],
    ]);

    const llm = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0,
    });
    const structured_llm = llm.withStructuredOutput(mealSchema);
    const prompt = await promptTemplate.invoke({
      currentMeal: JSON.stringify(currentMeal),
      text: transcript,
    });
    const response = await structured_llm.invoke(prompt);
    return response;
  }
}
