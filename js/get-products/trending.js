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