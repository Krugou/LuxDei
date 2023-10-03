import FooterListButton from "./buttons/FooterListButton";

const FooterList = () => {

    return (
        <div className="container mx-auto flex justify-between items-center">

            <ul className="flex flex-col ">
                <FooterListButton name="home" />
                <FooterListButton name="about" />
                <FooterListButton name="articles" />
            </ul>

            <ul className="flex flex-col">
                <FooterListButton name="login" />
                <FooterListButton name="register" />
                <FooterListButton name="team" />

            </ul>
            <ul className="flex flex-col ">
                <FooterListButton name="terms of service" />
                <FooterListButton name="privacy policy" />
                <FooterListButton name="schedule" />
                

            </ul>
        </div>
    );

};

export default FooterList;