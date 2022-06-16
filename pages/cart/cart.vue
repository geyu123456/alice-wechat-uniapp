<template>
	<view>
		<my-address></my-address>
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 描述文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		
		
		
		<uni-swipe-action>
			<block v-for="(goods,i) in cart" :key="i">
				
					<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
						<my-goods :goods="goods" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler"
							@num-change="numberChangeHandler"></my-goods>
					</uni-swipe-action-item>
			</block>
			
		</uni-swipe-action>

	</view>
</template> 
<script>
	import badgeMix from '@/mixin/tabar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},

		data() {
			return {
				options: [{
				      text: '删除', // 显示的文本内容
				      style: {
				        backgroundColor: '#C00000' // 按钮的背景颜色
				      }
				    }]
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState','updateGoodsCount','removeGoodsById']),
			// 商品的勾选状态发生了变化
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			// 商品的数量发生了变化
			numberChangeHandler(e) {
				this.updateGoodsCount(e)
			},
			  // 点击了滑动操作按钮
			  swipeActionClickHandler(goods) {
			    this.removeGoodsById(goods.goods_id)
			  }
		},
	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;
		border-top: 1px solid #aa0000;

		.cart-title-text {
			margin-left: 10px;
		}
	}
</style>
