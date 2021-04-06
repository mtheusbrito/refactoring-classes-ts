import { createContext, ReactNode, useContext,useEffect, useState } from "react";
import api from "../services/api";
import {Food, FoodInput } from "../types";


interface FoodsProviderProps {
  children: ReactNode;
}

interface FoodsContextData{
  foods: Food[];
  createFood: (foodInput: FoodInput) => Promise<void>;
}
const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData);

export function FoodsProvider({children}: FoodsProviderProps) : JSX.Element{
  const [ foods, setFoods] = useState<Food[]>([]);
  async function getFoods(){
    const { data } = await api.get('/foods');
    setFoods(data);

  } 
  useEffect(()=>{
    getFoods();
  }, []) 

async function createFood(foodInput: FoodInput){
  const updateFoods = [...foods];
  const response = await api.post('/foods', foodInput);
  const { food } = response.data;
  
  setFoods([...updateFoods, food])
}
  return (
    <FoodsContext.Provider value={{foods, createFood}}>
      {children}
    </FoodsContext.Provider>
  )
}
export function useFoods(): FoodsContextData{
  const context = useContext(FoodsContext);
  return context;
}