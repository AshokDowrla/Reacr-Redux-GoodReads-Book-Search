const initialState={
    inputText: '',
    searchResults : []
}


const reducer  =(state=initialState,action) =>{


    switch(action.type){

        case 'INPUT CHANGE':
        return{
            ...state,
            inputText:action.payload
        }

        case 'SEARCH BOOK':
            const newItem = action.search
            const newState = state.searchResults.slice();
           // console.log(action.search)
            newState.push(newItem)
            return{
                ...state,
                searchResults:newState

            }
        case 'EMPTY ARRAY':
            const emptyState =[]

            return{
                ...state,
                searchResults:emptyState
            }

        default:
            return state

        
    }
    
}

export default reducer