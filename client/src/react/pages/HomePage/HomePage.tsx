import { FC } from "react";
import NavigationMenu from "../../modules/NavigationMenu"
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import PageWrapper from "../../UI/PageWrapper/PageWrapper";
import Tasks from "../../modules/Tasks";

const HomePage : FC = () => {
    return (
        <PageWrapper>
            <NavigationMenu />
            <ErrorBoundary>
                <Tasks />
            </ErrorBoundary>
        </PageWrapper>
    )
}

export default HomePage;