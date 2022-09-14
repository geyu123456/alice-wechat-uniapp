<template>
	<view>
		<view class="order_list">
			<view class="order_item" v-for="(item,i) in myOrders" :key="i">
				<text>下单时间：{{item.createdDate}}</text>
				<image class="image" :src="item.picUrl" @click="gotoDetail(item)"></image>
				<view class="order-info-text">
					<text>订单信息：{{item.goodsInfo}}</text>
					<text>总金额：{{item.totalAmount}}</text>
					<text>收货地址：{{item.address}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				myOrders:[]
				
			};
		},
		computed:{
			// token 是用户登录成功之后的 token 字符串
			...mapState('m_user', ['token']),
		},
		onLoad() {
		
			this.getMyOrderList()
		
		},
		methods:{
			async getMyOrderList() {
				
			
				const {
					data: res
				} = await uni.$http.get('/order/queryMyOrders',{openId:this.token})

				if (res.code !== 200) return uni.$showMsg()
				this.myOrders = res.data

			}
		}
	}
</script>

<style lang="scss">

.order_item {
		display: flex;
		flex-direction: column;

		margin: 30rpx;
		margin-bottom: 40rpx;


		border: 1rpx solid #cdd6d2;
		border-radius: 10rpx;
		/* box-shadow: 4rpx 4rpx 4rpx #707b8b; */
		position: relative;
		-moz-box-shadow: 0px 1px 5px #d0d0d0;
		-webkit-box-shadow: 0px 1px 5px #d0d0d0;
		box-shadow: 0px 1px 5px #d0d0d0;
		text {
		  font-size: 12px;
		  margin: 10px;
		}

	}


	.order_item .image {
		border-radius: 10rpx 10rpx 0 0;
		width: 150px;
		height: 100px;
		background-color: #eee;
	}
	.order_item .order-info-text{
		display: flex;
		flex-direction: column;
		text {
		  font-size: 12px;
		  margin: 10px;
		}
	}
</style>
