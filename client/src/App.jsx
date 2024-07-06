
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import AddUrlComponent from './Components/AddUrlComponent'
import ViewUrlComponent from './Components/ViewUrlComponent'


function App() {


  return (
    <>
      <BrowserRouter>

        <AddUrlComponent />
        <ViewUrlComponent />

      </BrowserRouter>


    </>
  )
}

export default App
