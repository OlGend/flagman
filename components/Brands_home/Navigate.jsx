import React from 'react';
import {
  Medal,
  Crown,
  DribbbleLogo,
  SquareLogo,
  Fire,
} from "phosphor-react";
import { useTranslation } from "react-i18next";

const useNavigateBrands = () => {
  const { t } = useTranslation();

  return [
    {
      currentTab: 1,
      currentCategories: 25,
      currentText: "All_Brands",
      segment: "CurrentStatus",
      value: "Ongoing",
      target: "target-all-brands",
      currentText2: t("All Brands"),
      icon: <SquareLogo className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 5,
      currentCategories: 187,
      currentText: "New_Arrivals",
      segment: "Segment2",
      value: "Sandbox",
      target: "target-new-arrivals",
      currentText2: t("New Arrivals"),
      icon: <DribbbleLogo className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 2,
      currentCategories: 26,
      currentText: "Recommended_Brands",
      segment: "Segment2",
      value: "Premium",
      target: "target-recommended-brands",
      currentText2: t("Recommended Brands"),
      icon: <Medal className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 3,
      currentCategories: 24,
      currentText: "Quick_Sign-Up_Brands",
      segment: "QuickSignUp",
      value: "1",
      target: "target-quick-sign-up-brands",
      currentText2: t("Quick Sign-Up"),
      icon: <Crown className="mr-2 pb-1" size={32} />,
    },
    {
      currentTab: 4,
      currentCategories: 19,
      currentText: "Hottest_Deals",
      segment: "Hottest",
      value: "1",
      target: "target-hottest-deals",
      currentText2: t("Hottest Deals"),
      icon: <Fire className="mr-2 pb-1" size={32} />,
    },
  ];
};

export default useNavigateBrands;
