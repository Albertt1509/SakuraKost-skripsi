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
import Favorite from './components/user/Simpan/Favorite'
import Pembayaran from './components/user/pembayaran/Pay'
import Status from './components/user/status/Status'
import { UserContextProvider } from './components/user/UserContext'
//admin
import IndexAdmin from './components/admin/IndexAdmin'
import Home from './components/admin/home/Home'
import Kost from './components/admin/kost/Kost'
import Product from './components/admin/product/Product'
import AdminLay from './components/navbar/LayoutAdmin'
import User from './components/admin/user/User'
import Edit from './components/admin/kost/Edit'
// pemilik
import IndexPemilik from './components/pemilik/indexPemilik'
import PemilikLay from './components/navbar/LayoutPemilik'
import AddKost from './components/pemilik/kost/AddKost'
import EditKost from './components/pemilik/kost/EditKost'
import Order from './components/pemilik/order/order'
//api
axios.defaults.baseURL = "https://cute-teal-penguin-wear.cyclic.app/";
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
          <Route path='/account/:subpage/:action' element={<Account />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/status' element={<Status />} />
          <Route path='/content' element={<Content />} />
          <Route path='/content/:id' element={<DetailKost />} />
          <Route path='/content/:id/pembayaran' element={<Pembayaran />} />
        </Route>
        <Route path='/admin' element={<AdminLay />} >
          <Route index element={<IndexAdmin />} />
          <Route path='/admin/home' element={<Home />} />
          <Route path='/admin/product' element={<Product />} />
          <Route path='/admin/kost' element={<Kost />} />
          <Route path='/admin/user' element={<User />} />
          <Route path='/admin/edit' element={<Edit />} />
        </Route>
        <Route path='/pemilik' element={<PemilikLay />} >
          <Route index element={<IndexPemilik />} />
          <Route path='/pemilik/kost' element={<AddKost />} />
          <Route path='/pemilik/edit' element={<EditKost />} />
          <Route path='/pemilik/order' element={<Order />} />
        </Route>
      </Routes>
    </UserContextProvider>



  )
}

export default App
