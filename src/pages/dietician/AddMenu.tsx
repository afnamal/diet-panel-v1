import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';

interface Food {
  id: string;
  name: string;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface SelectedFood extends Food {
  quantity: number;
}

const AddMenu = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedFoods, setSelectedFoods] = useState<SelectedFood[]>([]);
  const [menuName, setMenuName] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'foods'));
        const foodsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Food[];
        setFoods(foodsData);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchFoods();
  }, []);

  const handleFoodSelect = (food: Food) => {
    setSelectedFoods((prev) => {
      const existingFood = prev.find((f) => f.id === food.id);
      if (existingFood) {
        return prev.map((f) =>
          f.id === food.id ? { ...f, quantity: f.quantity + 1 } : f
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const handleQuantityChange = (foodId: string, quantity: number) => {
    setSelectedFoods((prev) =>
      prev.map((food) =>
        food.id === foodId ? { ...food, quantity: Math.max(1, quantity) } : food
      )
    );
  };

  const removeFood = (foodId: string) => {
    setSelectedFoods((prev) => prev.filter((food) => food.id !== foodId));
  };

  const calculateTotalCalories = () => {
    return selectedFoods.reduce(
      (total, food) => total + food.calories * food.quantity,
      0
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const menuRef = collection(db, 'menus');
      await addDoc(menuRef, {
        name: menuName,
        foods: selectedFoods,
      });
    } catch (error) {
      console.error('Error adding menu:', error);
      alert('Error adding menu. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Menu</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Menu Name"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <h4>Available Foods</h4>
          <div className="row">
            {foods.map((food) => (
              <div key={food.id} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{food.name}</h5>
                    <p className="card-text">
                      Calories: {food.calories} kcal
                      <br />
                      Protein: {food.protein}g<br />
                      Carbs: {food.carbs}g<br />
                      Fat: {food.fat}g
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleFoodSelect(food)}
                    >
                      Add to Menu
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4>Selected Foods</h4>
          {selectedFoods.map((food) => (
            <div key={food.id} className="card mb-2">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">{food.name}</h5>
                    <p className="card-text">
                      Calories: {food.calories * food.quantity} kcal
                      <br />
                      Quantity:
                      <input
                        type="number"
                        className="form-control d-inline-block ms-2"
                        style={{ width: '80px' }}
                        value={food.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            food.id,
                            parseInt(e.target.value)
                          )
                        }
                        min="1"
                      />
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeFood(food.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h4>Total Calories: {calculateTotalCalories()} kcal</h4>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Menu
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
