import React from 'react';
import hdnPicture from './img/HDN.png';
import sunburst from './img/sunburst.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function HomeScreen(){
    return(        
        <div style={{display: 'flex', justifyContent: 'center', alignSelf: 'center', marginTop: 200}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}} >
            <img src={hdnPicture} height = '300px' width = '350px' />
            <button style={{marginTop: 5, backgroundColor: 'lightblue'}}><Link to={'/network'} className="nav-link">Disease network</Link></button>         
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <img src={sunburst} height = '300px' width = '350px' />       
            <button style={{marginTop: 5, backgroundColor: 'orange'}}><Link to={'/sunburst'} className="nav-link">Sunburst graph</Link></button>
          </div>  
        </div>
    )
};

export default HomeScreen;