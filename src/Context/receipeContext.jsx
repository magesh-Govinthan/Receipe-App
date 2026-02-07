import { all } from "axios";
import { createContext } from "react";
import { useReducer } from "react";

export const ReceipeContext = createContext({
    selectedReceipe: null,
    bookmarkedReceipes: [],
    allReceipes: [],
    addReceipeToDetails: () => {}
 });

 const actions = {
  SET_SELECTED_RECEIPE: "SET_SELECTED_RECEIPE",
  SET_BOOKMARKED_RECEIPES: "SET_BOOKMARKED_RECEIPES",
  SET_ALL_RECEIPES: "SET_ALL_RECEIPES",
 }

    const initialState = {
    selectedReceipe: null,
    bookmarkedReceipes: [],
    allReceipes: [],
    }

    const ReceipeReducer = (state, action) => {
      switch (action.type) {
        case actions.SET_SELECTED_RECEIPE:
          return { ...state, selectedReceipe: action.payload };
        case actions.SET_BOOKMARKED_RECEIPES:
          return { ...state, bookmarkedReceipes: action.payload };
        case actions.SET_ALL_RECEIPES:
            return { ...state, allReceipes: action.payload };
        default:
          return state;
      }
    }

 export const ReceipeProvider = ({ children }) => {
    const [{selectedReceipe, bookmarkedReceipes, allReceipes}, dispatch] = useReducer(ReceipeReducer, initialState);


    const addReceipeToDetails = (receipe) => {
        dispatch({ type: actions.SET_SELECTED_RECEIPE, payload: receipe });
    }
    const allReceipesWhichSearched = (receipe) => {
        dispatch({ type: actions.SET_ALL_RECEIPES, payload: receipe });
    }
    const value = {
        selectedReceipe,
        bookmarkedReceipes,
        allReceipes,
        addReceipeToDetails,
        allReceipesWhichSearched
    }
    
    return (
        <ReceipeContext.Provider value={value}>
        {children}
        </ReceipeContext.Provider>
    );
}