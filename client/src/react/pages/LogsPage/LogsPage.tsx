import { FC } from "react";
import NavigationMenu from "../../modules/NavigationMenu";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import PageWrapper from "../../UI/PageWrapper/PageWrapper";
import Logs from "../../modules/Logs";

const LogsPage : FC = () => {
    return (
        <PageWrapper>
            <NavigationMenu />
            <ErrorBoundary>
                <Logs />
            </ErrorBoundary>
        </PageWrapper>
    )
}

export default LogsPage;