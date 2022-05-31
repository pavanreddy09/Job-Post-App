
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import './SignUpPage.css';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged} from 'firebase/auth';
import { firebaseAuth, firebaseDatabase } from "../../backend/firebaseHandler";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const SignUpPage = (props) => {

    const navigate = useNavigate();
    const [isDisabled,setIsDisable] = useState(false);

    const [studentinputs,setStudentinputs] = useState({
        studentName:"",
        college:"",
        department:"",
        sslcper:0,
        pucper:0,
        semester:0,
        cgpa:0,
        emailID:"",
        password:""
    })
    
    const handleChange = (e) => {
         const {name,value} = e.target;
         setStudentinputs({
             ...studentinputs,
             [name]:value
         })
    }

    const sendData =  () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
          if(user){
              const uid = user.uid;
              const fireref = ref(firebaseDatabase,`Student-List/${uid}`)
              await set(fireref,{
                studentName : studentinputs.studentName,
                college:studentinputs.college,
                department:studentinputs.department,
                sslcper:studentinputs.sslcper,
                pucper:studentinputs.pucper,
                semester:studentinputs.semester,
                cgpa:studentinputs.cgpa,
                emailId:studentinputs.emailID
            })
            alert("Account Created!")
            props.sendName(studentinputs.studentName);
            navigate('/view-posts')
          }
      })
    }

    const handleClick = async () => {
        if(studentinputs.studentName == "" || studentinputs.college == "" || studentinputs.department == "" || studentinputs.sslcper == "" || studentinputs.pucper == "" || studentinputs.semester == "" || studentinputs.cgpa == "" || studentinputs.emailID == "" || studentinputs.password == "") {
            alert("All Fields Are Required")
        }else{
            setIsDisable(!isDisabled);
            try {
            await createUserWithEmailAndPassword(firebaseAuth,studentinputs.emailID,studentinputs.password)
            sendData();
            }catch(err){
                alert(err)
                setIsDisable(!isDisabled);
            }
        }
    }

    return (
        <div className="student-signup-container">
            <div className="student-signup-inputs">
            <h1>Create Account</h1>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Name" variant="outlined" name="studentName" value={studentinputs.studentName} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="College" variant="outlined" name="college" value={studentinputs.college} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Department" variant="outlined" name="department" value={studentinputs.department} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="SSLC Percentage" variant="outlined" type={'number'} name="sslcper" value={studentinputs.sslcper} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="PUC Percentage" variant="outlined" type={'number'} name="pucper" value={studentinputs.pucper} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Semester" variant="outlined" type={'number'} name="semester" value={studentinputs.semester} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="CGPA" variant="outlined" type={'number'} name="cgpa" value={studentinputs.cgpa} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Email ID" variant="outlined" type={'email'} name="emailID" value={studentinputs.emailID} onChange={handleChange}/>
            <TextField sx={{margin:"10px",width:"400px"}} id="outlined-basic" label="Password" variant="outlined" type={'password'} name="password" value={studentinputs.password} onChange={handleChange}/>

            {isDisabled ?  <Button sx={{height:"50px",width:"400px",alignSelf:"center",marginTop:"20px",borderRadius:"10px"}} variant="contained" disabled>Sign Up</Button> :
            <Button sx={{height:"50px",width:"400px",alignSelf:"center",marginTop:"20px",borderRadius:"10px"}} variant="contained" onClick={handleClick}>Sign Up</Button>
            }
            </div>
        </div>
    )
}

export default SignUpPage