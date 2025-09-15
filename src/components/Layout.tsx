import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MessageCircle } from "lucide-react";
import React, { ReactNode } from "react";
interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <nav className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xl text-white font-bold">Web3Chat</span>
          </div>
          {/* <Link
            to="/chat"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
          >
            Launch App
          </Link> */}
          <ConnectButton showBalance={true} />
        </div>
      </nav>
        <main style={{ flex: 1, padding: "2rem" }}>
            {children}
        </main>
        <footer style={{ padding: "1rem", borderTop: "1px solid #eee", textAlign: "center" }}>
            &copy; {new Date().getFullYear()} Web3Chat
        </footer>
    </div>
);

export default Layout;
