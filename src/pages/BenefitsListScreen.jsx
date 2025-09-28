import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../context/AppContext";
import { benefitsData } from "../constants/mockBenefits";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  CheckCircle,
  RefreshCw,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

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
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => props.$themeColors.text};
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${(props) => props.$themeColors.textSecondary};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CategoryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background: ${(props) => props.$themeColors.card};
  color: ${(props) => props.$themeColors.text};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 2rem;
  border: 1px solid ${(props) => props.$themeColors.border};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled(Link)`
  background: ${(props) => props.$themeColors.card};
  border: 1px solid ${(props) => props.$themeColors.border};
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 4px 6px ${(props) => props.$themeColors.shadow};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 25px ${(props) => props.$themeColors.shadow};
    border-color: ${(props) => props.$themeColors.border};
  }
`;

const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  background: ${(props) => props.$themeColors.card};
  border: 1px solid ${(props) => props.$themeColors.border};
  border-radius: 12px;
  margin: 2rem 0;
`;

const StateIcon = styled.div`
  color: white;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: ${(props) => props.$iconBg || props.$themeColors.danger};
`;

const StateTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.$themeColors.text};
  margin-bottom: 1rem;
`;

const StateMessage = styled.p`
  color: ${(props) => props.$themeColors.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${(props) => props.$themeColors.primary};
  color: ${(props) => props.$themeColors.card};
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: ${(props) => props.$themeColors.primaryHover};
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.$themeColors.text};
  margin-bottom: 0.75rem;
  line-height: 1.3;
`;

const CardCoverage = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => props.$themeColors.primaryBg};
  color: ${(props) => props.$themeColors.primary};
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 0.9rem;
`;

const CardDescription = styled.p`
  color: ${(props) => props.$themeColors.textSecondary};
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

const ViewDetails = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.$themeColors.accent};
  font-size: 0.875rem;
  font-weight: 600;
  transition: color 0.2s;

  ${BenefitCard}:hover & {
    color: ${(props) => props.$themeColors.primary};
  }
`;

const BenefitsListScreen = () => {
  const { category, setSelectedBenefit } = useContext(AppContext);
  const { themeColors } = useTheme();
  const [filteredBenefits, setFilteredBenefits] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isNill, setIsNill] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsNill(false);
    setFilteredBenefits([]);

    if (category) {
      if (category === "ERROR") {
        setIsError(true);
      } else if (category === "NILL") {
        setIsNill(true);
      } else {
        const results = benefitsData.filter(
          (benefit) => benefit.category === category
        );
        setFilteredBenefits(results);
      }
    }
  }, [category]);

  const handleCardClick = (benefit) => {
    setSelectedBenefit(benefit);
  };

  if (isError) {
    return (
      <PageContainer $themeColors={themeColors}>
        <Navbar />
        <MainContent>
          <StateContainer $themeColors={themeColors}>
            <StateIcon $themeColors={themeColors} $iconBg={themeColors.danger}>
              <AlertCircle size={32} />
            </StateIcon>
            <StateTitle $themeColors={themeColors}>
              Service Temporarily Unavailable
            </StateTitle>
            <StateMessage $themeColors={themeColors}>
              Our AI classification service is currently experiencing issues.
              Please try again later or contact support if the problem persists.
            </StateMessage>
            <HomeButton to="/" $themeColors={themeColors}>
              <RefreshCw size={16} />
              Return to Home
            </HomeButton>
          </StateContainer>
        </MainContent>
        <Footer />
      </PageContainer>
    );
  }

  if (isNill) {
    return (
      <PageContainer $themeColors={themeColors}>
        <Navbar />
        <MainContent>
          <StateContainer $themeColors={themeColors}>
            <StateIcon $themeColors={themeColors} $iconBg={themeColors.accent}>
              <HelpCircle size={32} />
            </StateIcon>
            <StateTitle $themeColors={themeColors}>
              Could Not Find Relevant Benefits
            </StateTitle>
            <StateMessage $themeColors={themeColors}>
              Your request didn't seem to be related to a health concern. Please
              try again with a clearer, health-related query to find the
              benefits you need.
            </StateMessage>
            <HomeButton to="/" $themeColors={themeColors}>
              <RefreshCw size={16} />
              Try Another Search
            </HomeButton>
          </StateContainer>
        </MainContent>
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer $themeColors={themeColors}>
      <Navbar />
      <MainContent>
        <HeaderSection>
          <Title $themeColors={themeColors}>Benefits Matched for You</Title>
          <Subtitle $themeColors={themeColors}>
            We've analyzed your needs and found the most relevant benefits from
            your plan.
          </Subtitle>
          {category && (
            <CategoryBadge $themeColors={themeColors}>
              <Shield size={16} style={{ marginRight: "0.5rem" }} />
              {category} Benefits
            </CategoryBadge>
          )}
        </HeaderSection>
        <CardGrid>
          {filteredBenefits.map((benefit) => (
            <BenefitCard
              to={`/benefit/${benefit.id}`}
              key={benefit.id}
              onClick={() => handleCardClick(benefit)}
              $themeColors={themeColors}
            >
              <CardTitle $themeColors={themeColors}>{benefit.title}</CardTitle>
              <CardCoverage $themeColors={themeColors}>
                <CheckCircle size={16} style={{ marginRight: "0.5rem" }} />
                {benefit.coverage}
              </CardCoverage>
              <CardDescription $themeColors={themeColors}>
                {benefit.description}
              </CardDescription>
              <CardFooter>
                <ViewDetails $themeColors={themeColors}>
                  View Details
                  <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
                </ViewDetails>
              </CardFooter>
            </BenefitCard>
          ))}
        </CardGrid>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

export default BenefitsListScreen;
