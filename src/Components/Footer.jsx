import React, { useState } from "react";
import Select from "react-select";
import { themeOptions } from "../Utils/themeOptions";
import { useTheme } from "../Context/ThemeContext";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (e) => {
    // console.log(e);
    setTheme(e.value); // because of this themes being changed
    // storing in localstorage to save for next time..
    localStorage.setItem("theme", JSON.stringify(e.value));
  };

  // const customStyle = {
  //     singleValue: styles => ({
  //         ...styles,
  //         color: theme.textColor
  //     })
  // }
  // const linkedIn = () => {
  //     window.location(, '_blank');
  // }

  return (
    <div className="footer">
      <div className="links">
        <div>
          <a href="https://www.linkedin.com/in/sandeep893" target="_blank">
            <LinkedInIcon />
          </a>
        </div>
        <div>
          <a href="https://github.com/5andeeep" target="_blank">
            <GitHubIcon />
          </a>
        </div>
      </div>
      <div className="themeButton">
        <Select
          defaultValue={{ label: theme.label, value: theme }}
          onChange={handleThemeChange}
          options={themeOptions}
          menuPlacement="top"
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: theme.background,
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: theme.background,
            }),
            option: (styles, { isFocused }) => {
              return {
                ...styles,
                backgroundColor: !isFocused
                  ? theme.background
                  : theme.textColor,
                color: !isFocused ? theme.textColor : theme.background,
                width: "content",
              };
            },
            // by using singleValue we are able to change color of options text color
            singleValue: (styles) => ({
              ...styles,
              color: theme.timerColor,
              width: "100px",
              scrollbarWidth: "2px",
              scrollbarColor: theme.background,
            }),
          }}
        />
      </div>
    </div>
  );
};

export default Footer;

// We can also make one Object for style the react-select like this...
// const customStyles = {
//     option: provided => ({
//       ...provided,
//       color: 'black'
//     }),
//     control: provided => ({
//       ...provided,
//       color: 'black'
//     }),
//     singleValue: provided => ({
//       ...provided,
//       color: 'black'
//     })
//   }
// then we will write styles = {customStyles}
