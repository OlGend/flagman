// i18n.js
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

async function initializeI18n() {
  let defLng;

  try {
    const response = await fetch(
      "https://ipapi.co/json/?key=YD0x5VtXrPJkOcFQMjEyQgqjfM6jUcwS4J54b3DI8ztyrFpHzW"
    );
    const data = await response.json();
    if (typeof window !== "undefined") {
      localStorage.setItem("country", data.country);
    }
    defLng = data.country.toLowerCase();
  } catch (error) {
    console.error("Ошибка при запросе к API:", error);
    defLng = "all"; // Установка значения по умолчанию в случае ошибки
  }

  const languages = ["all", "au", "ca", "nz", "pl"];

  // Используем метод map для сопоставления значений массива languages с defLng
  const matchedLanguages = languages.map((language) => {
    if (language === defLng) {
      return language;
    }
    return null;
  });

  // Фильтруем совпадающие значения
  const matchedLanguage = matchedLanguages.find(
    (language) => language !== null
  );

  const resources = {
    all: {
      translation: {
        "Casinos ▼": "Casinos ▼",
        "Crypto Casinos": "Crypto Casinos",
        "Fast Withdrawal Casinos": "Fast Withdrawal Casinos",
        "Live Casinos": "Live Casinos",
        "Newest Casinos": "Newest Casinos",
        "Top Certified Casinos": "Top Certified Casinos",
        "Bonuses ▼": "Bonuses ▼",
        "No Deposit Bonuses": "No Deposit Bonuses",
        "Exclusive Bonuses": "Exclusive Bonuses",
        "Deposit Bonuses": "Deposit Bonuses",
        "Welcome Bonuses": "Welcome Bonuses",
        "No Wagering Bonuses": "No Wagering Bonuses",
        "All Payments ▼": "All Payments ▼",
        "Apple Pay": "Apple Pay",
        Bitcoin: "Bitcoin",
        Ecopayz: "Ecopayz",
        Maestro: "Maestro",
        Mastercard: "Mastercard",
        "Mobile Payments": "Mobile Payments",
        Muchbetter: "Muchbetter",
        Neosurf: "Neosurf",
        Neteller: "Neteller",
        PayPal: "PayPal",
        Paysafecard: "Paysafecard",
        Pix: "Pix",
        Skrill: "Skrill",
        Trustly: "Trustly",
        Visa: "Visa",
        "Game Providers ▼": "Game Providers ▼",
        Amatic: "Amatic",
        BGaming: "BGaming",
        Boongo: "Boongo",
        Amusnet: "Amusnet",
        Evolution: "Evolution",
        Mascot: "Mascot",
        NeTent: "NeTent",
        "Nolimit city": "Nolimit city",
        "Play’n go": "Play’n go",
        "Pragmatic Play": "Pragmatic Play",
        "Push Gaming": "Push Gaming",
        Spinomenal: "Spinomenal",
        "Play Now": "Play Now",
        "How to get bonus?": "How to get bonus?",
        "Activate bonus in your casino account":
          "Activate bonus in your casino account",
        "Load More Brands": "Load More Brands",
        "Withdrawal Limits:": "Withdrawal Limits:",
        Advantages: "Advantages",
        "Payment Methods": "Payment Methods",
        "Game Providers": "Game Providers",
        "Restricted Countries": "Restricted Countries",
        "Feeling lucky today?": "Feeling lucky today?",
        "Click now to play": "Click now to play",
        "and see if": "and see if",
        "luck is on your side!": "luck is on your side!",
        "Try Your Luck": "Try Your Luck",
        "All Brands": "All Brands",
        "Recommended Brands": "Recommended Brands",
        "Newly Brands": "Newly Brands",
        "Crypto Brands": "Crypto Brands",
        "Top Sports Brands": "Top Sports Brands",
        "Catalog of all 2024 Online Casino Bonuses Offered":
          "Catalog of all 2024 Online Casino Bonuses Offered",
        "Seeking online casino bonuses and promotions? Explore our current database featuring numerous casino bonus offers for your selection.":
          "Seeking online casino bonuses and promotions? Explore our current database featuring numerous casino bonus offers for your selection.",
        "Our Contacts:": "Our Contacts:",
        "Responsible Gaming": "Responsible Gaming",
        "Privacy Policy": "Privacy Policy",
        "Terms and Conditions": "Terms and Conditions",
        "Empowering iGaming Solutions": "Empowering iGaming Solutions",
        "Unlocking 15 Websites That Will Boost Your Brand to New Heights":
          "Unlocking 15 Websites That Will Boost Your Brand to New Heights",
        "Start Working With Us": "Start Working With Us",
        "positions itself as an exceptional source of information about virtual gaming establishments and online gambling entertainment. All our reviews and guides are crafted in accordance with the knowledge and convictions of our independent team of experts, objectively and without any bias. Nevertheless,such assessments and notifications are provided solely for informational purposes and should not be considered legal advice or a basis for making legal decisions. Before commencing participation in your chosen casino, always ensure that you comply with all applicable legal requirements.":
          "positions itself as an exceptional source of information about virtual gaming establishments and online gambling entertainment. All our reviews and guides are crafted in accordance with the knowledge and convictions of our independent team of experts, objectively and without any bias. Nevertheless,such assessments and notifications are provided solely for informational purposes and should not be considered legal advice or a basis for making legal decisions. Before commencing participation in your chosen casino, always ensure that you comply with all applicable legal requirements.",
        "Your balance:": "Your balance:",
        "Fortune wheel": "Fortune wheel",
        "My wallet": "My wallet",
        "Cards Shop": "Cards Shop",
        "Account menu": "Account menu",

        "Fee:": "Fee",
        "You will receive on balance:": "You will receive on balance:",
        "Payment Method": "Payment Method",
        "Select one of the withdrawal methods and enter the withdrawal amount":
          "Select one of the withdrawal methods and enter the withdrawal amount",
        "Wallet Address": "Wallet Address",
        "Finally Step": "Finally Step",
        "Congratulations, you have successfully requested a withdrawal, in order for them to be credited to your wallet you will need to make a deposit with one of our brands":
          "Congratulations, you have successfully requested a withdrawal, in order for them to be credited to your wallet you will need to make a deposit with one of our brands",
        "Phone Number": "Phone Number",
        "To create a transfer, we need to verify your phone number":
          "To create a transfer, we need to verify your phone number",
        "Withdrawal Request": "Withdrawal Request",
        "Withdrawal History": "Withdrawal History",
        "Cards Shop": "Cards Shop",
        "Next step": "Next step",
        "Prev step": "Prev step",
        Finish: "Finish",
        Continue: "Continue",
        "Your OTP expired": "Your OTP expired",
        "Something wrong, try again!": "Something wrong, try again!",
        Buy: "Buy",
        "Verify your phone number": "Verify your phone number",
        "Enter your phone number": "Enter your phone number",
        "Send code": "Send code",
        "Enter the code": "Enter the code",
        "Indicate the email address to which to send the card":
          "Indicate the email address to which to send the card",
        Confirm: "Confirm",
        "No Deposit Bonuses": "No Deposit Bonuses",
        "Exclusive Bonuses": "Exclusive Bonuses",
        "Deposit Bonuses": "Deposit Bonuses",
        "Welcome Bonuses": "Welcome Bonuses",
        "No Wagering Bonuses": "No Wagering Bonuses",
        "Catalog of all 2024 Online Casino Bonuses Offered":
          "Catalog of all 2024 Online Casino Bonuses Offered",
        "Seeking online casino bonuses and promotions? Explore our current database featuring numerous casino bonus offers for your selection.":
          "Seeking online casino bonuses and promotions? Explore our current database featuring numerous casino bonus offers for your selection.",
        "Finest Casino Welcome Bonuses on Your Initial 2024 Deposit":
          "Finest Casino Welcome Bonuses on Your Initial 2024 Deposit",
        "Select from a variety of top-tier introductory casino rewards and receive additional bonus funds incorporated into your initial payment. Exclusive registration incentive deals designed for fresh participants.":
          "Select from a variety of top-tier introductory casino rewards and receive additional bonus funds incorporated into your initial payment. Exclusive registration incentive deals designed for fresh participants.",
        "Comprehensive Compilation of Online Casino Bonuses Accessible in 2024":
          "Searching for casino bonuses and promos on the web? Explore our current, well-maintained repository featuring a plethora of casino bonus propositions for your consideration.",
        "Irresistible in 2024: No Deposit Casino Bonuses and Unique Bonus Codes":
          "Irresistible in 2024: No Deposit Casino Bonuses and Unique Bonus Codes",
        "Fresh in 2024: A continuously refreshed catalog of no deposit bonus deals for virtual casinos. Obtain exclusive promo codes and enjoy complimentary spins rewards.":
          "Fresh in 2024: A continuously refreshed catalog of no deposit bonus deals for virtual casinos. Obtain exclusive promo codes and enjoy complimentary spins rewards.",
        "No Wagering Casino Bonuses 2024": "No Wagering Casino Bonuses 2024",
        "Searching for no wagering bonuses? Explore our exclusive compilation of wager-free bonuses, available only at Casino.":
          "Searching for no wagering bonuses? Explore our exclusive compilation of wager-free bonuses, available only at Casino.",
        "Welcome Bonuses 2024": "Welcome Bonuses 2024",
        "If you're in search of a quality casino experience coupled with enticing bonuses, we have the perfect solution tailored for you! The welcoming bonus stands as a gesture from casinos to their fresh players, usually presented as free spins or cashback rewards. Explore our compilation of introductory bonuses from renowned online casinos, ensuring an ideal match for your preferences.":
          "If you're in search of a quality casino experience coupled with enticing bonuses, we have the perfect solution tailored for you! The welcoming bonus stands as a gesture from casinos to their fresh players, usually presented as free spins or cashback rewards. Explore our compilation of introductory bonuses from renowned online casinos, ensuring an ideal match for your preferences.",
        "Comprehensive Compilation of 2024 Online Casino Selection":
          "Comprehensive Compilation of 2024 Online Casino Selection",
        "In Search of an Online Casino? Navigate through our up-to-date repository housing a myriad of casinos awaiting your consideration.":
          "In Search of an Online Casino? Navigate through our up-to-date repository housing a myriad of casinos awaiting your consideration.",
        "Top Cryptocurrency Betting Platforms & Bitcoin Casino Sites in 2024":
          "Top Cryptocurrency Betting Platforms & Bitcoin Casino Sites in 2024",
        "Explore our compilation of premier online casinos for Bitcoin along with betting platforms that embrace BTC and alternative cryptocurrencies as viable payment methods. Delve into impartial assessments, and pinpoint the ultimate Bitcoin casino destination tailored to your preferences.":
          "Explore our compilation of premier online casinos for Bitcoin along with betting platforms that embrace BTC and alternative cryptocurrencies as viable payment methods. Delve into impartial assessments, and pinpoint the ultimate Bitcoin casino destination tailored to your preferences.",
        "2024's Swiftest Payout Casino and Betting Platforms":
          "2024's Swiftest Payout Casino and Betting Platforms",
        "The most advantageous aspect of rapid payout casinos is their swift and unwavering dispensation of your earnings. We&#39;ve meticulously crafted this inventory to aid you in locating the supreme casinos offering expedited withdrawal processes, particularly when your earnings surge swiftly and substantially. Simply initiate a withdrawal and envisage the exhilarating possibilities for allocating those funds!":
          "The most advantageous aspect of rapid payout casinos is their swift and unwavering dispensation of your earnings. We&#39;ve meticulously crafted this inventory to aid you in locating the supreme casinos offering expedited withdrawal processes, particularly when your earnings surge swiftly and substantially. Simply initiate a withdrawal and envisage the exhilarating possibilities for allocating those funds!",
        "Premier Live Dealer Casinos of the Year 2024":
          "Premier Live Dealer Casinos of the Year 2024",
        "Explore this compilation of top-notch live dealer casinos for an immersive gaming experience and discover prime online casinos hosting captivating live casino games catered to your preferences.":
          "Explore this compilation of top-notch live dealer casinos for an immersive gaming experience and discover prime online casinos hosting captivating live casino games catered to your preferences.",
        "Fresh Entrants to the Online Casino Scene 2024":
          "Fresh Entrants to the Online Casino Scene 2024",
        "On the Hunt for Fresh 2024 Online Casino Platforms? Discover Recently Launched Casino Sites Offering Outstanding Incentives and Cutting-Edge Attributes. Constantly Refreshed for Your Exploration.":
          "On the Hunt for Fresh 2024 Online Casino Platforms? Discover Recently Launched Casino Sites Offering Outstanding Incentives and Cutting-Edge Attributes. Constantly Refreshed for Your Exploration.",
        "Premier Accredited Casinos in 2024":
          "Premier Accredited Casinos in 2024",
        "Gaming constitutes a substantial sector, and with the assistance of authorized internet-based casinos, you can relish your preferred pastime with serenity, assured of its oversight by official governmental bodies. Cutting-edge security protocols ensure the confidentiality of all personal data!":
          "Gaming constitutes a substantial sector, and with the assistance of authorized internet-based casinos, you can relish your preferred pastime with serenity, assured of its oversight by official governmental bodies. Cutting-edge security protocols ensure the confidentiality of all personal data!",
        "All Providers": "All Providers",
        "Comprehensive 2024 Directory for Online Casinos Sorted by Game Providers":
          "Comprehensive 2024 Directory for Online Casinos Sorted by Game Providers",
        "Interested in locating online casinos featuring games from particular providers? Browse our up-to-date list of diverse casino options to find your perfect match.":
          "Interested in locating online casinos featuring games from particular providers? Browse our up-to-date list of diverse casino options to find your perfect match.",
        "Catalog of all offered Online Casinos by Payment Methods in 2024":
          "Catalog of all offered Online Casinos by Payment Methods in 2024",
        "Looking for online casinos with specific payment methods? Explore our current database of numerous casino offers for you to choose from.":
          "Looking for online casinos with specific payment methods? Explore our current database of numerous casino offers for you to choose from.",
        "Digital Casino Financial Transactions & Payment Selections":
          "Digital Casino Financial Transactions & Payment Selections",
        "Currently, there exist numerous methods for funding a gaming account. Listed below are internet casinos categorized by widely utilized payment options. Some casinos accommodate MasterCard, Visa, and digital currency, while others endorse less conventional avenues like Neteller and Skrill. The choice of your preferred payment mechanism lies in your hands.":
          "Currently, there exist numerous methods for funding a gaming account. Listed below are internet casinos categorized by widely utilized payment options. Some casinos accommodate MasterCard, Visa, and digital currency, while others endorse less conventional avenues like Neteller and Skrill. The choice of your preferred payment mechanism lies in your hands.",
        "Exceptional Online Casinos That Welcome Apple Pay Transactions in 2024":
          "Exceptional Online Casinos That Welcome Apple Pay Transactions in 2024",
        "Wondering which online casinos accept Apple Pay for financial transactions? Let our guide direct you to the most reliable Apple Pay casinos for a top-notch gaming experience.":
          "Wondering which online casinos accept Apple Pay for financial transactions? Let our guide direct you to the most reliable Apple Pay casinos for a top-notch gaming experience.",
        "Premier Bitcoin & Cryptocurrency Gambling Destinations in 2024.":
          "Premier Bitcoin & Cryptocurrency Gambling Destinations in 2024.",
        "Explore our curated selection of leading Bitcoin-friendly casinos and gaming platforms that welcome BTC and other digital currencies. Dive into our impartial reviews to discover the ideal Bitcoin gambling venue for you right now.":
          "Explore our curated selection of leading Bitcoin-friendly casinos and gaming platforms that welcome BTC and other digital currencies. Dive into our impartial reviews to discover the ideal Bitcoin gambling venue for you right now.",
        "Top-Ranked Online Casinos Supporting EcoPayz Transactions for 2024":
          "Top-Ranked Online Casinos Supporting EcoPayz Transactions for 2024",
        "Looking for leading online casinos that welcome ecoPayz transactions? Explore our curated selection of premium ecoPayz-friendly casinos to discover the perfect fit for you.":
          "Looking for leading online casinos that welcome ecoPayz transactions? Explore our curated selection of premium ecoPayz-friendly casinos to discover the perfect fit for you.",
        "Top-Rated Online Casinos Accepting Maestro Payments for 2024":
          "Top-Rated Online Casinos Accepting Maestro Payments for 2024",
        "Interested in gaming at online casinos that welcome Maestro transactions? Let Casino Guru steer you to the ideal Maestro-friendly casino for you.":
          "Interested in gaming at online casinos that welcome Maestro transactions? Let Casino Guru steer you to the ideal Maestro-friendly casino for you.",
        "Top-Rated Online Casinos Welcoming Mastercard Transactions in 2024":
          "Top-Rated Online Casinos Welcoming Mastercard Transactions in 2024",
        "Interested in gaming at a Mastercard-friendly casino? Casino Guru is here to guide you to the most reliable casinos that welcome Mastercard for secure gambling.":
          "Interested in gaming at a Mastercard-friendly casino? Casino Guru is here to guide you to the most reliable casinos that welcome Mastercard for secure gambling.",
        "Leading Online Casinos That Favor Mobile Payments for Seamless Transactions in 2024.":
          "Leading Online Casinos That Favor Mobile Payments for Seamless Transactions in 2024.",
        "Experience smooth financial transactions in online casinos by leveraging the ease and speed of mobile payment methods. Keep abreast of your available options to choose the best fit for your geographical location and preferred currency, ensuring an effortless gaming journey.":
          "Experience smooth financial transactions in online casinos by leveraging the ease and speed of mobile payment methods. Keep abreast of your available options to choose the best fit for your geographical location and preferred currency, ensuring an effortless gaming journey.",
        "Top Online Casinos Supporting MuchBetter Transactions in 2024":
          "Top Online Casinos Supporting MuchBetter Transactions in 2024",
        "Searching for casinos compatible with MuchBetter? Consult our guide to discover the ideal MuchBetter-friendly casino for you.":
          "Searching for casinos compatible with MuchBetter? Consult our guide to discover the ideal MuchBetter-friendly casino for you.",
        "Top-Rated Online Casinos Supporting Neosurf Transactions for 2024":
          "Top-Rated Online Casinos Supporting Neosurf Transactions for 2024",
        "In search of an online casino compatible with Neosurf payments? Browse our curated selection of Neosurf-friendly casinos, delve into our in-depth reviews, and pinpoint the ideal platform for you.":
          "In search of an online casino compatible with Neosurf payments? Browse our curated selection of Neosurf-friendly casinos, delve into our in-depth reviews, and pinpoint the ideal platform for you.",
        "Top Online Casinos Supporting Neteller Transactions in 2024":
          "Top Online Casinos Supporting Neteller Transactions in 2024",
        "Directory of online casinos compatible with Neteller payments. ✅ In-depth assessments by Casino Guru. ✅ Discover your ideal Neteller-friendly casino.":
          "Directory of online casinos compatible with Neteller payments. ✅ In-depth assessments by Casino Guru. ✅ Discover your ideal Neteller-friendly casino.",
        "Leading Online Casinos Accepting PayPal Payments in 2024":
          "Leading Online Casinos Accepting PayPal Payments in 2024",
        "Check out our comprehensive list of top-rated casinos that accept PayPal—a quick and secure option for both deposits and withdrawals. This payment method is a popular choice among global online players, offering advantages like bypassing traditional banking constraints and geographical limitations. If you don&&#39;t already have a PayPal account, it&#39;s simple to set one up and start your journey to big wins!":
          "Check out our comprehensive list of top-rated casinos that accept PayPal—a quick and secure option for both deposits and withdrawals. This payment method is a popular choice among global online players, offering advantages like bypassing traditional banking constraints and geographical limitations. If you don&&#39;t already have a PayPal account, it&#39;s simple to set one up and start your journey to big wins!",
        "Top-Ranked Online Casino Platforms for 2024":
          "Top-Ranked Online Casino Platforms for 2024",
        "Our specialists have scrutinized more than 5,000 digital gambling platforms and selected the cream of the crop. Explore our curated list to discover your ideal online casino.":
          "Our specialists have scrutinized more than 5,000 digital gambling platforms and selected the cream of the crop. Explore our curated list to discover your ideal online casino.",
        "Discover Top-Rated Casinos Accepting Pix Payments for Quick and Secure Transactions":
          "Discover Top-Rated Casinos Accepting Pix Payments for Quick and Secure Transactions",
        "Explore our curated list of premium casinos that support Pix as a payment option. Known for its speed and security, Pix is a go-to method for deposits and withdrawals among online casino enthusiasts worldwide. It offers the advantage of sidestepping traditional banking hassles and pesky geographical limits. If you haven't set up a Pix wallet yet, it's easy to do so—then you're all set to try your luck!":
          "Explore our curated list of premium casinos that support Pix as a payment option. Known for its speed and security, Pix is a go-to method for deposits and withdrawals among online casino enthusiasts worldwide. It offers the advantage of sidestepping traditional banking hassles and pesky geographical limits. If you haven't set up a Pix wallet yet, it's easy to do so—then you're all set to try your luck!",
        "Top Online Casinos Supporting Skrill Transactions for 2024":
          "Top Online Casinos Supporting Skrill Transactions for 2024",
        "Searching for an online casino that allows Skrill payments? Browse our curated selection of premier Skrill-compatible casinos to find your ideal gaming destination.":
          "Searching for an online casino that allows Skrill payments? Browse our curated selection of premier Skrill-compatible casinos to find your ideal gaming destination.",
        "Top Online Casinos Supporting Trustly Transactions for 2024":
          "Top Online Casinos Supporting Trustly Transactions for 2024",
        "Searching for internet casinos that welcome Trustly payments? Browse our curated list and in-depth evaluations to discover the most suitable Trustly-compatible casino for you.":
          "Searching for internet casinos that welcome Trustly payments? Browse our curated list and in-depth evaluations to discover the most suitable Trustly-compatible casino for you.",
        "Top-Rated Online Casinos Welcoming Visa Transactions in 2024":
          "Top-Rated Online Casinos Welcoming Visa Transactions in 2024",
        "Interested in gaming at a Visa-friendly casino? Casino Guru is here to guide you to the most reliable casinos that welcome Visa for secure gambling.":
          "Interested in gaming at a Visa-friendly casino? Casino Guru is here to guide you to the most reliable casinos that welcome Visa for secure gambling.",
        "Amatic: Bridging the Gap Between Traditional and Online Casinos with Classic Game Titles":
          "Amatic: Bridging the Gap Between Traditional and Online Casinos with Classic Game Titles",
        "Amatic crafts digital games that mirror their real-world versions in both aesthetics and narrative. This distinct strategy captivates players fond of the time-honored casino vibe. Featuring standout games such as Hot Fruits 100, Allways Hot Fruits, Book Of Aztec, and Lucky Joker 10, Amatic provides an unparalleled entertainment experience for casino aficionados.":
          "Amatic crafts digital games that mirror their real-world versions in both aesthetics and narrative. This distinct strategy captivates players fond of the time-honored casino vibe. Featuring standout games such as Hot Fruits 100, Allways Hot Fruits, Book Of Aztec, and Lucky Joker 10, Amatic provides an unparalleled entertainment experience for casino aficionados.",
        "Two Decades of Gaming Excellence: Exploring Amusnet Interactive's Innovative Portfolio":
          "Two Decades of Gaming Excellence: Exploring Amusnet Interactive's Innovative Portfolio",
        "Spanning over 20 years, Amusnet Interactive has amassed a significant following thanks to its relentless focus on game innovation, including the integration of in-game jackpots across several of its offerings. Notable Amusnet Interactive titles encompass Supreme Hot, Burning Hot, Ultimate Hot, and Shining Crown. Dive into the exhilarating gameplay and compelling elements presented by Amusnet Interactive's remarkable range of games.":
          "Spanning over 20 years, Amusnet Interactive has amassed a significant following thanks to its relentless focus on game innovation, including the integration of in-game jackpots across several of its offerings. Notable Amusnet Interactive titles encompass Supreme Hot, Burning Hot, Ultimate Hot, and Shining Crown. Dive into the exhilarating gameplay and compelling elements presented by Amusnet Interactive's remarkable range of games.",
        "Rising Star in iGaming: BGaming&#39;s Rapid Ascent Through Innovation and Quality":
          "Rising Star in iGaming: BGaming&#39;s Rapid Ascent Through Innovation and Quality",
        "Though a relative novice in the iGaming realm, BGaming has rapidly ascended as a premier provider of online casino entertainment, owing to its superior quality and inventive strategies. Specializing in slots, casual diversions, and classic table games, BGaming constantly refreshes its game lineup with compelling storylines, unforgettable personas, and engaging promotional campaigns. Noteworthy titles such as Fruit Million, Elvis Frog in Vegas, Lucky Lady Moon, and Aloha King Elvis populate their standout collection. Delve into the thrilling and engaging world presented by BGaming&#39;s exceptional range of gaming options.":
          "Though a relative novice in the iGaming realm, BGaming has rapidly ascended as a premier provider of online casino entertainment, owing to its superior quality and inventive strategies. Specializing in slots, casual diversions, and classic table games, BGaming constantly refreshes its game lineup with compelling storylines, unforgettable personas, and engaging promotional campaigns. Noteworthy titles such as Fruit Million, Elvis Frog in Vegas, Lucky Lady Moon, and Aloha King Elvis populate their standout collection. Delve into the thrilling and engaging world presented by BGaming&#39;s exceptional range of gaming options.",
        "Boongo Gaming: Crafting Immersive Digital Experiences through Innovative Game Design":
          "Boongo Gaming: Crafting Immersive Digital Experiences through Innovative Game Design",
        "Boongo Gaming has quickly distinguished itself in the competitive iGaming sector with visually appealing and feature-rich games. Known for titles like 'God's Temple' and '15 Golden Eggs,' the company excels in both innovation and quality. Their robust backend solutions further enhance the gaming experience. Whether you're a casual player or a dedicated enthusiast, Boongo Gaming offers a memorable gaming journey.":
          "Boongo Gaming has quickly distinguished itself in the competitive iGaming sector with visually appealing and feature-rich games. Known for titles like 'God's Temple' and '15 Golden Eggs,' the company excels in both innovation and quality. Their robust backend solutions further enhance the gaming experience. Whether you're a casual player or a dedicated enthusiast, Boongo Gaming offers a memorable gaming journey.",
        "Evolution Gaming: Setting the Gold Standard in Live Casino Experiences":
          "Evolution Gaming: Setting the Gold Standard in Live Casino Experiences",
        "A recognized leader in the live casino arena, Evolution Gaming has earned its reputation through a commitment to unparalleled quality and innovation. Offering a rich variety of live dealer games, from classics like blackjack and roulette to unique offerings like Lightning Dice, the company consistently delivers engaging and authentic experiences. By utilizing cutting-edge streaming technology and employing professional dealers, Evolution Gaming ensures a seamless and immersive gaming atmosphere that sets them apart in the industry.":
          "A recognized leader in the live casino arena, Evolution Gaming has earned its reputation through a commitment to unparalleled quality and innovation. Offering a rich variety of live dealer games, from classics like blackjack and roulette to unique offerings like Lightning Dice, the company consistently delivers engaging and authentic experiences. By utilizing cutting-edge streaming technology and employing professional dealers, Evolution Gaming ensures a seamless and immersive gaming atmosphere that sets them apart in the industry.",
        "Mascot Gaming: An Emerging Powerhouse in Tailored iGaming Solutions":
          "Mascot Gaming: An Emerging Powerhouse in Tailored iGaming Solutions",
        "Quickly rising through the ranks of the iGaming industry, Mascot Gaming is garnering attention for its custom gaming solutions. With a balanced portfolio of slots, table games, and interactive experiences, the company is making its mark through a blend of creativity and technology. Known for titles like 'Reel Monsters' and 'Fruit Vegas,' Mascot Gaming combines captivating visuals with intriguing gameplay features. Their unique approach to gaming has made them a go-to for operators seeking versatile and engaging content, setting the stage for what promises to be a bright future in the sector.":
          "Quickly rising through the ranks of the iGaming industry, Mascot Gaming is garnering attention for its custom gaming solutions. With a balanced portfolio of slots, table games, and interactive experiences, the company is making its mark through a blend of creativity and technology. Known for titles like 'Reel Monsters' and 'Fruit Vegas,' Mascot Gaming combines captivating visuals with intriguing gameplay features. Their unique approach to gaming has made them a go-to for operators seeking versatile and engaging content, setting the stage for what promises to be a bright future in the sector.",
        "NetEnt Gaming: Pioneering Excellence in the iGaming World":
          "NetEnt Gaming: Pioneering Excellence in the iGaming World",
        "As one of the stalwarts in the iGaming industry, NetEnt Gaming has consistently pushed the envelope in terms of quality, innovation, and gameplay. With a broad spectrum of offerings from classic slots like 'Starburst' to groundbreaking live casino games, the company has set industry benchmarks time and again. Utilizing state-of-the-art technology and creative storytelling, NetEnt offers an unrivaled gaming experience that keeps players coming back for more. Their reputation for excellence is backed by an extensive portfolio that continually evolves, solidifying their position as a leader in digital gaming.":
          "As one of the stalwarts in the iGaming industry, NetEnt Gaming has consistently pushed the envelope in terms of quality, innovation, and gameplay. With a broad spectrum of offerings from classic slots like 'Starburst' to groundbreaking live casino games, the company has set industry benchmarks time and again. Utilizing state-of-the-art technology and creative storytelling, NetEnt offers an unrivaled gaming experience that keeps players coming back for more. Their reputation for excellence is backed by an extensive portfolio that continually evolves, solidifying their position as a leader in digital gaming.",
        "No Limit City Gaming: Nieograniczona innowacja w sferze iGaming":
          "No Limit City Gaming: Nieograniczona innowacja w sferze iGaming",
        "Emerging as a force to be reckoned with in the iGaming industry, No Limit City Gaming is synonymous with creative freedom and technological prowess. Known for unique slots like 'Deadwood' and 'Punk Rocker,' the company goes beyond the norm to offer riveting themes and game mechanics. Their dedication to innovation is evident, providing a refreshing and unpredictable gaming experience. By continually pushing the boundaries of what’s possible, No Limit City Gaming has carved a niche for itself as an avant-garde game provider in a highly competitive market.":
          "Emerging as a force to be reckoned with in the iGaming industry, No Limit City Gaming is synonymous with creative freedom and technological prowess. Known for unique slots like 'Deadwood' and 'Punk Rocker,' the company goes beyond the norm to offer riveting themes and game mechanics. Their dedication to innovation is evident, providing a refreshing and unpredictable gaming experience. By continually pushing the boundaries of what’s possible, No Limit City Gaming has carved a niche for itself as an avant-garde game provider in a highly competitive market.",
        "Play'n GO Gaming: A Vanguard of Versatility and Innovation in iGaming":
          "Play'n GO Gaming: A Vanguard of Versatility and Innovation in iGaming",
        "Cementing its status as a trendsetter in the iGaming community, Play'n GO Gaming is celebrated for its wide-ranging and inventive game portfolio. From iconic slots like 'Book of Dead' to inventive table games, the company provides an all-encompassing gaming experience. Employing cutting-edge technology and captivating narratives, Play'n GO has mastered the art of creating games that are not just visually appealing but also rich in features. Their unyielding commitment to quality and innovation makes them a preferred choice for both casual gamers and ardent casino enthusiasts, continually setting new standards in the ever-evolving gaming landscape.":
          "Cementing its status as a trendsetter in the iGaming community, Play'n GO Gaming is celebrated for its wide-ranging and inventive game portfolio. From iconic slots like 'Book of Dead' to inventive table games, the company provides an all-encompassing gaming experience. Employing cutting-edge technology and captivating narratives, Play'n GO has mastered the art of creating games that are not just visually appealing but also rich in features. Their unyielding commitment to quality and innovation makes them a preferred choice for both casual gamers and ardent casino enthusiasts, continually setting new standards in the ever-evolving gaming landscape.",
        "Pragmatic Play: Fusing Quality and Creativity for an Unmatched iGaming Experience":
          "Pragmatic Play: Fusing Quality and Creativity for an Unmatched iGaming Experience",
        "A frontrunner in the iGaming industry, Pragmatic Play has made its name through a potent blend of innovative gameplay and top-notch graphics. Renowned for popular titles like 'Wolf Gold' and 'The Dog House,' the company delivers a versatile range of slots, live casino games, and even bingo offerings. Pragmatic Play's commitment to quality is manifest in its intuitive interfaces, engaging storylines, and well-executed game mechanics. By consistently rolling out new and captivating games, they manage to stay ahead in the competitive world of online gaming, solidifying their reputation as a reliable and inventive game provider.":
          "A frontrunner in the iGaming industry, Pragmatic Play has made its name through a potent blend of innovative gameplay and top-notch graphics. Renowned for popular titles like 'Wolf Gold' and 'The Dog House,' the company delivers a versatile range of slots, live casino games, and even bingo offerings. Pragmatic Play's commitment to quality is manifest in its intuitive interfaces, engaging storylines, and well-executed game mechanics. By consistently rolling out new and captivating games, they manage to stay ahead in the competitive world of online gaming, solidifying their reputation as a reliable and inventive game provider.",
        "Easily Find Your Ideal Online Casino: Sorted by Game Developers for Tailored Gaming Experiences": "Easily Find Your Ideal Online Casino: Sorted by Game Developers for Tailored Gaming Experiences",
        "To make your hunt easier, we've sorted our casino offerings by game developer. This enables you to effortlessly locate a gaming site that provides the exact games you wish to play. From state-of-the-art video slots and electrifying live casino experiences to traditional table games, we've got all your preferences accounted for. Browse our detailed list of game providers to find casinos backed by premier software developers, guaranteeing high-quality visuals, captivating gameplay, and engaging features.": "To make your hunt easier, we've sorted our casino offerings by game developer. This enables you to effortlessly locate a gaming site that provides the exact games you wish to play. From state-of-the-art video slots and electrifying live casino experiences to traditional table games, we've got all your preferences accounted for. Browse our detailed list of game providers to find casinos backed by premier software developers, guaranteeing high-quality visuals, captivating gameplay, and engaging features.",
        "Push Gaming: Revolutionizing iGaming with Cutting-Edge Concepts": "Push Gaming: Revolutionizing iGaming with Cutting-Edge Concepts",
        "In the ever-competitive realm of iGaming, Push Gaming stands out for groundbreaking slots like 'Jammin' Jars' and 'Wild Swarm,' the company excels in delivering games with exceptional visuals and intricate gameplay features. Push Gaming's focus on mobile-optimized, HTML5-based games ensures a seamless experience across devices. Their capacity to marry traditional gaming elements with novel twists makes them a sought-after provider, continually pushing the envelope in terms of what is possible in the iGaming world.": "In the ever-competitive realm of iGaming, Push Gaming stands out for groundbreaking slots like 'Jammin' Jars' and 'Wild Swarm,' the company excels in delivering games with exceptional visuals and intricate gameplay features. Push Gaming's focus on mobile-optimized, HTML5-based games ensures a seamless experience across devices. Their capacity to marry traditional gaming elements with novel twists makes them a sought-after provider, continually pushing the envelope in terms of what is possible in the iGaming world.",
        "Spinomenal: A New Age Innovator in the iGaming Ecosystem": "Spinomenal: A New Age Innovator in the iGaming Ecosystem",
        "Earning its place as an agile and forward-thinking player in the iGaming scene, Spinomenal is recognized for its inventive approach to game development. Specializing in highly engaging slots like 'Book of Guardians' and 'Demi Gods II,' the company combines vibrant graphics with enticing gameplay mechanics. Spinomenal's commitment to user experience is evident, offering games that are optimized for both desktop and mobile play. Their innovative features, such as bonus games and progressive jackpots, make them a standout provider in an ever-growing market, appealing to a wide range of players seeking fresh and exciting gaming experiences.": "Earning its place as an agile and forward-thinking player in the iGaming scene, Spinomenal is recognized for its inventive approach to game development. Specializing in highly engaging slots like 'Book of Guardians' and 'Demi Gods II,' the company combines vibrant graphics with enticing gameplay mechanics. Spinomenal's commitment to user experience is evident, offering games that are optimized for both desktop and mobile play. Their innovative features, such as bonus games and progressive jackpots, make them a standout provider in an ever-growing market, appealing to a wide range of players seeking fresh and exciting gaming experiences.",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
      },
    },

    pl: {
      translation: {
        "Casinos ▼": "Kasyna ▼",
        "Crypto Casinos": "Krypto kasyna",
        "Fast Withdrawal Casinos": "Kasyna z szybkimi wypłatami",
        "Live Casinos": "Kasyna na żywo",
        "Newest Casinos": "Najnowsze kasyna",
        "Top Certified Casinos": "Najlepsze certyfikowane kasyna",
        "Bonuses ▼": "Bonusy ▼",
        "No Deposit Bonuses": "Bonusy bez depozytu",
        "Exclusive Bonuses": "Ekskluzywne bonusy",
        "Deposit Bonuses": "Bonusy od depozytu",
        "Welcome Bonuses": "Bonusy powitalne",
        "No Wagering Bonuses": "Bonusy bez wymogu obrotu",
        "All Payments ▼": "Wszystkie płatności ▼",
        "Apple Pay": "Apple Pay",
        Bitcoin: "Bitcoin",
        Ecopayz: "Ecopayz",
        Maestro: "Maestro",
        Mastercard: "Mastercard",
        "Mobile Payments": "Płatności mobilne",
        Muchbetter: "Muchbetter",
        Neosurf: "Neosurf",
        Neteller: "Neteller",
        PayPal: "PayPal",
        Paysafecard: "Paysafecard",
        Pix: "Pix",
        Skrill: "Skrill",
        Trustly: "Trustly",
        Visa: "Visa",
        "Game Providers ▼": "Dostawcy gier ▼",
        Amatic: "Amatic",
        BGaming: "BGaming",
        Boongo: "Boongo",
        Amusnet: "Amusnet",
        Evolution: "Evolution",
        Mascot: "Mascot",
        NeTent: "NeTent",
        "Nolimit city": "Nolimit City",
        "Play’n go": "Play’n GO",
        "Pragmatic Play": "Pragmatic Play",
        "Push Gaming": "Push Gaming",
        Spinomenal: "Spinomenal",
        "Play Now": "Zagraj Teraz",
        "How to get bonus?": "Jak otrzymać bonus?",
        "Activate bonus in your casino account":
          "Aktywuj bonus na swoim koncie w kasynie",
        "Load More Brands": "Załaduj więcej marek",
        "Withdrawal Limits:": "Limity wypłat:",
        Advantages: "Zalety",
        "Payment Methods": "Metody płatności",
        "Game Providers": "Dostawcy gier",
        "Restricted Countries": "Kraje ograniczone",
        "Feeling lucky today?": "Czujesz się dzisiaj szczęśliwy?",
        "Click now to play": "Kliknij teraz, aby zagrać",
        "and see if": "i zobacz czy",
        "luck is on your side!": "szczęście jest po twojej stronie!",
        "Try Your Luck": "Spróbuj swojego szczęścia",
        "All Brands": "Wszystkie marki",
        "Recommended Brands": "Polecane marki",
        "Newly Brands": "Nowe marki",
        "Crypto Brands": "Marki krypto",
        "Top Sports Brands": "Najlepsze marki sportowe",
        "Catalog of all 2024 Online Casino Bonuses Offered":
          "Katalog wszystkich oferowanych bonusów w kasynach online w 2024 roku",
        "Seeking online casino bonuses and promotions? Explore our current database featuring numerous casino bonus offers for your selection.":
          "Szukasz bonusów i promocji w kasynach online? Zapoznaj się z naszą bieżącą bazą danych zawierającą liczne oferty bonusów kasynowych do wyboru.",
        "Our Contacts:": "Nasze kontakty:",
        "Responsible Gaming": "Odpowiedzialna gra",
        "Privacy Policy": "Polityka prywatności",
        "Terms and Conditions": "Warunki użytkowania",
        "Empowering iGaming Solutions": "Umocnienie rozwiązań iGaming",
        "Unlocking 15 Websites That Will Boost Your Brand to New Heights":
          "Odkrywanie 15 stron internetowych, które wzniosą Twoją markę na nowe wyżyny",
        "Start Working With Us": "Zacznij z nami współpracę",
        footer_description:
          "pozycjonuje się jako wyjątkowe źródło informacji o wirtualnych zakładach gier i rozrywce hazardowej online. Wszystkie nasze recenzje i przewodniki są tworzone zgodnie z wiedzą i przekonaniami naszego niezależnego zespołu ekspertów, obiektywnie i bez jakiejkolwiek stronniczości. Niemniej jednak, takie oceny i powiadomienia są dostarczane wyłącznie w celach informacyjnych i nie powinny być traktowane jako porada prawna lub podstawa do podejmowania decyzji prawnych. Zawsze, przed rozpoczęciem uczestnictwa w wybranym kasynie, upewnij się, że spełniasz wszystkie obowiązujące wymogi prawne.",
        "Your balance:": "Twoje saldo:",
        "Fortune wheel": "Koło fortuny",
        "My wallet": "Mój portfel",
        "Cards Shop": "Sklep z kartami",
        "Account menu": "Menu konta",
        "Fee:": "Opłata:",
        "You will receive on balance:": "Otrzymasz na saldo:",
        "Payment Method": "Metoda płatności",
        "Select one of the withdrawal methods and enter the withdrawal amount":
          "Wybierz jedną z metod wypłaty i wprowadź kwotę wypłaty",
        "Wallet Address": "Adres portfela",
        "Finally Step": "Ostatni krok",
        "Congratulations, you have successfully requested a withdrawal, in order for them to be credited to your wallet you will need to make a deposit with one of our brands":
          "Gratulacje, pomyślnie zażądałeś wypłaty, aby została ona zaksięgowana na Twoim portfelu, musisz dokonać wpłaty przy użyciu jednej z naszych marek",
        "Phone Number": "Numer telefonu",
        "To create a transfer, we need to verify your phone number":
          "Aby utworzyć transfer, musimy zweryfikować Twój numer telefonu",
        "Withdrawal Request": "Żądanie wypłaty",
        "Withdrawal History": "Historia wypłat",
        "Cards Shop": "Sklep z kartami",

        "Next step": "Następny krok",
      },
    },
  };

  // Инициализация i18n
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: matchedLanguage || "all",
      interpolation: {
        escapeValue: false,
      },
    });
}

initializeI18n();

export default i18n;
