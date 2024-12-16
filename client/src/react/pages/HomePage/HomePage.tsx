import { FC } from "react";
import NavigationMenu from "../../modules/NavigationMenu"
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import PageWrapper from "../../UI/PageWrapper/PageWrapper";
import Synchronization from "../../modules/Synchronization";

const HomePage : FC = () => {
    return (
        <PageWrapper>
            <NavigationMenu />
            <ErrorBoundary>
                <Synchronization />
            </ErrorBoundary>
        </PageWrapper>
    )
}

export default HomePage;