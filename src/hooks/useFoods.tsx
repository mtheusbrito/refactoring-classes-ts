import { createContext, ReactNode, useContext,useEffect, useState } from "react";

import api from "../services/api";

interface Food {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}
type FoodInput = Omit<Food, 'id'>;
interface FoodsProviderProps {
  children: ReactNode;
}
interface FoodsContextData {
    foods: Food[];
    createFood: (food: FoodInput) => Promise<void>;

}
export const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData)

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState<Food[]>([]);


  async function getFoods() {
    const { data } = await api.get('/foods');
    setFoods(data);
  }
  useEffect(() => {
    getFoods();
  }, []);
  async function createFood(foodInput: FoodInput) {
    const response = await api.post('/foods', foodInput);
    const { food } = response.data;
    setFoods([...foods, food]);
  }
  async function editFood(food: Food) {
    
  }
  async function deleteFood(id: number){

  }

  async function changeAvailability(){

  }

  return (<FoodsContext.Provider value={{ foods, createFood }}>
    {children}
  </FoodsContext.Provider>)
}
export function useFoods() {
  const context = useContext(FoodsContext);
  return context;
}