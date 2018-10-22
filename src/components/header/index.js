import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';

import * as navActionCreators from "../../actions/navActions";

class Header extends Component{ 

    componentDidMount(){
        this.props.actions.changeNavStatus(this.props.location.pathname);
    }

    renderNav(){

        return this.props.list.map((d,i)=>{
            
            var status = d.get('status') === true ? 'active' : '';

            return  <li key={i} className={`nav-item ${status}`}>
                        <a onClick={e=>this.props.actions.changeNavStatus(d.get('route'))} 
                            className="nav-link" href={`#${d.get('route')}`}>{d.get('title')}</a>
                    </li>
        })
    }

    render (){

        return(     

            <div>                
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ "backgroundColor" : "#e3f2fd" }} >

                <div className="container">
                
                <a className="navbar-brand" href="#">Caffeine Tracker</a>        
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">                        
                        { this.renderNav() }
                    </ul>
                </div>
                </div>
                </nav>
            </div>
            )
        }
    }




const mapStateToProps = (state) => { 
    return { 
       list: state.nav.get("list")
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        actions: bindActionCreators(navActionCreators, dispatch) 
    }
}

Header = connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

export { Header }
