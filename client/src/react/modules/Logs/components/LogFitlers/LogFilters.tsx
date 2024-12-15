import { useTypedDispatch, useTypedSelector } from "../../../../hooks/useRedux";

import DropdownFilter from "../../../../components/DropdownFilter/DropdownFilter"
import { FaDatabase } from "react-icons/fa6";
import "./log_filters.scss"
import { SynchronizationStatusEnum } from "../../../../types/SynchronizationStatusEnum";
import Button from "../../../../UI/Button/Button";
import { changeFilters, setLogs } from "../../slice/logSlice";
import useHttp from "../../../../hooks/useHttp";
import { useEffect } from "react";

const LogFilters = () => {
    const dispatch = useTypedDispatch();
    const {status, type} = useTypedSelector(state => state.logSlice.filters);
    const {id} = useTypedSelector(state => state.userData);
    const {fetchData} = useHttp();

    useEffect(() => {
        getLogs();
    }, [])

    const getLogs = async () => {
        try{
            const filteredLogs = await fetchData(`http://localhost:4000/api/logs?status=${status}&type=${type}&id=${id}`);
            dispatch(setLogs(filteredLogs.logs));

        } catch(e){
            dispatch(setLogs([]));
        }
    }

    return (
        <div className="log-filters">
            <DropdownFilter
                label = "Тип данных"
                icon={<FaDatabase />}
                defaultValue={"all"} 
                options={[{label: "Все", value: "all"}, {label: "JSON", value: "JSON"}, {label: "XML", value: "XML"}]}
                onChange={(value) => dispatch(changeFilters({key: "type", value: value}))}/>

            <DropdownFilter
                label = "Статус"
                defaultValue={"all"} 
                options={[{label: "Все", value: "all"}, {label: "Выполнено", value: SynchronizationStatusEnum.COMPLETE}, {label: "Отклонено", value: SynchronizationStatusEnum.FAIL}]}
                onChange={(value) => dispatch(changeFilters({key: "status", value: value}))}/>    

            <Button
                className="log-filters__apply"
                title="Фильтр"
                onClick={getLogs}/>        
        </div>
    )
}

export default LogFilters;