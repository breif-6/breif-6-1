import React from "react";
import { Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[3],
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  "&:last-child": {
    paddingBottom: theme.spacing(2),
  },
}));

const About = () => {
  return (
    <div style={{ marginTop:'100px' }}> 
    <StyledContainer>
      <Typography variant="h4" component="h2" gutterBottom>
        About Us
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h5" component="h3" gutterBottom>
                Our Company
              </Typography>
              <Typography variant="body1" component="p">
                We are a network company specializing in contract-based solutions. With our expertise and dedication, we provide high-quality services to our clients.
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h5" component="h3" gutterBottom>
                Our Work
              </Typography>
              <Typography variant="body1" component="p">
                At our network company, we work on a wide range of contracts related to network infrastructure, maintenance, and security. We collaborate with clients to design, implement, and support their network systems, ensuring reliable connectivity and efficient operations.
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </StyledContainer>
    </div>
  );
};

export default About;
