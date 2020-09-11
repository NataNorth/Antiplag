import React from 'react';
import { store } from '../../store';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom'
import './styles.module.scss';
import 'semantic-ui-css/semantic.min.css';
import MainPage from '../MainPage';
import UploadPage from '../UploadPage';
import { history } from '../../history';
import Header from '../Header';
import AddPage from '../AddToBDPage';
import ReduxToastr from 'react-redux-toastr'
import TextListPage from '../TextsList';
import ExpandedTextPage from '../ExpandedText';

const App: React.FC = () => (
  <Provider store = {store}>
    <div>
    <Router history={history}>
        <Header/>
        <Route exact path="/" component={MainPage}/>
        <Route path="/upload" component={UploadPage}/>
        <Route path="/add" component={AddPage}/>
        <Route path="/list" component={TextListPage}/>
        <Route path="/expanded/:id" component={ExpandedTextPage}/>
    </Router>
    <ReduxToastr
    timeOut={4000}
    newestOnTop={false}
    preventDuplicates
    position="bottom-right"
    transitionIn="fadeIn"
    transitionOut="fadeOut"
    progressBar
    closeOnToastrClick/>
    </div>
  </Provider>
);

export default App;
