import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import * as coffeeActionCreators from "../../actions/coffeeActions";

class CoffeeList extends Component{ 

    componentDidMount(){ 
        this.props.actions.getCoffeeListAsync();
        this.props.actions.resetNewItem();
    }

    renderCoffeeList(){
        return this.props.coffeeList.map((d,i)=>{
            return <li key={i} className="list-group-item">
                    <p style={{ padding:0, margin:0, fontSize: 16 }}>{d.get("name")} - {d.get("mg")} mg per serving</p>
                    <p style={{ padding:0, margin:0, fontSize: 12 }}>{d.get("description")}</p>                            
                </li>
        });
    }

    render (){

        return(      
            <div className="container">
                
                <h4 style={{ padding: 10 }}>Coffee List</h4>

                <form style={{ float: 'left'}}>
               
                    <div className="form-group form-control-sm">
                        <label htmlFor="coffeeName" className="sr-only">Coffee Name</label>
                        
                        <input 
                            value={this.props.newCoffeeItem.get("name")} 
                            onChange={(d)=>this.props.actions.setNewItem("name", d.target.value, 'text') } 
                            style={{ width: 420, float: "left" }} 
                            type="text" className="form-control" id="coffeeName" placeholder="Coffee Name"/>
                        
                        <input 
                            value={this.props.newCoffeeItem.get("mg")} 
                            onChange={(d)=>this.props.actions.setNewItem("mg", d.target.value, 'number') }
                            style={{ width: 70, float: "right" }} type="text" className="form-control" id="coffeeName" placeholder="mg"/>

                    </div>

                    <div className="form-group form-control-sm">
                        <label htmlFor="coffeeDescription" className="sr-only">Coffee Description</label>
                        <input 
                            value={this.props.newCoffeeItem.get("description")} 
                            onChange={(d)=>this.props.actions.setNewItem("description", d.target.value, 'text') }
                            style={{ width: 500}}  type="text" className="form-control" id="coffeeDescription" placeholder="Coffee Description"/>
                    </div>

                    <div style={{ float: 'right' }} className="form-group form-control-sm">
                        <button type="button" onClick={d=>this.props.actions.submitNewItemAsync(this.props.newCoffeeItem)} className="btn btn-primary mb-2">Add New Coffee</button>
                    </div>

                </form>

                <div>
                    <ul className="list-group" style={{ marginRight: "10px" }}>                        
                        { this.renderCoffeeList() }
                    </ul>
                </div>

            </div>
        )
    }
}


const mapStateToProps = (state) => { 
    return { 
       coffeeList: state.coffee.get("coffeeList"),
       newCoffeeItem: state.coffee.get("newItem")
    }
}
const mapDispatchToProps = (dispatch) => {
    return { 
        actions: bindActionCreators(coffeeActionCreators, dispatch) 
    }
}

CoffeeList = connect(mapStateToProps, mapDispatchToProps)(withRouter(CoffeeList));
export default CoffeeList;
