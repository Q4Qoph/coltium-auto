import Footer from "./(components)/Footer";
import Navbar from "./(components)/Navbar";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/contact";

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
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 transition-all duration-300 flex items-center space-x-2"
      >
        <MessageCircle size={20} className="text-white" />
      </Link>
    </div>
  );
};

export default WebsiteLayout;
