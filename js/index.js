window.addEventListener('DOMContentLoaded', () => {
	const cartItems = document.querySelector('.header-cart__items'),
		cartTotalPrice = document.querySelector('.header-cart__price'),
		closeLogin = document.querySelector('.sign__close'),
		openLogin = document.querySelector('.header-info__sign'),
		signModal = document.querySelector('.sign'),
		cartMOdalTotalPrice = document.querySelector('#cart-total'),
		openCart = document.querySelector('.header-cart__btn'),
		closeCart = document.querySelector('.cart__close'),
		cartModal = document.querySelector('.cart'),
		header = document.querySelector('.header');


	cartItems.textContent = 'Shopping Cart';
	cartTotalPrice.textContent = '0,00 EUR';
	cartMOdalTotalPrice.textContent = '139,00 EUR';

	openLogin.addEventListener('click', () => {
		signModal.classList.add('sign-open')
		console.log('sign open');
	})

	closeLogin.addEventListener('click', () => {
		signModal.classList.remove('sign-open')
	})

	openCart.addEventListener('click', () => {
		cartModal.classList.add('cart-open')
	})

	closeCart.addEventListener('click', () => {
		cartModal.classList.remove('cart-open')
	})

	// header add class on scroll

	// window.addEventListener('scroll', () => {
	// 	let scrollPos = window.scrollY;

	// 	if (scrollPos >= 20) {
	// 		header.classList.add('header-fixed')
	// 	} else {
	// 		header.classList.remove('header-fixed')
	// 	}
	// })


	// burger button

	const burgerButton = document.querySelector('.header__burger');

	burgerButton.addEventListener('click', () => {
		burgerButton.classList.toggle('open');
		document.documentElement.classList.toggle('menu-open');
	})

	// scroll on button

	const prevScroll = document.querySelectorAll('#prev-scroll'),
			nextScroll = document.querySelectorAll('#next-scroll'),
			newProducts = document.querySelector('#new-products'),
			trendingProducts = document.querySelector('#trending');

	prevScroll[0].addEventListener('click', () => {
		newProducts.scrollTo({
			left: newProducts.scrollLeft - 600,
			behavior: 'smooth'
		})
	})

	nextScroll[0].addEventListener('click', () => {
		newProducts.scrollTo({
			left: newProducts.scrollLeft + 600,
			behavior: 'smooth'
		})
	})

	prevScroll[1].addEventListener('click', () => {
		trendingProducts.scrollTo({
			left: trendingProducts.scrollLeft - 600,
			behavior: 'smooth'
		})
	})

	nextScroll[1].addEventListener('click', () => {
		trendingProducts.scrollTo({
			left: trendingProducts.scrollLeft + 600,
			behavior: 'smooth'
		})
	})

	// get new-products 

	async function getNewProducts(url) {
		try {
			const response = await fetch(url);
			const data = await response.json();
			const ul = document.querySelector('#new-products');

			function displayProducts() {
				ul.innerHTML = '';

				const filteredData = data.filter(item => item.category === 'NEW Arivals');

				filteredData.forEach(item => {
					const li = document.createElement('li');
					li.classList.add('products__item');
					li.innerHTML = `
							 <a href="./details.html?id=${item.id}">
								  <div class="item-products__image">
										<img src="${item.image}" alt="image">
								  </div>
								  <h5 class="item-products__category">${item.category}</h5>
								  <p class="item-products__name">${item.name}</p>
								  <h4 class="item-products__price">${item.price}</h4>
							 </a>
						`;
					ul.appendChild(li);
				});
			}

			displayProducts();

		} catch (error) {
			console.error(error);
		}
	}

	getNewProducts('data.json');


	async function getTrendingProducts(url) {
		try {
			const response = await fetch(url);
			const data = await response.json();
			const ul = document.querySelector('#trending');

			function displayProducts() {
				ul.innerHTML = '';

				const filteredData = data.filter(item => item.category === 'TREnding');

				filteredData.forEach(item => {
					const li = document.createElement('li');
					li.classList.add('products__item');
					li.innerHTML = `
							 <a href="./details.html?id=${item.id}">
								  <div class="item-products__image">
										<img src="${item.image}" alt="image">
								  </div>
								  <h5 class="item-products__category">${item.category}</h5>
								  <p class="item-products__name">${item.name}</p>
								  <h4 class="item-products__price">${item.price}</h4>
							 </a>
						`;
					ul.appendChild(li);
				});
			}

			displayProducts();

		} catch (error) {
			console.error(error);
		}
	}

	getTrendingProducts('data.json');

})