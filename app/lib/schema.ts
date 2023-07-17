import { z } from "zod";

const APIPhoneticsSchema = z
	.array(
		z.object({
			audio: z.string().optional(),
			sourceUrl: z.string().optional(),
			text: z.string().optional(),
		})
	)
	.optional();

const APIMeaningsSchema = z.array(
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

export const APIDefinitionsSchema = z.object({
	word: z.string(),
	phonetic: z.string().optional(),
	phonetics: APIPhoneticsSchema,
	meanings: APIMeaningsSchema,
	sourceUrls: z.array(z.string()),
	license: z.object({
		name: z.string(),
		url: z.string(),
	}),
});
export type APIDefinitions = z.infer<typeof APIDefinitionsSchema>;

const PhoneticsSchema = z.array(
	z.object({
		text: z.string(),
		src: z.string(),
	})
);
export type Phonetics = z.infer<typeof PhoneticsSchema>;

const MeaningsSchema = z.record(
	z.string(),
	z.object({
		definition: z.string(),
		example: z.string().optional(),
		synonyms: z.array(z.string()).optional(),
		antonyms: z.array(z.string()).optional(),
	})
);
export type Meanings = z.infer<typeof MeaningsSchema>;

export const DefinitionsSchema = z.object({
	word: z.string(),
	phonetics: PhoneticsSchema,
	meanings: MeaningsSchema,
});
export type Definitions = z.infer<typeof DefinitionsSchema>;
