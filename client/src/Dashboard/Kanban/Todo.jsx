import CreateTask from "./CreateTask";
import { TaskCard, TaskListArea } from "./KanbanStyles";

function Todo(){
    return(
        <TaskListArea>
            <CreateTask />
            <TaskCard>
                
            </TaskCard>
        </TaskListArea>
    )
}

export default Todo;