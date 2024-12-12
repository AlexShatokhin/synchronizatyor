import { FC } from "react";
import NavigationMenu from "../../modules/NavigationMenu"
import PageWrapper from "../../UI/PageWrapper/PageWrapper";

const HomePage : FC = () => {
    return (
        <PageWrapper>
            <NavigationMenu />
            <h1>Homepage</h1>
        </PageWrapper>
    )
}

export default HomePage;