const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

export async function getWordDefinitionsFromAPI(word: string) {
	const response = await fetch(`${BASE_URL}/${word}`);
	if (!response.ok) {
		return null;
	}

	return await response.json();
}
