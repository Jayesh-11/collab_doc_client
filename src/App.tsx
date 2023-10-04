import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Auth from './auth/Auth'
import PrivateRoute from './auth/PrivateRoute'
import Login from './components/loginPage/Login'
import SocketWrapper from './socket/Socket'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo/ApolloWrapper'

function App() {

  return (
    <div>
      <ApolloProvider client={client}>
        <Auth>
          <SocketWrapper>
            <Router>
              <Routes>
                <Route path="/" element={<PrivateRoute />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Router>
          </SocketWrapper>
        </Auth>
      </ApolloProvider>
    </div>
  )
}

export default App
