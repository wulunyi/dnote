import { Component } from 'react';
import ReactDom from 'react-dom';
import NotePanel from './page';
import './index.css';

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
