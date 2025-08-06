//import Counter from './components/Counter'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import './App.css'
import UserList from './api/User'
import SecondUserList from './api/SecondUsserList'
import UserListAxios from './api/UserListAxios'
function App() {
 return(
  <div>
  <h1>API Fetching IN React</h1>  
  <UserListAxios/>
  </div>
 )
}

export default App
