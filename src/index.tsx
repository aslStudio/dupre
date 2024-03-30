import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app/App'
import "./app/styles/critical.scss"
import "./app/styles/main.scss"

ReactDOM.hydrate(<App />, document.getElementById('root'))
