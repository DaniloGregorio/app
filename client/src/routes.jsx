import {Routes,Route} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import PrivateRoute from './components/privateRoutes';
import Profile from './pages/profile';


function AppRouter(){


    return(
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
        </Routes>
    )
}

export default AppRouter;