import React from "react";
import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const NavbarContainer = styled.nav`
  width: 100%;
  height: 70px;
  background: ${(props) => props.themeColors.card};
  border-bottom: 1px solid ${(props) => props.themeColors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px ${(props) => props.themeColors.shadow};
  transition: all 0.3s ease;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.themeColors.text};
  margin: 0;
  transition: color 0.3s ease;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavItem = styled.a`
  color: ${(props) => props.themeColors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.themeColors.text};
  }
`;

const ThemeToggle = styled.button`
  background: ${(props) => props.themeColors.surface};
  border: 1px solid ${(props) => props.themeColors.border};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${(props) => props.themeColors.text};

  &:hover {
    background: ${(props) => props.themeColors.border};
    transform: scale(1.05);
  }
`;

const Navbar = () => {
  const { theme, toggleTheme, themeColors } = useTheme();

  return (
    <NavbarContainer themeColors={themeColors}>
      <Logo themeColors={themeColors}>Health Benifiter</Logo>
      <NavItems>
        <NavItem href="/" themeColors={themeColors}>
          Home
        </NavItem>
        <ThemeToggle onClick={toggleTheme} themeColors={themeColors}>
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </ThemeToggle>
      </NavItems>
    </NavbarContainer>
  );
};

export default Navbar;
