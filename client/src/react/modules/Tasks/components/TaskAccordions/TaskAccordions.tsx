import Accordion from "../../UI/Accordion";
import Platform from "../Platform/Platform";
import Mapping from "../Mapping/Mapping";

const TaskAccordions = () => {
    return (
        <div className="tasks__content">
            <Accordion label="Выбор платформы">
                <Platform />
            </Accordion>
            <Accordion label="Маппинг">
                <Mapping />
            </Accordion>
            <Accordion label="Фильтрация">
                <div>Accordion 3</div>
            </Accordion>
            <Accordion label="Планирование">
                <div>Accordion 4</div>
            </Accordion>
        </div>
    )
}

export default TaskAccordions;