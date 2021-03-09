import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	
	:root {
		// global color
		--dark-navy: #020d1f;
    --navy: #0a192f;
		--navy-shadow: rgba(2, 12, 27, 0.7);
    --light-navy: #172a45;
    --lightest-navy: #303C55;
    --lightestest-navy: #56678a;
		--steel: #848ead;
    --light-steel: #a4afce;
    --lightest-steel: #d0dbff;
    --white: #e4f0ff;
    --bright-white: #f7fbff;
    --brightest-white: #fdfeff;
		--light-teal: #afffe4;
    --teal: #64FAC8;
    --dark-teal: #14cc8f;
    --darkest-teal: #12a171;
    --teal-tint: rgba(100, 250, 200, 0.1);
		--light-plum: #ffafff;
    --plum: #f564fa;
    --dark-plum: #bd14cc;
    --darkest-plum: #9c12a1;
    --teal-tint: rgba(245, 100, 250, 0.1);
		--light-reddish: #ffa2a2;
		--reddish: #fa6464;
    --dark-reddish: #d65858;
    --darkest-reddish: #aa4545;
    --teal-tint: rgba(250, 100, 100, 0.1);
    --light-bluish: #a3b1ff;
    --bluish: #647afa;
    --dark-bluish: #5669d6;
    --darkest-bluish: #4756ad;
    --teal-tint: rgba(100, 122, 250, 0.1);

		// global font-size
		--ft-xs: 0.75rem;
    --ft-sm: 0.875rem;
    --ft-md: 1rem;
    --ft-lg: 1.125rem;
    --ft-xl: 1.25rem;
    --ft-xxl: 1.5rem;
    --ft-sm-heading: 1.75rem;
    --ft-heading: 2rem;
	}

	html {
		box-sizing: border-box;
		overflow-x: hidden;
		height: 100%;
		width: 100vw;
		position: relative;
	}
	
	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}

	body {
		margin: 0;
		padding: 0;
		width: 100%;
		min-height: 100%;
		background-color: var(--brightest-white);
		color: var(--dark-navy);
		font-family: Sans-Serif;
		font-size: var(--ft-lg); 
		line-height: 1.3;
	}

	a {
		display: inline-block;
		text-decoration: none;
		color: inherit;
		cursor: pointer;
	}

	input {
		display: inline-block;
		border: 0;
		outline: 0;
	}

	p, h1, h2, h3, h4, h5, h6 {
		margin: 0;
		padding: 0;
	}

	ul, ol {
		margin: 0 auto;
	}
`;

export default GlobalStyle;