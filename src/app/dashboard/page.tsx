'use client';
import React, { useState } from 'react';
import BottomNav from '@/lib/components/BottomNav';
import { useRouter } from 'next/navigation';
import { 
  Wallet, 
  ArrowDownToLine, 
  ArrowUpToLine, 
  Users, 
  BookOpen, 
  Megaphone, 
  Search,
  Bell,
  MessagesSquare
} from 'lucide-react';

const EurobankDashboard = () => {
  const userData = {
    dailyEarning: 45.67,
    referralProfit: 128.90,
    totalProfit: 1234.56,
    username: 'CryptoTrader123',
    balance: 5678.90,
  };

  const router = useRouter();

  // Navigation functions
  const navigateToWithdraw = () => router.push('/withdrawal');
  const navigateToInvite = () => router.push('/invite');
  const navigateToRules = () => router.push('/rules');
  const navigateToLevel = () => router.push('/levels');
  const navigateToAnouncement = () => router.push('/anouncement');

  // Render Quick Action Cards (Mobile)
  const renderQuickActions = () => (
    <div className="grid grid-cols-4 gap-4 p-4">
      {[
        { 
          icon: ArrowDownToLine, 
          label: 'Deposit', 
          color: 'text-green-400', 
          action: () => router.push('/deposit') 
        },
        { 
          icon: ArrowUpToLine, 
          label: 'Withdraw', 
          color: 'text-red-400', 
          action: navigateToWithdraw 
        },
        { 
          icon: Users, 
          label: 'Invite', 
          color: 'text-blue-400', 
          action: navigateToInvite 
        },
        { 
          icon: BookOpen, 
          label: 'Rules', 
          color: 'text-yellow-400', 
          action: navigateToRules 
        }
      ].map(({ icon: Icon, label, color, action }, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center space-y-2 cursor-pointer"
          onClick={action}
        >
          <div className={`bg-secondary rounded-full p-3 ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile View */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="bg-secondary p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">€ Eurobank</span>
          </div>
          <div onClick={navigateToAnouncement} className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Bell className="w-5 h-5 text-muted-foreground hover:text-blue-700/50" />
          </div>
        </div>

        {/* Mobile Main Content */}
        <div className="pb-20">
          {/* Quick Balance Overview */}
          <div className="bg-blue-900/50 backdrop-blur-md p-4 m-4 rounded-2xl flex justify-between items-center border-blue-700/50">
            <div>
              <h3 className="text-sm text-muted-foreground">Total Balance</h3>
              <p className="text-2xl font-bold text-primary">${userData.balance}</p>
            </div>
            <button 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm"
              onClick={navigateToLevel}
            >
              Levels
            </button>
          </div>

          {/* Quick Actions */}
          {renderQuickActions()}

          {/* Profit Cards (Mobile Version) */}
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
                className="bg-accent-800/50 backdrop-blur-md border border-blue-700/50 shadow-xl rounded-2xl p-4 flex items-center justify-between hover:bg-blue-700/50 transition-all cursor-pointer"
              >
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
                  <p className="text-xl font-bold text-primary">${amount}</p>
                </div>
                <Icon className={`w-10 h-10 ${color}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav/>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-primary-500">€</span>
              <h1 className="text-2xl text-primary font-bold">Eurobank</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg text-primary">Welcome, {userData.username}</span>
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <Users className="text-primary" />
              </div>
            </div>
          </div>

          {/* Profit Cards */}
          <div className="grid grid-cols-3 gap-6 text-primary mb-8">
            {[
              { 
                title: 'Daily Earning', 
                amount: userData.dailyEarning, 
                icon: Wallet,
                bgClass: 'bg-blue-800/50',
                textClass: 'text-blue-300',
                iconClass: 'text-green-500'
              },
              { 
                title: 'Referral Profit', 
                amount: userData.referralProfit, 
                icon: Users,
                bgClass: 'bg-blue-800/50',
                textClass: 'text-blue-300',
                iconClass: 'text-blue-500'
              },
              { 
                title: 'Total Profit', 
                amount: userData.totalProfit, 
                icon: ArrowUpToLine,
                bgClass: 'bg-blue-800/50',
                textClass: 'text-blue-300',
                iconClass: 'text-green-500'
              }
            ].map(({ title, amount, icon: Icon, bgClass, textClass, iconClass }, index) => (
              <div key={index} className={`${bgClass} backdrop-blur-md rounded-2xl p-6 border border-blue-700/50 shadow-xl`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`text-sm ${textClass} mb-2`}>{title}</h3>
                    <p className="text-2xl font-bold text-gold-400">${amount}</p>
                  </div>
                  <Icon className={`${iconClass} w-12 h-12`} />
                </div>
              </div>
            ))}
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: ArrowDownToLine, label: 'Deposit', color: 'text-green-400', action: () => router.push('/deposit') },
              { icon: ArrowUpToLine, label: 'Withdraw', color: 'text-red-400', action: navigateToWithdraw },
              { icon: Users, label: 'Invite Friends', color: 'text-blue-400', action: navigateToInvite },
              { icon: MessagesSquare, label: 'Chat Support', color: 'text-white-400', action: () => router.push('/support') },
              { icon: BookOpen, label: 'Rules', color: 'text-white-400', action: navigateToRules },
              { icon: Bell, label: 'Announcements', color: 'text-white-400', action: navigateToAnouncement }
            ].map(({ icon: Icon, label, color, action }, index) => (
              <div 
                key={index} 
                className="bg-accent-800/50 backdrop-blur-md rounded-2xl p-6 border border-blue-700/50 shadow-xl hover:bg-blue-700/50 transition-all cursor-pointer"
                onClick={action}
              >
                <div className="flex flex-col items-center">
                  <Icon className={`${color} w-12 h-12 mb-4`} />
                  <h3 className="text-lg font-semibold">{label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EurobankDashboard;
