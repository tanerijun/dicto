import { z } from "zod";

const APIWordPhoneticsSchema = z
	.array(
		z.object({
			audio: z.string().optional(),
			sourceUrl: z.string().optional(),
			text: z.string().optional(),
		})
	)
	.optional();

const APIWordMeaningsSchema = z.array(
	z.object({
		partOfSpeech: z.string(),
		definitions: z.array(
			z.object({
				definition: z.string(),
				synonyms: z.array(z.string()),
				antonyms: z.array(z.string()),
				example: z.string().optional(),
			})
		),
		synonyms: z.array(z.string()),
		antonyms: z.array(z.string()),
	})
);

export const APIWordDefinitionsSchema = z.array(
	z.object({
		word: z.string(),
		phonetic: z.string().optional(),
		phonetics: APIWordPhoneticsSchema,
		meanings: APIWordMeaningsSchema,
		sourceUrls: z.array(z.string()),
		license: z.object({
			name: z.string(),
			url: z.string(),
		}),
	})
);
export type APIWordDefinitions = z.infer<typeof APIWordDefinitionsSchema>;

const WordPhoneticSchema = z.object({
	text: z.string(),
	src: z.string().optional(),
});
export type WordPhonetic = z.infer<typeof WordPhoneticSchema>;

const WordMeaningsSchema = z.record(
	z.string(),
	z.array(
		z.object({
			definition: z.string(),
			example: z.string().optional(),
			synonyms: z.array(z.string()).optional(),
			antonyms: z.array(z.string()).optional(),
		})
	)
);
export type WordMeanings = z.infer<typeof WordMeaningsSchema>;

export const WordDefinitionsSchema = z.object({
	word: z.string(),
	phonetics: z.array(WordPhoneticSchema),
	meanings: WordMeaningsSchema,
});
export type WordDefinitions = z.infer<typeof WordDefinitionsSchema>;
