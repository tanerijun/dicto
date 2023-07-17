import { useEffect, useRef, useState } from "react";
import { type WordDefinitions } from "~/lib/schema";
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

const Header = ({ definitions }: { definitions: WordDefinitions }) => {
	const phonetics = definitions.phonetics
		? definitions.phonetics
				.map((phonetic) => ({
					text: phonetic.text ? phonetic.text : undefined,
					audioUrl: phonetic.audio ? phonetic.audio : undefined,
				}))
				.filter((phonetic) => phonetic.text)
		: definitions.phonetic
		? [{ text: definitions.phonetic, audioUrl: undefined }]
		: [];

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
				<h1 className="text-5xl font-bold">{capitalize(definitions.word)}</h1>
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
			{currentPhonetic.audioUrl && (
				<AudioPlayer src={currentPhonetic.audioUrl} />
			)}
		</header>
	);
};

export const ResultView = ({
	definitions,
}: {
	definitions: WordDefinitions;
}) => {
	return (
		<article>
			<Header definitions={definitions} />
		</article>
	);
};
