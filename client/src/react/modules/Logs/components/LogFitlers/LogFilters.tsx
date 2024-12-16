import { useTypedDispatch, useTypedSelector } from "../../../../hooks/useRedux";

import DropdownFilter from "../../../../components/DropdownFilter/DropdownFilter"
import { FaDatabase } from "react-icons/fa6";
import "./log_filters.scss"
import { SynchronizationStatusEnum } from "../../../../types/SynchronizationStatusEnum";
import Button from "../../../../UI/Button/Button";
import { changeFilters, setLogs } from "../../slice/logSlice";
import useHttp from "../../../../hooks/useHttp";
import { useEffect } from "react";
import Spinner from "../../../../UI/Spinner/Spinner";
import { colors } from "../../../../../constants/colors";
import { HOST, PORT } from "../../../../../constants/port";

const LogFilters = () => {
    const dispatch = useTypedDispatch();
    const {status, type} = useTypedSelector(state => state.logSlice.filters);
    const {id} = useTypedSelector(state => state.userData);
    const {fetchData, loading} = useHttp();

    useEffect(() => {
        getLogs();
    }, [])

    const getLogs = async () => {
        try{
            const filteredLogs = await fetchData(`http://${HOST}:${PORT}/api/logs?status=${status}&type=${type}&id=${id}`);
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
                value={type} 
                options={[{label: "Все", value: "all"}, {label: "JSON", value: "JSON"}, {label: "XML", value: "XML"}, {label: "MySQL", value: "mysql"}, {label: "PostgreSQL", value: "postgresql"}]}
                onChange={(value) => dispatch(changeFilters({key: "type", value: value}))}/>

            <DropdownFilter
                label = "Статус"
                value={status} 
                options={[{label: "Все", value: "all"}, {label: "Выполнено", value: SynchronizationStatusEnum.COMPLETE}, {label: "Отклонено", value: SynchronizationStatusEnum.FAIL}]}
                onChange={(value) => dispatch(changeFilters({key: "status", value: value}))}/>    

            <div className="log-filters__wrapper">
                <Button
                    className="log-filters__apply"
                    title="Фильтр"
                    onClick={getLogs}/> 
                {loading && <Spinner color={colors.blue}/>}
            </div>
       
        </div>
    )
}

export default LogFilters;