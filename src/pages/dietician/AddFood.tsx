import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../firebase';

interface FoodData {
  name: string;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const AddFood = () => {
  const [foodData, setFoodData] = useState<FoodData>({
    name: '',
    unit: 'gram',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFoodData((prev) => ({
      ...prev,
      [name]: name === 'unit' ? value : name === 'name' ? value : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'foods'), foodData);

      setFoodData({
        name: '',
        unit: 'gram',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      });
      alert('Food added successfully!');
    } catch (error) {
      console.error('Error adding food: ', error);
      alert('Error adding food. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Food</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            value={foodData.name}
            onChange={handleChange}
            placeholder="Food Name"
            required
          />
          <label htmlFor="name">Food Name</label>
        </div>
        <div className="form-floating mb-3">
          <select
            className="form-control"
            name="unit"
            id="unit"
            value={foodData.unit}
            onChange={handleChange}
          >
            <option value="gram">100 Gram</option>
            <option value="count">1 Piece</option>
          </select>
          <label htmlFor="unit">Unit</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="number"
            name="calories"
            id="calories"
            value={foodData.calories}
            onChange={handleChange}
            placeholder="Food Calories"
            required
          />
          <label htmlFor="calories">Food Calories</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="number"
            name="protein"
            id="protein"
            value={foodData.protein}
            onChange={handleChange}
            placeholder="Food Protein"
            required
          />
          <label htmlFor="protein">Food Protein</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="number"
            name="carbs"
            id="carbs"
            value={foodData.carbs}
            onChange={handleChange}
            placeholder="Food Carbs"
            required
          />
          <label htmlFor="carbs">Food Carbs</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="number"
            name="fat"
            id="fat"
            value={foodData.fat}
            onChange={handleChange}
            placeholder="Food Fat"
            required
          />
          <label htmlFor="fat">Food Fat</label>
        </div>
        <button className="btn btn-primary" type="submit">
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFood;
