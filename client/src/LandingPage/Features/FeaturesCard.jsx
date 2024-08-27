import { CardContent, Typography } from "@mui/material";
import { FeaturesCardArea, FeaturesCardImg } from "../LandingPageStyles";
import {motion} from 'framer-motion';

const features = [
  {
    title: "Unified Workspace",
    description: "Experience a centralized hub for tasks, discussions, and shared resources, fostering a productive work environment.",
    imgSrc: "/assets/LandingPage/feature1.webp",
    textAlign: "left",
  },
  {
    title: "Real-time Communication",
    description: "Instant messaging, video conferencing, and file sharing all in one place for seamless connectivity.",
    imgSrc: "/assets/LandingPage/feature2.webp",
    textAlign: "right",
  },
  {
    title: "Task Management",
    description: "Streamline project organization, set priorities, and track progress effortlessly.",
    imgSrc: "/assets/LandingPage/feature3.webp",
    textAlign: "left",
  },
  {
    title: "File Sharing and Version Control",
    description: "File sharing and version control are essential aspects of collaborative work in software development, content creation.",
    imgSrc: "/assets/LandingPage/feature4.webp",
    textAlign: "right",
  },
];

function FeaturesCard() {

    const MotionFeaturesCardArea = motion(FeaturesCardArea);

  return (
    <>
      <Typography variant="h3" textAlign="center" color="white" fontWeight="bold">Key Features</Typography>
      {features.map((feature, index) => (
        <MotionFeaturesCardArea whileHover={{scale: 1.1}} key={index} style={{justifyContent : feature.textAlign === 'left'? 'left':'right'}}>
          {feature.textAlign === "left" && (
            <FeaturesCardImg style={{ backgroundImage: `url(${feature.imgSrc})` }} />
          )}
          <CardContent style={{ textAlign: feature.textAlign, float: feature.textAlign === "right" ? "left" : "none" }}>
            <Typography gutterBottom variant="h5" component="div" color="black">
              {feature.title}
            </Typography>
            <Typography variant="body2" color="black">
              {feature.description}
            </Typography>
          </CardContent>
          {feature.textAlign === "right" && (
            <FeaturesCardImg style={{ backgroundImage: `url(${feature.imgSrc})` }} />
          )}
        </MotionFeaturesCardArea>
      ))}
    </>
  );
}

export default FeaturesCard;
