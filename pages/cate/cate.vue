<template>
	<view>
		cate
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList:[],
			}
		},
		onLoad(){
			this.getNavList()
		},
		 methods: {
		    // 3. 在 methods 中定义获取数据的方法
		    async getNavList() {
		      const { data: res } = await uni.$http.get('/goods/queryGoodsByClassifyList')
			  console.log(res)
		      if (res.code !== 200) return uni.$showMsg()
		      this.navList = res.data
			  console.log(res.data)
		    }
		  }
	}
	
</script>

<style lang="scss">

</style>
