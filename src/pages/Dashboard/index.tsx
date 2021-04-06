import { Header } from '../../components/Header';
import api from '../../services/api';

import {ModalAddFood} from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { Food } from '../../components/Food';
import { FoodsContainer } from './styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { FoodInputs } from '../../types';


export function Dashboard() {
 
  const [foods, setFoods] = useState<FoodInputs[]>([]);
  const [editingFood, setEditingFood ] = useState<FoodInputs>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);


  async function getItems() {
     setFoods([]);
    try {
      const { data } = await api.get<FoodInputs[]>("/foods");
        setFoods(data);
        console.log('buscaondo arquivos');
        console.log(data)
    } catch (error) {
      alert("Ocorreu um erro ao buscar os items");
    }
  }
  useEffect(() => {

    getItems();
  }, []);


  async function handleDeleteFood(id: number) {
    const updateFoods = [...foods];

    await api.delete(`/foods/${id}`);

    const foodsFiltered = updateFoods.filter(food => food.id !== id);
    setFoods(foodsFiltered);
  }

  async function handleUpdateFood(food: FoodInputs) {

    // const updateFoods = [...foods];
    try {
       await api.put(
        `/foods/${editingFood?.id}`,
        { ...editingFood, ...food },
      );

      //   const foodsUpdated = updateFoods.map(f =>
      //     f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      //   );
      // setFoods(foodsUpdated);
        getItems();
        
    } catch (err) {
      console.log(err);
    }
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }
  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleAddFood() {

  }
  function handleEditFood(food: FoodInputs){
    setEditingFood(food);
    setEditModalOpen(true);
  }
  return (
    // <p>{foods.map((food)=>(
    //     <p key={food.id}>{food.id}</p>
    // ))}</p>
    <>
       <Header handleOpenModal={toggleModal} /> 
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

    <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
             <Food key={food.id}
               food={food}
               handleDelete={()=>handleDeleteFood(food.id)}
              handleEditFood={()=>handleEditFood(food)}
             />
          ))}
      </FoodsContainer>
    </>
  );

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     foods: [],
  //     editingFood: {},
  //     modalOpen: false,
  //     editModalOpen: false,
  //   }
  // }

  // async componentDidMount() {
  //   const response = await api.get('/foods');

  //   this.setState({ foods: response.data });
  // }

  // handleAddFood = async food => {
  //   const { foods } = this.state;

  //   try {
  //     const response = await api.post('/foods', {
  //       ...food,
  //       available: true,
  //     });

  //     this.setState({ foods: [...foods, response.data] });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // handleUpdateFood = async food => {
  //   const { foods, editingFood } = this.state;

  //   try {
  //     const foodUpdated = await api.put(
  //       `/foods/${editingFood.id}`,
  //       { ...editingFood, ...food },
  //     );

  //     const foodsUpdated = foods.map(f =>
  //       f.id !== foodUpdated.data.id ? f : foodUpdated.data,
  //     );

  //     this.setState({ foods: foodsUpdated });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // handleDeleteFood = async id => {
  //   const { foods } = this.state;

  //   await api.delete(`/foods/${id}`);

  //   const foodsFiltered = foods.filter(food => food.id !== id);

  //   this.setState({ foods: foodsFiltered });
  // }

  // toggleModal = () => {
  //   const { modalOpen } = this.state;

  //   this.setState({ modalOpen: !modalOpen });
  // }

  // toggleEditModal = () => {
  //   const { editModalOpen } = this.state;

  //   this.setState({ editModalOpen: !editModalOpen });
  // }

  // handleEditFood = food => {
  //   this.setState({ editingFood: food, editModalOpen: true });
  // }
};


