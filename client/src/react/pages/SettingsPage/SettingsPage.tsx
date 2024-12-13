import { FC } from "react";
import NavigationMenu from "../../modules/NavigationMenu"
import PageWrapper from "../../UI/PageWrapper/PageWrapper";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

const SettingsPage : FC = () => {
    return (
        <PageWrapper>
            <NavigationMenu />
            <ErrorBoundary>
                <h1>Settings page</h1>
            </ErrorBoundary>
        </PageWrapper>
    )
}

export default SettingsPage;