import React from "react";
import NavBar from "../src/components/NavBar";

type Props = {};

const AboutPage = (props: Props) => {
    return (
        <>
            <NavBar />
            <div className="container">
                This is some stupid thing that propelry you should not be
                reading....
            </div>
        </>
    );
};

export default AboutPage;
