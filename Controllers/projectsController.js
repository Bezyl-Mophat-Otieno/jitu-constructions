const {v4} = require('uuid')
const {sqlConfig} = require('../config/config')
const mssql = require('mssql')



class Project{
    constructor(id, project_name, project_location, description, startdate, enddate){
        this.id = id,
        this.project_name = project_name,
        this.project_location = project_location,
        this.description = description,
        
        this.startdate = startdate,
        this.enddate = enddate
    }
}

const createProject = async(req, res)=>{
    try {
        const id = v4()
        console.log(req.info)

        const {project_name, description, project_location, startdate, enddate} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
          const result =  await pool.request()
            .input('id', mssql.VarChar, id)
            .input('project_name', mssql.VarChar, project_name)
            .input('description', mssql.VarChar, description)
            .input('project_location', mssql.VarChar, project_location)
            .input('startdate', mssql.Date, startdate)
            .input('enddate', mssql.Date, enddate)
            .execute('createProject')

            if(result.rowsAffected ==1){
                res.json({
                    message: 'project created successfully',
                })
            }else{
                res.json({
                    message: 'project not created'
                })
            }
        }



    } catch (error) {
        return res.json({error})
    }
}

const getProjects = async(req, res)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
        if(pool.connected){
            const result = await pool.request()
            .execute('getAllProjects')

            const projects = result.recordset

            res.json({
                projects
            })
        }
        
    } catch (error) {
        console.log(error);
        
    }

}

const getOneProject = async(req, res)=>{

    try {
        const {id} = req.params
        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request().input('id',mssql.VarChar, id)
            .execute('getOneProject');
            const project = result.recordset;
            return res.json(project)
        }
        
    } catch (error) {
        return res.json(error)
    }

}

const updateProject = async(req, res)=>{

    try {
        const {id} = req.params

        const {project_name, description, project_location, startdate, enddate} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('id', mssql.VarChar, id)
            .input('project_name', mssql.VarChar,project_name)
            .input('description', mssql.VarChar, description)
            .input('project_location', mssql.VarChar, project_location)
            .input('startdate', mssql.Date, startdate)
            .input('enddate', mssql.Date, enddate)
            .execute('updateProject')

            if(result.rowsAffected ==1){

                res.json({
                    message: 'project updated successfully'
                })
            }else{
                res.json({
                    message: 'project not updated'
                })
            }

        }
        
    } catch (error) {
        return res.json({Error:error})
        
    }

}

const deleteProject = async (req, res)=>{

    try {
        const {id} = req.params

        const pool = await mssql.connect(sqlConfig)

        if (pool.connected){
           const result = await pool.request().input('id',mssql.VarChar, id)
            .execute('deleteProject')

            if (result.rowsAffected == 1){
                res.json({
                    message: 'project deleted successfully'
                })
            }else{
                    res.json({message:'Something went wrong project was not deleted'})
                }
            

        }
    } catch (error) {
    return res.json({Error: error})
        
    }

}

module.exports ={
    createProject,
    getProjects,
    getOneProject,
    updateProject,
    deleteProject
}