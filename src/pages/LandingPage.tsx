import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Shield, Zap, Users, ArrowRight, Sparkles } from 'lucide-react';
import { usePublicClient, useWalletClient } from 'wagmi';
import { CHAT_ABI } from '../config/abi';
// import { usePublicClient, useWalletClient } from 'wagmi';
// import { CHAT_ABI } from '../config/abi';



const LandingPage = () => {
  const [isUser, setIsUser] = useState(false)
  const publicClient = usePublicClient();
  const {data} = useWalletClient();
  const navigate = useNavigate()

  useEffect(()=>{
      if (!data) return
      if (!publicClient) return
  
      const getUser = async ()=>{
        const user = await publicClient.readContract({
          abi: CHAT_ABI,
          address: import.meta.env.VITE_CHAT_CONTRACT,
          functionName: "users",
          args: [data.account.address.toLowerCase() as `0x${string}`]
        }) as [string, string, boolean]; 
        console.log(user[2])
        setIsUser(user[2])
      }
  
      getUser();
    },[data, navigate, publicClient])


  return (
    <div className="min-h-screen text-white">
     

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-purple-900/30 px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Decentralized • Secure • Private</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            The Future of
            <br />
            Private Messaging
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience truly decentralized communication powered by Web3. Your messages, your keys, your privacy.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to={isUser? "/chat":"/registration"}
              className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Chatting</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="border border-gray-400 hover:border-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for the Decentralized Web
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience messaging without compromises. Powered by blockchain technology.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">End-to-End Encrypted</h3>
            <p className="text-gray-400 leading-relaxed">
              Your messages are protected by military-grade encryption. Only you and your recipient can read them.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
            <p className="text-gray-400 leading-relaxed">
              Built on cutting-edge blockchain infrastructure for instant message delivery worldwide.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Community Driven</h3>
            <p className="text-gray-400 leading-relaxed">
              Join a growing community of privacy-focused users building the future of communication.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience True Privacy?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who've already made the switch to decentralized messaging.
          </p>
          <Link
            to="/chat"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="font-bold">Web3Chat</span>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 Web3Chat. Built for the decentralized future.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;