jQuery(document).ready(function ($) {
	//		колдунство с шапкой при скролле
	$(window).on('scroll', function () {
		var scrollTop = $(window).scrollTop();
//		при проскролливании 10 пикселей вниз от начала страницы
		if (scrollTop > 10) {
//			перекрашиваем шапку в полупрозрачный чёрный
			$('nav').removeClass('transparent').addClass('semi_black');
//			и удаляем бордер
			$('header nav').css({
				'border-bottom': 'none'
			});
		} else {
//			в обратном случае делаем шапку прозрачной
			$('nav').removeClass('semi_black').addClass('transparent');
//			и добавляем белый бордер в 1 пиксель снизу
			$('header nav').css({
				'border-bottom': '1px solid #ffffff'
			});
		}
	});
// перемотка по якорям без добавления хэша в адресную строку
	$('a').not('.external_service').not('.modal').on('click', function (e) {
		e.preventDefault();
		var targetSection = $(this).attr("href");
		$(targetSection).velocity('scroll', {
			queue: false,
			duration: '1500',
			offset: -125
		});
	});
	var workSwiper = new Swiper('.works_swiper', {
		speed: 400, // скорсть перемотки слайда
		slidesPerView: 3, // сколько слайдов видно по дефолту
//		spaceBetween: 60, // расстояние между слайдами
		autoHeight: false, //опция автовысоты. включить при перекрытии части слайдов нижележащими блоками
		nextButton: '.swiper-work-next', // селектор кнопки "следующий слайд"
		prevButton: '.swiper-work-prev', // селектор кнопки "предыдущий слайд"
		slidesPerColumn: 2,
		breakpoints: {
			//уточнение по размерами экранов.
			480: { // если разрешение экрана ниже 480 пикселей в ширину
				slidesPerView: 1, // показывается один слайд за раз
				spaceBetween: 0, // расстояние между слайдами 0
				slidesPerColumn: 1
			},
			// если разрешение экрана ниже 992 пикселей в ширину (планшеты обычно)
			992: {
				slidesPerView: 2, // два слайда за раз
				spaceBetween: 0 // 20 пикселей расстояние между слайдами
			},
			// если разрешение экрана ниже 1600 пикселей в ширину (нэтбуки, старые мониторы и винда хр)
			1600: {
				slidesPerView: 3, //три слайда за раз
				spaceBetween: 0 // расстояние между слайдами 40 пикселей
			},
			// если разрешение экрана ниже 1920 пикселей в ширину (современные ноуты, экраны до 4к)
			1920: {
				slidesPerView: 3, //три слайда за раз
				spaceBetween: 0 // расстояние между слайдами 60 пикселей
			}
		}
	});
	var testimonialsSwiper = new Swiper('.testimonials_slider', {
		speed: 400, // скорсть перемотки слайда
		slidesPerView: 3, // сколько слайдов видно по дефолту
		spaceBetween: 20, // расстояние между слайдами
		autoHeight: false, //опция автовысоты. включить при перекрытии части слайдов нижележащими блоками
		nextButton: '.swiper-test-next', // селектор кнопки "следующий слайд"
		prevButton: '.swiper-test-prev', // селектор кнопки "предыдущий слайд"
		breakpoints: {
			//уточнение по размерами экранов.
			480: { // если разрешение экрана ниже 480 пикселей в ширину
				slidesPerView: 1, // показывается один слайд за раз
				spaceBetween: 0 // расстояние между слайдами 0
			},
			// если разрешение экрана ниже 992 пикселей в ширину (планшеты обычно)
			992: {
				slidesPerView: 2, // два слайда за раз
				spaceBetween: 0 // 20 пикселей расстояние между слайдами
			},
			// если разрешение экрана ниже 1600 пикселей в ширину (нэтбуки, старые мониторы и винда хр)
			1600: {
				slidesPerView: 3, //три слайда за раз
				spaceBetween: 0 // расстояние между слайдами 40 пикселей
			},
			// если разрешение экрана ниже 1920 пикселей в ширину (современные ноуты, экраны до 4к)
			1920: {
				slidesPerView: 3, //три слайда за раз
				spaceBetween: 0 // расстояние между слайдами 60 пикселей
			}
		}
	});
//	перекрашиваем кнопку по входу мыши
	$('.btn-round').on('mouseenter', function(){
	$('.btn-round').not(this).css({'background-color':'#ffffff'});
	$(this).find('p').css({'color':'#ffffff'});
	$(this).css({'background-color':'#0b9cce', 'color':'#0b9cce'});
	});
//	и возвращаем к исходному состоянию по выходу мыши
	$('.btn-round').on('mouseleave', function(){
	$('.btn-round p').css({'color':'#000000'});
	$(this).css({'background-color':'#ffffff'});
	});
	$(".button-collapse").sideNav({
	  menuWidth: 300, // ширина сайднава
	  edge: 'right', // сторона, откуда появляется
	  closeOnClick: true, // закрывать по клику на содержимое
	  draggable: true // возможность открывать свайпом на мобильных устройствах
		});

//	форма обратной связи низ страницы
	$('#message').trigger('autoresize');
//	объявляем форму
	var form = $('#form');
//	чистим содержимое текстового поля на всякий случай, чтобы если шаблонизатор затупит, не было лишних пробелов
	form.find('#message').text('');
//	объявляем блок для сообщений об ошибках
	var formMessages = $('#formMessage');
	$(form).submit(function (e) {
//		запрет на прямое обращение к скрипту почты
		e.preventDefault();
//		копонуем данные из формы
		var formData = $(form).serialize(),
//			результат объявления - аякс запрос
			result = $.ajax({
//				тип
				type: 'POST',
//				куда передаём
				url: form.attr('action'),
				data: $(form).serialize(),
				beforeSend: function () {
//					до отправки меняем текст на кнопке
					$('#sended p').text('Отправляется');
				},
//				в случае успеха
				success: function (response, textStatus, jqXHR) {
					if (response === "success") {
//						очищаем поля формы
						formMessages.html('');
//						и скрываем ее за 3 секунды для гарантии делаем высоту 0, прозрачность 0
						form.velocity({
							duration: '3000',
							height: '0',
							opacity: '0'
						});
//						а потом и вовсе скрываем её
						setTimeout(function () {
							form.addClass('hide');
						}, 1500);
//						спасибочное сообщение в поле
						$('.question p').text('Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время');
					} else {
//						или показываем сообщение об ошибке, возвращённое из скрипта отправки
						result = response;
						setTimeout(function(){
//							меняем содержимое кнопки
							$('#sended p').text('Еще раз?');
//							пишем ошибку
							formMessages.html('<p class="ptBold red-text center">' + result + '</p>');
						}, 1000);
					}
				}
			});
	});
//	модальное окно
	$('.modal-trigger').leanModal({
		dismissible: true, // закрываем по нажатию за область модального окна
	  opacity: .4, // прозрачность фона
	  in_duration: 300, // длительность появления
	  out_duration: 200, // длительность скрытия
	  starting_top: '25px', // начальная высота, с которой показывается окно
	  ending_top: '200px' // конечная высота, на которой позиционируется окно
	});
//	форма для всплывающего окна
	//	объявляем форму
	var modForm = $('#modForm');
//	объявляем блок для сообщений об ошибках
	var modFormMessages = $('#modFormMessage');
	$(modForm).submit(function (e) {
//		запрет на прямое обращение к скрипту почты
		e.preventDefault();
//		копонуем данные из формы
		var modFormData = $(modForm).serialize(),
//			результат объявления - аякс запрос
			modResult = $.ajax({
//				тип
				type: 'POST',
//				куда передаём
				url: modForm.attr('action'),
				data: $(modForm).serialize(),
				beforeSend: function () {
//					до отправки меняем текст на кнопке
					$('#modSended p').text('Отправляется');
				},
//				в случае успеха
				success: function (response, textStatus, jqXHR) {
					if (response === "success") {
//						очищаем поля формы
						modFormMessages.html('');
//						и скрываем ее за 3 секунды для гарантии делаем высоту 0, прозрачность 0
						modForm.velocity({
							duration: '3000',
							height: '0',
							opacity: '0'
						});
//						а потом и вовсе скрываем её
						setTimeout(function () {
							modForm.addClass('hide');
						}, 500);
//						спасибочное сообщение в поле
						$('.modal-content .center').text('Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время');
//						закрываем теперь уже не нужное окно через 2 секунды
						setTimeout(function () {
							$('.modal').closeModal();
						}, 2000);
					} else {
//						или показываем сообщение об ошибке, возвращённое из скрипта отправки
						result = response;
						setTimeout(function(){
//							меняем содержимое кнопки
							$('#modSended p').text('Еще раз?');
//							пишем ошибку
							modFormMessages.html('<p class="ptBold red-text center">' + result + '</p>');
						}, 1000);
					}
				}
			});
	});
});
