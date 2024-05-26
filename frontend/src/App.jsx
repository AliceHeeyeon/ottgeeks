import {HashRouter, Routes, Route} from 'react-router-dom'
import './css/App.css'

//Pages
import Home from './pages/Home'
import SingleMovie from './pages/SingleMovie'
import Login from './pages/Login'
import Signup from './pages/Signup'

//Components
import Header from './components/Header'
import Footer from './components/Footer'

function App() {  return (
    <div className='App'>
      <HashRouter>
        <Header/>
          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/:id' element={<SingleMovie />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/signup' element={<Signup />}/>
          </Routes>
        <Footer />
      </HashRouter>
     
    </div>
  )
}

export default App
