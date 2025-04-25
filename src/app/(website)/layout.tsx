import Footer from "./(components)/Footer";
import Navbar from "./(components)/Navbar";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

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

      {/* Floating WhatsApp Button */}
      <Link
        href="https://wa.me/message/DRBDDWMHOCREO1"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center space-x-2"
      >
        <MessageCircle size={20} className="text-white" />
      </Link>
    </div>
  );
};

export default WebsiteLayout;
