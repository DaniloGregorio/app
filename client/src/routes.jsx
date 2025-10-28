import {Routes,Route} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';


function AppRouter(){


    return(
        <Routes>
            <Route path='/home' element={<Home/>} />
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    )
}

export default AppRouter;