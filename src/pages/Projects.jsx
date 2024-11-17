import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import { allProjectAPI } from '../services/allAPI'
import ProjectCard from '../components/ProjectCard'


const Projects = () => {
  const [searchKey, setsearchKey] = useState("")

  const [allProjects, setAllProjects] = useState([])
  console.log(allProjects);

  useEffect(() => {
    getAllProjects()
  }, [searchKey])

  const getAllProjects = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`

      }
      try {
        const result = await allProjectAPI(searchKey, reqHeader)
        if (result.status == 200) {
          setAllProjects(result.data)
        }
      } catch (err) {
        console.log(err);
      }

    }
  }

  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px' }} className='container-fluid'>
        <div className='d-flex justify-content-between'>
          <h1>All Projects</h1>
          <input onChange={e=>setsearchKey(e.target.value)} placeholder='Search Projects by their language' type="text" className='form-control w-25' />
        </div>
        <Row className="mt-3">
          {
            allProjects?.length > 0 ?
              allProjects?.map(project => (
                <Col key={project?._id} className="mb-3" sm={12} md={6} lg={4}>
                  <ProjectCard displayData={project} />
                </Col>
              ))
              :
              <div className="text-danger fw-bolder">Project not found!!!</div>
          }
        </Row>
      </div>
    </>
  )
}

export default Projects