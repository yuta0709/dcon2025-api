import { z } from 'zod';

export const mealSchema = z.object({
  mainDish: z.number().optional().describe('The main dish identifier'),
  sideDish: z.number().optional().describe('The side dish identifier'),
  soup: z.number().optional().describe('The soup identifier'),
  note: z.string().optional().describe('Additional notes'),
});
