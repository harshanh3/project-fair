import React, { Children, createContext, useState } from 'react'
export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()

const ContextApi = ({ children }) => {
  const [addProjectResponse, setAddProjectResponse] = useState("")
  const [editProjectResponse, seteditProjectResponse] = useState("")
  return (
    <editProjectResponseContext.Provider value={{ editProjectResponse, seteditProjectResponse }}>
      <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }} >
        {children}
      </addProjectResponseContext.Provider>
    </editProjectResponseContext.Provider>
  )
}

export default ContextApi