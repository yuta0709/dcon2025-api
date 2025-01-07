import { z } from 'zod';

export const mealSchema = z.object({
  mainDish: z
    .number()
    .min(0)
    .max(10)
    .nullable()
    .describe('主食の摂取量（0-10の割合）'),
  sideDish: z
    .number()
    .min(0)
    .max(10)
    .nullable()
    .describe('副菜の摂取量（0-10の割合）'),
  soup: z
    .number()
    .min(0)
    .max(10)
    .nullable()
    .describe('汁物の摂取量（0-10の割合）'),
  note: z.string().nullable().describe('被介護者の状態に関する特記事項'),
});
