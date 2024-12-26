import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		colors: {
    			main: 'var(--main)',
    			overlay: 'var(--overlay)',
    			bg: 'var(--bg)',
    			bw: 'var(--bw)',
    			blank: 'var(--blank)',
    			text: 'var(--text)',
    			mtext: 'var(--mtext)',
    			border: 'var(--border)',
    			ring: 'var(--ring)',
    			ringOffset: 'var(--ring-offset)',
    			secondaryBlack: '#212121',
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		borderRadius: {
    			base: '5px'
    		},
    		boxShadow: {
    			shadow: 'var(--shadow)'
    		},
    		translate: {
    			boxShadowX: '4px',
    			boxShadowY: '4px',
    			reverseBoxShadowX: '-4px',
    			reverseBoxShadowY: '-4px'
    		},
    		fontWeight: {
    			base: '500',
    			heading: '700'
    		}
    	}
    }, plugins: [require("tailwindcss-animate")],
} satisfies Config;
