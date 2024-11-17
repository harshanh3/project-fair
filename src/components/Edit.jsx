import React, { useState, useEffect, useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadImg from '../assets/upload.jpg'
import SERVER_URL from '../services/serverurl'
import { updateProjectAPI } from '../services/allAPI'
import { editProjectResponseContext } from '../contexts/ContextApi'



const Edit = ({ project }) => {
  const { editProjectResponse, seteditProjectResponse } = useContext(editProjectResponseContext)
  const [preview, setPreview] = useState("")
  const [imageFileStatus, setImageFileStatus] = useState(false)
  const [projectDetails, setProjectDetails] = useState({
    id: project._id, title: project.title, language: project.language, overview: project.overview, github: project.github, website: project.website, projectImg: ""
  })
  console.log(projectDetails);

  useEffect(() => {
    if (projectDetails.projectImg.type == "image/png" || projectDetails.projectImg.type == "image/jpg" || projectDetails.projectImg.type == "image/jpeg") {
      // valid image 
      setImageFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImg))
    } else {
      // invalid image
      setImageFileStatus(false)
      setPreview("")
      setProjectDetails({ ...projectDetails, projectImg: "" })
    }
  }, [projectDetails.projectImg])


  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setProjectDetails({ id: project._id, title: project.title, language: project.language, overview: project.overview, github: project.github, website: project.website, projectImg: "" })
  }
  const handleShow = () => {
    setShow(true);
    setProjectDetails({ id: project._id, title: project.title, language: project.language, overview: project.overview, github: project.github, website: project.website, projectImg: "" })
  }


  const handleUpdateProject = async () => {
    const { id, title, language, overview, github, website, projectImg } = projectDetails
    if (title && language && overview && github && website) {
      // api call - put 
      const reqBody = new FormData()
      reqBody.append('title', title)
      reqBody.append('language', language)
      reqBody.append('overview', overview)
      reqBody.append('github', github)
      reqBody.append('website', website)
      preview ? reqBody.append('projectImg', projectImg) : reqBody.append('projectImg', project.projectImg)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await updateProjectAPI(id, reqBody, reqHeader)
          if(result.status==200){
            alert("project updated succesfully!!")
            handleClose()
            seteditProjectResponse(result)

          }
        } catch (err) {
console.log(err);

        }
      }
    } else {
      alert("Please fill the form completely!!!")
    }
  }

  return (
    <>
      <button onClick={handleShow} className='btn'><i class="fa-regular fa-pen-to-square"></i></button>
      <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Project Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label >
                <input onChange={e => setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <img width={"220px"} height={"200px"} className='img-fluid' src={preview ? preview : `${SERVER_URL}/uploads/${project.projectImg}`} alt="" />
              </label>
              {
                !imageFileStatus &&
                <div className='text-warning fw-bolder my-2'>*upload only the following file types (jepg, jpg, png) here!!!</div>
              }            </div>
            <div className="col-lg-8">
              <div className='mb-2'>
                <input value={projectDetails.title} onChange={e => setProjectDetails({ ...projectDetails, title: e.target.value })} placeholder='Project Title' className='form-control' type="text" />
              </div>
              <div className='mb-2'>
                <input value={projectDetails.language} onChange={e => setProjectDetails({ ...projectDetails, language: e.target.value })} placeholder='language used in project' className='form-control' type="text" />
              </div>
              <div className='mb-2'>
                <input value={projectDetails.overview} onChange={e => setProjectDetails({ ...projectDetails, overview: e.target.value })} placeholder='Project Overview' className='form-control' type="text" />
              </div>
              <div className='mb-2'>
                <input value={projectDetails.github} onChange={e => setProjectDetails({ ...projectDetails, github: e.target.value })} placeholder='Project Github Link' className='form-control' type="text" />
              </div>
              <div className='mb-2'>
                <input value={projectDetails.website} onChange={e => setProjectDetails({ ...projectDetails, website: e.target.value })} placeholder='Project Website Link' className='form-control' type="text" />
              </div>


            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit