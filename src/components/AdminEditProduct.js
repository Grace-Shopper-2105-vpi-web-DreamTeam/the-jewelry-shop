import React, { useState, useEffect } from "react";
import {
    useHistory,
} from 'react-router-dom';


const EditProduct = ({ token, routine}) => {
    const [name, setName] = useState(routine.name);
    const [goal, setGoal] = useState(routine.goal);
    const [isPublic, setIsPublic] = useState(routine.isPublic);
    const [routineId, setRoutineId] = useState(routine.id);
    let history = useHistory();
 
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const response = await API.editRoutine(routineId, token, name, goal, isPublic);
        // const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
        //     method: "PATCH",//second argument is a obj with some options in it.  PATCH is used to apply partial modifications to a resource.
        //     headers: {//third argument is an obj
        //         "content-type": "Application/json",
        //         'Authorization': `Bearer ${token}`
        //     },
        //     body: JSON.stringify({
        //         name: name,
        //         goal: goal,
        //         isPublic: isPublic
        //     })

        const data = await response.json();
        history.push('/myroutines');
        // if (data.success) {
        //     const editedRoutine = data
        //     const index = data.findIndex(routine => routine.id === routineId)
        //     editedRoutine.splice(index, 1, data.routine)
        //     setRoutine(editedRoutine)
        // }
    } catch (e) {
        console.error(e);
        }
    }
    return <>
     <div className="card">
        <form onSubmit={handleSubmit}>
        <h1 className="form-title">Edit Your Routine</h1>
        <div className="form-fields">
            <label for="Name"><b>Name</b></label>   
            <input type="text" placeholder="Name" value={name} onChange=
                {(event) => setName(event.target.value)}></input>
            <label for="Goal"><b>Goal</b></label>  
            <input type="text" placeholder="Goal" value={goal} onChange=
                {(event) => setGoal(event.target.value)}></input>
            </div>
            <label>Would You Like This Routine to be Public?</label>
            <input type="checkbox" checked={isPublic} onChange={(event) => setIsPublic(event.target.checked)}></input>
            <button type="submit" className="btn-form">Submit</button>
        </form>
        </div>
    </>

}

export default EditMyRoutine;