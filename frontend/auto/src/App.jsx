import './App.css'
import {Provider} from "react-redux";
import Tailwind from 'primereact/passthrough/tailwind/index.js';
import PageLoader from "./components/common/PageLoader.jsx";
import {Suspense} from "react";
import {BrowserRouter, Routes} from "react-router-dom";
import {store} from "./components/stores/index.js";

function App() {
  const contextPath = utils.getContextPath();
  return (
    <Provider store={store}>
      <PrimeReactProvider value={{
        ripple: true,
        pt: Tailwind,
      }}>

        <Suspense fallback={<PageLoader />}>
          <BrowserRouter basename={contextPath}>
            <Routes>
              {/*<Route path="" element={}>*/}
              {/*  <Route path="/" element={}></Route>*/}
              {/*</Route>*/}
            </Routes>
          </BrowserRouter>
        </Suspense>
      </PrimeReactProvider>
    </Provider>
  )
}

export default App
