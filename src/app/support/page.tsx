'use client'
import React from 'react';
import { 
  MessageCircle, 
  HelpCircle, 
  Send,
  ArrowLeft,
  BookOpen,
  Headphones
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const SupportPage = () => {
  const router = useRouter();

  // Support contact options
  const supportChannels = [
    { 
      icon: Send, 
      label: 'Telegram Support', 
      color: 'text-blue-400',
      action: () => window.open('https://t.me/eurobanks20', '_blank')
    },
    { 
      icon: MessageCircle, 
      label: 'Live Chat', 
      color: 'text-green-400',
      action: () => router.push('/comingsoon')
    },
    { 
      icon: HelpCircle, 
      label: 'FAQ', 
      color: 'text-yellow-400',
      action: () => router.push('/faq')
    }
  ];

  // Support resources
  const supportResources = [
    { 
      icon: BookOpen, 
      label: 'User Guide', 
      value: 'Comprehensive Help',
      color: 'text-blue-400'
    },
    { 
      icon: Headphones, 
      label: 'Support Hours', 
      value: '24/7 Available',
      color: 'text-green-400'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-secondary p-4 flex justify-between items-center mb-8 rounded-2xl">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.push('/dashboard')} 
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl text-primary font-bold">Support</h1>
          </div>
        </div>

        {/* Support Overview */}
        <div className="bg-blue-900/50 backdrop-blur-md p-6 mb-8 rounded-2xl border border-blue-700/50 flex flex-col items-center">
          <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mb-4">
            <Headphones className="w-12 h-12 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Customer Support</h2>
          <p className="text-muted-foreground text-center">
            We're here to help you 24/7. Choose your preferred support channel.
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {supportChannels.map(({ icon: Icon, label, color, action }, index) => (
            <div 
              key={index}
              className="bg-accent-800/50 backdrop-blur-md rounded-2xl p-6 border border-blue-700/50 shadow-xl hover:bg-blue-700/50 transition-all cursor-pointer"
              onClick={action}
            >
              <div className="flex flex-col items-center">
                <Icon className={`${color} w-12 h-12 mb-4`} />
                <h3 className="text-sm font-semibold">{label}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Support Resources */}
        <div className="bg-accent-800/50 backdrop-blur-md rounded-2xl p-6 mb-8 border border-blue-700/50 space-y-4">
          <h3 className="text-xl font-semibold text-primary mb-4">Support Resources</h3>
          {supportResources.map(({ icon: Icon, label, value, color }, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between bg-background/30 p-3 rounded-xl"
            >
              <div className="flex items-center space-x-4">
                <div className={`${color} p-2 rounded-full bg-secondary`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="font-medium text-primary">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Telegram Support Button */}
        <div 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-3 cursor-pointer transition-all"
          onClick={() => window.open('https://t.me/Yhttps://t.me/eurobanks20', '_blank')}
        >
          <Send className="w-6 h-6" />
          <span>Join Telegram Support</span>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;