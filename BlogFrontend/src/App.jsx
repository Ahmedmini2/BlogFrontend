// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import PostList from './components/postList';
import Header from './components/Layout/header';
import SinglePost from './components/singlePost';
import PostCreation from './components/postCreation';
import PostEdit from './components/postEdit';

function App() {
  return (
    <Provider store={store}>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<PostList />} > </Route>
          <Route path="/posts/:id" element={<SinglePost />} > </Route>
          <Route path="/create" element={<PostCreation />} />
          <Route path="/edit/:id" element={<PostEdit />} /> 
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;