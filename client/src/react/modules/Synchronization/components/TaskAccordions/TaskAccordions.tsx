import Accordion from "../../UI/Accordion";
import Platform from "../Platform/Platform";
import Mapping from "../Mapping/Mapping";
import Planning from "../Planning/Planning";

const TaskAccordions = () => {
    return (
        <div className="tasks__content">
            <Accordion label="Выбор платформы">
                <Platform />
            </Accordion>
            <Accordion label="Маппинг">
                <Mapping />
            </Accordion>
            <Accordion label="Планирование">
                <Planning />
            </Accordion>
        </div>
    )
}

export default TaskAccordions;