import { z } from "zod";
import { WordDefinitionsSchema } from "./schema";

const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

export async function getWordDefinitions(word: string) {
	const response = await fetch(`${BASE_URL}/${word}`);

	if (!response.ok) {
		throw new Error("Problem fetching definitions. Try again later!");
	}

	const json = await response.json();

	try {
		const data = z.array(WordDefinitionsSchema).parse(json)[0];
		return data;
	} catch {
		return null;
	}
}
