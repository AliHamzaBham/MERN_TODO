import axios from "axios";
import React, { useState } from "react";
import * as Icon from 'react-bootstrap-icons'

export default function Task(props) {


    // Deleting Task
    document.querySelectorAll('.bin').forEach((e) => {
        e.onclick = (e) => {
            axios.delete(`https://mern-todo-api-bay.vercel.app/deletetask/${e.currentTarget.id}`)
                .then()
                .catch((err) => console.log(err))
        };
    });

    // Task Completed
    document.querySelectorAll('.checkbox').forEach((e) => {
        e.onclick = (e) => {
            console.log(e.currentTarget.id)
            axios.put(`http://localhost:8000/completetask/${e.currentTarget.id}`)
                .then()
                .catch((err) => console.log(err))
        };
    });

    return (
        <>

            {/* Uncomplete */}
            {
                !props.completed &&

                <div className="task-parent">
                    <div className="checkbox" id={props.id}></div>
                    <div className="task-text">
                        <p className="text">{props.task} </p>
                    </div>

                    <div className="bin" id={props.id}>
                        <Icon.Trash size={18} />
                    </div>
                </div>
            }


            {
                props.completed &&

                <div className="task-parent bg-success text-white">

                    <div className="checkbox checked" id={props.id}>
                        <Icon.Check2 color="black" className="tick" size={20}/>
                    </div>

                    <div className="task-text">
                        <p className="text completed">{props.task} </p>
                    </div>

                    <div className="bin" id={props.id}>
                        <Icon.Trash size={18} className="text-white"/>
                    </div>
                </div>
            }
        </>
    )
}