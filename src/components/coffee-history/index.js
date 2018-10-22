import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { FaCoffee } from 'react-icons/fa';
import * as coffeeActionCreators from "../../actions/coffeeActions";

class CoffeeHistory extends Component{ 

    componentDidMount(){ 
        this.props.actions.getCoffeeListAsync();  
        this.props.actions.getCaffeineListAsync();          
    }

    renderCoffeeList(){
        return this.props.caffeineHistory.map((d,i)=>{
            let dateArr = d.get("date").split('T');            
            let finalDate = `${dateArr[0]} ${dateArr[1].split('.')[0]}`;
            return <li key={i} className="list-group-item">
                    <p style={{ padding:0, margin:0, fontSize: 16 }}>{d.get("name")} - {d.get("mg")} mg</p>
                    <p style={{ padding:0, margin:0, fontSize: 12 }}>Servings: {d.get("servings")}</p>                                
                    <p style={{ padding:0, margin:0, fontSize: 12 }}>Description: {d.get("description")}</p>            
                    <p style={{ padding:0, margin:0, fontSize: 12 }}>Date: {finalDate}</p>                
                </li>
        });
    }

    renderCoffeeSelect(){       
        return this.props.coffeeList.map((d,i)=>{
            return <option key={i} value={i} >{d.get("name")} - {d.get("mg")} mg per serving</option>
        });
    }

    render (){

            return(      
        <div className="container">
                
                <h4 style={{ padding: 10 }}>Add Caffeine Intake</h4>

                <form style={{ float: 'left'}}>
               
                    <div className="form-group form-control-sm">
                        
                        <div className="form-group">
                            <select onChange={d=>this.props.actions.selectCoffeeToTake(d.target.value)} className="form-control" id="exampleFormControlSelect1">
                            <option key={'select'} value={'NA'} >Select One</option>
                            { this.renderCoffeeSelect() }
                            </select>
                        </div>
            
                        <div style={{ marginTop: 4, float: 'left'}}  className="form-group">

                            <input 
                                value={this.props.newCaffeine.get("servings")} 
                                onChange={(d)=>this.props.actions.selectCoffeeServings(d.target.value) }
                                style={{ width: 100, float: "right" }} type="text" className="form-control" id="servings" placeholder="servings"/>

                        </div>
                        
                        <div style={{ float: 'right' }} className="form-group form-control-sm">
                            <button type="button" onClick={d=>this.props.actions.submitNewIntakeAsync(this.props.newCaffeine)} 
                            className="btn btn-primary mb-2">Add Intake</button>
                        </div>
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
        caffeineHistory: state.coffee.get("caffeineHistory"),    
        coffeeList: state.coffee.get("coffeeList"),
        newCaffeine: state.coffee.get("newCaffeine")       
    }
}
const mapDispatchToProps = (dispatch) => {
    return { 
        actions: bindActionCreators(coffeeActionCreators, dispatch) 
    }
}

CoffeeHistory = connect(mapStateToProps, mapDispatchToProps)(withRouter(CoffeeHistory));
export default CoffeeHistory;
