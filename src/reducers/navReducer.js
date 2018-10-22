import Immutable from "immutable";

const navInitialState = {
  nav: Immutable.fromJS({
    list: [
        { title: "Home", route: "/" },
        { title: "Add Caffeine Intake", route: "/coffee-history" },
        { title: "Coffee List", route: "/coffee-list" }
    ]
  })
};

function navReducer(state = navInitialState.nav, action) {
    
  switch (action.type) {

    case 'CHANGE_NAV_STATUS':
        state = state.update('list', d => d.map((a,i)=>{
            if(a.get('route') === action.route){
                a = a.set('status', true);
            }else{
                a = a.set('status', false);
            }
            return a;
        }));
    return state;

    default:
      return state;
  }
}

export { navReducer };
