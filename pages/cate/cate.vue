<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左侧的滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
				<block v-for="(item, i) in navLeftList" :key="i">
					<view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">
						{{item.classifyName}}</view>
				</block>
			</scroll-view>
			<!-- 右侧的滚动视图区域 -->
			<scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}">
				<view class="cate-lv2-list" v-for="(item2, i2) in navRightList" :key="i2">
					<view class="cate-lv2-item">
						<image :src="item2.mainImage"></image>
						
						<view class="cate-lv2-item-text">
							<text>{{item2.name}}</text>
							<text>{{item2.price}}</text>
						</view><!-- 文本 -->
						        
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navLeftList: [],
				navRightList: [],
				active: 0,
				wh: 0
			}
		},
		onLoad() {
			this.getNavList()
			// 获取当前系统的信息
			const sysInfo = uni.getSystemInfoSync()
			// 为 wh 窗口可用高度动态赋值
			this.wh = sysInfo.windowHeight
		},
		methods: {
			// 3. 在 methods 中定义获取数据的方法
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/goods/queryGoodsByClassifyList')
				console.log(res)
				if (res.code !== 200) return uni.$showMsg()
				this.navLeftList = res.data
				this.navRightList = res.data[0].goodsList
				console.log(res.data[0].goodsList)
				console.log(res.data)
			},
			// 选中项改变的事件处理函数
			activeChanged(i) {
				this.active = i
				this.navRightList = this.navLeftList[i].goodsList
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;

			.left-scroll-view-item {
				line-height: 60px;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 12px;

				// 激活项的样式
				&.active {
					background-color: #ffffff;
					position: relative;

					// 渲染激活项左侧的红色指示边线
					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}
		.cate-lv2-list {
		  display: flex;
		  flex-wrap: wrap;
		
		  .cate-lv2-item {
		    width: 100%;
		    margin-bottom: 10px;
		    display: flex;
		    flex-direction: row;
		    align-items: center;
		
		    image {
		      width: 120px;
		      height: 90px;
		    }
		.cate-lv2-item-text{
			display: flex;
			flex-direction: column;
			text {
			  font-size: 12px;
			  margin: 10px;
			}
		}
		   
		  }
		}
	}
</style>
