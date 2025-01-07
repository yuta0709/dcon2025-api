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
        `You are an expert extraction algorithm for meal records.
        Your task is to update the current meal record with new information from the transcript.
        Current meal state is provided as JSON.
        Only update values when new information is clearly stated in the transcript.
        Maintain existing values when no new information is provided.
        Return the complete updated meal record.`,
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
