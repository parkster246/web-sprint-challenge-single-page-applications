
import React from "react";
import HomePage from "./components/HomePage";
import Form from "./components/Form";
import Confirm from "./components/Confirm";
import {Route,Link} from 'react-router-dom';

const App = () => {
  return (
    <div>
    <h1>Lambda Eats</h1>   

    <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/pizza'>Order</Link></li>
        <li><Link to='/confirm'>Confirmation</Link></li>
    </ul>
    <Route exact path='/' component={HomePage}/>
    <Route exact path='/pizza' component={Form}/>
    <Route exact path='/confirm' component={Confirm}/>
</div>


);
};
export default App;
