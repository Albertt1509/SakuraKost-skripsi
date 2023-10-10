import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './page/IndexPage'
import Login from './page/Login'
import Layout from './Layout'
import Register from './page/Register'
import Account from './page/Account'
import axios from 'axios'
import { UserContextProvider } from './components/user/UserContext'

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true
function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account/:subpage?' element={<Account />} />
        </Route>
      </Routes>
    </UserContextProvider>



  )
}

export default App
