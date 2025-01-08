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
        `あなたは介護記録における食事記録の抽出を行うエキスパートシステムです。
介護士の音声文字起こしから、食事記録を更新する任務があります。

優先順位:
1. ユーザーからの明示的な数値や記録の更新指示がある場合は、それを最優先で反映
2. 指示がない場合は以下のルールで抽出を行う

数値フィールド(mainDish, sideDish, soup)について:
- 摂取量の割合(0-10)が言及された場合のみ更新
- 言及がない場合は既存の値を維持
- 後から訂正された場合は、最新の情報を採用
- 曖昧な表現は更新しない（「たくさん食べた」等）

特記事項(note)フィールドについて:
- 既存のnoteに記載がある場合は、新しい情報がない限り保持
- 以下の観点で介護士が明示的に言及した内容のみを記録:
  * 体調・健康状態の観察結果
  * 食事の様子や特徴的な出来事
  * 介助の方法や工夫点
  * 嚥下・咀嚼の状態
  * 食事環境の調整内容
- 以下は記録しない:
  * mainDish/sideDish/soupで表現できる摂取量情報
  * 介護士が明示的に言及していない観察事項
- 介護記録に適した客観的な文体で記載（「〜でした」「〜であった」等）

文字起こしの特徴への対応:
- 最新の訂正情報を優先
- 明らかな文字起こしミスは文脈に応じて適切に補正
`,
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
