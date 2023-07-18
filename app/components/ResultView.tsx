import { useEffect, useRef, useState } from "react";
import {
	type WordMeanings,
	type WordPhonetic,
	type WordDefinitions,
} from "~/lib/schema";
import { capitalize } from "~/lib/utils";

const AudioPlayer = ({ src }: { src: string }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		const audio = new Audio(src);
		audioRef.current = audio;

		audioRef.current.addEventListener("playing", () => {
			setIsPlaying(true);
		});
		audioRef.current.addEventListener("ended", () => {
			setIsPlaying(false);
		});

		return () => {
			audioRef.current?.removeEventListener("playing", () => {
				setIsPlaying(true);
			});
			audioRef.current?.removeEventListener("ended", () => {
				setIsPlaying(false);
			});
		};
	}, [src]);

	const handleClick = () => {
		audioRef.current?.play();
	};

	return (
		<button onClick={handleClick}>{isPlaying ? "Playing" : "Play"}</button>
	);
};

const Header = ({
	word,
	phonetics,
}: {
	word: string;
	phonetics: WordPhonetic[];
}) => {
	const [phoneticIndex, setPhoneticIndex] = useState(0);
	const currentPhonetic = phonetics[phoneticIndex];

	const handleClick = () => {
		const nextPhoneticIndex =
			phoneticIndex === phonetics.length - 1 ? 0 : phoneticIndex + 1;
		setPhoneticIndex(nextPhoneticIndex);
	};

	return (
		<header className="flex justify-between">
			<div>
				<h1 className="text-5xl font-bold">{capitalize(word)}</h1>
				<div className="flex">
					{/* TODO: animate transition among different phonetics */}
					<p className="text-violet-500">{currentPhonetic.text}</p>
					{phonetics.length > 1 && (
						<button className="border border-red-500 p-1" onClick={handleClick}>
							{phoneticIndex}
						</button>
					)}
				</div>
			</div>
			{/* TODO: animate mound and unmount */}
			{currentPhonetic.src && <AudioPlayer src={currentPhonetic.src} />}
		</header>
	);
};

// TODO: on hold, need to clean data
const Meanings = ({ meanings }: { meanings: Meanings }) => {
	return (
		// TODO: can this be more semantic?
		<div>
			{meanings.map((meaning) => (
				<div key={meaning.partOfSpeech}>
					<p>Part of Speech: {meaning.partOfSpeech}</p>
					<p>Definitions:</p>
					<ul>
						{meaning.definitions.map((definition) => (
							<li key={definition.definition}>
								<p>{definition.definition}</p>
								<p>Synonyms: {definition.synonyms}</p>
								<p>Antonyms: {definition.antonyms}</p>
								<p>Example: {definition.example}</p>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export const ResultView = ({
	definitions,
}: {
	definitions: WordDefinitions;
}) => {
	return (
		<article>
			<Header word={definitions.word} phonetics={definitions.phonetics} />
			{/* <Meanings meanings={definitions.meanings} /> */}
		</article>
	);
};
