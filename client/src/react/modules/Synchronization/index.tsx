import {FC, useState} from 'react';
import { useTypedSelector } from '../../hooks/useRedux';
import Button from "../../UI/Button/Button";
import { FaPlus } from "react-icons/fa";
import "./synchronization.scss";
import TaskAccordions from "./components/TaskAccordions/TaskAccordions";
import useFetchData from './api/fetchData';
import Spinner from '../../UI/Spinner/Spinner';
import { colors } from '../../../constants/colors';
import { SynchronizationStatusEnum } from '../../types/SynchronizationStatusEnum';
import generateCronExpression from './utils/generateCron';

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

    const { postData, loading } = useFetchData();


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
        postData(syncData)
        .then(() => setFetchStatus(SynchronizationStatusEnum.COMPLETE))
        .catch(() => setFetchStatus(SynchronizationStatusEnum.FAIL));      
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