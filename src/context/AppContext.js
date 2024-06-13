import React, { createContext, useReducer } from 'react';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_QUANTITY': {
            const updatedExpenses = state.expenses.map((expense) => {
                if (expense.name === action.payload.name) {
                    return {
                        ...expense,
                        quantity: expense.quantity + action.payload.quantity,
                    };
                }
                return expense;
            });
            return {
                ...state,
                expenses: updatedExpenses,
            };
        }
        case 'RED_QUANTITY': {
            const updatedExpenses = state.expenses.map((expense) => {
                if (expense.name === action.payload.name) {
                    const newQuantity = expense.quantity - action.payload.quantity;
                    return {
                        ...expense,
                        quantity: newQuantity < 0 ? 0 : newQuantity,
                    };
                }
                return expense;
            });
            return {
                ...state,
                expenses: updatedExpenses,
            };
        }
        case 'DELETE_ITEM': {
            const updatedExpenses = state.expenses.map((expense) => {
                if (expense.name === action.payload.name) {
                    return {
                        ...expense,
                        quantity: 0,
                    };
                }
                return expense;
            });
            return {
                ...state,
                expenses: updatedExpenses,
            };
        }
        case 'CHG_LOCATION': {
            return {
                ...state,
                Location: action.payload,
            };
        }
        default:
            return state;
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    expenses: [
        { id: "Shirt", name: 'Shirt', quantity: 0, unitprice: 500 },
        { id: "Jeans", name: 'Jeans', quantity: 0, unitprice: 300 },
        { id: "Dress", name: 'Dress', quantity: 0, unitprice: 400 },
        { id: "Dinner set", name: 'Dinner set', quantity: 0, unitprice: 600 },
        { id: "Bags", name: 'Bags', quantity: 0, unitprice: 200 },
    ],
    Location: '£'
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const totalExpenses = state.expenses.reduce((total, item) => {
        return total + (item.unitprice * item.quantity);
    }, 0);

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                CartValue: totalExpenses,
                dispatch,
                Location: state.Location
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
