<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goods_info.imageUrls" :key="i">
				<image :src="item"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{goods_info.price}}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{goods_info.name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费-- {{cart.length}}</view>
		</view>
		<!-- 商品导航 -->
		<view class="goods_nav">
			<!-- fill 控制右侧按钮的样式 -->
		 <!-- options 左侧按钮的配置项 -->
			<!-- buttonGroup 右侧按钮的配置项 -->
			<!-- click 左侧按钮的点击事件处理函数 -->
			<!-- buttonClick 右侧按钮的点击事件处理函数 -->
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,mapMutations,mapGetters
	} from 'vuex'
	export default {
		watch:{
			total:{
				handler(newVal){
					const findResult=this.options.find(x=>x.text==='购物车')
					if(findResult){
						findResult.info=newVal
					}
					
				},
				immediate:true
				
			}
			// total(newVal){
			// 	const findResult=this.options.find(x=>x.text==='购物车')
			// 	if(findResult){
			// 		findResult.info=newVal
			// 	}
				
			// }
			
		},
		computed: {
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart',['total'])
		},
		data() {
			return {
				goods_info: {},
				// 左侧按钮组的配置对象
				options: [{
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				// 右侧按钮组的配置对象
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
				  backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			// 获取商品 Id
			const goods_id = options.goods_id
			// 调用请求商品详情数据的方法
			this.getGoodsDetail(goods_id)
		},
		methods: {
			...mapMutations('m_cart',['addToCart']),
			// 定义请求商品详情数据的方法
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/goods/queryGoodsDetail', {
					goodsId: goods_id
				})
				if (res.code !== 200) return uni.$showMsg()
				console.log(res.data)
				// 为 data 中的数据赋值
				this.goods_info = res.data
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					console.log(e)
					// 切换到购物车页面
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			// 右侧按钮的点击事件处理函数
			buttonClick(e) {
			   // 1. 判断是否点击了 加入购物车 按钮
			   if (e.content.text === '加入购物车') {
			
			      // 2. 组织一个商品的信息对象
			      const goods = {
			         goods_id: this.goods_info.goodsId,       // 商品的Id
			         goods_name: this.goods_info.name,   // 商品的名称
			         goods_price: this.goods_info.price, // 商品的价格
			         goods_count: 1,                           // 商品的数量
			         goods_small_logo: this.goods_info.mainImage, // 商品的图片
			         goods_state: false                         // 商品的勾选状态
			      }
			
			      // 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
			      this.addToCart(goods)
			
			   }
			   // 1. 判断是否点击了 加入购物车 按钮
			   if (e.content.text === '立即购买') {
			   			
			      // 2. 组织一个商品的信息对象
			      const goods = {
			         goods_id: this.goods_info.goodsId,       // 商品的Id
			         goods_name: this.goods_info.name,   // 商品的名称
			         goods_price: this.goods_info.price, // 商品的价格
			         goods_count: 1,                           // 商品的数量
			         goods_small_logo: this.goods_info.mainImage, // 商品的图片
			         goods_state: false                         // 商品的勾选状态
			      }
			   			
			      // 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
			      this.addToCart(goods)
				  // 切换到购物车页面
				  uni.switchTab({
				  	url: '/pages/cart/cart'
				  })
			   			
			   }
			}
			
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	// 商品信息区域的样式
	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				padding-right: 10px;
			}

			// 收藏区域
			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		// 运费
		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}

	.goods_nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
