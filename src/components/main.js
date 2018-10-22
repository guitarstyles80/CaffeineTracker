import React from 'react';
import { Route } from 'react-router-dom';

import Home from './home';
import { Header } from './header';

import CoffeeList from './coffee-list';
import CoffeeHistory from './coffee-history';


const Main = () => (
    <div id="main">
        <Header/>
        <Route exact path='/' component={Home}/>    
        <Route path='/coffee-history/' component={ CoffeeHistory }/>  
        <Route path='/coffee-list/' component={ CoffeeList }/>        
    </div>
)

export default Main
