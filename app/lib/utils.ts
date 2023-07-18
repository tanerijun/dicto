import {
	type WordDefinitions,
	type APIWordDefinitions,
	type WordPhonetic,
	type WordMeanings,
} from "./schema";

export function cleanWordDefinitions(
	dirtyWordDefinitions: APIWordDefinitions
): WordDefinitions {
	const cleanPhonetics: WordPhonetic[] = [];
	const cleanMeanings: WordMeanings = {};

	dirtyWordDefinitions.forEach((definition) => {
		definition.phonetics?.forEach((phonetic) => {
			const phoneticInArrayIndex = cleanPhonetics.findIndex(
				(p) => p.text === phonetic.text
			);

			if (phonetic.text && phoneticInArrayIndex === -1) {
				const data: WordPhonetic = {
					text: phonetic.text,
					src: phonetic.audio,
				};
				cleanPhonetics.push(data);
			} else if (
				phonetic.text &&
				phonetic.audio &&
				!cleanPhonetics[phoneticInArrayIndex].src
			) {
				cleanPhonetics[phoneticInArrayIndex].src = phonetic.audio;
			}
		});

		definition.meanings.forEach((meaning) => {
			const key = meaning.partOfSpeech;
			if (!Array.isArray(cleanMeanings[key])) {
				cleanMeanings[key] = [];
			}

			meaning.definitions.forEach((definition) => {
				cleanMeanings[meaning.partOfSpeech].push(definition);
			});
		});
	});

	return {
		word: dirtyWordDefinitions[0].word,
		phonetics: cleanPhonetics,
		meanings: cleanMeanings,
	};
}

export function capitalize(word: string) {
	return word[0].toUpperCase() + word.slice(1);
}
