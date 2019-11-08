<template>
	<div class="home-container">
		<div class="text">
			<p>知识需要不断积累，不断实践。每当遇到问题的时候找到解决方法并把它记录下来，把一些奇淫技巧以及一些常用的工具方法记录在此，当以后遇到的时候能够快速应对。</p>
			<p>此博文存入的就是日常自己接触到的一些知识，把它们都记录在此，主要涉及到的都是有关前端方面的知识，希望有所作用能够提高自己的专业技术以及写文章能力。</p>
		</div>
		<div class="knowledge">
			<div class="knowledge-container">
				<div class="circle"></div>
				<div class="knowledge-list">
					<div class="knowledge-item" 
							 v-for="(item, index) in knowledgeData"
							 :key="item.name"
							 :style="{left: `${item.left}px`, top: `${item.top}px`}">
							 {{item.name}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
	data () {
		return {
			num: 6,
			maxNumL: 10
		}
	},
	computed: {
		knowledgeData () {
			let pos =  this.setKnowledgeLayout(this.num, 160, {
				width: 60,
				height: 60
			})
			let data = pos
			return this.setName(data)
		}
	},
	methods: {
		setName(data) {			
			let nameData = ['HTML', 'CSS', 'JS', 'jQuery', 'Vue', 'Node']
			for(let i = 0; i < data.length; i++) {
				data[i].name = nameData[i]
			}
			return data
		},
		setKnowledgeLayout(num, radius, itemSize = {
			width: 0,
			height: 0
		}) {
			if (num < 3) return

			const startAngle = num % 2 == 1 ? 0 : 2 * Math.PI / num / 2
			let position = []

			for (let i = 0; i < num; i++) {
				const angle = i * 2 * Math.PI / num + startAngle 

				position.push({
					top: -radius * Math.cos(angle) - itemSize.height / 2,
					left: -radius * Math.sin(angle) - itemSize.width / 2
				})
			}

			return position
		}
	}
}
</script>

<style lang="stylus">

@keyframes move {
	0% {
		transform: rotate(0)
	}
	50% {
		transform: rotate(180deg)
	}
	100% {
		transform: rotate(360deg)
	}
}
@keyframes move1 {
	0% {
		transform: rotate(0)
	}
	50% {
		transform: rotate(-180deg)
	}
	100% {
		transform: rotate(-360deg)
	}
}
	.home-container
		position: absolute
		top: 50%
		left: 50%
		transform: translate(-50%, -50%)
		margin-top: 0 !important
		

		.text
			transform: translate(200px, 0)
			padding: 1.25rem 0.625rem
			box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)

		p 
			text-indent: 2em
			line-height: 2rem
			font-size: 1.25rem
		
		.knowledge
			width: 320px
			height: 320px
			padding: 30px
			overflow: hidden
			position: absolute			
			top: 50%
			transform: translate(-80%, -50%)

		.knowledge-container
			width: 100%
			height: 320px
			position: absolute
			left: 0
			top: 30px
			transform-origin: center
			animation: move 8s linear infinite

			.circle
				width: 320px
				height: 320px
				border-radius: 50%
				border: 1px solid #ddd
				position: absolute
				left: 0
				right: 0
				top: 0
				bottom: 0
				margin: auto

			.knowledge-list 
				width: 100%
				height: 100%
				position: absolute
				left: 50%
				top: 50%			

				.knowledge-item 
					width: 60px
					height: 60px
					background: #00adb5
					border-radius: 50%
					text-align: center
					line-height: 60px
					color: #fff
					position: absolute
					animation: move1 8s linear infinite
</style>

