import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

	:root {
	// global color
	--dark-navy: #020d1f;
    --navy: #0a192f;
	--navy-shadow: rgba(2, 12, 27, 0.7);
    --light-navy: #172a45;
    --lightest-navy: #303C55;
    --lightestest-navy: #5b6e94;
    --lightestestest-navy: #7c95c7;
	--dark-steel: #727b95;
	--steel: #848ead;
    --light-steel: #a4afce;
    --lightest-steel: #d0dbff;
    --lightestest-steel: #dfe6ff;
    --white: #eaf3ff;
    --bright-white: #f7fbff;
    --brightest-white: #fdfeff;
	--lightest-teal: #e6fff6;
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
    --ft-xsm: 0.94rem;
    --ft-md: 1rem;
    --ft-lg: 1.125rem;
    --ft-xl: 1.25rem;
    --ft-xxl: 1.5rem;
    --ft-sm-heading: 1.75rem;
    --ft-heading: 2rem;
    --ft-lg-heading: 3rem;
    --ft-lgest-heading: 3.5rem;
    --ft-xl-heading: 4rem;

	// animation
	--easing: cubic-bezier(0.65, 0, 0.35, 1);
    --transition: all 0.25s cubic-bezier(0.65, 0, 0.35, 1);
    --transition-long: all 1s cubic-bezier(0.65, 0, 0.35, 1);
	}

	html {
		scroll-behavior: smooth;
		box-sizing: border-box;
		overflow-x: hidden;
		width: 100%;
		position: relative;
		font-smooth: always;
	}
	
	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}

	html, body, #root {
		height: 100%;
	}

	body {
		margin: 0;
		padding: 0;
		width: 100%;
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

	div {
		box-sizing: inherit;
	}

	@keyframes spin {
		0% {
			transform: rotate(360deg);
		}
		100% {
			transform: rotate(0);
		}
	}
	@keyframes jumpY {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10%);
		}
		100% {
			transform: translateY(0);
		}
	}
	@keyframes jumpX {
		0% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(-2.5%);
		}
		100% {
			transform: translateX(0);
		}
	}
`;

export default GlobalStyle;