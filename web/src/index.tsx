import { Component } from 'react';
import ReactDom from 'react-dom';
import NotePanel from './page';

import 'antd/es/button/style';
import 'antd/es/input/style';
import 'antd/es/list/style';

class App extends Component {
    static getDerivedStateFromError(error: Error) {
        console.log(error);

        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        console.warn(error);
    }

    render() {
        return <NotePanel></NotePanel>;
    }
}

ReactDom.render(<App />, document.getElementById('root'));
