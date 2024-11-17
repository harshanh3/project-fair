import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landingimg from '../assets/employee.jpeg'
import ProjectCard from  '../components/projectCard'
import { Card } from 'react-bootstrap'
import { getHomeProjectAPI } from '../services/allAPI'



const Home = () => {
  const [allHomeProjects,setAllHomeProjects] = useState([])
const navigate = useNavigate()

useEffect(()=>{
  getAllHomeProjects()
},[])

const getAllHomeProjects = async()=>{
  try{
const result = await  getHomeProjectAPI()
if(result.status==200){
  setAllHomeProjects(result.data)
}
  }catch(err){
    console.log(err);
    

  }
}
console.log(allHomeProjects);


const  handleProjects = ()=>{
  if(sessionStorage.getItem("token")){
    navigate('/projects')
  }else{
    alert("please login to get full acess")
  }
}


  return (
    <>
    <div style={{minHeight:'100vh'}} className="d-flex justify-content-center align-items-center rounded shadow w-100">
    <div className='container'>
      <div className='row align-items-center'>
        <div className='col-lg-6'>
           <h1 style={{fontSize:'40px'}}><i className='fa-brands fa-docker'>Project Fair</i></h1>
           <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quaerat necessitatibus nemo! Voluptatibus nemo incidunt illum delectus veniam earum vitae esse pariatur, assumenda, laboriosam maxime natus quas cumque, perspiciatis at.</p>
          {
            sessionStorage.getItem("token")?
            <Link to={'/dashboard'} className='btn btn-warning'>Manage your project</Link>
:
           <Link to={'/login'} className='btn btn-warning'>STARTS TO EXPLORE</Link>
          }
        </div>
        <div className='col-lg-6'>
          <img width={'400px'} src={landingimg} alt="" />
        </div>
      </div>
    </div>
    </div>
    <div className="mt-5 text-center">
      <h1 className='mb-5'>Explore our project</h1>
      <marquee>
        <div className='d-flex'>
        {
          allHomeProjects?.map(project =>(
        <div key={project?._id} className='me-5'>
          <ProjectCard displayData={project} />
        </div>
          ))
}
        </div>
      </marquee>
      <button onClick={handleProjects} className='btn btn-link mt-5'>CLICK HERE TO VIEW MORE PROJECT....</button>
    </div>
    <div className="d-flex juststify-content-center align-items-center mt-5 flex-column">
      <h1>Our Testimonials</h1>
      <div className='d-flex align-items-center justify-content-evenly mt-3 w-100'>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
          <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" alt="" />
          <span>Max miller</span>
        </Card.Title>
        <Card.Text>
          <div className='d-flex justify-content-center'>
          <i class="fa-solid fa-star text-warning"></i>
          <i class="fa-solid fa-star text-warning"></i>
          <i class="fa-solid fa-star text-warning"></i>
          <i class="fa-solid fa-star text-warning"></i>
          <i class="fa-solid fa-star text-warning"></i>
          <i class="fa-solid fa-star text-warning"></i>
          </div>
          <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cupiditate veritatis, eius nisi aliquam accusantium amet, praesentium!</p>
        </Card.Text>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
          <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" alt="" />
          <span>Max</span>
        </Card.Title>
        <Card.Text>
          <div className='d-flex justify-content-center'>
          <i class="fa-solid fa-star text-warning"></i>
          <i class="fa-solid fa-star text-warning"></i>
          <i class="fa-solid fa-star text-warning"></i>
          <i class="fa-solid fa-star text-warning"></i>
          <i class="fa-solid fa-star text-warning"></i>
          <i class="fa-solid fa-star-half-stroke text-warning"></i>
          </div>
          <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cupiditate veritatis, eius nisi aliquam accusantium amet, praesentium!</p>
        </Card.Text>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex align-items-center justify-content-center flex-column'>
          <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" alt="" />
          <span>john</span>
        </Card.Title>
        <Card.Text>
          <div className='d-flex justify-content-center'>
          <i class="fa-solid fa-star text-warning"></i>
          <i class="fa-solid fa-star text-warning"></i>
          <i class="fa-solid fa-star text-warning"></i>
          <i class="fa-solid fa-star text-warning"></i>
          </div>
          <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum cupiditate veritatis, eius nisi aliquam accusantium amet, praesentium!</p>
        </Card.Text>
      </Card.Body>
    </Card>
      </div>
      </div>
    </>
  )
}

export default Home