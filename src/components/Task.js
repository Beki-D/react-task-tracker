import { FaTimes } from "react-icons/fa"
import { Tooltip } from "react-tippy"
import 'react-tippy/dist/tippy.css'

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <Tooltip
    title="Doubleclick to toggle reminder"
    position="bottom"
    trigger="mouseenter"
    theme= "dark"
    effect= "float"
    >
      <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={()=>{
          onToggle(task.id) 
      }}>
          <h3> 
              {task.text} 
              <FaTimes 
                  style={{color: 'red', cursor: 'pointer'}} 
                  onClick = {() => onDelete(task.id)}
              />
          </h3>
          <p style={{color: 'rgb(2, 65, 16'}}> {task.day} </p>
      </div>
    </Tooltip>
  )
}

export default Task