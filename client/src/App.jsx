import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import TrainerDashboard from './pages/trainer/TrainerDashboard'
import UserDashboard from './pages/user/UserDashboard'
import Skill from './pages/trainer/Skill'
import Content from './pages/trainer/Content'
import ChangePassword from './pages/trainer/ChangePassword'
import TrainerProfile from './pages/trainer/TrainerProfile'
import Handshake from './pages/trainer/Handshake'
import AdminDashboard from './pages/admin/AdminDashboard'
import HandshakeRequest from './pages/user/HandshakeRequest'
import Mycontent from './pages/user/Mycontent'
import AdminLogin from './pages/admin/Adminlogin'
import AdminRegister from './pages/admin/AdminRegister'
import TrainerDashboardHome from './pages/trainer/TrainerDashboardHome'
import AdminChangePassword from './pages/admin/AdminChangePassword'
const Login = lazy(() => import('./pages/public/Login'))
const Register = lazy(() => import('./pages/public/Register'))
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>............Loading</div>}>
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            {/* admin route start */}
            <Route path='/adminlogin' element={<AdminLogin />}></Route>
            <Route path='/adminregister' element={<AdminRegister />}></Route>
            <Route path='/admin/adminDashboard' element={<AdminDashboard />}>
              <Route path='changePassword' element={<AdminChangePassword/>}></Route>


            </Route>
            {/* trainer route start */}
            <Route path='/trainerDashboard' element={<TrainerDashboard />}>
              <Route index element={<TrainerDashboardHome />}></Route>
              <Route path='skill' element={<Skill />}></Route>
              <Route path='content' element={<Content />}></Route>
              <Route path='changePassword' element={<ChangePassword />}></Route>
              <Route path='trainerProfile' element={<TrainerProfile />}></Route>
              <Route path='handshake' element={<Handshake />}></Route>
            </Route>
            {/* learner route start */}
            <Route path='/userDashboard' element={<UserDashboard />}>
              <Route path='skill' element={<Skill />}></Route>
              <Route path='content' element={<Content />}></Route>
              <Route path='changePassword' element={<ChangePassword />}></Route>
              <Route path='trainerProfile' element={<TrainerProfile />}></Route>
              <Route path='handshakeRequest' element={<HandshakeRequest />}></Route>
              <Route path='mycontent' element={<Mycontent />}></Route>


            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>

    </>
  )
}

export default App