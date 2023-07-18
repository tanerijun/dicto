import { Link } from "@remix-run/react";
import { Fragment, useEffect, useRef, useState } from "react";
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

const WordListRow = ({ list }: { list: string[] }) => {
	return (
		<>
			{list.map((item) => (
				<Fragment key={item}>
					{item.split(" ").length > 1 ? (
						<span>{item}</span>
					) : (
						<Link className="cursor-pointer hover:underline" to={`/${item}`}>
							{item}
						</Link>
					)}
				</Fragment>
			))}
		</>
	);
};

const Meanings = ({ meanings }: { meanings: WordMeanings }) => {
	return (
		<div className="flex flex-col gap-12">
			{Object.keys(meanings).map((key) => (
				<section key={key} className="flex flex-col gap-8">
					<h3 className="after:content-[' '] flex items-center gap-6 text-xl font-bold after:block after:h-[1px] after:w-full after:bg-zinc-700">
						{key}
					</h3>

					<ul className="flex flex-col gap-6">
						{meanings[key].map((definition) => (
							<li
								key={definition.definition}
								className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-violet-500 before:content-['']"
							>
								<div className="flex flex-col gap-4">
									<p>{definition.definition}</p>
									{definition.example && (
										<p className="ml-8 text-sm italic text-zinc-500">
											"{definition.example}"
										</p>
									)}
									{definition.synonyms && definition.synonyms.length > 0 && (
										<div className="flex gap-4 text-xs">
											<span className="text-zinc-500">Synonyms:</span>{" "}
											<div className="flex gap-4 text-violet-500">
												<WordListRow list={definition.synonyms} />
											</div>
										</div>
									)}
									{definition.antonyms && definition.antonyms.length > 0 && (
										<div className="flex gap-4 text-xs">
											<span className="text-zinc-500">Antonyms:</span>{" "}
											<div className="flex gap-4 text-violet-500">
												<WordListRow list={definition.antonyms} />
											</div>
										</div>
									)}
								</div>
							</li>
						))}
					</ul>
				</section>
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
