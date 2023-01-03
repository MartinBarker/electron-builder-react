import React, { useState, useEffect } from 'react';

function Sidebar2() {

    const [projects, setProjects] = useState({});

    useEffect(() => {
        loadSavedProjects()
    }, []);

    function loadSavedProjects() {
        console.log('loadSavedProjects()')
        let localStorageProjects = JSON.parse(localStorage.getItem('projects'))
        console.log(`${Object.keys(localStorageProjects).length} localStorageProjects = `, localStorageProjects)
        setProjects(localStorageProjects)
    }

    function saveProjects(newProjects = projects) {
        let datetime = getDatetime()
        console.log(`Saving ${Object.keys(newProjects).length} projects to localstorage: `, datetime)
        localStorage.setItem('projectsSaveTime', datetime)
        localStorage.setItem('projects', JSON.stringify(newProjects))

        let localStorageProjects = JSON.parse(localStorage.getItem('projects'))
        console.log(`${Object.keys(localStorageProjects).length} localStorageProjects = `, localStorageProjects)

    }

    function getDatetime() {
        var now = new Date;
        var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
            now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
        return (utc_timestamp)
    }

    function getProjectId() {
        let id = Date.now();
        while (projects[id]) {
            id = Date.now();
        }
        return id.toString().slice(-6);;
    }

    function addProject() {
        let newProjects = { ...projects };
        let projectId = getProjectId();
        let projectName = `Project-${projectId}`
        newProjects[projectId] = {
            'name': projectName
        }
        setProjects(newProjects)
        saveProjects()
    }

    function removeProject(projectId) {
        console.log('delete project ', projectId)
        let newProjects = { ...projects };
        delete newProjects[projectId]
        setProjects(newProjects)
        saveProjects(newProjects)
    }

    function changeProjectName(e) {
        e.preventDefault();
        console.log(e)
        console.log(e.target)
        console.log(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('You have submitted');
        console.log(e)
        console.log(e.target)
        console.log(e.target.value)
    }

    return <>
        <h1>{Object.keys(projects).length} projects</h1>
        <button onClick={() => { addProject() }} >Add Project</button>
        {Object.keys(projects).map((key) => (
            <div key={key}>

                <div>
                    <button onClick={() => { removeProject(key) }}>X</button>
                    <a>{projects[key].name}</a>
                </div>

                <br></br>
                <br></br>

                <hr></hr>

            </div>
        ))}



    </>;

}

export default Sidebar2;
