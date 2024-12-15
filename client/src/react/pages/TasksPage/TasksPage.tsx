import { FC } from "react";
import NavigationMenu from "../../modules/NavigationMenu"
import PageWrapper from "../../UI/PageWrapper/PageWrapper";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

const TasksPage : FC = () => {
    return (
        <PageWrapper>
            <NavigationMenu />
            <ErrorBoundary>
                <h1>Tasks page</h1>
            </ErrorBoundary>
        </PageWrapper>
    )
}

export default TasksPage;