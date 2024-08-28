import { Step, Typography, Card, CardContent } from "@mui/material";
import StepButton from '@mui/material/StepButton';
import React from "react";
import { HowtouseArea, HowtouseCard, HowtouseStepper } from "./LandingPageStyles"; // Assume custom styles
import {motion} from 'framer-motion';

const steps = [
  { label: 'Sign Up for OCPMS', imgSrc: '/assets/LandingPage/howtouse1.webp' },
  { label: 'Create Your Workspace', imgSrc: '/assets/LandingPage/howtouse2.webp' },
  { label: 'Manage Task & Assign', imgSrc: '/assets/LandingPage/howtouse3.webp' },
  { label: 'Start Collaborating', imgSrc: '/assets/LandingPage/howtouse4.webp' }
];

function Howtouse() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return "It's a quick & easy process. Provide your email, create a password, & you're ready to go.";
      case 1:
        return "create a workspace tailored to your team's unique needs. Define projects, set access levels.";
      case 2:
        return "Assign tasks to specific team members, set due dates, and attach relevant documents.";
      case 3:
        return "Dive into seamless collaboration with your team. Assign tasks, share files, achieve your goals.";
      default:
        return "Click on a step to view details.";
    }
  };

  const StepIcon = ({ icon }) => (
    <img src={icon} alt="Step icon" style={{ width: 50, height: 50 }} />
  );

  const MotionHowtouseCard = motion(HowtouseCard);

  return (
    <HowtouseArea>
      <Typography variant="h3" textAlign="center" fontWeight="bold" gutterBottom>
        How to Use
      </Typography>
      <Typography variant="h6" textAlign="center">OCPMS is not just a tool;</Typography>
      <Typography variant="h6" textAlign="center">It's a catalyst for transforming the way your team collaborates.</Typography>

      <HowtouseStepper nonLinear activeStep={activeStep} alternativeLabel sx={{ mb: 3, width: '100%' }}>
        {steps.map((step, index) => (
          <Step key={step.label} sx={{ width: 'auto' }}>
            <StepButton onClick={handleStep(index)}>
              <StepIcon icon={step.imgSrc} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                {step.label}
              </Typography>
            </StepButton>
          </Step>
        ))}
      </HowtouseStepper>

      <MotionHowtouseCard whileHover={{scale:1.1}}>
        <Card 
          sx={{
            minWidth: 300, 
            maxWidth: 800,  
            boxShadow: 3, 
            mt: 4, 
            p: 2, 
            backgroundColor: '#f5f5f5', 
            display: 'flex', 
            alignItems: 'center',
            gap: 2, 
            borderRadius: '50px'
          }}
        >
          <img 
            src={steps[activeStep].imgSrc} 
            alt={steps[activeStep].label} 
            style={{ width: 100, height: 100, borderRadius: '8px' }} 
          />
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {steps[activeStep].label}
            </Typography>
            <Typography variant="body1">
              {getStepContent(activeStep)}
            </Typography>
          </CardContent>
        </Card>
      </MotionHowtouseCard>
    </HowtouseArea>
  );
}

export default Howtouse;
