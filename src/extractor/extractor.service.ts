import { Injectable } from '@nestjs/common';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { mealSchema } from './schema';

@Injectable()
export class ExtractorService {
  async extractData(transcript: string) {
    const promptTemplate = ChatPromptTemplate.fromMessages([
      [
        'system',
        `You are an expert extraction algorithm.
        Only extract relevant information from the text.
        If you do not know the value of an attribute asked to extract,
        return null for the attribute's value.`,
      ],
      ['human', '{text}'],
    ]);
    const llm = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0,
    });
    const structured_llm = llm.withStructuredOutput(mealSchema);
    const prompt = await promptTemplate.invoke({ text: transcript });
    const response = await structured_llm.invoke(prompt);
    return response;
  }
}
