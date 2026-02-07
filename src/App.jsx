
import NavBar from './Components/NavBar'
import ReceipeDetail from './Components/ReceipeDetail'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'

function App() {
 

  return (
   <div>
    <Routes>
      <Route path='/' element={<NavBar/>}/>
      <Route path='/receipe/:id' element={<ReceipeDetail/>}/>
    </Routes>
    
   </div>
  )
}

export default App
