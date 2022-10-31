import { Tooltip } from "react-tippy"
import Task from "./Task"

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      <Tooltip
        title="Doubleclick to toggle reminder"
        position="bottom"
        trigger="click"
      >
        {tasks.map((task) => (
            <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
        ))}
      </Tooltip>
    </>
  )
}

export default Tasks