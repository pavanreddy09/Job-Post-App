
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './404/pagenotfound';
import './App.css';
import JobPostPage from './pages/component/JobPostPage/JobPostComponent';
import SignUpPage from './pages/component/SignUpPage/companysignuppage';

function App() {
  const [details,setDetails] = useState({})

  const fetchDetails = (companyuserInputs) => {
     setDetails(companyuserInputs)
  }

  return (

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUpPage fetchDetails={fetchDetails} />} />
        <Route path='/post-job' element={<JobPostPage data={details}/>} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
