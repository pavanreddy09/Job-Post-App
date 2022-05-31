
import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import './companysignup.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from "../../../backend/firebaseHandler";
import { useNavigate } from "react-router-dom";

const SignUpPage = (props) => {

    const navigate = useNavigate();
    const [companyuserInputs,setCompanyuserInputs] = useState({
        companyName:"",
        HRName:"",
        location:"",
        emailId:"",
        password:""

    })

    const [isDisabled,setIsDisable] = useState(false);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setCompanyuserInputs({
            ...companyuserInputs,
            [name]:value
        })
    }

    const handleClick = async () => {
        if(companyuserInputs.companyName == "" || companyuserInputs.HRName == "" || companyuserInputs.location == "" || companyuserInputs.emailId == "" || companyuserInputs.password == ""){
              alert("All Fields are Required!")
        }else{
          setIsDisable(!isDisabled);
          try {
            await createUserWithEmailAndPassword(firebaseAuth,companyuserInputs.emailId,companyuserInputs.password);
            alert("Account Created!");
            props.fetchDetails(companyuserInputs);
            navigate('/post-job');
          }catch(err) {
              alert(err);
              setIsDisable(!isDisabled);
              setCompanyuserInputs({
                companyName:"",
                HRName:"",
                location:"",
                emailId:"",
                password:""
        
            });
          }
        }
    }

    return (
        <div className="signup-container">
            <div className="inputs-div">
                <h1>Create Account</h1>
                <Stack spacing={3}>
                <TextField id="outlined-basic" label="Company Name" variant="outlined" name="companyName" value={companyuserInputs.companyName} onChange={handleChange}/>
                <TextField id="outlined-basic" label="HR Name" variant="outlined" name="HRName" value={companyuserInputs.HRName} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Location" variant="outlined" name="location" value={companyuserInputs.location} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Email Id" variant="outlined" type={'email'} name="emailId" value={companyuserInputs.emailId} onChange={handleChange}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" type={'password'} name="password" value={companyuserInputs.password} onChange={handleChange}/>

                {isDisabled ? <Button sx={{height:"50px",width:"300px",alignSelf:"center"}} variant="contained" disabled>Sign Up</Button> :
                <Button sx={{height:"50px",width:"300px",alignSelf:"center"}} variant="contained" onClick={handleClick}>Sign Up</Button>
                }
                </Stack>
            </div>
        </div>
    )
}


export default SignUpPage;