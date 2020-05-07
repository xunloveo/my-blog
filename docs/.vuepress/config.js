module.exports = {
	title: '谢世勋博客',
	description: '谢世勋的博客',
	base: '/my-blog/',
	head: [
		['link', {rel: 'icon', href: '/img/favicon.ico'}]
	],
	themeConfig: {
		displayAllHeaders: false, //显示所有标题
		nav: [
			{text: '主页', link: '/'},
			{text: '博文', 
				items: [
					{text: 'CSS', link: '/css/'},
					{text: 'Javascript', link: '/js/'},
					{text: 'Git', link: '/git/'},
					{text: 'Markdown', link: '/md/'},
					{text: '编辑器', link: '/editor/'}
				]
			},
			{
				text: '关于', link: '/about/'
			},
			{
				text: 'Github', link: 'https://github.com/xunloveo'
			}
		],
		// sidebar: 'auto'
		sidebar: {
			'/css/': [
				"",
				"border"
			],
			'/js/': [
				"",	
				"useMore/",
				"myFunc/",
				"reg"
			],
			'git': [
				""
			],			
			'/md/': [
				""
			],
			'/editor/':[
				"",
				"vscode/"
			]
		},
		smoothScroll: true
	} 
}