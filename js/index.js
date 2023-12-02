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

	window.addEventListener('scroll', () => {
      let scrollPos = window.scrollY;
      if (scrollPos >= 20) {
        header.classList.add('header-fixed');
      } else {
        header.classList.remove('header-fixed');
      }
    });


	// burger button

	const burgerButton = document.querySelector('.header__burger');

	burgerButton.addEventListener('click', () => {
		burgerButton.classList.toggle('open');
		document.documentElement.classList.toggle('menu-open');
	})

})