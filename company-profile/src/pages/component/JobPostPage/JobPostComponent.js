
import { Button,  TextField } from "@mui/material";
import { push, ref} from "firebase/database";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseDatabase } from "../../../backend/firebaseHandler";
import './jobpostpage.css';

const JobPostPage = ({data}) => {

    const navigate = useNavigate();
    const [companyDetails,setCompanyDetails] = useState(data);
    const [isDisabled,setIsDisable] = useState(false);
    
    const [jobPostDetails,setJobPostDetails] = useState({
        companyName: companyDetails.companyName,
        HRName:companyDetails.HRName,
        location:companyDetails.location,
        post:"",
        package:"",
        sslccutoff:0,
        puccutoff:0,
        semcutoff:0,
        cgpacutoff:0
    })

    const handleChange = (e) => {
        const {name,value} = e.target;
        setJobPostDetails({
            ...jobPostDetails,
            [name]:value
        })
    }
    
    const handleClick = () => {
      if(jobPostDetails.companyName == "" || jobPostDetails.HRName == "" || jobPostDetails.location == "" || jobPostDetails.post == "" || jobPostDetails.package == "" || jobPostDetails.sslccutoff == "" || jobPostDetails.puccutoff == "" || jobPostDetails.semcutoff == "" || jobPostDetails.cgpacutoff == ""){
            alert("All Fields are Required!")
      }else {
         setIsDisable(!isDisabled);
         const sendData = async () => {
         const fireDatabaseRef = ref(firebaseDatabase,"Company-Post");
         await push(fireDatabaseRef,jobPostDetails)
         alert("Job Added Succesfully!")
         let text = "Do u Want Add Another Post ?"
         if (window.confirm(text) != true) {
            navigate('/');
          }
          setIsDisable(!isDisabled);
        }
        sendData();
      }

    }

    return (
    <div>
        <header>
            <h1>WelCome {jobPostDetails.companyName}!</h1>
        </header>
        <div className="job-post-container">
            <div className="job-post-inputs">
            <h1>POST A JOB</h1>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Company Name" variant="outlined" value={jobPostDetails.companyName} disabled/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="HR Name" variant="outlined" name="HRName" value={jobPostDetails.HRName} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Location" variant="outlined" name="location" value={jobPostDetails.location} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Post" variant="outlined" name="post" value={jobPostDetails.post} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Package" variant="outlined"  name="package" value={jobPostDetails.package} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="10th Cutoff" variant="outlined" type={'number'} name="sslccutoff" value={jobPostDetails.sslccutoff} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="12th Cutoff" variant="outlined" type={'number'} name="puccutoff" value={jobPostDetails.puccutoff} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Sem Cutoff" variant="outlined" type={'number'} name="semcutoff" value={jobPostDetails.semcutoff} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="CGPA Cutoff" variant="outlined" type={'number'} name="cgpacutoff" value={jobPostDetails.cgpacutoff} onChange={handleChange}/>

            {isDisabled ?  <Button sx={{height:"50px",width:"400px",alignSelf:"center",marginTop:"20px",borderRadius:"10px"}} variant="contained" disabled>Post Job</Button> :
            <Button sx={{height:"50px",width:"400px",alignSelf:"center",marginTop:"20px",borderRadius:"10px"}} variant="contained" onClick={handleClick}>Post Job</Button>
            }
            </div>
        </div>
        </div>
    )
}

export default JobPostPage;