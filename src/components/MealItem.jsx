import { useContext } from "react";
import { currencyFormatter } from "../formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

const MealItem = ({ meal }) => {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
     cartCtx.addItem(meal);
  }
  
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-descriptions">{meal.discription}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;