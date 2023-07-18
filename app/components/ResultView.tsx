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

const Meanings = ({ meanings }: { meanings: WordMeanings }) => {
	return (
		// TODO: can this be more semantic?
		<div className="flex flex-col gap-8">
			{Object.keys(meanings).map((key) => (
				<div key={key}>
					<h3 className="after:content-[' '] flex items-center gap-6 text-xl after:block after:h-[1px] after:w-full after:bg-zinc-700">
						{key}
					</h3>

					<p className="text-zinc-500">Meaning</p>

					<ul className="flex flex-col gap-8">
						{meanings[key].map((definition) => (
							<li key={definition.definition} className="flex flex-col gap-2">
								<p>{definition.definition}</p>
								{definition.example && <p>Example: {definition.example}</p>}
								{definition.synonyms && definition.synonyms.length > 0 && (
									<p className="flex gap-4">
										<span>Synonyms:</span>{" "}
										{definition.synonyms.map((synonym) => (
											<span key={synonym}>{synonym}</span>
										))}
									</p>
								)}
								{definition.antonyms && definition.antonyms.length > 0 && (
									<p className="flex gap-4">
										<span>Antonyms:</span>{" "}
										{definition.antonyms.map((antonym) => (
											<span key={antonym}>{antonym}</span>
										))}
									</p>
								)}
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
		<article className="flex flex-col gap-8">
			<Header word={definitions.word} phonetics={definitions.phonetics} />
			<Meanings meanings={definitions.meanings} />
		</article>
	);
};
