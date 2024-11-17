import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import profileImg from '../assets/images.png'
import SERVER_URL from '../services/serverurl'
import {  updateUserAPI } from '../services/allAPI'

const Profile = () => {
  const [preview, setPreview] = useState("")
  const [existingProfileImg, setExistingProfileImg] = useState("")
  const [userDetails, setUserDetails] = useState({
    username: "", email: "", password: "", github: "", linkedin: "", profilepik: ""
  })
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({
        ...userDetails, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin
      })
      setExistingProfileImg(user.profilepik)
    }
  }, [open])

  useEffect(() => {
    if (userDetails.profilepik) {
      setPreview(URL.createObjectURL(userDetails.profilepik))
    } else {
      setPreview("")
    }
  }, [userDetails.profilepik])

  const handleUpdateProfile = async () => {
    const { username, email, password, github, linkedin, profilepik } = userDetails
    if (linkedin && github) {
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profilepik", profilepik) : reqBody.append("profilepik", existingProfileImg)

      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await updateUserAPI(reqBody, reqHeader)
          if (result.status == 200) {
            alert("User profile update successfully")
            sessionStorage.setItem("user", JSON.stringify(result.data))
            setOpen(!open)
          } else {
            console.log(result);

          }
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("please fill the form completely!!!")
    }
  }
  return (
    <>
      <div className="d-flex justify-content-evenly">
        <h3 className='text-warning'>Profile</h3>
        <button onClick={() => setOpen(!open)} className='btn text-warning'><i className="fa-solid fa-chevron-down"></i></button>

      </div>
      <Collapse in={open}>
        <div className="row container-fluid  align-items-center justify-content-center shadow p-2 rounded" id='example-collapse-text'>
          <label className='text-center mb-2'>
            <input onChange={e => setUserDetails({ ...userDetails, profilepik: e.target.files[0] })} type="file" style={{ display: 'none' }} />
            {
              existingProfileImg== "" ?
                <img width={'200px'} height={'200px'} className='rounded-circle' src={preview ? preview : profileImg} alt="" />
                :
                <img width={'200px'} height={'200px'} className='rounded-circle' src={preview ? preview : `${SERVER_URL}/uploads/${existingProfileImg}`} alt="" />
            }
          </label>
          <div className='mb-2 w-100'>
            <input value={userDetails.github} onChange={e => setUserDetails({ ...userDetails, github: e.target.value })} placeholder='user Github Profile Link' type="text" className='form-control' />

          </div>
          <div className='mb-2 w-100'>
            <input value={userDetails.linkedin} onChange={e => setUserDetails({ ...userDetails, linkedin: e.target.value })} placeholder='user Linkedin Profile Link' type="text" className='form-control' />
          </div>
          <div className='d-grid w-100'>
            <button onClick={handleUpdateProfile} className='btn btn-warning'>Update Profile</button>
          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile