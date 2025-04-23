import Footer from "./(components)/Footer";
import Navbar from "./(components)/Navbar";

const WebsiteLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default WebsiteLayout