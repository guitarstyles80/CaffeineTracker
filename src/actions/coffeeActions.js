import axios from 'axios';

export function resetNewItem() {
    return {
        type: "RESET_NEW_ITEM",
    };
}

export function selectCoffeeToTake(index) {
    return {
        index,
        type: "SELECT_COFFEE_TO_TAKE",
    };
}

export function selectCoffeeServings(value) {    
    return {
        value,
        type: "SELECT_COFFEE_SERVINGS",
    };
}

export function setNewItem(key, value, valueType) {
    return {
        key, 
        value,
        valueType,
        type: "SET_NEW_ITEM",
    };
}

export function getCoffeeListAsync() {
    return async dispatch => {
        try {
            const { data } = await axios.get(`/api/coffee-list`);                    
            dispatch({ data, type: "UPDATE_COFFEE_LIST" });
        }catch(e){
            console.log(e)   
        }
    }
}

export function getCaffeineListAsync() {
    return async dispatch => {
        try {            
            const { data } = await axios.get(`/api/caffeine-list`);          
            dispatch({ data, type: "UPDATE_CAFFEINE_LIST" });
        }catch(e){
            console.log(e)   
        }
    }
}

export function getCaffeineListForGraphAsync() {
    return async dispatch => {
        try {            
            const { data } = await axios.get(`/api/caffeine-list`);          
            dispatch({ data, type: "UPDATE_CAFFEINE_LIST_FOR_GRAPH" });
        }catch(e){
            console.log(e)   
        }
    }
}


export function submitNewItemAsync(newItem) {
    return async dispatch => {
        try {            
            if(newItem.get('name') !== "" && 
                newItem.getIn('description') !== "" && 
                newItem.get("mg") != ""){

                const { data } = await axios.post(`/api/add-coffee`, newItem);              
                if(data.added){
                    dispatch(getCoffeeListAsync());
                    dispatch(resetNewItem());
                }
            }else{
                alert("Complete all fields to add a new item.")
            }
        }catch(e){
            console.log(e)   
        }
    }
}

export function submitNewIntakeAsync(newIntakeItem) {
    return async dispatch => {
        try {
            if(newIntakeItem.get('servings') > 0 && newIntakeItem.getIn(['coffee', '_id']) != undefined){
                const { data } = await axios.post(`/api/add-caffeine`, newIntakeItem);              
                if(data.added){
                    dispatch(getCaffeineListAsync());             
                }
            }else{
                alert("Please select an item and add some servings")
            }
        }catch(e){
            console.log(e)   
        }
    }
}

