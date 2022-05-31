
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/StudentSignUpComponent/SignUpPageComponent';
import ViewPosts from './pages/ViewPosts/ViewPostComponent';
import PageNotFound from './404/pagenotFound';
import { useState } from 'react';
import CompanyDetails from './pages/CompanyDetails/CompanyDetailsComponent';

function App() {

  const [name,setName] = useState("");
  const [jobposts,setJobposts] = useState([]);

  const sendName = (name) => {
      setName(name)
  }

  const sendPosts = (post) => {
       setJobposts(post)
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUpPage sendName={sendName}/>}/>
        <Route path='/view-posts' element={<ViewPosts name={name} sendPosts={sendPosts} />} />
        <Route path='/company-detail' element={<CompanyDetails posts={jobposts}/>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
