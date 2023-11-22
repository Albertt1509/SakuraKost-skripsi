import { Route, Routes } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import IndexPage from './components/user/home/IndexPage'
import Login from './page/Login'
import Layout from './components/navbar/Layout'
import Register from './page/Register'
import Account from './page/Account'
import Content from './components/user/content/Content'
import DetailKost from './components/user/content/DetailKost'
import Booking from './components/user/Simpan/Booking'
import Pembayaran from './components/user/content/Pembayaran'
import { UserContextProvider } from './components/user/UserContext'
//admin
import IndexAdmin from './components/admin/IndexAdmin'
import Home from './components/admin/home/Home'
import Kost from './components/admin/kost/Kost'
import Product from './components/admin/product/Product'
import AdminLay from './components/navbar/LayoutAdmin'
import User from './components/admin/user/User'
import Edit from './components/admin/kost/Edit'


//api
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true
function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/content' element={<Content />} />
          <Route path='/content/:id' element={<DetailKost />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account/:subpage?' element={<Account />} />
          <Route path='/account/:subpage/:action' element={<Account />} />
          <Route path='/simpan' element={<Booking />} />
          <Route element={<Pembayaran />} />

        </Route>
        <Route path='/admin' element={<AdminLay />} >
          <Route index element={<IndexAdmin />} />
          <Route path='/admin/home' element={<Home />} />
          <Route path='/admin/product' element={<Product />} />
          <Route path='/admin/kost' element={<Kost />} />
          <Route path='/admin/user' element={<User />} />
          <Route path='/admin/edit' element={<Edit />} />
        </Route>
      </Routes>

    </UserContextProvider>



  )
}

export default App
