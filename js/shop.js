window.addEventListener('DOMContentLoaded', () => {

	// fetching data 
	async function getAllProducts(url) {
		try {
			const response = await fetch(url);
			const data = await response.json();
			const ul = document.querySelector('#shop-list');

			function filteredProducts(brand, selectedSizes, length, color) {
				ul.innerHTML = '';

				const filteredData = data.filter(item => {
					return (!brand || item.brand === brand) 
					&& (!selectedSizes.length || item.size.some(size => selectedSizes.includes(size))) 
					&& (!length || item.length === length) 
					&& (!color || item.color === color);
				})

				filteredData.map(item => {
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


			const brandRadios = document.querySelectorAll('.brands-accordion__checkbox input[name="brand"]'),
					sizeCheckboxes = document.querySelectorAll('.size-accordion__checkbox input[name="size"]'),
					lengthRadios = document.querySelectorAll('.length-radio input[name="length"]'),
					filterItems = document.querySelectorAll('.filters-item'),
					resetFiltersButton = document.querySelector('.sidebar-filters__reset'),
					filtersMenu = document.querySelector('.sidebar-filters'),
					deleteFilter = document.querySelectorAll('.filters-item__delete');

			deleteFilter[0].addEventListener('click', () => {
				localStorage.removeItem('checkedBrand');
				filterItems[0].style.display = 'none';
				filteredProducts(
					null,
					storedSize ? storedSize : [],
					storedLength ? storedLength : null,
					selectedColor ? selectedColor : null
				);

				brandRadios.forEach(item => {
					item.checked = false;
				})
			})
			deleteFilter[1].addEventListener('click', () => {
				localStorage.removeItem('checkedSize');
				filterItems[1].style.display = 'none';
				filteredProducts(
					storedBrand ? storedBrand : null,
					[],
					storedLength ? storedLength : null,
					selectedColor ? selectedColor : null
				);
				sizeCheckboxes.forEach(item => {
					item.checked = false;
				})
			})
			deleteFilter[2].addEventListener('click', () => {
				localStorage.removeItem('checkedLength');
				filterItems[2].style.display = 'none';
				filteredProducts(
					storedBrand ? storedBrand : null,
					storedSize ? storedSize : [],
					null,
					selectedColor ? selectedColor : null
				);
				lengthRadios.forEach(item => {
					item.checked = false;
				})
			})
			deleteFilter[3].addEventListener('click', () => {
				localStorage.removeItem('checkedColor');
				filterItems[3].style.display = 'none';
				filteredProducts(
					storedBrand ? storedBrand : null,
					storedSize ? storedSize : [],
					storedLength ? storedLength : null,
					null
				);
			})

			const allColors = [
				{id: 1, color: '#ec282e'},
				{id: 2, color: '#101f4b'},
				{id: 3, color: '#5db7e5'},
				{id: 4, color: '#88829a'},
				{id: 5, color: '#e8e7e5'},
				{id: 6, color: '#242a39'},
				{id: 7, color: '#BDBDBD'},
				{id: 8, color: '#d2b398'},
				{id: 9, color: '#3a5e79'},
				{id: 10, color: '#a3b78c'},
				{id: 11, color: '#000'},
				{id: 12, color: '#f2d6a7'}
			]

			// stored check color and render all colors

			const colorsList = document.querySelector('.colors-accordion__list'),
					storedColor = localStorage.getItem("checkedColor"),
					choosedColorFilter = document.querySelector('#color-filter');

			let selectedColor = storedColor;

			if (!selectedColor) {
				filterItems[3].style.display = 'none';
			}

			choosedColorFilter.innerHTML = `
					<div class="choosed-color">
						<span style="background: ${selectedColor}"></span>
					</div> `

			allColors.forEach(color => {
				const colorItem = document.createElement('li');
				colorItem.classList.add('colors-accordion__checkbox');

				const inputColor = document.createElement('input'),
						labelColor = document.createElement('label'),
						labelColorActive = document.createElement('span');

				labelColorActive.classList.add('checked-color');

				inputColor.type = 'radio';
				inputColor.name = 'color';
				inputColor.id = color.color;

				labelColor.htmlFor = color.color;
				labelColor.style.background = color.color;

				colorItem.appendChild(inputColor);
				colorItem.appendChild(labelColor);
				labelColor.appendChild(labelColorActive);

				if (selectedColor === inputColor.id) {
					colorItem.classList.add('active-color');
				}

				inputColor.addEventListener('click', (e) => {
					selectedColor = e.target.id;

					if (!selectedColor) {
						filterItems[3].style.display = 'none';
					} else {
						filterItems[3].style.display = 'block';
					}

					filtersMenu.style.display = 'block';

					document.querySelectorAll('.colors-accordion__checkbox').forEach(parent => {
						parent.classList.remove('active-color');
					});	

					choosedColorFilter.innerHTML = `
					<div class="choosed-color">
						<span style="background: ${selectedColor}"></span>
					</div> `

					colorItem.classList.add('active-color');

					localStorage.setItem("checkedColor", selectedColor)

					const selectedBrand = [...brandRadios].find(radio => radio.checked),
							selectedLength = [...lengthRadios].find(item => item.checked),
							selectedSizes = [...sizeCheckboxes]
								.filter(item => item.checked)
								.map(item => item.id);

					filteredProducts(
						selectedBrand ? selectedBrand.id : storedBrand,
						selectedSizes ? selectedSizes : storedSize,
						selectedLength ? selectedLength.id : storedLength,
						selectedColor
					)
			  });
			
				colorsList.appendChild(colorItem)
			})

			// stored check brand and forEach brands radio

			const storedBrand = localStorage.getItem('checkedBrand'),
					choosedBrandFilter = document.querySelector('#brand-filter');

			if (!storedBrand) {
				filterItems[0].style.display = 'none';	
			}

			choosedBrandFilter.textContent = storedBrand;

			brandRadios.forEach(radio => {
				radio.addEventListener('change', () => {

					if (!radio.id) {
						filterItems[0].style.display = 'none';	
					} else {
						filterItems[0].style.display = 'block';	
					}		

					filtersMenu.style.display = 'block';

					localStorage.setItem('checkedBrand', radio.id);
					choosedBrandFilter.textContent = radio.id;

					const selectedLength = [...lengthRadios].find(item => item.checked),
							selectedSizes = [...sizeCheckboxes]
						.filter(item => item.checked)
						.map(item => item.id);

					filteredProducts(
						radio.id,
						selectedSizes ? selectedSizes : storedSize,
						selectedLength ? selectedLength.id : storedLength,
						selectedColor ? selectedColor : null
					)
				})
			})
			
			// stored check size and forEach size radio

			const storedSize = localStorage.getItem('checkedSize'),
					choosedSizeBrand = document.querySelector('#size-filter');

			if (!storedSize) {
				filterItems[1].style.display = 'none';	
			}

			choosedSizeBrand.textContent = storedSize;

			sizeCheckboxes.forEach(item => {
				item.addEventListener('change', () => {

					localStorage.setItem('checkedSize', item.id);

					if (!item.id) {
						filterItems[1].style.display = 'none';	
					} else {
						filterItems[1].style.display = 'block';	
					}

					filtersMenu.style.display = 'block';

					choosedSizeBrand.textContent = item.id;

					const selectedBrand = [...brandRadios].find(radio => radio.checked),
							selectedLength = [...lengthRadios].find(item => item.checked),
							selectedSizes = [...sizeCheckboxes]
								.filter(item => item.checked)
								.map(item => item.id);

					filteredProducts(
						selectedBrand ? selectedBrand.id : storedBrand,
						selectedSizes ? selectedSizes : storedSize,
						selectedLength ? selectedLength.id : storedLength,
						selectedColor ? selectedColor : null
					)
				})
			})

			// forEach dress length radio

			const storedLength = localStorage.getItem('checkedLength'),
					choosedLengthFilter = document.querySelector('#length-filter');

			choosedLengthFilter.textContent = storedLength;

			if (!storedLength) {
				filterItems[2].style.display = 'none';
			}

			lengthRadios.forEach(item => {
				item.addEventListener('change', () => {

					if (!item.id) {
						filterItems[2].style.display = 'none';
					}	else {
						filterItems[2].style.display = 'block';
					}

					filtersMenu.style.display = 'block';

					localStorage.setItem('checkedLength', item.id)
					choosedLengthFilter.textContent = item.id;

					const selectedBrand = [...brandRadios].find(radio => radio.checked)
					const selectedSizes = [...sizeCheckboxes]
						.filter(item => item.checked)
						.map(item => item.id);

					filteredProducts(
						selectedBrand ? selectedBrand.id : storedBrand, 
						selectedSizes ? selectedSizes : storedSize,
						item.id,
						selectedColor ? selectedColor : null
					)
				})
			})

			if (!storedBrand && !selectedColor && !storedLength && !storedSize) {
				filtersMenu.style.display = 'none';
			}

			filteredProducts(
				storedBrand ? storedBrand : null,
				storedSize ? storedSize : [],
				storedLength ? storedLength : null,
				selectedColor ? selectedColor : null
			);

			resetFiltersButton.addEventListener('click', () => {
				localStorage.removeItem('checkedLength');
				localStorage.removeItem('checkedSize');
				localStorage.removeItem('checkedBrand');
				localStorage.removeItem('checkedColor');

				filterItems.forEach(filter => {
					filter.style.display = 'none';
				})
				filtersMenu.style.display = 'none';
				filteredProducts(null, [], null, null);
			})	

			// size custom checkbox
					
			const sizeCheckboxe = document.querySelectorAll('.size-accordion__checkbox');
					
			sizeCheckboxe.forEach(item => {
				item.addEventListener('click', () => {
					sizeCheckboxe.forEach(anotherItem => {
						anotherItem.classList.remove('active-size')
					})	
				
					item.classList.add('active-size')
				})
			})
			
		} catch (error) {
			console.error(error);
		}

	}

	getAllProducts('data.json');

	// accordions

	const accordions = document.querySelectorAll('.accordion-toggle');
	accordions.forEach(accordion => {
		const content = document.querySelector(accordion.hash);
		const accordionState = JSON.parse(localStorage.getItem('accordionState')) || {};
		if (accordionState[accordion.hash]) {
			content.classList.add('active');
		}
	});

	document.addEventListener('click', function (event) {
		if (!event.target.classList.contains('accordion-toggle')) return;

		let content = document.querySelector(event.target.hash);
		if (!content) return;

		event.preventDefault();

		if (content.classList.contains('active')) {
			content.classList.remove('active');
		} else {
			content.classList.add('active');
		}
		const accordionState = {};
		accordions.forEach(accordion => {
			const content = document.querySelector(accordion.hash);
			accordionState[accordion.hash] = content.classList.contains('active');
		});

		localStorage.setItem('accordionState', JSON.stringify(accordionState));

	});

	// cusomize double range

	const minVal = document.querySelector(".min-val");
	const maxVal = document.querySelector(".max-val");
	const priceInputMin = document.querySelector(".min-input");
	const priceInputMax = document.querySelector(".max-input");
	const range = document.querySelector(".slider-track");
	const sliderMinValue = parseInt(minVal.min);
	const sliderMaxValue = parseInt(maxVal.max);

	const storedMinValue = localStorage.getItem("minValue");
	const storedMaxValue = localStorage.getItem("maxValue");

	minVal.value = storedMinValue || sliderMinValue;
	maxVal.value = storedMaxValue || sliderMaxValue;

	slideMin();
	slideMax();

	function slideMin() {
		let gap = parseInt(maxVal.value) - parseInt(minVal.value);
		if (gap <= 0) {
			minVal.value = parseInt(maxVal.value);
		}
		priceInputMin.value = minVal.value;
		setArea();
		saveValuesToLocalStorage();
	}

	function slideMax() {
		let gap = parseInt(maxVal.value) - parseInt(minVal.value);
		if (gap <= 0) {
			maxVal.value = parseInt(minVal.value);
		}
		priceInputMax.value = maxVal.value;
		setArea();
		saveValuesToLocalStorage();
	}

	function setArea() {
		range.style.left = `${
			 ((minVal.value - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100
		  }%`;
		range.style.right = `${
			 100 -
			 ((maxVal.value - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100
		  }%`;
	}

	minVal.addEventListener("input", () => {
		slideMin();
	});

	maxVal.addEventListener("input", () => {
		slideMax();
	});

	priceInputMin.addEventListener("input", () => {
		minVal.value = priceInputMin.value;
		slideMin();
	});

	priceInputMax.addEventListener("input", () => {
		maxVal.value = priceInputMax.value;
		slideMax();
	});

	function saveValuesToLocalStorage() {
		localStorage.setItem("minValue", minVal.value);
		localStorage.setItem("maxValue", maxVal.value);
	}

	// open filters menu

	const openFiltersButton = document.querySelector('.open-filters'),
			filtersMenu = document.querySelector('.sidebar-products'),
			closeFilters = document.querySelector('#close-sidebar');

	openFiltersButton.addEventListener('click', () => {
		filtersMenu.classList.add('open-filters')
	})
	closeFilters.addEventListener('click', () => {
		filtersMenu.classList.remove('open-filters')
	})
})