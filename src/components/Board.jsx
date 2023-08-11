import { useState, useEffect } from "react";
import Category from "./Category";

import "../styles/board.css";

function Board() {
	const [categories, setCategories] = useState([]);

	// runs once after component is first rendered
	useEffect(() => {
		async function fetchData() {
			let offset = Math.floor(Math.random() * 28175) + 1;

			// fetch categories from API
			const categoryUrl = `http://localhost:4500/api/categories?count=6&offset=${offset}`;
			// response from API
			const categoryResponse = await fetch(categoryUrl);
			// turns into json
			const categoryData = await categoryResponse.json();

			// loops through categories fetch clues for each category
			const categoriesWithClues = await Promise.all(
				categoryData.map(async (category) => {
					const clueUrl = `http://localhost:4500/api/clues?category=${category.id}`;
					const clueResponse = await fetch(clueUrl);
					const clueData = await clueResponse.json();

					// attaches the clues to the category
					return {
						...category,
						clues: clueData,
					};
				})
			).catch((error) => {
				console.error(error);
			});
			// puts the categories and clues inside the state variable
			setCategories(categoriesWithClues);
		}

		fetchData();
	}, []);

	return (
		<div className="jeopardy-board">
			{categories.map((category) => (
				<Category key={category.id} category={category} />
			))}
		</div>
	);
}

export default Board;
