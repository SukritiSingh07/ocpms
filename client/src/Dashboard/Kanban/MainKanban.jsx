import { KanbanArea } from "./KanbanStyles";
import Todo from "./Todo";
import Doing from "./Doing";
import Done from "./Done";

function MainKanban(){
    return(
        <KanbanArea>
            <Todo />
            <Doing />
            <Done />
        </KanbanArea>
    )
}

export default MainKanban;