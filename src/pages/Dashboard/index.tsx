import { Header } from '../../components/Header';
import api from '../../services/api';

import { ModalAddFood} from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodComponent} from '../../components/Food';
import { FoodsContainer } from './styles';
import { useState } from 'react';
import { Food, FoodInput } from '../../types';
import { useFoods } from '../../hooks/useFoods';

export function Dashboard() {
  const [editingFood, setEditingFood ] = useState<Food>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { foods, createFood, deleteFood, editFood } = useFoods();

  // async function getItems() {
  //    setFoods([]);
  //   try {
  //     const { data } = await api.get<FoodInputs[]>("/foods");
  //       setFoods(data);
  //       console.log('buscaondo arquivos');
  //       console.log(data)
  //   } catch (error) {
  //     alert("Ocorreu um erro ao buscar os items");
  //   }
  // }
  // useEffect(() => {

  //   getItems();
  // }, []);

  async function handleUpdateFood(food: Food) {
     
    ;
   
    // // const updateFoods = [...foods];
    // try {
    //    await api.put(
    //     `/foods/${editingFood?.id}`,
    //     { ...editingFood, ...food },
    //   );

    //   //   const foodsUpdated = updateFoods.map(f =>
    //   //     f.id !== foodUpdated.data.id ? f : foodUpdated.data,
    //   //   );
    //   // setFoods(foodsUpdated);
    //     // getItems();
        
    // } catch (err) {
    //   console.log(err);
    // }
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }
  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleAddFood() {

  }
  function handleEditFood(food: Food){
    setEditingFood(food);
    setEditModalOpen(true);
  }
  return (
    <>
       <Header handleOpenModal={toggleModal} /> 
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={(food: FoodInput)=>createFood(food)}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={(food: Food)=>editFood(food)}
      />

    <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
             <FoodComponent key={food.id}
               food={food}
               handleDelete={(id: number)=>deleteFood(id)}
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


