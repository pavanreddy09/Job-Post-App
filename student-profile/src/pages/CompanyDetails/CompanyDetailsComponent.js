
import { Button } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseDatabase } from "../../backend/firebaseHandler";
import './CompanyDetails.css';


const CompanyDetails = ({posts}) => {
    
    const navigate = useNavigate();
    const [studentDetails,setStudentDetails] = useState([]);
    const [isDisable,setIsDisable] = useState(false);

    useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth,(user) => {
          if(user){
              const uid = user.uid;
              const fireref = ref(firebaseDatabase,`Student-List/${uid}`)
              onValue(fireref, (snapshot) => {
                setStudentDetails(snapshot.val());
              });
              setIsDisable(!isDisable);
          }
      })
 
    },[])

    const handleClick = () => {
        if(parseFloat(studentDetails.sslcper) < parseFloat(posts.sslccutoff)){
            alert("Your 10th Percentage is Not Reached The Cutoff Apply For Another Job");
            navigate('/view-posts')
        }else if(parseFloat(studentDetails.pucper) < parseFloat(posts.puccutoff)){
            alert("Your 12th Percentage is Not Reached The Cutoff Apply For Another Job");
            navigate('/view-posts')

        }
        else if(parseFloat(studentDetails.cgpa) < parseFloat(posts.cgpacutoff)){
            alert("Your Current CGPA is Not Reached The Cutoff Apply For Another Job");
            navigate('/view-posts')

        }else {
            alert("Applied SuccesFully!");
            navigate('/view-posts')

        }
    }

    return (
        <div className="company-details-container">
            <div className="container">
                <h1>Company Details</h1>
                <div className="company-hr-name-container">
                    <h2>Company Name: {posts.companyName}</h2>
                    <h2>HR Name : {posts.HRName}</h2>
                </div>
                <div className="job-package-container">
                    <h2>Job Role : {posts.post}</h2>
                    <p>Package : {posts.package}</p>
                </div>
                <div className="cutoffs">
                    <div>
                        <h2>10th CutOff : {posts.sslccutoff}</h2>
                        <h2>12th CutOff : {posts.puccutoff}</h2>
                    </div>
                    <div>
                        <h2>Sem CutOff : {posts.semcutoff}</h2>
                        <h2>Current CGPA CutOff : {posts.cgpacutoff}</h2>
                     </div>
                </div>
                    <div className="location">
                        <h2>Location : {posts.location}</h2>
                    </div>
                {isDisable ? <Button sx={{margin:"5px 0 5px 150px",width:"300px"}} variant="contained" onClick={handleClick}>Apply For Job</Button> :
                <Button sx={{margin:"5px 0 5px 150px",width:"300px"}} variant="contained" disabled>Apply For Job</Button> }
            </div>
        </div>
    )
}

export default CompanyDetails;