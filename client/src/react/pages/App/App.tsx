import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTypedDispatch } from "../../hooks/useRedux";
import { login } from "../../slice/userSlice";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";

import { routes } from "./routes/routes";

function App() {
    const dispatch = useTypedDispatch();
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
            dispatch(login(JSON.parse(storedUser)));
        }
    }, [dispatch])

  return (
    <div className="App">
        <Routes>
            {
                routes.map((route) => {
                    return route.isPrivate ? (
                        <Route key={route.path} element={<PrivateRoute />}>
                            <Route path={route.path} element={<route.component />}/>
                        </Route>
                    ) : <Route key={route.path} path={route.path} element={<route.component />}/>
                })
            }    
        </Routes>
    </div>
  );
}

export default App;
