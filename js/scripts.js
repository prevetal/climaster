WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function() {
	// Main slider
	let mainSlider = document.querySelector('.main_slider .swiper')

	if (mainSlider) {
		new Swiper('.main_slider .swiper', {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			lazy: true,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}


	// Stores slider
	let storesSlider = document.querySelector('.stores .swiper')

	if (storesSlider) {
		new Swiper('.stores .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 'auto',
			lazy: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 12
				},
				1280: {
					spaceBetween: 16
				},
				1440: {
					spaceBetween: 20
				},
				1900: {
					spaceBetween: 26
				}
			},
		})
	}


	// Cases slider
	let casesSlider = document.querySelector('.cases .swiper')

	if (casesSlider) {
		new Swiper('.cases .swiper', {
			loop: true,
			speed: 500,
			loopAdditionalSlides: 2,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					spaceBetween: 12
				},
				1024: {
					spaceBetween: 16
				},
				1280: {
					spaceBetween: 24
				},
				1900: {
					spaceBetween: 38
				}
			},
			on: {
				init: swiper => {
					swiper.slideTo(2, 0)
					setTimeout(() => swiper.slideTo(0, 0), 50)

					setTimeout(() => setHeight(swiper.el.querySelectorAll('.swiper-slide')), 500)
				}
			}
		})
	}


	// Brands slider
	const brandsSliders = [],
		brands = document.querySelectorAll('.brands .swiper')

	brands.forEach((el, i) => {
		el.classList.add('brands_s' + i)

		let options = {
			loop: true,
			loopAdditionalSlides: 1,
			speed: 3000,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			spaceBetween: 14,
			slidesPerView: 'auto',
			autoplay: {
				delay: 1,
				disableOnInteraction: true
			},
			allowTouchMove: false,
		}

		brandsSliders.push(new Swiper('.brands_s' + i, options))
	})


	// Photo gallery slider
	const photoGallerySliders = [],
		photoGallery = document.querySelectorAll('.photo_gallery .swiper')

	photoGallery.forEach((el, i) => {
		el.classList.add('photo_gallery_s' + i)

		let options = {
			loop: true,
			loopAdditionalSlides: 1,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					slidesPerView: 'auto',
					spaceBetween: 12
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 24
				},
				1024: {
					slidesPerView: 4,
					spaceBetween: 24
				}
			},
		}

		photoGallerySliders.push(new Swiper('.photo_gallery_s' + i, options))
	})


	// Fancybox
	const fancyOptions = {
		dragToClose: false,
		placeFocusBack: false,
		l10n: {
			CLOSE: 'Закрыть',
			NEXT: 'Следующий',
			PREV: 'Предыдущий',
			MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
		},
		tpl: {
			closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

			main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
				<div class="fancybox__backdrop"></div>
				<div class="fancybox__carousel"></div>
				<div class="fancybox__footer"></div>
			</div>`,
		}
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show(
			[{
				src: `#${e.target.getAttribute('data-modal')}`,
				type: 'inline'
			}],
			fancyOptions
		)
	})


	$('.modal .close_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()
	})


	// Zoom images
	Fancybox.bind('.fancy_img', {
		...fancyOptions,
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Custom submit
	$('.form').submit(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show(
			[{
				src: '#success_modal',
				type: 'inline'
			}],
			fancyOptions
		)
	})


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level'),
				index = $(this).index() + 1

			parent.find('.tabs')[0]
				.style.setProperty('--current_tab', index)

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Mob. menu
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('.mob_menu').toggleClass('show')
	})


	$('.mob_menu .services_menu > * > a.sub_link').click(function(e) {
		e.preventDefault()

		$(this).next('.sub').addClass('show')
	})


	$('.mob_menu .services_menu .back_btn').click(function(e) {
		e.preventDefault()

		$(this).closest('.sub').removeClass('show')
	})


	$('.mob_menu .solutions_menu .grid_row a.sub_link').click(function(e) {
		e.preventDefault()

		const index = $(this).parent().index() + 1

		$('.mob_menu .solutions_menu .grid_row a.sub_link').removeClass('active')
		$(this).addClass('active')

		$('.mob_menu .solutions_menu .sub').hide()
		$('.mob_menu .solutions_menu .sub' + index).fadeIn(300)
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Select file
	const fileInputs = document.querySelectorAll('form .file input[type=file]')

	if (fileInputs) {
		fileInputs.forEach(el => {
			el.addEventListener('change', () => el.closest('.file').querySelector('label span').innerText = el.value)
		})
	}


	// Select file - dropzone
	const dropzone = $('#dropzone'),
		input = dropzone.find('input'),
		selected = dropzone.find('span')

	let files = []

	input.on('change', function () {
		addFiles(this.files)

		this.value = ''
	})

	dropzone.on('dragover', function (e) {
		e.preventDefault()

		$(this).addClass('dragover')
	})

	dropzone.on('dragleave', function () {
		$(this).removeClass('dragover')
	})

	dropzone.on('drop', function (e) {
		e.preventDefault()

		$(this).removeClass('dragover')

		const droppedFiles = e.originalEvent.dataTransfer.files

		addFiles(droppedFiles)
	})

	function addFiles(newFiles) {
		$.each(newFiles, function (_, file) {
			files.push(file)
		})

		renderList()
	}

	function renderList() {
		const names = files.map(file => file.name)

		selected.text(names.join(', '))
	}


	// Custom select - Nice select
	const selects = document.querySelectorAll('select:not(.skip)'),
		selectsInstances = []

	if (selects) {
		selects.forEach(el => {
			selectsInstances.push(NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			}))

			el.addEventListener('change', () => el.classList.add('selected'))

			if (el.querySelector('option[selected]')) {
				el.classList.add('selected')
			}
		})
	}


	if (is_touch_device()) {
		const servicesSubMenus = document.querySelectorAll('header .services_menu .sub'),
			solutionsSubMenus = document.querySelectorAll('header .solutions_menu .sub')

		// Submenu on the touch screen
		$('header .services_menu a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				servicesSubMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		$('header .solutions_menu .items a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				solutionsSubMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.services_menu').length === 0) {
				servicesSubMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}

			if ($(e.target).closest('.solutions_menu').length === 0) {
				solutionsSubMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Accordion
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active').find('.data').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.data').slideUp(300)

			item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Service prices
	const servicePricesTitles = document.querySelectorAll('.service_prices .cols .col .title'),
		servicePricesCols = document.querySelectorAll('.service_prices .cols .col')

	if (servicePricesCols[0]) {
		const servicePricesRowsCount = servicePricesCols[0].querySelectorAll('.items > div').length

		if (servicePricesTitles) {
			setHeight(servicePricesTitles)
		}

		if (servicePricesRowsCount) {
			for (let i = 0; i < servicePricesRowsCount; i++) {
				const items = [...servicePricesCols]
					.map(col => col.querySelectorAll('.items > div')[i])
					.filter(Boolean)

				setHeight(items)
			}
		}
	}


	// Articles height
	document
		.querySelectorAll('.articles .grid_row')
		.forEach(articlesMatchHeights)

	// Service tariffs heights
	document
		.querySelectorAll('.service_tariffs .grid_row')
		.forEach(serviceTariffsMatchHeights)

	// Objects height
	document
		.querySelectorAll('.objects .grid_row')
		.forEach(objectsMatchHeights)

	// Service when height
	document
		.querySelectorAll('.service_when .grid_row')
		.forEach(serviceWhenMatchHeights)

	// Service modern height
	document
		.querySelectorAll('.service_modern .grid_row')
		.forEach(serviceModernMatchHeights)

	// Service products height
	document
		.querySelectorAll('.service_products .grid_row')
		.forEach(serviceProductsMatchHeights)

	// Service create height
	document
		.querySelectorAll('.service_create .grid_row')
		.forEach(serviceCreateMatchHeights)

	// Trust us height
	document
		.querySelectorAll('.trust_us .grid_row')
		.forEach(trustUsMatchHeights)

	// Service docs height
	document
		.querySelectorAll('.service_docs .grid_row')
		.forEach(serviceDocsMatchHeights)

	// Service give height
	document
		.querySelectorAll('.service_give .grid_row')
		.forEach(serviceGiveMatchHeights)

	// Service why height
	document
		.querySelectorAll('.service_why .grid_row')
		.forEach(serviceWhyMatchHeights)

	// Service needed height
	document
		.querySelectorAll('.service_needed .grid_row')
		.forEach(serviceNeededMatchHeights)

	// Service dangers height
	document
		.querySelectorAll('.service_dangers .grid_row')
		.forEach(serviceDangersMatchHeights)

	// Services height
	document
		.querySelectorAll('.services .grid_row')
		.forEach(servicesMatchHeights)

	// Documents height
	document
		.querySelectorAll('.documents .grid_row')
		.forEach(documentsMatchHeights)

	// Service signs height
	document
		.querySelectorAll('.service_signs .grid_row')
		.forEach(serviceSignsMatchHeights)

	// Maintenance height
	document
		.querySelectorAll('.maintenance .grid_row')
		.forEach(maintenanceMatchHeights)

	// Service guarantee height
	document
		.querySelectorAll('.service_guarantee .grid_row')
		.forEach(serviceGuaranteeMatchHeights)

	// Subscription advantages height
	document
		.querySelectorAll('.subscription_advantages .grid_row')
		.forEach(subscriptionAdvantagesMatchHeights)

	// Service tasks height
	document
		.querySelectorAll('.service_tasks .grid_row')
		.forEach(serviceTasksMatchHeights)

	// Object types height
	document
		.querySelectorAll('.object_types .grid_row')
		.forEach(objectTypesMatchHeights)

	// Directions height
	document
		.querySelectorAll('.directions .grid')
		.forEach(directionsMatchHeights)

	// Partnership height
	document
		.querySelectorAll('.partnership .grid_row')
		.forEach(partnershipMatchHeights)

	// Technologies height
	document
		.querySelectorAll('.technologies .grid_row')
		.forEach(technologiesMatchHeights)

	// Service systems height
	document
		.querySelectorAll('.service_systems .grid_row')
		.forEach(serviceSystemsMatchHeights)

	// Service schema height
	document
		.querySelectorAll('.service_schema .data .grid_row')
		.forEach(serviceSchemaMatchHeights)

	// Service typical height
	document
		.querySelectorAll('.service_typical .grid_row')
		.forEach(serviceTypicalMatchHeights)

	// Service object types height
	document
		.querySelectorAll('.service_object_types .grid_row')
		.forEach(serviceObjectTypesMatchHeights)

	// Why choose us height
	document
		.querySelectorAll('.why_choose_us .grid_row')
		.forEach(whyChooseUsMatchHeights)

	// For whom height
	document
		.querySelectorAll('.for_whom .grid_row')
		.forEach(forWhomMatchHeights)

	// Cases height
	document
		.querySelectorAll('.cases .grid_row')
		.forEach(casesMatchHeights)

	// Project solutions height
	document
		.querySelectorAll('.project_info .solution .grid_row')
		.forEach(projectSolutionMatchHeights)

	// Project solutions height
	document
		.querySelectorAll('.reviews .grid_row')
		.forEach(reviewsMatchHeights)

	// Why we height
	document
		.querySelectorAll('.why_we .grid_row')
		.forEach(whyWeMatchHeights)

	// Payment individuals height
	document
		.querySelectorAll('.payment_individuals .methods .grid_row')
		.forEach(paymentIndividualsMatchHeights)

	// Guarantees height
	document
		.querySelectorAll('.guarantees .grid_row')
		.forEach(guaranteesMatchHeights)
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Articles height
		document
			.querySelectorAll('.articles .grid_row')
			.forEach(articlesMatchHeights)

		// Service tariffs heights
		document
			.querySelectorAll('.service_tariffs .grid_row')
			.forEach(serviceTariffsMatchHeights)

		// Objects height
		document
			.querySelectorAll('.objects .grid_row')
			.forEach(objectsMatchHeights)

		// Service when height
		document
			.querySelectorAll('.service_when .grid_row')
			.forEach(serviceWhenMatchHeights)

		// Service modern height
		document
			.querySelectorAll('.service_modern .grid_row')
			.forEach(serviceModernMatchHeights)

		// Service products height
		document
			.querySelectorAll('.service_products .grid_row')
			.forEach(serviceProductsMatchHeights)

		// Service create height
		document
			.querySelectorAll('.service_create .grid_row')
			.forEach(serviceCreateMatchHeights)

		// Trust us height
		document
			.querySelectorAll('.trust_us .grid_row')
			.forEach(trustUsMatchHeights)

		// Service docs height
		document
			.querySelectorAll('.service_docs .grid_row')
			.forEach(serviceDocsMatchHeights)

		// Service give height
		document
			.querySelectorAll('.service_give .grid_row')
			.forEach(serviceGiveMatchHeights)

		// Service why height
		document
			.querySelectorAll('.service_why .grid_row')
			.forEach(serviceWhyMatchHeights)

		// Service needed height
		document
			.querySelectorAll('.service_needed .grid_row')
			.forEach(serviceNeededMatchHeights)

		// Service dangers height
		document
			.querySelectorAll('.service_dangers .grid_row')
			.forEach(serviceDangersMatchHeights)

		// Services height
		document
			.querySelectorAll('.services .grid_row')
			.forEach(servicesMatchHeights)

		// Documents height
		document
			.querySelectorAll('.documents .grid_row')
			.forEach(documentsMatchHeights)

		// Service signs height
		document
			.querySelectorAll('.service_signs .grid_row')
			.forEach(serviceSignsMatchHeights)

		// Maintenance height
		document
			.querySelectorAll('.maintenance .grid_row')
			.forEach(maintenanceMatchHeights)

		// Service guarantee height
		document
			.querySelectorAll('.service_guarantee .grid_row')
			.forEach(serviceGuaranteeMatchHeights)

		// Subscription advantages height
		document
			.querySelectorAll('.subscription_advantages .grid_row')
			.forEach(subscriptionAdvantagesMatchHeights)

		// Service tasks height
		document
			.querySelectorAll('.service_tasks .grid_row')
			.forEach(serviceTasksMatchHeights)

		// Object types height
		document
			.querySelectorAll('.object_types .grid_row')
			.forEach(objectTypesMatchHeights)

		// Directions height
		document
			.querySelectorAll('.directions .grid')
			.forEach(directionsMatchHeights)

		// Partnership height
		document
			.querySelectorAll('.partnership .grid_row')
			.forEach(partnershipMatchHeights)

		// Technologies height
		document
			.querySelectorAll('.technologies .grid_row')
			.forEach(technologiesMatchHeights)

		// Service systems height
		document
			.querySelectorAll('.service_systems .grid_row')
			.forEach(serviceSystemsMatchHeights)

		// Service schema height
		document
			.querySelectorAll('.service_schema .data .grid_row')
			.forEach(serviceSchemaMatchHeights)

		// Service typical height
		document
			.querySelectorAll('.service_typical .grid_row')
			.forEach(serviceTypicalMatchHeights)

		// Service object types height
		document
			.querySelectorAll('.service_object_types .grid_row')
			.forEach(serviceObjectTypesMatchHeights)

		// Why choose us height
		document
			.querySelectorAll('.why_choose_us .grid_row')
			.forEach(whyChooseUsMatchHeights)

		// For whom height
		document
			.querySelectorAll('.for_whom .grid_row')
			.forEach(forWhomMatchHeights)

		// Cases height
		document
			.querySelectorAll('.cases .grid_row')
			.forEach(casesMatchHeights)

		// Project solutions height
		document
			.querySelectorAll('.project_info .solution .grid_row')
			.forEach(projectSolutionMatchHeights)

		// Project solutions height
		document
			.querySelectorAll('.reviews .grid_row')
			.forEach(reviewsMatchHeights)

		// Why we height
		document
			.querySelectorAll('.why_we .grid_row')
			.forEach(whyWeMatchHeights)

		// Payment individuals height
		document
			.querySelectorAll('.payment_individuals .methods .grid_row')
			.forEach(paymentIndividualsMatchHeights)

		// Guarantees height
		document
			.querySelectorAll('.guarantees .grid_row')
			.forEach(guaranteesMatchHeights)


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})



// Service tariffs heights
function serviceTariffsMatchHeights(row) {
	const items = [...row.querySelectorAll('.item')]

	row
		.querySelectorAll('.head .name, .head .desc, .info .desc, .info .items')
		.forEach(el => el.style.height = 'auto')

	const eq = selector =>
		setHeight(
			items
				.map(item => item.querySelector(selector))
				.filter(Boolean)
		)

	eq('.head .name')
	eq('.head .desc')

	const infoCount = Math.max(
		...items.map(item => item.querySelectorAll('.info').length)
	)

	for (let i = 0; i < infoCount; i++) {
		['.desc', '.items'].forEach(sel =>
			setHeight(
				items
					.map(item => item.querySelectorAll('.info')[i]?.querySelector(sel))
					.filter(Boolean)
			)
		)
	}
}


// Articles height
function articlesMatchHeights(row) {
	const names = row.querySelectorAll('.article .name'),
		descs = row.querySelectorAll('.article .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Objects height
function objectsMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Service when height
function serviceWhenMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Service modern height
function serviceModernMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Service products height
function serviceProductsMatchHeights(row) {
	const names = row.querySelectorAll('.product .name'),
		descs = row.querySelectorAll('.product .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Service create height
function serviceCreateMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Trust us height
function trustUsMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Service docs height
function serviceDocsMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		items = row.querySelectorAll('.item .items')

	;[...names, ...items].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(items)
}


// Service give height
function serviceGiveMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Service why height
function serviceWhyMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Service needed height
function serviceNeededMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Service dangers height
function serviceDangersMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		items = row.querySelectorAll('.item .items')

	;[...names, ...items].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(items)
}


// Services height
function servicesMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Documents height
function documentsMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Service signs height
function serviceSignsMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Maintenance height
function maintenanceMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Service guarantee height
function serviceGuaranteeMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Subscription advantages height
function subscriptionAdvantagesMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Service tasks height
function serviceTasksMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Object types height
function objectTypesMatchHeights(row) {
	const exps = row.querySelectorAll('.type .exp'),
		names = row.querySelectorAll('.type .name')

	;[...exps, ...names].forEach(el => el.style.height = 'auto')

	setHeight(exps)
	setHeight(names)
}


// Directions height
function directionsMatchHeights(row) {
	const names = row.querySelectorAll('.item .name')

	;[...names].forEach(el => el.style.height = 'auto')

	setHeight(names)
}


// Partnership height
function partnershipMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		options = row.querySelectorAll('.item .options')

	;[...names, ...options].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(options)
}


// Technologies height
function technologiesMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Service systems height
function serviceSystemsMatchHeights(row) {
	const descs = row.querySelectorAll('.item .desc'),
		pluses = row.querySelectorAll('.item .pluses'),
		brand = row.querySelectorAll('.item .text_info')

	;[...descs, ...pluses, ...brand].forEach(el => el.style.height = 'auto')

	setHeight(descs)
	setHeight(pluses)
	setHeight(brand)
}


// Service schema height
function serviceSchemaMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Service typical height
function serviceTypicalMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Service object types height
function serviceObjectTypesMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Why choose us height
function whyChooseUsMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// For whom height
function forWhomMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Cases height
function casesMatchHeights(row) {
	const names = row.querySelectorAll('.case .name'),
		descs = row.querySelectorAll('.case .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Project solutions height
function projectSolutionMatchHeights(row) {
	const names = row.querySelectorAll('.item .name')

	;[...names].forEach(el => el.style.height = 'auto')

	setHeight(names)
}


// Reviews height
function reviewsMatchHeights(row) {
	const descs = row.querySelectorAll('.review .desc'),
		authors = row.querySelectorAll('.review .author')

	;[...descs, ...authors].forEach(el => el.style.height = 'auto')

	setHeight(descs)
	setHeight(authors)
}


// Why we height
function whyWeMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Payment individuals height
function paymentIndividualsMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}


// Guarantees height
function guaranteesMatchHeights(row) {
	const names = row.querySelectorAll('.item .name'),
		descs = row.querySelectorAll('.item .desc')

	;[...names, ...descs].forEach(el => el.style.height = 'auto')

	setHeight(names)
	setHeight(descs)
}