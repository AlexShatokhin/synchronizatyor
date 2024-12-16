import {FC, useState} from 'react';
import { useTypedSelector } from '../../hooks/useRedux';
import Button from "../../UI/Button/Button";
import { FaPlus } from "react-icons/fa";
import "./synchronization.scss";
import TaskAccordions from "./components/TaskAccordions/TaskAccordions";
import useHttp from '../../hooks/useHttp';
import Spinner from '../../UI/Spinner/Spinner';
import { colors } from '../../../constants/colors';
import { SynchronizationStatusEnum } from '../../types/SynchronizationStatusEnum';

const Synchronization: FC = () => {
    const {
        platform,
        query,
        dbData,
        mappingType,
        mapping,
        planning: { mode: planningMode, selectedDays, time, name }
    } = useTypedSelector(state => state.synchronizationSlice);
    const email = useTypedSelector(state => state.userData.email);
    const [fetchStatus, setFetchStatus] = useState<SynchronizationStatusEnum>(SynchronizationStatusEnum.PENDING);

    const { fetchData, loading } = useHttp();

    const handleSyncClick = () => {
        setFetchStatus(SynchronizationStatusEnum.PENDING);
        const syncData = {
            host: dbData.host,
            user: dbData.user,
            password: dbData.password,
            database: dbData.database,
            mapping: {
                type: mappingType,
                data: mapping
            },
            query,
            email,
            name,
            data: query,
            sourceType: platform, 
            cronExpression : handleGenerateCron(), 
            isSingular: planningMode === "single"
        };
        console.log("Sync Data:", syncData);

        fetchData(`http://localhost:4000/api/schedule`, "POST", JSON.stringify(syncData))
        .then(() => setFetchStatus(SynchronizationStatusEnum.COMPLETE))
        .catch(() => setFetchStatus(SynchronizationStatusEnum.FAIL));      

    };

    const generateCronExpression = (days: string[], time: string): string => {
        const dayMap: { [key: string]: number } = {
            'Каждый понедельник': 1,
            'Каждый вторник': 2,
            'Каждую среду': 3,
            'Каждый четверг': 4,
            'Каждую пятницу': 5,
            'Каждую субботу': 6,
            'Каждое воскресенье': 0,
        };

        const [hour, minute] = time.split(':').map(Number);
        const dayOfWeek = days.map(day => dayMap[day]).join(',');

        return `${minute} ${hour} * * ${dayOfWeek}`;
    };

    const handleGenerateCron = () => {
        if (planningMode === 'recurring' && selectedDays.length > 0 && time)
            return generateCronExpression(selectedDays, time)
        else 
            return null;

    };

    return (
        <section className="synchronization page-module">
            <h1 className="page-title synchronization__title">Синхронизация</h1>
            <TaskAccordions />
            <div className="synchronization__wrapper">
                <Button title={
                    <div className="button-add">
                        <FaPlus />
                        <span>Синхронизировать</span>
                    </div>
                } onClick={handleSyncClick} /> 
                {SynchronizationStatusEnum.PENDING && loading && <Spinner color={colors.blue}/>}
                {fetchStatus === SynchronizationStatusEnum.COMPLETE && <p style={{color: colors.green}}>Синхронизация завершена!</p>}
                {fetchStatus === SynchronizationStatusEnum.FAIL && <p style={{color: colors.red}}>Синхронизация завершилась с ошибкой!</p>}
            </div>
       
        </section>
    );
};

export default Synchronization;