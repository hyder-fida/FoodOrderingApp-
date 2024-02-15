import { useState, useEffect } from "react";
import MealItem from "./MealItem";

const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([]); 

  useEffect(() => {                  // useEffect is used to prevent this function from goinnig in infinite loop
    async function fetchMeals() {         // using another fucntion because we cannot use async with component function
      const response = await fetch('http://localhost:3000/meals');
      const meals = await response.json();

      setLoadedMeals(meals);
    }
    fetchMeals(); // calling the above function to get executed 
  }, []);  // dependency array here need not to b update because we arenot accepting any prop here..

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
          <MealItem key={meal.id} meal={meal}/>
          
        )
      )}
    </ul>
  );
};

export default Meals;
