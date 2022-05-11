import { useEffect, useState } from 'react';
import { Food } from '../../components/Food';
import { Header } from '../../components/Header';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import api from '../../services/api';
import { TFood } from '../../types/TFood';
import { FoodsContainer } from './styles';

export function Dashboard() {
  const [foods, setFoods] = useState<TFood[]>([]);
  const [editingFood, setEditingFood] = useState<TFood>();
  const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
  const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    const response = await api.get('/foods');
    setFoods(response.data);
  };

  const handleAddFood = async (food: TFood) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: TFood) => {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood?.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  };

  const toggleModal = () => {
    setIsAddFoodModalOpen(!isAddFoodModalOpen);
  };

  const toggleEditModal = () => {
    setIsEditFoodModalOpen(!isEditFoodModalOpen);
  };

  const handleEditFood = (food: TFood) => {
    setEditingFood(food);
    setIsEditFoodModalOpen(true);
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={isAddFoodModalOpen}
        onClose={toggleModal}
        handleAddFood={handleAddFood}
      />

      <ModalEditFood
        isOpen={isEditFoodModalOpen}
        onClose={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid='foods-list'>
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
