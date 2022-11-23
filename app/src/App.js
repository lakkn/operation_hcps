import './App.css';
import React, {useEffect, useState, useMemo, useCallback } from 'react';
import CountUp from 'react-countup';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
    useSearchParams,
    useLocation,
} from "react-router-dom";


function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </Router>
        </div>
    );
}

function Home() {

    const [mode, setMode] = useState('write');
    const [count, setCount] = useState('read');

    useEffect(() => {
        if(mode == 'write'){
            fetch('https://0tc8svpio2.execute-api.us-east-1.amazonaws.com/default/operation-hcps',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({type: mode}),
            }).then((response) => response.json()).then((response) => setCount(response['count']))
            setMode('read');
        }else{
        fetch('https://0tc8svpio2.execute-api.us-east-1.amazonaws.com/default/operation-hcps',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({type: mode}),
        }).then((response) => response.json()).then((response) => setCount(response['count']))
        }
    })

    return (
        <div className="h-all">
            <div>visits</div>
            <div className="h-visits">
                <CountUp end={count} duration={5} useEasing={true} />
            </div>
        </div>
    );
}

export default App;
