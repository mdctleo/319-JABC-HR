import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #fafafa;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #nav-bar {
    position: fixed;
    top: 0;
    background-color: white;
    height: 70px;
    width: 100%;
    margin: 0 auto;
    z-index: 5;
  }

  #nav-link-container {
    float: right;
    margin-right: 20px;
  }

  .nav-link {
    color: #262626;
    float: left;
    display: block;
    transition: 0.1s;
    margin-top: 20px;
  }

  .nav-link:hover {
    color: #ff5000;
  }

  .nav-link:active {
    color: #ff5000;
  }

  #nav-link-logout {
    color:  #00954d;
  }

  #nav-link-logout:hover {
    color: #ff5000;
  }
  
  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  h1 {
    color: #404040;
    margin-left: 2.5%;
    margin-top: 120px;
    margin-bottom: 50px;
  }
  
  #jabc-nav-logo {
    margin-top: 12px;
    margin-left: 20px;
    width: 300px;
  }

  #jabc-nav-colour-bar {
    width: 100%;
    height: 10px;
  }
  
  /* Profile Page Styles */

  .profile-card {
    width: 75%;
    margin-left: 30px;
  }

  .profile-card-table td{
    border: none;
    padding: 0px;
  }
  
  .profile-card-table td:nth-child(odd){
    width: 150px;
  }

  .profile-card-spacer {
    height: 40px;
  }
 
  .profile-card-subtitle {
    margin-bottom: 30px;
    color: #ff5000;
  }

  .primary-button {
    color: white;
    background-color: #ff6726;
    border-radius: 15px;
    transition: 0.3s;
  }

  .primary-button:hover {
    background-color: #e0591f;
  }

  #generate-report-button {
    margin-left: 50px;
    width: 150px;
  }
`;

export default GlobalStyle;
