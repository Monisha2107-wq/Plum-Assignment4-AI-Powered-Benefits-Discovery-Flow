import React from "react";
import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";

const FooterContainer = styled.footer`
  width: 100%;
  height: 80px;
  background: ${(props) => props.$themeColors.surface};
  border-top: 1px solid ${(props) => props.$themeColors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  transition: all 0.3s ease;
`;

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${(props) => props.$themeColors.textSecondary};
  font-size: 0.9rem;
  margin: 0;
  transition: color 0.3s ease;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 480px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const FooterLink = styled.a`
  color: ${(props) => props.$themeColors.textSecondary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;

  &:hover {
    color: ${(props) => props.$themeColors.text};
    background: ${(props) => props.$themeColors.border}20;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.$themeColors.accent}40;
  }
`;

const Footer = () => {
  const { themeColors } = useTheme();

  return (
    <FooterContainer $themeColors={themeColors}>
      <FooterContent>
        <Copyright $themeColors={themeColors}>
          © 2024 Health Benifiter. All rights reserved.
        </Copyright>
        <FooterLinks>
          <FooterLink
            href="#"
            $themeColors={themeColors}
            aria-label="Privacy Policy"
          >
            Privacy Policy
          </FooterLink>
          <FooterLink
            href="#"
            $themeColors={themeColors}
            aria-label="Terms of Service"
          >
            Terms of Service
          </FooterLink>
          <FooterLink
            href="#"
            $themeColors={themeColors}
            aria-label="Contact us"
          >
            Contact
          </FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
