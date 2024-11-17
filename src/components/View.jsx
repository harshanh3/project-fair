import React, { useContext, useEffect, useState } from 'react'
import Edit from './Edit'
import Add from './Add'
import { userProjectAPI,userProjectRemoveAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../contexts/ContextApi'


const View = () => {
  const { editProjectResponse, seteditProjectResponse } = useContext(editProjectResponseContext)
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
  const [userProjects, setUserProject] = useState([])

  useEffect(() => {
    getUserprojects()
  }, [addProjectResponse, editProjectResponse])

  const getUserprojects = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`

      }
      try {
        const result = await userProjectAPI(reqHeader)
        console.log(result);
        if (result.status == 200) {
          setUserProject(result.data)
        }

      } catch (err) {
        console.log(err);

      }

    }
  }


  const deleteProject = async (id)=>{
    const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        try{
          await userProjectRemoveAPI(id, reqHeader)
          getUserprojects()
        }catch(err){
          console.log(err);
        }
      }
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2 className="text-warning">All Project</h2>
        <div><Add /></div>
      </div>
      <div className='mt-2 allproject'>
        {
          userProjects?.length > 0 ?
            userProjects?.map(project => (
              <div key={project?._id} className="border rounded p-2 d-flex justify-content-between mb-3">
                <h3>{project?.title}</h3>
                <div className='d-flex align-items-center'>
                  <div className='btn'> <Edit project={project} /></div>
                  <div className='btn'><a target='_blank' href={project?.github}><i class="fa-brands fa-github"></i></a></div>
                  <button onClick={()=>deleteProject(project?._id)} className='btn text-danger'><i class="fa-solid fa-trash"></i></button>
                </div>
              </div>
            ))
            :
            <div className='btn-warning fw-bolder'>Not upload any projects yet!!!</div>
        }

      </div>
    </>
  )
}

export default View