import localFont from 'next/font/local'

export const fontGilroy = localFont({
	src: [
		{
			path: '../../../public/fonts/Gilroy-Thin.ttf',
			weight: '100',
			style: 'normalx'
		},
		{
			path: '../../../public/fonts/Gilroy-UltraLight.ttf',
			weight: '200',
			style: 'normal'
		},
		{
			path: '../../../public/fonts/Gilroy-Light.ttf',
			weight: '300',
			style: 'normal'
		},
		{
			path: '../../../public/fonts/Gilroy-Regular.ttf',
			weight: '400',
			style: 'normal'
		},
		{
			path: '../../../public/fonts/Gilroy-Medium.ttf',
			weight: '500',
			style: 'normal'
		},
		{
			path: '../../../public/fonts/Gilroy-SemiBold.ttf',
			weight: '600',
			style: 'normal'
		},
		{
			path: '../../../public/fonts/Gilroy-Bold.ttf',
			weight: '700',
			style: 'normal'
		},
		{
			path: '../../../public/fonts/Gilroy-ExtraBold.ttf',
			weight: '800',
			style: 'normal'
		},
		{
			path: '../../../public/fonts/Gilroy-Black.ttf',
			weight: '900',
			style: 'normal'
		}
	]
})
