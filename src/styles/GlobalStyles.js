// eslint-disable-next-line no-undef
const { createGlobalStyle } = require('styled-components');

const GlobalStyle = createGlobalStyle`
    body{
        font-family: 'Roboto', sans-serif;
        margin:0;
        padding:0;
        background-color:#fafafa
    }

    h1,h2,h3,h4{
        font-weight:600;
    }

    p{
    margin:0;
    font-size:14px;
    }
`;

export default GlobalStyle;
