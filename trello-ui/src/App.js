import React from 'react';
import '~/App.scss';

import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './components/BoardBar/BoardBar';
import BoardContent from './components/BoardContent/BoardContent';
import 'font-awesome/css/font-awesome.min.css';

function App() {
    return (
        <div className="trello-master">
            <AppBar />
            <BoardBar />
            <BoardContent />
        </div>
    );
}

export default App;
