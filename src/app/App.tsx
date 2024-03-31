import * as React from 'react'
import {Route, Routes,} from 'react-router-dom'
import {navigation} from "../shared/utils";
import {Home, Login} from "../pages";
import {WithProviders} from "./WithProviders";

export const App: React.FC = () => (
    <WithProviders>
        <Routes>
            <Route path={navigation.Routes.HOME} element={
                <Home />
            } />
            <Route path={navigation.Routes.LOGIN} element={
                <Login />
            } />
        </Routes>
    </WithProviders>

)