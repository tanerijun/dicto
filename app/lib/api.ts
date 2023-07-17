const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

// TODO: If I decide to implement nested route, consider throwing an error instead of null
export async function getWordDefinitionsFromAPI(word: string) {
	const response = await fetch(`${BASE_URL}/${word}`);
	if (!response.ok) {
		return null;
	}

	return await response.json();
}
