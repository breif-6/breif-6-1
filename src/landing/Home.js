import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Youtube from './Youtube';


function Home() {

//   const apiUrl = 'http://localhost/breif-6-1/api-Taqwa/Contracts/';

// fetch(apiUrl)
//   .then(response => response.json())
//   .then(data => {
//     const tiers = data.map(contract => {
//       const { contract_name, total_cost,signing_date, expiration_date, buttonText, buttonVariant } = contract;
//       return {
//         contract_name,
//         total_cost,
//         signing_date,
//         expiration_date,
//         buttonText,
//         buttonVariant,
//       };
//     });

//     // Use the populated tiers array here or pass it to another function
//     console.log(tiers);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });


  const tiers = [
    {
      title: 'Premium System Contract',
      price: '10000',
      description: [
        'signing_date:2023-06-22',
        'expiration_date:2024-06-22',

      ],
      buttonText: 'Sign up for free',
      buttonVariant: 'contained',
    },
    {
      title: 'Standard System Contract',
      // subheader: 'Most popular',
      price: '5000',
      description: [
        'signing_date:2023-06-22',
        'expiration_date:2023-06-29',
      ],
      buttonText: 'Sign up for free',
      buttonVariant: 'contained',
    },
    {
      title: 'Advanced System Contract',
      price: '15000',
      description: [
        'signing_date:2023-06-22',
        'expiration_date:2023-07-01',
      ],
      buttonText: 'Sign up for free',
      buttonVariant: 'contained',
    },
  ];

  
    return (
      <>
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h3"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
         NexTalk
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
        We are a network company specializing in contract-based solutions. 
        With our expertise and dedication, we provide high-quality services to our clients.

        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /Year
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Youtube />

      </Container>
      </>
    );
  }
  
  export default Home;
  