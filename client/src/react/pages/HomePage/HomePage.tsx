import { FC } from "react";
import NavigationMenu from "../../modules/NavigationMenu"
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import PageWrapper from "../../UI/PageWrapper/PageWrapper";

const HomePage : FC = () => {
    return (
        <PageWrapper>
            <NavigationMenu />
            <ErrorBoundary>
                <h1>Homepage</h1>
            </ErrorBoundary>
        </PageWrapper>
    )
}

export default HomePage;