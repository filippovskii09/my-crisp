window.addEventListener('DOMContentLoaded', () => {
	const urlParams = new URLSearchParams(window.location.search);
	const itemId = urlParams.get("id");

	async function getItemDetail(id) {
		try {
			const response = await fetch('data.json');
			const data = await response.json()

			const item = data.find(item => item.id === id)

			if (item) {
				const imageWrapper = document.querySelector('.details__image'),
						detailsBrand = document.querySelector('.details__brand'),
						detailsName = document.querySelector('.details__name'),
						detailsColor = document.querySelector('#details-color'),
						detailsSize = document.querySelector('.details-size__list'),
						detailsTotalPrice = document.querySelector('#details-price'),
						detailsQuantity = document.querySelector('#quantity');

				item.size.map(itemSize => {
					const sizeLi = document.createElement('li');
					sizeLi.classList.add('size-accordion__checkbox');
					sizeLi.innerHTML = `
							<input type="radio" name="size" id="${itemSize}">
							<label for="${itemSize}">${itemSize}</label>
					`;
					detailsSize.appendChild(sizeLi);
				})
				detailsQuantity.textContent = 1;
				imageWrapper.innerHTML = `<img src=${item.image} />`;
				detailsBrand.textContent = `${item.brand}`;
				detailsName.textContent = `${item.name}`;
				detailsTotalPrice.textContent = `${item.price}`
				detailsColor.innerHTML = `
					<span style="background: ${item.color}"></span>
				`;
			} else {
				console.log('err');
			}
		} catch (error) {
			console.log(error);
		}
	}

	getItemDetail(itemId)
})