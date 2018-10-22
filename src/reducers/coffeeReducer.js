import Immutable from "immutable";

const coffeeInitialState = {
  coffee: Immutable.fromJS({
    coffeeList: [        
    ],
    
    caffeineHistory: [
    ],

    newItem: {
        name: "", 
        mg: "", 
        description: ""        
    },

    newCaffeine: {
        servings: '0',
        coffee: {}
    },
    
    intakePercetage: 0

  })
};

function coffeeReducer(state = coffeeInitialState.coffee, action) {
    
  switch (action.type) {
    
    case 'RESET_NEW_ITEM':
        state = state.update('newItem', d => coffeeInitialState.coffee.get('newItem') );
    return state;

    case 'UPDATE_COFFEE_LIST':
        state = state.update('coffeeList', d => Immutable.fromJS(action.data) );
    return state;

    case 'UPDATE_CAFFEINE_LIST':
        state = state.update('caffeineHistory', d => Immutable.fromJS(action.data) );
    return state;

    case 'SET_NEW_ITEM':
        action.value = typeChecker(action.valueType, action.value);
        state = state.updateIn(['newItem', action.key], d => action.value );
    return state;

    case 'SELECT_COFFEE_SERVINGS':
        action.value = typeChecker('number', action.value);
        state = state.updateIn(['newCaffeine', 'servings'], d => action.value );
    return state;
    
    case 'SELECT_COFFEE_TO_TAKE':        
        let coffee = state.getIn(['coffeeList', action.index]);
        state = state.updateIn(['newCaffeine', 'coffee'], d=> coffee);
    return state;

    case 'UPDATE_CAFFEINE_LIST_FOR_GRAPH':       
     
        var now = new Date().getTime();

        var finalMG = action.data.reduce((a,b)=>{            
            let minutesSince = Math.ceil(((now - new Date(b.date).getTime())/1000)/60);        
            if(minutesSince < 240){
                let percentage = ((240-Math.floor(minutesSince))/240);        
                return a + Math.ceil((b.mg*b.servings)*percentage);
            }else{
                return a + 0;
            }
        }, 0);

        state = state.update('intakePercetage', d => ((finalMG/500) * 100).toFixed(2) );
        state = state.update('intakeMg', d => finalMG );
    
    return state;

    default:
      return state;
  }
}

function typeChecker(type, value){
    switch(type){
        case "number":
           let chars = value.split('');
            chars = chars.reduce((a,b)=>{
                if(b.charCodeAt() < 48 || b.charCodeAt() > 57){                    
                    return a;
                }else{
                    return a+b;
                }
            }, '');
            if(chars.indexOf('0') === 0 && chars.length > 1){
                chars = chars.split('')
                chars.shift();                
                chars = chars.join('');                
            }
            value = chars;
        break;
    }

    return value;
}

export { coffeeReducer };
