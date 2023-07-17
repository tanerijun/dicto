import {
	type WordDefinitions,
	type APIWordDefinitions,
	type WordPhonetic,
} from "./schema";

export function cleanWordDefinitions(dirtyWordDefinitions: APIWordDefinitions) {
	const cleanData: WordDefinitions = {
		word: "",
		phonetics: [],
		meanings: {},
	};

	cleanData.word = dirtyWordDefinitions[0].word;

	// const phoneticSet = new Set<string>(); // Need to consider the audio link too
	const phoneticArray: WordPhonetic[] = [];
	dirtyWordDefinitions.forEach((definition) => {
		definition.phonetics?.forEach((phonetic) => {
			const phoneticInArrayIndex = phoneticArray.findIndex(
				(p) => p.text === phonetic.text
			);
			if (phonetic.text && phoneticInArrayIndex === -1) {
				// if (phonetic.text && !phoneticSet.has(phonetic.text)) {
				const data: WordPhonetic = {
					text: phonetic.text,
					src: phonetic.audio,
				};

				// cleanData.phonetics.push(data);
				phoneticArray.push(data);
				// phoneticSet.add(phonetic.text);
			} else if (!phoneticArray[phoneticInArrayIndex].src && phonetic.audio) {
				phoneticArray[phoneticInArrayIndex].src = phonetic.audio;
			}
		});

		definition.meanings.forEach((meaning) => {
			const key = meaning.partOfSpeech;
			if (!Array.isArray(cleanData.meanings[key])) {
				cleanData.meanings[key] = [];
			}

			meaning.definitions.forEach((definition) => {
				cleanData.meanings[meaning.partOfSpeech].push(definition);
			});
		});
	});

	cleanData.phonetics = phoneticArray;

	return cleanData;
}

export function capitalize(word: string) {
	return word[0].toUpperCase() + word.slice(1);
}
