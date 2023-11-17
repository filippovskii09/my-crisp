window.addEventListener('DOMContentLoaded', () => {

	async function getLocalData(url) {
		try {
			const response = await fetch(url);
			const data = await response.json();
			const ul = document.querySelector('.products__list');

			function displayProducts(category) {
				ul.innerHTML = '';

				const filteredData = data.filter(item => item.category === category);

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

			const categoryRadios = document.querySelectorAll('.sidebar-products__item input[name="category"]');

			categoryRadios.forEach(radio => {
				radio.addEventListener('change', () => {
					displayProducts(radio.id);
				});
			});

			displayProducts(categoryRadios[0].id);

		} catch (error) {
			console.error(error);
		}
	}

	getLocalData('data.json');

})