import { FC } from "react";
import NavigationMenu from "../../modules/NavigationMenu";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import PageWrapper from "../../UI/PageWrapper/PageWrapper";

const LogsPage : FC = () => {
    return (
        <PageWrapper>
            <NavigationMenu />
            <ErrorBoundary>
                <h1>Logs page</h1>
            </ErrorBoundary>
        </PageWrapper>
    )
}

export default LogsPage;