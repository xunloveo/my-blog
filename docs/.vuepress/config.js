module.exports = {
	title: 'My Blog',
	description: '谢世勋的博客',
	base: '/my-blog/',
	head: [
		['link', {rel: 'icon', href: '/img/favicon.ico'}]
	],
	themeConfig: {
		displayAllHeaders: false,
		nav: [
			{text: '主页', link: '/'},
			{text: '博文', 
				items: [
					{text: 'css', link: '/css/'},
					{text: 'js', link: '/js/'},
					{text: 'md', link: '/md/'}
				]
			},
			{
				text: '关于', link: '/about/'
			},
			{
				text: 'Github', link: 'https://github.com/xunloveo'
			}
		],
		sidebar: {
			'/css/': [
				"",
				"border"
			],
			'/js/': [
				"",	
				"myFunc/",
				"cs"
			],			
			'/md/': [
				""
			]
		}
	} 
}