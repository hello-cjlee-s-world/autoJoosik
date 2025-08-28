import './App.css'
import {Provider} from "react-redux";
import Tailwind from 'primereact/passthrough/tailwind/index.js';
import PageLoader from "./components/common/PageLoader.jsx";
import {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import store from "./components/stores";
import { utils } from "./libs/utils.js"
import {PrimeReactProvider} from "primereact/api";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import Test from "./components/views/Test.jsx";

function App() {
  const contextPath = utils.getContextPath();
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PrimeReactProvider value={{
          ripple: true,
          pt: Tailwind,
        }}>
          <Suspense fallback={<PageLoader />}>
            <BrowserRouter basename={contextPath}>
              <Routes>
                <Route path="/" element={<Test />}></Route>
                {/*<Route element={}>*/}
                {/*</Route>*/}
              </Routes>
            </BrowserRouter>
          </Suspense>
        </PrimeReactProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App
