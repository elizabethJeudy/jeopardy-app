import { useState } from "react";
import "../styles/clue.css";

function Clue({ value, clue }) {
	const [stage, setStage] = useState(0);
	const [flipped, setFlipped] = useState(false);

	const handleClick = () => {
		setStage(stage + 1);
		setFlipped((prev) => !prev);
	};

	let content;
	let className;
	if (stage === 0) {
		content = `$${value}`;
		className = `jeopardy-clue dollar-value`;
	} else if (stage === 1) {
		content = clue ? clue.question : null;
		className = `jeopardy-clue`;
	} else if (stage === 2) {
		content = clue ? clue.answer : null;
		className = `jeopardy-clue`;
	}

	return (
		<div
			className={`clue-card ${flipped ? "flipped" : ""}`}
			onClick={handleClick}
		>
			<div className={className}>{content}</div>
		</div>
	);
}

export default Clue;
