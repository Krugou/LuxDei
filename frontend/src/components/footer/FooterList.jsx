import FooterListButton from "./buttons/FooterListButton";

const FooterList = () => {

    return (
        <div className="container mx-auto flex justify-between items-center">

            <ul className="flex flex-col ">
                <FooterListButton name="home" />
                <FooterListButton name="about" />
            </ul>

            <ul className="flex flex-col">
                <FooterListButton name="login" />
                <FooterListButton name="register" />

            </ul>
            <ul className="flex flex-col ">
                <FooterListButton name="terms of service" />
                <FooterListButton name="privacy policy" />

            </ul>
        </div>
    );

};

export default FooterList;