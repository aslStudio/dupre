import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './app/App'
import "./app/styles/critical.scss"
import "./app/styles/main.scss"
import { BrowserRouter } from "react-router-dom";

ReactDOM.hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
)
