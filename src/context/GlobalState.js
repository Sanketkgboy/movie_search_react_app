import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from './AppReducer'

// initial state
const initialState = {
    // check local storage has any movies if yes parse them else return [] 
    watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
    watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};
 
// create Context
export const GlobalContext = createContext(initialState)

// provider component
export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // to store movie in the local storage every time component loads
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
        localStorage.setItem("watched", JSON.stringify(state.watched));
      }, [state]);

    // Actions
    const addMovieToWatchlist = (movie) => {
        dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie })
    }
    
    const removeMovieFromWatchlist = (id) => {
        dispatch({type:"REMOVE_MOVIE_FROM_WATCHLIST", payload: id})
    }

    const addMovieToWatched = (movie) => {
        dispatch({type:"ADD_MOVIE_TO_WATCHED" , payload:movie})
    }

    const moveToWatchlist = (movie) => {
        dispatch({type:"MOVE_TO_WATCHLIST", payload:movie})
    } 
    
    const removeFromWatched = (id) => {
        dispatch({type:"REMOVE_FROM_WATCHED", payload:id})
    } 
    
    
    return (
        <GlobalContext.Provider value={{
            watchlist: state.watchlist, 
            watched: state.watched, 
            addMovieToWatchlist,
            removeMovieFromWatchlist,
            addMovieToWatched,
            moveToWatchlist,
            removeFromWatched}}>
            {props.children}
        </GlobalContext.Provider>
    )
}
