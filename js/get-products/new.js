async function getNewProducts(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		const ul = document.querySelector('#new-products');

		function displayProducts() {
			ul.innerHTML = '';

			const filteredData = data.filter(item => item.category === 'NEW Arivals');

			filteredData.forEach(item => {
				const li = document.createElement('div');
				li.classList.add('swiper-slide');
				li.innerHTML = `
						<li class="products__item">
							 <a href="./details.html?id=${item.id}">
								  <div class="item-products__image">
										<img src="${item.image}" alt="image">
								  </div>
								  <h5 class="item-products__category">${item.category}</h5>
								  <p class="item-products__name">${item.name}</p>
								  <h4 class="item-products__price">${item.price}</h4>
							 </a>
						</li>
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
