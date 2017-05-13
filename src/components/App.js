import React from 'react';
import Background from './Background';

const App = () => (
    <div className="app" style={{ height: '10vh' }}>
        <h2 class="front-page-text">I am the Keeper</h2>
        <img src="/front-page-logo.jpg" id="front-page-logo"/>
        <h2 class="front-page-text">I will show you the way</h2>
        <Background />
    </div>
);

export default App;
