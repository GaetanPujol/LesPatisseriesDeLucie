import "./app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicRouter from "../../pages/Public/PublicRouter/PublicRouter";
import AdminRouter from "../../pages/Admin/AdminRouter";
import AuthGuard from "../../_utils/AuthGuard";

function App() {

  return (

    <div className="app">
    
      <BrowserRouter>
    
        <Routes>
    
          <Route path="/*" element={<PublicRouter />} />
          <Route path="/admin/*" element={
    
            <AuthGuard>
              <AdminRouter />
            </AuthGuard>
            
          }/>
        
        </Routes>
      
      </BrowserRouter>
    
    </div>

  );
}

export default App;
