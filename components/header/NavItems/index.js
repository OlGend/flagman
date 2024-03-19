import { Gift, PokerChip, Wallet, GameController } from "phosphor-react";
export const navItems = [
    {
      icon: <PokerChip className="mr-1" size={20} />,
      class: "sub-casinos",
      label: "Casinos ▼",
      href: "/casinos",
      subMenu: [
        { label: "Crypto Casinos", href: "/crypto-casinos" },
        {
          label: "Fast Withdrawal Casinos",
          href: "/fast-withdrawal-casinos",
        },
        { label: "Live Casinos", href: "/live-casinos" },
        { label: "Newest Casinos", href: "/newest-casinos" },
        { label: "Top Certified Casinos", href: "/top-certified-casinos" },
      ],
    },
    {
      icon: <Gift className="mr-1" size={20} />,
      class: "sub-bonuses",
      label: "Bonuses ▼",
      href: "/bonuses",
      subMenu: [
        { label: "No Deposit Bonuses", href: "/no-deposit-bonuses" },
        { label: "Exclusive Bonuses", href: "/exclusive-bonuses" },
        { label: "Deposit Bonuses", href: "/deposit-bonuses" },
        { label: "Welcome Bonuses", href: "/welcome-bonuses" },
        { label: "No Wagering Bonuses", href: "/no-wagering-bonuses" },
      ],
    },
  
    {
      icon: <Wallet className="mr-1" size={20} />,
      class: "sub-payments",
      label: "All Payments ▼",
      href: "/payments",
      subMenu: [
        { label: "Apple Pay", href: "/payments/apple-pay" },
        { label: "Bitcoin", href: "/payments/bitcoin-casino" },
        { label: "Ecopayz", href: "/payments/ecopayz" },
        { label: "Maestro", href: "/payments/maestro" },
        { label: "Mastercard", href: "/payments/mastercard" },
        { label: "Mobile Payments", href: "/payments/mobile-payments" },
        { label: "Muchbetter", href: "/payments/muchbetter" },
        { label: "Neosurf", href: "/payments/neosurf" },
        { label: "Neteller", href: "/payments/neteller-casino" },
        { label: "PayPal", href: "/payments/paypal-casino" },
        { label: "Paysafecard", href: "/payments/paysafecard-casino" },
        { label: "Pix", href: "/payments/pix" },
        { label: "Skrill", href: "/payments/skrill-casino" },
        { label: "Trustly", href: "/payments/trustly" },
        { label: "Visa", href: "/payments/visa" },
      ],
    },
   
    {
      icon: <GameController className="mr-1" size={20} />,
      class: "sub-providers",
      label: "Game Providers ▼",
      href: "/game-providers",
      subMenu: [
        { label: "Amatic", href: "/game-providers/amatic" },
        { label: "BGaming", href: "/game-providers/bgaming" },
        { label: "Boongo", href: "/game-providers/boongo" },
        { label: "Amusnet", href: "/game-providers/amusnet" },
        { label: "Evolution", href: "/game-providers/evolution" },
        { label: "Mascot", href: "/game-providers/mascot" },
        { label: "NeTent", href: "/game-providers/netent" },
        { label: "Nolimit city", href: "/game-providers/nolimit-city" },
        { label: "Play’n go", href: "/game-providers/playn-go" },
        { label: "Pragmatic Play", href: "/game-providers/pragmatic-play" },
        { label: "Push Gaming", href: "/game-providers/push-gaming" },
        { label: "Spinomenal", href: "/game-providers/spinomenal" },
      ],
    },

  ];