import { FC } from "react";
import NavigationMenu from "../../modules/NavigationMenu"
import PageWrapper from "../../UI/PageWrapper/PageWrapper";

const SettingsPage : FC = () => {
    return (
        <PageWrapper>
            <NavigationMenu />
            <h1>Settings page</h1>
        </PageWrapper>
    )
}

export default SettingsPage;