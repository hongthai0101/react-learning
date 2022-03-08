import * as React from 'react';
import { Link, Typography } from "@material-ui/core";

export default function Copyright(props: any) {
  return (
    <Typography variant="body2" style={{ color: '#ff9800' }} align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}