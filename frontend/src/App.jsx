import './App.css'
import CreatePost from './components/Posts/CreatePost'
import PostsList from './components/Posts/PostsList'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isAuthenticated } from './redux/slices/authSlices'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { checkAuthStatusAPI } from './API/users/usersAPI'

import NavBar from './components/NavBar'
import PrivateNavbar from './components/NavBar/Private'
import UpdatePost from './components/Posts/UpdatePost'
import PostDetails from './components/Posts/PostDetails'
import Login from './components/User/Login'
import Register from './components/User/Register'
import Profile from './components/User/Profile'
import AuthRoute from './components/Auth'
import UserDashboard from './components/User/Dashboard'
import AccountSummaryDashboard from './components/User/AccountSummary'
import AddCategory from './components/Category'
import CreatePlan from './components/Plan/CreatePlan'
import Pricing from './components/Plan/Pricing'
import CheckoutForm from './components/Plan/CheckoutForm'
import PaymentSuccess from './components/Plan/PaymentSucess'
import PayingFreePlan from './components/Plan/PayingFreePlan'
import AccountVerification from './components/User/AccountVerification'
import RequestResetPassword from './components/User/RequestResetPassowrd'
import ResetPassword from './components/User/ResetPassword'
import Rankings from './components/User/CreatorsRanking'
import MyFollowers from './components/User/Followers'
import MyFollowing from './components/User/Following'
import MyEarnings from './components/User/MyEarnings'
import DashboardPosts from './components/User/DashboardPosts'

function App() {
  const { isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ['user-auth'],
    queryFn: checkAuthStatusAPI,
  });
  console.log(data)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data])

  const { userAuth } = useSelector((state) => state.auth)
  console.log(userAuth)

  return (
    <BrowserRouter>
      {userAuth ? <PrivateNavbar /> : <NavBar />}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<UserDashboard />} path="/dashboard">
          <Route element={
            <AuthRoute>
              <AccountSummaryDashboard />
            </AuthRoute>} path="" />
            <Route element={
            <AuthRoute>
              <CreatePost />
            </AuthRoute>} path="create-post" />
            <Route element={
            <AuthRoute>
              <UpdatePost />
            </AuthRoute>} path="update-post/:postId" />
            <Route element={
            <AuthRoute>
              <DashboardPosts />
            </AuthRoute>} path="posts" />
            <Route element={
            <AuthRoute>
              <CreatePlan />
            </AuthRoute>} path="add-plan" />
            <Route element={
            <AuthRoute>
              <AddCategory />
            </AuthRoute>} path="add-category" />
            <Route element={
            <AuthRoute>
              <AccountVerification />
            </AuthRoute>} path="account-verification/:verifyToken" />
            <Route element={
            <AuthRoute>
              <MyFollowers />
            </AuthRoute>} path="my-followers" />
            <Route element={
            <AuthRoute>
              <MyFollowing />
            </AuthRoute>} path="my-followings" />
            <Route element={
            <AuthRoute>
              <MyEarnings />
            </AuthRoute>} path="my-earnings" />
        </Route>
        <Route element={<PostsList />} path="/posts/" />
        {/* <Route element={<UpdatePost />} path="/posts/:id" /> */}
        <Route element={<PostDetails />} path="/posts/:id" />
        <Route element={<Login />} path="/user-login" />
        <Route element={<Register />} path="/user-register" />
        <Route element={<Pricing />} path="/pricing" />
        <Route element={<CheckoutForm />} path="/checkout/:planId" />
        <Route element={<RequestResetPassword />} path="/forgot-password" />
        <Route element={<ResetPassword />} path="/reset-password/:verifyToken" />
        <Route element={<Rankings />} path="/ranking" />
        <Route element={<AuthRoute>
          <Profile />
        </AuthRoute>} path="/profile" />
        <Route element={<AuthRoute>
          <PaymentSuccess />
        </AuthRoute>} path="/success" />
        <Route element={<AuthRoute>
          <PayingFreePlan />
        </AuthRoute>} path="/free-subscription" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
