'use client'
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import FAQs from '@/lib/components/landingpage/faqs';
import { 
  Award, 
  Globe, 
  Users, 
  Shield, 
  Wallet, 
  TrendingUp, 
  Star, 
  ChevronDown, 
  LogIn, 
  ArrowRight, 
  Smartphone
} from 'lucide-react';

const EuroBankLandingPage = () => {
  const { t, i18n } = useTranslation('common');
  const [language, setLanguage] = useState(i18n.language);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const toggleLanguage = (selectedLang: string) => {
    i18n.changeLanguage(selectedLang);
    setLanguage(selectedLang);
    setIsLanguageDropdownOpen(false);
  };

  const features = [
    {
      icon: <Shield className="w-10 h-10 text-primary" />,
      title: t('features.security.title'),
      description: t('features.security.description')
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-primary" />,
      title: t('features.investment.title'),
      description: t('features.investment.description')
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: t('features.referral.title'),
      description: t('features.referral.description')
    }
  ];

  const pricingPlans = [
    {
      level: 'VIP 1',
      minInvestment: 500,
      monthlyReturn: 5,
      features: [
        t('pricing.vip1.feature1'),
        t('pricing.vip1.feature2')
      ]
    },
    {
      level: 'VIP 5',
      minInvestment: 5000,
      monthlyReturn: 10,
      features: [
        t('pricing.vip5.feature1'),
        t('pricing.vip5.feature2')
      ],
      isMostPopular: true
    },
    {
      level: 'VIP 10',
      minInvestment: 50000,
      monthlyReturn: 20,
      features: [
        t('pricing.vip10.feature1'),
        t('pricing.vip10.feature2')
      ]
    }
  ];

  return ( 
    <div 
      className="min-h-screen bg-background text-foreground" 
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-secondary/30 backdrop-blur-md z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🏦</span>
            <h1 className="text-xl font-bold text-foreground">EuroBank</h1>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-4 items-center">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              {t('nav.features')}
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              {t('nav.pricing')}
            </a>
            <a href="#apps" className="text-foreground hover:text-primary transition-colors">
              {t('nav.apps')}
            </a>
            <a href="#faqs" className="text-foreground hover:text-primary transition-colors">
              {t('nav.faqs')}
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="
              flex items-center 
              bg-primary 
              text-primary-foreground 
              px-4 py-2 
              rounded-lg 
              shadow-md 
              hover:bg-primary/90 
              transition-all 
              group
            ">
              <LogIn className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              {t('nav.signin')}
            </button>

            <div className="relative ">
              <button 
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="
                  flex items-center 
                  bg-secondary 
                  text-secondary-foreground 
                  px-3 py-2 
                  rounded-full 
                  hover:bg-secondary/80 
                  transition-colors
                "
              >
                {language === 'en' ? '🇺🇸' : '🇸🇦'}
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>

              {isLanguageDropdownOpen && (
                <div className="
                  absolute 
                  right-0 
                  mt-2 
                  w-36 
                  bg-popover 
                  text-popover-foreground 
                  rounded-lg 
                  shadow-lg 
                  border 
                  border-border 
                  overflow-hidden
                ">
                  <button 
                    onClick={() => toggleLanguage('en')}
                    className={`
                      w-full 
                      text-left 
                      px-4 py-2 
                      hover:bg-accent 
                      flex items-center 
                      ${language === 'en' ? 'bg-accent/50' : ''}
                    `}
                  >
                    🇺🇸 English
                  </button>
                  <button 
                    onClick={() => toggleLanguage('ar')}
                    className={`
                      w-full 
                      text-left 
                      px-4 py-2 
                      hover:bg-accent 
                      flex items-center 
                      ${language === 'ar' ? 'bg-accent/50' : ''}
                    `}
                  >
                    🇸🇦 العربية
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="
        container 
        mx-auto 
        flex 
        flex-col 
        items-center 
        justify-center 
        min-h-screen 
        text-center 
        px-4
        pt-24
      ">
        <div className="max-w-4xl">
          <h2 className="
            text-3xl font-bold mb-6 text-foreground leading-tight sm:text-5xl
          ">
            {t('hero.title.part1')}
            <span className="text-primary"> {t('hero.title.highlight')} </span>
            {t('hero.title.part2')}
          </h2>
          
          <p className="
            text-xl 
            text-muted-foreground 
            mb-8 
            max-w-2xl 
            mx-auto
          ">
            {t('hero.description')}
          </p>
          
          <button className="
            bg-primary 
            text-primary-foreground 
            px-8 py-3 
            rounded-lg 
            text-lg 
            font-semibold 
            flex 
            items-center 
            justify-center 
            mx-auto 
            hover:bg-primary/90 
            transition-all 
            group 
            shadow-lg 
            hover:shadow-xl
          ">
            {t('hero.cta')}
            <ArrowRight className="
              w-5 h-5 
              ml-2 
              group-hover:translate-x-1 
              transition-transform
            " />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold text-center mb-12">{t('features.title')}</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="
                bg-muted/30 
                p-6 
                rounded-lg 
                text-center 
                hover:bg-secondary/50 
                transition-all 
                group
                
              "
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h4>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold text-center mb-12">{t('pricing.title')}</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`
                justify-center
                bg-secondary
                align-center
                content-center
                p-6 
                rounded-lg 
                relative 
                text-center
                overflow-hidden
                ${plan.isMostPopular ? 'border-2 border-primary' : ''}
              `}
            >
              {plan.isMostPopular && (
                <div className="
                  absolute 
                  top-0 
                  right-0 
                  bg-primary 
                  text-primary-foreground 
                  px-3 
                  py-1 
                  rounded-bl-lg
                ">
                  {t('pricing.mostPopular')}
                </div>
              )}
              <h4 className="text-2xl font-bold mb-4 text-primary ">{plan.level}</h4>
              <p className="text-xl mb-2">
                {t('pricing.minInvestment', { amount: plan.minInvestment })}
              </p>
              <p className="text-lg mb-4 text-foreground">
                {t('pricing.monthlyReturn', { percent: plan.monthlyReturn })}
              </p>
              <ul className="space-y-2 text-center mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li 
                    key={featureIndex} 
                    className="flex items-center justify-center space-x-2"
                  >
                    <Star className="w-4 h-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="
                w-full 
                bg-primary 
                text-primary-foreground 
                py-3 
                rounded-lg 
                hover:bg-primary/90 
                transition-all
              ">
                {t('pricing.selectPlan')}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* App Section */}
      <section id="apps" className="container mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold text-center mb-12">{t('app.title')}</h3>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block">
            <div className="flex space-x-4 justify-center">
              <div className="bg-secondary p-4 rounded-lg flex flex-col items-center">
                <Smartphone className="w-16 h-16 text-primary" />
                <p className="mt-2">{t('app.iphone')}</p>
                <p className="text-muted-foreground">{t('app.comingSoon')}</p>
              </div>
              <div className="bg-secondary p-4 rounded-lg flex flex-col items-center">
                <Smartphone className="w-16 h-16 text-primary" />
                <p className="mt-2">{t('app.android')}</p>
                <p className="text-muted-foreground">{t('app.comingSoon')}</p>
              </div>
            </div>
          </div>
          <div className='justify-center text-center'>
            <h4 className="text-2xl font-bold mb-4">{t('app.description.title')}</h4>
            <p className="mb-6">{t('app.description.text')}</p>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg">
              {t('app.notify')}
            </button>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="container mx-auto py-16 px-4">
        <FAQs />
      </section>

      {/* Footer */}
      <footer className="bg-secondary/30 py-8">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
};

export default EuroBankLandingPage;
