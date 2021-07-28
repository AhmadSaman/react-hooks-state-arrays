import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
	const [foods, setFoods] = useState(spicyFoods);
	const [filterBy, setFilterBy] = useState("All");

	function handleAddFood() {
		const newFood = getNewSpicyFood();
		const newFoodArray = [...foods, newFood];
		setFoods(newFoodArray);
	}

	function handleLiClick(id) {
		//For Removing a list
		// const newRemovedArray = foods.filter((el) => el.id !== id);
		// setFoods(newRemovedArray);
		//For Updating a list
		const newUpdatedArray = foods.map((el) => {
			if (el.id === id) {
				return { ...el, heatLevel: el.heatLevel + 1 };
			} else {
				return el;
			}
		});
		setFoods(newUpdatedArray);
	}

	function handleChange(event) {
		setFilterBy(event.target.value);
	}

	const displayFilteredFood = foods.filter((el) => {
		if (filterBy === "All") {
			return el;
		} else {
			return el.cuisine === filterBy;
		}
	});
	const foodsList = displayFilteredFood.map(
		({ id, name, cuisine, heatLevel }) => (
			<li key={id} onClick={() => handleLiClick(id)}>
				Name: {name}, Cuisine: {cuisine}, HeatLevel: {heatLevel}
			</li>
		)
	);

	return (
		<div>
			<button onClick={handleAddFood}>Add New Food</button>
			<select onChange={handleChange} name="filter">
				<option value="All">All</option>
				<option value="American">American</option>
				<option value="Sichuan">Sichuan</option>
				<option value="Thai">Thai</option>
				<option value="Mexican">Mexican</option>
			</select>
			<ul>{foodsList}</ul>
		</div>
	);
}

export default SpicyFoodList;
