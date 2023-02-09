import {RouterProvider} from "react-router-dom";
import './App.css';
import {GoogleOAuthProvider} from "@react-oauth/google";
import routes from './routes/web';


function App() {

  return (

    <div className="App bg-gray-100">
      <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENT_ID}`}>
        <RouterProvider router={routes}/>
      </GoogleOAuthProvider>
    </div>
  )
}

export default App
