import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";

const requestConfig = {};

const Meals = () => {
  const {
     data: loadedMeals, 
     isLoading, 
     error } = useHttp( "http://localhost:3000/meals",
     requestConfig,  []);

  console.log(loadedMeals);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
   return <Error title='Failed to fetch meals' message={error}  />
  }

  if (!loadedMeals) {
    return <p>No meals found...</p>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;

//const [loadedMeals, setLoadedMeals] = useState([]);

// useEffect(() => {                  // useEffect is used to prevent this function from goinnig in infinite loop
//   async function fetchMeals() {         // using another fucntion because we cannot use async with component function
//     const response = await fetch('http://localhost:3000/meals');
//     const meals = await response.json();

//     setLoadedMeals(meals);
//   }
//   fetchMeals(); // calling the above function to get executed
// }, []);  // dependency array here need not to b update because we arenot accepting any prop here..
