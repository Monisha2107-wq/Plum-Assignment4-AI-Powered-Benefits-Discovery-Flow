import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.$themeColors.background};
  transition: background-color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 150px);
  padding: 2rem;
`;

const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 600px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => props.$themeColors.text};
  margin-bottom: 1rem;
  line-height: 1.2;
  transition: color 0.3s ease;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${(props) => props.$themeColors.textSecondary};
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 500px;
  transition: color 0.3s ease;
`;

const FormWrapper = styled.form`
  width: 100%;
  max-width: 550px;
  position: relative;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 1.5rem;
  font-size: 1.1rem;
  font-family: inherit;
  border: 2px solid ${(props) => props.$themeColors.border};
  border-radius: 12px;
  background: ${(props) => props.$themeColors.card};
  color: ${(props) => props.$themeColors.text};
  resize: none;
  transition: all 0.3s ease;
  line-height: 1.5;
  box-shadow: 0 1px 3px ${(props) => props.$themeColors.shadow};

  &::placeholder {
    color: ${(props) => props.$themeColors.textSecondary};
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.$themeColors.accent};
    box-shadow: 0 0 0 3px ${(props) => props.$themeColors.accent}20;
  }

  &:hover {
    border-color: ${(props) => props.$themeColors.border};
    box-shadow: 0 2px 8px ${(props) => props.$themeColors.shadow};
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: ${(props) => props.$themeColors.accent};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px ${(props) => props.$themeColors.shadow};

  &:hover:not(:disabled) {
    background: ${(props) => props.$themeColors.primary};
    transform: scale(1.05);
    box-shadow: 0 4px 12px ${(props) => props.$themeColors.shadow};
  }

  &:active:not(:disabled) {
    transform: scale(1);
  }

  &:disabled {
    background: ${(props) => props.$themeColors.border};
    color: ${(props) => props.$themeColors.textSecondary};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ExampleText = styled.p`
  color: ${(props) => props.$themeColors.textSecondary};
  font-size: 0.9rem;
  margin-top: 1rem;
  font-style: italic;
  transition: color 0.3s ease;
`;

const InputScreen = () => {
  const [inputValue, setInputValue] = useState("");
  const { setUserInput } = useContext(AppContext);
  const { themeColors } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setUserInput(inputValue);
    navigate("/loading");
    console.log("Input saved to context:", inputValue);
  };

  return (
    <PageContainer $themeColors={themeColors}>
      <Navbar />
      <MainContent>
        <ScreenContainer>
          <Title $themeColors={themeColors}>How can we help you today?</Title>
          <Subtitle $themeColors={themeColors}>
            Describe your health concern, and our AI will find the perfect
            benefits and resources tailored for your needs.
          </Subtitle>
          <FormWrapper onSubmit={handleSubmit}>
            <StyledTextArea
              rows={4}
              placeholder="I've been experiencing tooth pain when eating cold foods..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              $themeColors={themeColors}
            />
            <SubmitButton
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Submit request"
              $themeColors={themeColors}
            >
              <ArrowRight size={20} />
            </SubmitButton>
          </FormWrapper>
          <ExampleText $themeColors={themeColors}>
            Examples: "annual check-up coverage", "mental health support",
            "dental benefits"
          </ExampleText>
        </ScreenContainer>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default InputScreen;
