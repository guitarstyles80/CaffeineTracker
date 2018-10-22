import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { FaCoffee } from 'react-icons/fa';
import * as coffeeActionCreators from "../../actions/coffeeActions";

import { PieChart, Pie, Sector, Cell } from "recharts";

let data = [
    { name: 'Group A', value: 0 }, 
    { name: 'Group B', value: 100 }
];

const COLORS = ['#ff0000', '#00C49F'];
const RADIAN = Math.PI / 180;                    

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


class Home extends Component{ 

    componentDidMount(){
        this.props.actions.getCaffeineListForGraphAsync();
    }

    render (){

        data[1].value = parseFloat(this.props.intakePercetage);
        data[0].value = parseFloat(100 - this.props.intakePercetage);

        return(      
            <div className="container">
                <div style={{ overflow: 'hidden' }}>
                    <div style={{  float: "left" }}>
                        <PieChart width={220} height={220} onMouseEnter={this.onPieEnter}>
                        <Pie
                            isAnimationActive={false} 
                            style={{ border: "1px solid green" }}
                            data={data} 
                            cx={100} 
                            cy={100} 
                            dataKey="value"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80} 
                            fill="#8884d8" >
                            {
                                data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                            }
                            </Pie>
                        </PieChart>

                    </div>

                    <div style={{ marginTop: 60, float: "left"}}>
                        <ul className="list-group">
                            <li style={{ border: 'none' }} className="list-group-item">
                                <span style={{ padding: "0px", display: "block", width: "25px", height: "25px", float: "left", backgroundColor: COLORS[1], borderRadius: "3px", marginRight: "5px" }} >
                                    <FaCoffee style={{ marginTop: "-4px", marginLeft: "5px", color: "#fff" }} />
                                </span>
                                <span>Current Caffeine Levels ({this.props.intakeMg} mg)</span>
                            </li>
                            <li style={{ border: 'none' }} className="list-group-item">
                                <span style={{ padding: "0px", display: "block", width: "25px", height: "25px", float: "left", backgroundColor: COLORS[0], borderRadius: "3px", marginRight: "5px"  }} >
                                    <FaCoffee style={{ marginTop: "-4px", marginLeft: "5px", color: "#fff" }} />                                
                                </span>
                                <span>Allowable Caffeine Remaining ({500-this.props.intakeMg} mg)</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div>
                    <p>The half-life for caffeine is 4 hours on average.
                    <br/>This chart is dynamic and will adjust based on the time your servings were consumed.</p>                
                </div>
            
            </div>
        )
    }
}


var mapStateToProps = (state) => { 
    return { 
        intakePercetage : state.coffee.get('intakePercetage'),
        intakeMg : state.coffee.get('intakeMg')
    }
}
const mapDispatchToProps = (dispatch) => {
    return { 
        actions: bindActionCreators(coffeeActionCreators, dispatch) 
    }
}

Home = connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));

export default Home;
