import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import { CheckCircle2, Cpu, Search, FileText, Shield, Zap } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { getBenefitCategory } from "../services/geminiService";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const pulse = keyframes`
  0% { opacity: 0.4; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.4; transform: scale(0.95); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

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

const ProcessingContainer = styled.div`
  width: 100%;
  max-width: 500px;
  animation: ${fadeInUp} 0.6s ease-out;
`;

const StepsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StepItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-radius: 12px;
  background: ${(props) =>
    props.$active ? props.$themeColors.card : "transparent"};
  border: 1px solid
    ${(props) => (props.$active ? props.$themeColors.border : "transparent")};
  transition: all 0.3s ease;
`;

const IconWrapper = styled.div`
  margin-right: 1rem;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.$processing &&
    css`
      animation: ${pulse} 1.5s ease-in-out infinite;
    `}
`;

const StepContent = styled.div`
  flex: 1;
  text-align: left;
`;

const StepTitle = styled.div`
  font-weight: 600;
  color: ${(props) => props.$themeColors.text};
  margin-bottom: 0.25rem;
  font-size: 1rem;
`;

const StepDescription = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.$themeColors.textSecondary};
  line-height: 1.4;
`;

const StatusIndicator = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) =>
    props.$completed
      ? props.$themeColors.success
      : props.$themeColors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${(props) => props.$themeColors.border};
  border-top: 2px solid ${(props) => props.$themeColors.accent};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const loadingSteps = [
  {
    title: "Analyzing your query",
    description:
      "Processing your health concern with natural language understanding.",
    icon: Search,
    duration: 1500,
  },
  {
    title: "Matching Benefits",
    description: "Finding relevant insurance benefits and coverage options.",
    icon: Shield,
    duration: 1800,
  },
  {
    title: "AI Optimization",
    description: "Applying machine learning for personalized recommendations.",
    icon: Cpu,
    duration: 2200,
  },
  {
    title: "Finalizing Results",
    description: "Compiling your comprehensive benefit analysis.",
    icon: Zap,
    duration: 1600,
  },
];

const LoadingScreen = () => {
  const { userInput, setCategory } = useContext(AppContext);
  const { themeColors } = useTheme();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const processRequest = async () => {
      try {
        const geminiCategory = await getBenefitCategory(userInput);
        setCategory(geminiCategory);
        console.log("AI Classified Category:", geminiCategory);
      } catch (error) {
        console.error("Error processing request:", error);
      }
    };

    const stepTimers = loadingSteps.map((step, index) =>
      setTimeout(
        () => {
          setCurrentStep(index + 1);
        },
        loadingSteps.slice(0, index + 1).reduce((sum, s) => sum + s.duration, 0)
      )
    );

    processRequest();

    const totalDuration =
      loadingSteps.reduce((sum, step) => sum + step.duration, 0) + 500;
    const navigationTimer = setTimeout(() => {
      navigate("/results");
    }, totalDuration);

    return () => {
      stepTimers.forEach(clearTimeout);
      clearTimeout(navigationTimer);
    };
  }, [userInput, setCategory, navigate]);

  return (
    <PageContainer $themeColors={themeColors}>
      <Navbar />
      <MainContent>
        <ProcessingContainer>
          <StepsList>
            {loadingSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const isPending = index > currentStep;

              return (
                <StepItem
                  key={index}
                  $active={isActive}
                  $themeColors={themeColors}
                >
                  <IconWrapper $processing={isActive}>
                    {isCompleted ? (
                      <CheckCircle2 size={20} color={themeColors.success} />
                    ) : isActive ? (
                      <Spinner $themeColors={themeColors} />
                    ) : (
                      <IconComponent
                        size={20}
                        color={
                          isPending
                            ? themeColors.border
                            : themeColors.textSecondary
                        }
                      />
                    )}
                  </IconWrapper>

                  <StepContent>
                    <StepTitle $themeColors={themeColors}>
                      {step.title}
                    </StepTitle>
                    <StepDescription $themeColors={themeColors}>
                      {step.description}
                    </StepDescription>
                  </StepContent>

                  <StatusIndicator
                    $completed={isCompleted}
                    $themeColors={themeColors}
                  >
                    {isCompleted
                      ? "Completed"
                      : isActive
                      ? "Processing"
                      : "Pending"}
                  </StatusIndicator>
                </StepItem>
              );
            })}
          </StepsList>
        </ProcessingContainer>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default LoadingScreen;
