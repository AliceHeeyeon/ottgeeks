import {HashRouter, Routes, Route} from 'react-router-dom'
import './css/App.css'

//Pages
import Home from './pages/Home'

//Components
import Header from './components/Header'
import Footer from './components/Footer'

function App() {  return (
    <div className='App'>
      <HashRouter>
        <Header/>
          <div className='pages'>
            <Routes>
                <Route path='/' element={<Home />}/>
            </Routes>
        <Footer />
          </div>
      </HashRouter>
     
    </div>
  )
}

export default App
