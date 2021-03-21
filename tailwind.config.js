module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			animation: {
				'toast-fade-right-to-left': 'fade-right-to-left 0.5s',
			},
			keyframes: {
				'fade-right-to-left': {
					'0%': { transform: 'translateX(100%)', opacity: 0 },
					'100%': { transform: 'translateX(0)', opacity: 1 },
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
