'use client'
import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowDownToLine, 
  ArrowUpToLine, 
  Users, 
  BookOpen, 
  Megaphone, 
  Home, 
  Clock, 
  Server, 
  User,
  Menu,
  Bell,
  Search
} from 'lucide-react';

const MobileDashboard = () => {
  // Mock user data (replace with actual data fetching)
  const userData = {
    dailyEarning: 45.67,
    referralProfit: 128.90,
    totalProfit: 1234.56,
    username: 'CryptoTrader123',
    balance: 5678.90
  };

  // State management
  const [activeTab, setActiveTab] = useState('home');
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // Render Quick Action Cards
  const renderQuickActions = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
      {[
        { icon: ArrowDownToLine, label: 'Deposit', color: 'text-green-400' },
        { icon: ArrowUpToLine, label: 'Withdraw', color: 'text-red-400' },
        { icon: Users, label: 'Invite', color: 'text-blue-400' },
        { icon: BookOpen, label: 'Rules', color: 'text-yellow-400' }
      ].map(({ icon: Icon, label, color }, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center space-y-2 cursor-pointer"
        >
          <div className={`bg-secondary rounded-full p-3 ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );

  // Render Profit Cards
  const renderProfitCards = () => (
    <div className="space-y-4 p-4">
      {[
        { 
          title: 'Daily Earning', 
          amount: userData.dailyEarning, 
          icon: Wallet,
          color: 'text-green-400' 
        },
        { 
          title: 'Referral Profit', 
          amount: userData.referralProfit, 
          icon: Users,
          color: 'text-blue-400' 
        },
        { 
          title: 'Total Profit', 
          amount: userData.totalProfit, 
          icon: ArrowUpToLine,
          color: 'text-yellow-400' 
        }
      ].map(({ title, amount, icon: Icon, color }, index) => (
        <div 
          key={index} 
          className="bg-secondary rounded-2xl p-4 flex items-center justify-between"
        >
          <div>
            <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
            <p className="text-xl font-bold text-primary">${amount}</p>
          </div>
          <Icon className={`w-10 h-10 ${color}`} />
        </div>
      ))}
    </div>
  );

  // Render Main Services
  const renderMainServices = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
      {[
        { icon: BookOpen, label: 'About Us' },
        { icon: Megaphone, label: 'Announcements' },
        { icon: Server, label: 'Services' }
      ].map(({ icon: Icon, label }, index) => (
        <div 
          key={index} 
          className="bg-secondary rounded-2xl p-4 flex flex-col items-center space-y-2 cursor-pointer"
        >
          <Icon className="w-8 h-8 text-primary" />
          <span className="text-sm text-foreground">{label}</span>
        </div>
      ))}
    </div>
  );

  // Side Menu
  const SideMenu = () => (
    <div 
      className={`fixed top-0 left-0 w-full sm:w-3/4 h-full bg-background transform transition-transform duration-300 ease-in-out ${
        isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } z-50 shadow-2xl`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <User className="text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{userData.username}</h2>
            <p className="text-sm text-muted-foreground">Total Balance: ${userData.balance}</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: Home, label: 'Dashboard' },
            { icon: Clock, label: 'Transaction History' },
            { icon: Users, label: 'Referral Program' },
            { icon: Server, label: 'Services' },
            { icon: BookOpen, label: 'Support' }
          ].map(({ icon: Icon, label }, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-secondary cursor-pointer"
            >
              <Icon className="w-6 h-6 text-primary" />
              <span className="text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen max-w-screen-sm mx-auto bg-background text-foreground">
      {/* Mobile Header */}
      <div className="bg-secondary p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsSideMenuOpen(true)}>
            <Menu className="w-6 h-6 text-foreground" />
          </button>
          <span className="text-xl font-bold text-primary">€ Eurobank</span>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Bell className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        {/* Quick Balance Overview */}
        <div className="bg-secondary p-4 m-4 rounded-2xl flex justify-between items-center">
          <div>
            <h3 className="text-sm text-muted-foreground">Total Balance</h3>
            <p className="text-2xl font-bold text-primary">${userData.balance}</p>
          </div>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm">
            Transfer
          </button>
        </div>

        {/* Quick Actions */}
        {renderQuickActions()}

        {/* Profit Cards */}
        {renderProfitCards()}

        {/* Main Services */}
        {renderMainServices()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-secondary py-3 border-t border-border">
        <div className="grid grid-cols-4 text-center max-w-screen-sm mx-auto">
          {[
            { icon: Home, label: 'Home' },
            { icon: Clock, label: 'History' },
            { icon: Server, label: 'Services' },
            { icon: User, label: 'Profile' }
          ].map(({ icon: Icon, label }, index) => (
            <button 
              key={index}
              onClick={() => setActiveTab(label.toLowerCase())}
              className={`flex flex-col items-center ${
                activeTab === label.toLowerCase() 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Side Menu */}
      <SideMenu />
    </div>
  );
};

export default MobileDashboard;