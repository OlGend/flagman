import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLanguage } from "@/components/switcher/LanguageContext";
import BrandsSwitcher from "@/components/switcher/BrandsSwitcher";
import LanguageSwitcher from "@/components/switcher/LanguageSwitcher";
import i18n from "@/components/i18n";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectPlaceholder() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const { language } = useLanguage();

  const flags = [
    { code: "au", label: "Australia", flag: "🇦🇺" },
    { code: "at", label: "Austria", flag: "🇦🇹" },
    { code: "be", label: "Belgium", flag: "🇧🇪" },
    { code: "bg", label: "Bulgaria", flag: "🇧🇬" },
    { code: "ca", label: "Canada", flag: "🇨🇦" },
    { code: "cz", label: "Czech", flag: "🇨🇿" },
    { code: "dk", label: "Denmark", flag: "🇩🇰" },
    { code: "fi", label: "Finland", flag: "🇫🇮" },
    { code: "fr", label: "France", flag: "🇫🇷" },
    { code: "de", label: "Germany", flag: "🇩🇪" },
    { code: "gr", label: "Greece", flag: "🇬🇷" },
    { code: "hu", label: "Hungary", flag: "🇭🇺" },
    { code: "ie", label: "Ireland", flag: "🇮🇪" },
    { code: "it", label: "Italy", flag: "🇮🇹" },
    { code: "nl", label: "Netherlands", flag: "🇳🇱" },
    { code: "nz", label: "New Zealand", flag: "🇳🇿" },
    { code: "no", label: "Norway", flag: "🇳🇴" },
    { code: "pl", label: "Poland", flag: "🇵🇱" },
    { code: "pt", label: "Portugal", flag: "🇵🇹" },
    { code: "sk", label: "Slovakia", flag: "🇸🇰" },
    { code: "es", label: "Spain", flag: "🇪🇸" },
    { code: "se", label: "Sweden", flag: "🇸🇪" },
    { code: "ch", label: "Switzerland", flag: "🇨🇭" },
    { code: "tr", label: "Turkey", flag: "🇹🇷" },
    { code: "gb", label: "United Kingdom", flag: "🇬🇧" },
    { code: "all", label: "World", flag: "🌍" },
  ];

  return (
    <div className="flex items-center">
      <FormControl className="m-0 modal-menu" sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          className="selectlang"
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              // Находим флаг для текущего языка из контекста
              const languageFlag = flags.find((f) => f.code === language)?.flag;
              return (
                <div className="flex items-center">
                  <em className="flagflag">{languageFlag}</em>
                  <em className="flagflag2">
                    {i18n.language ? i18n.language.toUpperCase() : ""}
                  </em>
                </div>
              );
            }
            return selected
              .map((code) => {
                // Для каждого выбранного кода находим соответствующий флаг и название
                const flag = flags.find((flag) => flag.code === code);
                return flag ? `${flag.flag}` : code;
              })
              .join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <div className="menu-modal">
            <div>
              <p>Your country of residence</p>
              <BrandsSwitcher />
            </div>
            <div>
              <p>Website language</p>
              <LanguageSwitcher />
            </div>
          </div>
        </Select>
      </FormControl>
    </div>
  );
}
