import {RouterProvider} from "react-router-dom";
import './App.css';
import {GoogleOAuthProvider} from "@react-oauth/google";
import routes from './routes/web';
import { QueryClientProvider, QueryClient } from "react-query";

const queryCLient = new QueryClient();


function App() {

  return (

    <div className="App bg-gray-100">
      <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENT_ID}`}>
        <QueryClientProvider  client={queryCLient}>
          <RouterProvider router={routes}/>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </div>
  )
}

export default App
