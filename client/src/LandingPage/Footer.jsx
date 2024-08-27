// Fimport React from 'react';
import {Box,Table,TableBody,TableCell,TableContainer,TableRow,Typography,Link} from '@mui/material';
import { Facebook, Twitter, LinkedIn } from '@mui/icons-material';
import { FooterArea, FooterBottom } from './LandingPageStyles';

function Footer() {
  return (
    <>
    <FooterArea>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              {/* Left side: Title, paragraph, and icons */}
              <TableCell sx={{ borderBottom: 'none', width: '50%' }}>
                <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
                  OCPMS
                </Typography>
                <Typography variant="body1" color="white" paragraph pr={36} mt={5}>
                  We are committed to fostering collaboration and productivity in your workflow. Our platform is designed to seamlessly integrate with your team's dynamic needs.
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, mt: 5 }}  color="white">
                  <Facebook fontSize="large" />
                  <Twitter fontSize="large" />
                  <LinkedIn fontSize="large" />
                </Box>
              </TableCell>

              {/* Right side: Useful links */}
              <TableCell sx={{ borderBottom: 'none', width: '20%' }} >
                <Typography variant="h6" fontWeight="bold" color="white" mb={5} gutterBottom>
                  Company
                </Typography>
                <Link href="#" color="white" underline="hover" variant="body1" display="block" mb={2}>
                  Home
                </Link>
                <Link href="#" color="white" underline="hover" variant="body1" display="block" mb={2}>
                  Features
                </Link>
                <Link href="#" color="white" underline="hover" variant="body1" display="block" mb={2}>
                  Support
                </Link>
              </TableCell>
              <TableCell sx={{ borderBottom: 'none', width: '20%' }}>
                <Typography variant="h6" fontWeight="bold" color="white" mb={5} gutterBottom>
                  Useful Links
                </Typography>
                <Link href="#" color="white" underline="hover" variant="body1" display="block" mb={2}>
                  Faq
                </Link>
                <Link href="#" color="white" underline="hover" variant="body1" display="block" mb={2}>
                  Careers
                </Link>
                <Link href="#" color="white" underline="hover" variant="body1" display="block" mb={2}>
                  Blog
                </Link>
              </TableCell>
              <TableCell sx={{ borderBottom: 'none', width: '20%' }}>
                <Typography variant="h6" fontWeight="bold" color="white" mb={5} gutterBottom>
                  Legal
                </Typography>
                <Link href="#" color="white" underline="hover" variant="body1" display="block" mb={2}>
                  Privacy Policy
                </Link>
                <Link href="#" color="white" underline="hover" variant="body1" display="block" mb={2}>
                  Terms 
                </Link>
                <Link href="#" color="white" underline="hover" variant="body1" display="block" mb={2}>
                  Cookie Policy
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

    </FooterArea>
      {/* Bottom section: CopyrigSht */}
      <FooterBottom>
        <Typography variant="body1" color="white">
          © 2024 OCPMS. All rights reserved.
        </Typography>
      </FooterBottom>
    </>
  );
}

export default Footer;
