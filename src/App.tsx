import ProductListPage from "./pages/ProductListPage";
import AppFramework from "./frameworks/AppFramework";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<AppFramework />}>
            <Route path = "" element={<ProductListPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
