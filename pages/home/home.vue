<template>
	<view>

		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=1' ">
					<image :src="item"></image>
				</navigator>
			</swiper-item>

		</swiper>

		<view class="goods_list">
			<view class="goods_item" v-for="(item,i) in allGoods" :key="i">
				<image class="image" :src="item.mainImage" @click="gotoDetail(item)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixin/tabar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				swiperList: [
					"http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225733.jpg",
					"http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225715.jpg",
					"http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225742.jpg",
					"http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225358.jpg"
				],
				allGoods: [

				]
			};
		},
		onLoad() {

			this.getSwiperList()
			this.getAllGoodsList()
		},
		methods: {
			getSwiperList() {

				return ['http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225733.jpg',
					'http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225715.jpg',
					'http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225742.jpg',
					'http://alice-image-oss.oss-cn-beijing.aliyuncs.com/mall/images/20201208/微信图片_20201208225358.jpg'
				]
			},
			async getAllGoodsList() {
				const {
					data: res
				} = await uni.$http.get('/goods/queryList')
				console.log(res)
				if (res.code !== 200) return uni.$showMsg()
				this.allGoods = res.data
				console.log(res.data)
			},
			// 点击跳转到商品详情页面
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goodsId
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 400rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods_item {
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

	}


	.goods_item .image {
		border-radius: 10rpx 10rpx 0 0;
		width: 100%;
		height: 450rpx;
		background-color: #eee;
	}
</style>
