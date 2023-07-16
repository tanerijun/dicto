import { type WordDefinitions } from "~/lib/schema";
import { capitalize } from "~/lib/utils";

export const ResultView = ({
	definitions,
}: {
	definitions: WordDefinitions;
}) => {
	// TODO: consider putting phonetics in its own component
	const phonetics = definitions.phonetics
		? definitions.phonetics.map((phonetic) => ({
				text: phonetic.text,
				audioUrl: phonetic.audio ? phonetic.audio : undefined,
		  }))
		: definitions.phonetic
		? [{ text: definitions.phonetic, audioUrl: undefined }]
		: [];

	return (
		<article>
			<header className="flex justify-between">
				<div>
					<h1 className="text-5xl font-bold">{capitalize(definitions.word)}</h1>
					<div className="flex">
						{phonetics.map((phonetic) => (
							<p key={phonetic.text} className="text-violet-500">
								{phonetic.text}
							</p>
						))}
						{/* TODO: Button to switch among the phonetics */}
						<button className="border border-red-500 p-1">+</button>
					</div>
				</div>
				<button>Play</button>
			</header>
		</article>
	);
};
