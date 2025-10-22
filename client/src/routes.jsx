import {Routes,Route} from 'react-router-dom';
import Home from './pages/home';


function AppRouter(){


    return(
        <Routes>
            <Route path='/home' element={<Home/>} />
        </Routes>
    )
}

export default AppRouter;