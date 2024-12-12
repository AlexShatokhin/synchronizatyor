import { FC } from "react";
import NavigationMenu from "../../modules/NavigationMenu";
import PageWrapper from "../../UI/PageWrapper/PageWrapper";

const LogsPage : FC = () => {
    return (
        <PageWrapper>
            <NavigationMenu />
            <h1>Logs page</h1>

        </PageWrapper>
    )
}

export default LogsPage;