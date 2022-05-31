
import { Button } from "@mui/material";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseDatabase } from "../../backend/firebaseHandler";
import './ViewPosts.css';

const ViewPosts = ({name,sendPosts}) => {
    
    const navigate = useNavigate();
    const [posts,setPosts] = useState([]);

    useEffect(() => {
        const fireref = ref(firebaseDatabase,"Company-Post")
        onValue(fireref, (snapshot) => {
            setPosts(Object.values(snapshot.val()));
          });
      
    },[])
    
    const handleClick = (e) => {
          const id = e.target.id; 
          sendPosts(posts[id]);
          navigate('/company-detail') 
    }

    return (
        <div>
          <header>
              <h1>Welcome {name}</h1>
              <Button sx={{height:"50px",margin:"10px 10px 0 10px"}} variant="contained" onClick={() => navigate("/")}>LogOut</Button>
          </header>
          <div className="post-container">
              <h1>Job List:</h1>
              {posts.map((post,index) => {
                  return (
                      <div className="posts" key={index}>
                        <h1>{post.companyName}</h1>
                        <h1>{post.post}</h1>
                        <Button sx={{width:"200px",height:"50px",alignSelf:"center",marginLeft:"200px",marginTop:"20px",borderRadius:"8px"}} variant="outlined" id={index} onClick={handleClick}>View More & Apply</Button>
                        <p>{post.HRName}</p>
                        <p>package {post.package}</p>
                      </div>
                  )
              })}
          </div>
        </div>
    )
}

export default ViewPosts