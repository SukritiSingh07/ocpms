import { Accordion, AccordionDetails, AccordionSummary, Typography, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";
import { FaqArea } from "./LandingPageStyles"; 

const faqs = [
    {
        panel: 'panel1',
        summary: "What is OCPMS?",
        details: "OCPMS is an all-in-one collaboration platform designed to streamline teamwork and communication.",
    },
    {
        panel: 'panel2',
        summary: "How is CollabFlow different from other collaboration tools?",
        details: "Essential collaboration features in one platform, providing a seamless and productive work environment.",
    },
    {
        panel: 'panel3',
        summary: "Is there a trial period available?",
        details: "Yes, we offer a 14-day free trial. Experience the features & benefits of OCPMS with no commitment.",
    },
    {
        panel: 'panel4',
        summary: "How secure is OCPMS?",
        details: "OCPMS prioritizes data security. We employ industry-standard encryption and security protocols.",
    },
]

function Faq() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <FaqArea>
            <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
                    Your FAQ Resource for
                </Typography>
                <Typography variant="h3" fontWeight="bold" color="primary">
                    Collaboration Tools
                </Typography>
            </Box>

            {faqs.map((faq) => (
                <Accordion
                    key={faq.panel}
                    expanded={expanded === faq.panel}
                    onChange={handleChange(faq.panel)}
                    sx={{
                        mb: 2,
                        boxShadow: 3,
                        borderRadius: 2,
                        "&:before": { display: "none" }, 
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                        aria-controls={`${faq.panel}d-content`}
                        id={`${faq.panel}d-header`}
                        sx={{
                            backgroundColor: 'background.paper',
                            borderBottom: expanded === faq.panel ? '1px solid #ccc' : 'none',
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {faq.summary}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: 'background.default' }}>
                        <Typography variant="body1" color="text.secondary">
                            {faq.details}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </FaqArea>
    );
}

export default Faq;
