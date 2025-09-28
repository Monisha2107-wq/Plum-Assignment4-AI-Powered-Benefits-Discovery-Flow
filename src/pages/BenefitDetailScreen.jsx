import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../context/AppContext";
import { generateActionPlan } from "../services/geminiService";
import {
  ArrowLeft,
  RefreshCw,
  Clock,
  UserCheck,
  Shield,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

// --- Themed Styled Components ---
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.$themeColors.background};
  transition: background-color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: ${(props) => props.$themeColors.accent};
  font-weight: 600;
  margin-bottom: 2rem;
  padding: 0.5rem 0;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.$themeColors.primary};
  }
`;

const ContentGrid = styled.div`
  display: grid;
  // grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
`;

const BenefitCard = styled.div`
  background: ${(props) => props.$themeColors.card};
  border: 1px solid ${(props) => props.$themeColors.border};
  border-radius: 12px;
  padding: 2rem;
  height: fit-content;
  box-shadow: 0 4px 6px ${(props) => props.$themeColors.shadow};
`;

const BenefitTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${(props) => props.$themeColors.text};
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const BenefitCoverage = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => props.$themeColors.primaryBg};
  color: ${(props) => props.$themeColors.primary};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.1rem;
`;

const BenefitDescription = styled.p`
  color: ${(props) => props.$themeColors.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const BenefitFeatures = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${(props) => props.$themeColors.background};
  border: 1px solid ${(props) => props.$themeColors.border};
  border-radius: 6px;
`;

const FeatureLabel = styled.span`
  font-size: 0.875rem;
  color: ${(props) => props.$themeColors.textSecondary};
`;

const FeatureValue = styled.span`
  font-weight: 600;
  padding: 0px 10px;
  color: ${(props) => props.$themeColors.text};
`;

const ActionPlanSection = styled.div`
  background: ${(props) => props.$themeColors.card};
  border: 1px solid ${(props) => props.$themeColors.border};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px ${(props) => props.$themeColors.shadow};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.$themeColors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RegenerateButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${(props) => props.$themeColors.background};
  border: 1px solid ${(props) => props.$themeColors.border};
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  color: ${(props) => props.$themeColors.text};
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${(props) => props.$themeColors.border};
    border-color: ${(props) => props.$themeColors.border};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PlanContainer = styled.div`
  min-height: 200px;
`;

const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Step = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: ${(props) => props.$themeColors.background};
  border-radius: 8px;
  border-left: 4px solid ${(props) => props.$themeColors.accent};
`;

const StepNumber = styled.div`
  background: ${(props) => props.$themeColors.accent};
  color: white;
  font-weight: 700;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.9rem;
`;

const StepTitle = styled.h4`
  font-weight: 600;
  color: ${(props) => props.$themeColors.text};
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: ${(props) => props.$themeColors.textSecondary};
  line-height: 1.5;
  font-size: 0.95rem;
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: ${(props) => props.$themeColors.textSecondary};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${(props) => props.$themeColors.border};
  border-top: 3px solid ${(props) => props.$themeColors.accent};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const BenefitDetailScreen = () => {
  const { selectedBenefit } = useContext(AppContext);
  const { themeColors } = useTheme();
  const [actionPlan, setActionPlan] = useState([]);
  const [isPlanLoading, setIsPlanLoading] = useState(true);

  const fetchPlan = useCallback(async () => {
    if (!selectedBenefit) return;
    setIsPlanLoading(true);
    try {
      const plan = await generateActionPlan(selectedBenefit);
      setActionPlan(plan);
    } catch (error) {
      console.error("Error generating action plan:", error);
      setActionPlan(["Error generating plan. Please try again."]);
    }
    setIsPlanLoading(false);
  }, [selectedBenefit]);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  if (!selectedBenefit) {
    return (
      <PageContainer $themeColors={themeColors}>
        <Navbar />
        <MainContent>
          <BackLink to="/results" $themeColors={themeColors}>
            <ArrowLeft size={20} />
            Back to Results
          </BackLink>
          <p>No benefit selected. Please go back and choose a benefit.</p>
        </MainContent>
        <Footer />
      </PageContainer>
    );
  }

  const defaultFeatures = [
    { icon: Clock, label: "Processing Time", value: "2-5 business days" },
    { icon: UserCheck, label: "Eligibility", value: "All plan members" },
    { icon: Shield, label: "Coverage Type", value: "In-network providers" },
    { icon: Calendar, label: "Renewal Period", value: "Annual" },
  ];

  return (
    <PageContainer $themeColors={themeColors}>
      <Navbar />
      <MainContent>
        <BackLink to="/results" $themeColors={themeColors}>
          <ArrowLeft size={20} />
          Back to Benefits
        </BackLink>

        <ContentGrid>
          <BenefitCard $themeColors={themeColors}>
            <BenefitTitle $themeColors={themeColors}>
              {selectedBenefit.title}
            </BenefitTitle>
            <BenefitCoverage $themeColors={themeColors}>
              <CheckCircle2 size={20} style={{ marginRight: "0.75rem" }} />
              {selectedBenefit.coverage}
            </BenefitCoverage>
            <BenefitDescription $themeColors={themeColors}>
              {selectedBenefit.description}
            </BenefitDescription>
            <BenefitFeatures>
              {defaultFeatures.map((feature, index) => (
                <FeatureItem key={index} $themeColors={themeColors}>
                  <feature.icon size={20} color={themeColors.textSecondary} />
                  <div>
                    <FeatureLabel $themeColors={themeColors}>
                      {feature.label}
                    </FeatureLabel>
                    <FeatureValue $themeColors={themeColors}>
                      {feature.value}
                    </FeatureValue>
                  </div>
                </FeatureItem>
              ))}
            </BenefitFeatures>
          </BenefitCard>

          <ActionPlanSection $themeColors={themeColors}>
            <SectionHeader>
              <SectionTitle $themeColors={themeColors}>
                <Shield size={24} />
                Action Plan
              </SectionTitle>
              <RegenerateButton
                onClick={fetchPlan}
                disabled={isPlanLoading}
                $themeColors={themeColors}
              >
                <RefreshCw size={16} />
                Regenerate
              </RegenerateButton>
            </SectionHeader>
            <PlanContainer>
              {isPlanLoading ? (
                <LoadingState $themeColors={themeColors}>
                  <Spinner $themeColors={themeColors} />
                  <p>Generating your personalized action plan...</p>
                </LoadingState>
              ) : (
                <StepList>
                  {actionPlan.map((step, index) => (
                    <Step key={index} $themeColors={themeColors}>
                      <div>
                        <StepTitle $themeColors={themeColors}>
                          Step {index + 1}
                        </StepTitle>
                        <StepDescription $themeColors={themeColors}>
                          {step}
                        </StepDescription>
                      </div>
                    </Step>
                  ))}
                </StepList>
              )}
            </PlanContainer>
          </ActionPlanSection>
        </ContentGrid>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default BenefitDetailScreen;
