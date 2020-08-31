import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from './AppReducer'

// initial state
const initialState = {
    watchlist: [],
    watched: []
};
 
// create Context
export const GlobalContext = createContext(initialState)

// provider component
export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // Actions
    const addMovieToWatchlist = (movie) => {
        dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie })
    }

    return (
        <GlobalContext.Provider value={{watchlist: state.watchlist, watched: state.watched, addMovieToWatchlist}}>
            {props.children}
        </GlobalContext.Provider>
    )
}
