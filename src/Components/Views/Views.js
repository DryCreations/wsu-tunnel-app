import React from 'react';
import Map from './Map';
import FAQ from './FAQ';
import About from './About';
import './Views.css';

import {HashRouter, Route, Redirect} from 'react-router-dom';


const Views = props =>{
    return(
      <div className={'myDiv'}>
            
                <Redirect to="Map" />
              <Route exact path="Map" component={Map}/>
              <Route exact path='About' component ={About}/>
              <Route exact path="FAQ" component={FAQ}/>
      </div>
    );

};
export default Views