import React from "react";
import { Button, DatePicker, version } from "antd";

const App = () => (
    <div className="App">
        <h1>{version}</h1>
        <DatePicker/>
        <Button onClick={()=>alert(1)}>adsda</Button>
    </div>
);

export default App;
