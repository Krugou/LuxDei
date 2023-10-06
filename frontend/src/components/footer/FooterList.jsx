import FooterListButton from "./buttons/FooterListButton";

const FooterList = () => {

    return (
        <div className="container mx-auto flex justify-between items-center">

            <ul className="flex flex-col ">
                <FooterListButton name="home" />
                <FooterListButton name="about" />
                <FooterListButton name="articles" />
                <FooterListButton name="livestream" />
                <FooterListButton name="archive" />

            </ul>

            <ul className="flex flex-col">
                <FooterListButton name="login" />
                <FooterListButton name="register" />
                <FooterListButton name="team" />
                <FooterListButton name="movies" />

            </ul>
            <ul className="flex flex-col ">
                <FooterListButton name="terms of service" />
                <FooterListButton name="privacy policy" />
                <FooterListButton name="schedule" />
                <FooterListButton name="profile" />
                
                

            </ul>
        </div>
    );

};

export default FooterList;