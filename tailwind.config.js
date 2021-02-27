module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			animation: {
				'toast-fade-in': 'fade-in 0.5s',
			},
			keyframes: {
				'fade-in': {
					'0%': { transform: 'translateY(50px)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 },
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
