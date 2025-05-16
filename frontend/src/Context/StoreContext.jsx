import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

import axios from "axios";

export const StoreContext = createContext(null);

const CartStateContext = createContext();
const CartDispatchContext = createContext();
let Subtotal = 0;
let Total = 0;

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          image: action.image,
          qty: action.qty,
          org_price: action.org_price,
        },
      ];

    case "UPDATE":
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            qty: item.qty + action.qty,
            price: item.price + action.price,
          };
        }
        return item;
      });

    case "DELETE":
      return state.filter((item) => item.id !== action.id);

      case "CLEAR" : 
      return [];
  }
};

const StoreContextProvider = (props) => {
  const [foodlist, setFoodList] = useState([]);

  const fetchFood = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/food/list");
      if (res.data.success) {
        setFoodList(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [token, setToken] = useState("");
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    fetchFood();
  }, []);

  const contextValue = {
    foodlist,
    Subtotal,
    Total,
    token,
    setToken,
  };
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <StoreContext.Provider value={contextValue}>
      <CartStateContext.Provider value={state}>
        <CartDispatchContext.Provider value={dispatch}>
          {props.children}
        </CartDispatchContext.Provider>
      </CartStateContext.Provider>
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
