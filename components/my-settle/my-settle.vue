<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck"><text>全选</text></radio>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		name: "my-settle",
		data() {
			return {
				seconds: 3
			};
		},
		computed: {
			...mapGetters('m_cart', ['total', 'checkedCount', 'checkedGoodsAmount']),
			// addstr 是详细的收货地址
			...mapGetters('m_user', ['addstr']),
			// token 是用户登录成功之后的 token 字符串
			...mapState('m_user', ['token']),
			...mapState('m_cart', ['cart']),
			// 2. 是否全选
			isFullCheck() {
				return this.total === this.checkedCount
			},

		},
		methods: {
			// 2. 使用 mapMutations 辅助函数，把 m_cart 模块提供的 updateAllGoodsState 方法映射到当前组件中使用
			...mapMutations('m_cart', ['updateAllGoodsState','removeGoodsById']),
			// 把 m_user 模块中的 updateRedirectInfo 方法映射到当前页面中使用
			...mapMutations('m_user', ['updateRedirectInfo']),
			// label 的点击事件处理函数
			changeAllState() {
				// 修改购物车中所有商品的选中状态
				// !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
				this.updateAllGoodsState(!this.isFullCheck)
			},
			// 点击了结算按钮
			settlement() {
				// 1. 先判断是否勾选了要结算的商品
				if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
				
				// 3. 最后判断用户是否登录了
				if (!this.token) return this.delayNavigate()

				// 2. 再判断用户是否选择了收货地址
				if (!this.addstr) return uni.$showMsg('请选择收货地址！')

				

				this.payOrder()
			},
			async payOrder() {
				const order_info = {
					totalAmount:this.checkedGoodsAmount,
					address: this.addstr,
					openId: this.token,

					// totalAmount: 0.01,
					goodsList: this.cart.filter(x => x.goods_state).map(x => ({
						goodsId: x.goods_id,
						goodsCount: x.goods_count
					}))

				}
				console.log(order_info)
				// 1.2 发起请求创建订单
				const {
					data: res
				} = await uni.$http.post('/order/createOrder', order_info)
				

				// 2.3 得到订单支付相Math.round(new Date().getTime()/1000)关的必要参数

				// 3. 发起微信支付
				// 3.1 调用 uni.requestPayment() 发起微信支付
				const [err, succ] = await uni.requestPayment({
					provider: 'wxpay',
					nonceStr: res.data.nonceStr,
					package: res.data.packageValue,
					timeStamp: res.data.timeStamp,
					signType: 'MD5',
					paySign: res.data.paySign

				})
				// 3.2 未完成支付
				if (err) {
					console.error(err)
					return uni.$showMsg('订单未支付！')
				}
				
				const goodsList= this.cart.filter(x => x.goods_state).map(x => ({
					goodsId: x.goods_id,
					goodsCount: x.goods_count
				}))
				
				
				for(let x in goodsList){
					this.removeGoodsById(goodsList[x].goodsId)
				}
				
				

				uni.$showMsg('下单成功')
				uni.navigateTo({
					url: '/subpkg/my_order/my_order'
				})

			},

			// 延迟导航到 my 页面
			delayNavigate() {
				// 把 data 中的秒数重置成 3 秒
				this.seconds = 3
				this.showTips(this.seconds)

				this.timer = setInterval(() => {
					this.seconds--

					if (this.seconds <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url: '/pages/my/my',
							// 页面跳转成功之后的回调函数
							success: () => {
								// 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
								this.updateRedirectInfo({
									// 跳转的方式
									openType: 'switchTab',
									// 从哪个页面跳转过去的
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}

					this.showTips(this.seconds)
				}, 1000)
			},

			showTips(n) {
				// 调用 uni.showToast() 方法，展示提示消息
				uni.showToast({
					// 不展示任何图标
					icon: 'none',
					// 提示的消息
					title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
					// 为页面添加透明遮罩，防止点击穿透
					mask: true,
					// 1.5 秒后自动消失
					duration: 1500
				})
			}
		},
	}
</script>

<style lang="scss">
	.my-settle-container {
		/* 底部固定定位 */
		position: fixed;
		bottom: 0;
		left: 0;
		/* 设置宽高和背景色 */
		width: 100%;
		height: 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #C0000;
				font-weight: bold;
			}
		}


		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
</style>
