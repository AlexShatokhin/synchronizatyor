import { FC } from "react";
import NavigationMenu from "../../modules/NavigationMenu"
import PageWrapper from "../../UI/PageWrapper/PageWrapper";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import Tasks from "../../modules/Tasks";

const TasksPage : FC = () => {
    return (
        <PageWrapper>
            <NavigationMenu />
            <ErrorBoundary>
                <Tasks />
            </ErrorBoundary>
        </PageWrapper>
    )
}

export default TasksPage;