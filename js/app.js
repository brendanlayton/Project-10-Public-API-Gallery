// Variables

var $overlay = $('<div id="overlay"></div>');
var $image = $('<img class="lb-image">');
var $albumName = $('<h4></h4>');
var $albumType = $('<h5></h5>');
var $albumMarkets = $('<h6></h6>');
var $bookName = $('<h4></h4>');
var $bookEditions = $('<h6></h6>');
var $arrowLeft = $('<a class="arrow previous" href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>');
var $arrowRight = $('<a class="arrow next" href="#"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>');
var $searchField = $('#coverSearch');
var $searchButton = $('.btn-search');


// Add overlay elements
    
$('body').append($overlay);
$overlay.append($image);
$overlay.append($albumName);
$overlay.append($albumType);
$overlay.append($albumMarkets);
$overlay.append($bookName);
$overlay.append($bookEditions);
$overlay.append($arrowLeft);
$overlay.append($arrowRight);	


// General Functions

// Search box placeholder text

//$( 'input[name="search_covers"]' ).click(function() {
//	if ( $('[value="search_artist"]').is(':checked') ) {
//		$('#coverSearch').attr("placeholder", "Enter artist or band name");
//		} else {
//			$('#coverSearch').attr("placeholder", "Enter author's name");
//		}
//});


// Book and Album Sorter

$( '#bookSort' ).change(function() {
var covers = $('.covers-list');
var	coversLi = covers.children('li');
  coversLi.sort(function(a,b) {
		var an = a.getAttribute('data-name');
		var bn = b.getAttribute('data-name');

		if (an > bn) {
			return 1;
		}
		if (an < bn) {
			return -1;
		}
		return 0;
	});
	coversLi.detach().appendTo(covers);
});

// Scroll up function when thumbnails are clicked

function goToTop() {
	$('html, body').animate({ scrollTop: 0 }, 'slow');
	return false;
}


//Close overlay

$overlay.click(function(event) {

	// exclude clicks on arrows and other elements

	if(event.target.id === 'overlay') {	
		$(this).hide(); // close overlay
	}

});


// Album and Book API Function

$('.form-search').submit(function (evt) {
  evt.preventDefault();
	//var albumHTML = "";
	var bookHTML = "";

	
	// Search input and button loading behaviour
	
	$searchField.prop('disabled', true);
	$searchButton.attr('disabled', true).text('Searching...');

	
	// ======================================================
	// Artsit or Band Search
	// ======================================================
	
	
//	if ($('input[value="search_artist"]').is(':checked')) {
//		var query = $searchField.val();
//		var url = 'https://api.spotify.com/v1/search';
//		var spotifyData = {
//				q: query,
//				type: 'album' 
//		};
//
//		// Callback function
//		
//		function getAlbumCovers(data) {
//			albumHTML += '<ul class="covers-list">';
//			
//			// Check if search query matches data in JSON file, if not return an error
//			
//			if (data.albums.items.length > 0 ) { // query matches items in JSON data
//				
//				// Loop throught JSON Object
//				$.each( data.albums.items, function(i, album) {
//					albumHTML += '<li class="cover album"'  + 'data-name="' + album.name + '">';
//					albumHTML += '<img src="' + album.images[0].url + '">';
//					albumHTML += '<h4 class="album-name">' + album.name + '</h4>';
//					albumHTML += '<h5 class="album-type">' + album.album_type + '</h5>';
//					albumHTML += '<h6 class="markets">' + 'Available in ' + album.available_markets.length + ' countries' + '</h6>';
//					albumHTML += '</li>';
//				}); 
//				
//				albumHTML += '</ul>';
//				bookHTML += "";
//			
//				// Display elements appropriate to successful search
//			
//				$('.errors').hide();
//				$('.form-sort').show();
//				$('#albumSort').show().val('choose');
//				$('#bookSort').hide();
//				$('.instructions').show();
//				$('#albumCovers').show().html(albumHTML);
//				$('#bookCovers').html(bookHTML);
//				$('.footer-text').hide();
//				$searchField.val("").prop('disabled', false);
//				$searchButton.attr('disabled', false).text('Search');
//				
//			} else { // query doesn no match items in JSON data
//				
//				// Display elements appropriate to unsuccessful search
//				
//				var errorHTML = '<p>';
//				errorHTML += 'No artist or band by that name was found.';
//				errorHTML += ' Check the spelling is correct before trying again.';
//				$('.errors').html(errorHTML);
//				$('.errors').show();
//				$('.form-sort').hide();
//				$('.instructions').hide();
//				$('#albumCovers, #bookCovers').hide();
//				$('.footer-text').show();
//				$searchField.prop('disabled', false);
//				$searchButton.attr('disabled', false).text('Search');
//			}
//			
//			
//			// Gallery Navigation Functionality
//
//			var $index = 0;
//			var $galleryLengthMax = $('.covers-list li').length - 1;
//
//			// 1. Content update function
//
//			function updateContent($coverLocation, $albumNameText, $albumTypeText, $ablumMarketsText) {
//				$overlay.show();
//				$('a.arrow').show();
//				$albumName.text($albumNameText).show();
//				$albumType.text($albumTypeText).show();
//				$albumMarkets.text($ablumMarketsText).show();
//				$bookName.hide();
//				$bookEditions.hide();
//				$image.attr('src', $coverLocation);
//				$('#overlay img').show();
//			}
//
//			// 2. Show overlay on image thumbnail click
//
//			$('.cover img').click(function(evt) { 
//				evt.preventDefault();
//				$overlay.addClass('ol-albums').removeClass('ol-books');
//				var $coverLocation = $(this).attr('src');
//				var $albumName = $(this).next().text();
//				var $albumType = $(this).next().next().text();
//				var $albumMarkets = $(this).next().next().next().text();
//
//				// Update index
//				//$index = $(this).parent().parent().index();
//				$index = $(this).parent().index();
//
//				// Update album content
//				updateContent($coverLocation, $albumName, $albumType, $albumMarkets);
//
//				// Scroll to the top of the page
//				goToTop();
//
//			});
//
//			// 3. Function to update the $index variable and use it to retrieve new content
//
//			function prevNext(prev) {
//				// The above sets prev to true
//
//				// if prev not true add 1 to $index, i.e. move forward, else take one away from $index, i.e. move backwards
//
//				if (!prev) {
//					++$index; // increase the $index variable by one
//				} else {
//					--$index; // decrease the $index variable by one 
//				}
//
//				// Reset the value of $index if its value moves outside the index range. 
//				// The variable $galleryLengthMax is used to accommodate the varying length of the galleries.
//
//				if ($index < 0) {
//					$index = $galleryLengthMax;
//				} 
//				if ($index > $galleryLengthMax) {
//					$index = 0;
//				}
//
//				// Get the new cover using the index variable to locate it
//				var $newCover = $('.covers-list li').get($index).getElementsByTagName('img');
//
//				// Get the src url of the new cover
//				var $coverLocation = $($newCover).attr('src');
//
//				// Get new cover details
//				var $albumName = $($newCover).next().text();
//				var $albumType = $($newCover).next().next().text();
//				var $albumMarkets = $($newCover).next().next().next().text();
//
//				//Update content
//
//				updateContent($coverLocation, $albumName, $albumType, $albumMarkets);
//
//			}
//
//			// 4. Add click events to arrows using the prevNext function
//
//			$('i.fa.fa-chevron-left').click(function(event) {
//				prevNext(true);
//			});
//			$('i.fa.fa-chevron-right').click(function(event) {
//				prevNext(); 
//			});
//
//
//			// 5. Add the ability to navigate with left and right keys on keyboard
//
//			$('body').keydown(function(event) {
//
//				// makes sure keyboard navigation only works when overlay is open
//
//				if(event.keyCode === 37 && $('#overlay').css('display') === 'block') { // left
//					prevNext(true);
//				} else if (event.keyCode === 39 && $('#overlay').css('display') === 'block') { // right
//					prevNext();
//				}
//
//			});
//
//		}// End callback function
//		
//		// Get JSON File
//		$.getJSON(url, spotifyData, getAlbumCovers);
	
		
	// ======================================================
	// Author Search
	// ======================================================
		
//	} else if ( $('input[value="search_author"]').is(':checked') ) {
		
		var authorSearch = $searchField.val();
		var size = '-L';
		var bookURL = 'http://openlibrary.org/search.json?author=' + authorSearch;

		// Callback function
	
		function getBookCovers(data) {
			albumHTML += "";
			bookHTML += '<ul class="covers-list">';

			// Check if search query matches data in JSON file, if not return an error
			
			if ( data.docs.length > 0 ) { // query matches items in JSON data
				
				// Loop throught JSON Object
				$.each( data.docs, function(i, cover) {
					bookHTML += '<li class="cover book"' + 'data-name="' + cover.title_suggest + '">';
					bookHTML += '<img src="' + 'http://covers.openlibrary.org/b/id/' + cover.cover_i + size + '.jpg' + '">';
					bookHTML += '<h4 class="book-name">' + cover.title_suggest + ' (' + cover.first_publish_year + ')' + '</h4>';
					bookHTML += '<h6 class="book-language">' +  'This book is on its ' + cover.edition_count; 

					// Append different text depending on edition number
					if ( cover.edition_count === 1 ) {
						bookHTML += 'st';
					} else if ( cover.edition_count === 2 ) {
						bookHTML += 'nd';
					} else if ( cover.edition_count === 3 ) {
						bookHTML += 'rd';
					} else {
						bookHTML += 'th';
					}
					bookHTML += ' edition' + '</h6>';
					bookHTML += '</li>';
				});
			
				bookHTML += '</ul>';
				albumHTML += "";
				
			// Display elements appropriate to successful search
				
				$('.errors').hide();
				$('.form-sort').show();
				$('#bookSort').show().val('choose');
				$('#albumSort').hide();
				$('.instructions').show();
				$('#bookCovers').show().html(bookHTML);
				$('#albumCovers').html(albumHTML);
				$('.footer-text').hide();
				$searchField.val("").prop('disabled', false);
				$searchButton.attr('disabled', false).text('Search');
				
			} else { // query doesn no match items in JSON data
				
				// Display elements appropriate to unsuccessful search
				
				var errorHTML = '<p>';
				errorHTML += 'No author by that name was found.';
				errorHTML += ' Check the spelling is correct before trying again.';
				$('.errors').html(errorHTML);
				$('.errors').show();
				$('.form-sort').hide();
				$('.instructions').hide();
				$('#bookCovers, #albumCovers').hide();
				$('.footer-text').show();
				$searchField.prop('disabled', false);
				$searchButton.attr('disabled', false).text('Search');
			}

		
			// Gallery Navigation Functionality
			
			var $index = 0;
			var $galleryLengthMax = $('.covers-list li').length - 1;

			// 1. Media update function
			
			function updateContent($coverLocation, $bookNameText, $bookEditionsText) {
				$overlay.show();
				$('a.arrow').show();
				$bookName.text($bookNameText).show();
				$bookEditions.text($bookEditionsText).show();
				$albumName.hide();
				$albumType.hide();
				$albumMarkets.hide();
				$image.attr('src', $coverLocation);
				$('#overlay img').show();
			}


			// 2. Show overlay on image thumbnail click
			
			$('.cover img').click(function(evt) { 
				evt.preventDefault();
				$overlay.addClass('ol-books').removeClass('ol-albums');
				var $coverLocation = $(this).attr('src');
				var $bookName = $(this).next().text();
				var $bookEditions = $(this).next().next().text();

				// Update index
				//$index = $(this).parent().parent().index();
				$index = $(this).parent().index();

				// Update book content
				updateContent($coverLocation, $bookName, $bookEditions);

				// Scroll to the top of the page on image click	
				goToTop();

			});

			// 3. Function to update the $index variable and use it to retrieve new content

			function prevNext(prev) {
				// The above sets prev to true

				// if prev not true add 1 to $index, i.e. move forward, else take one away from $index, i.e. move backwards

				if (!prev) {
					++$index; // increase the $index variable by one
				} else {
					--$index; // decrease the $index variable by one 
				}

				// Reset the value of $index if its value moves outside the index range. 
				// The variable $galleryLengthMax is used to accommodate the varying length of the galleries.

				if ($index < 0) {
					$index = $galleryLengthMax;
				} 
				if ($index > $galleryLengthMax) {
					$index = 0;
				}

				// Get the new cover using the index variable to locate it
				var $newCover = $('.covers-list li').get($index).getElementsByTagName('img');
				
				// Get new cover src url
				var $coverLocation = $($newCover).attr('src');

				// Get new cover details
				var $bookName = $($newCover).next().text();
				var $bookEditions = $($newCover).next().next().text();

				// Update cover details
				updateContent($coverLocation, $bookName, $bookEditions);

			}

			// 4. Add click events to arrows using the prevNext function

			$('i.fa.fa-chevron-left').click(function(event) {
				prevNext(true);
			});
			$('i.fa.fa-chevron-right').click(function(event) {
				prevNext(); 
			});


			// 5. Add the ability to navigate with left and right keys on keyboard

			$('body').keydown(function(event) {

				// makes sure keyboard navigation only works when overlay is open

				if(event.keyCode === 37 && $('#overlay').css('display') === 'block') { // left
					prevNext(true);
				} else if (event.keyCode === 39 && $('#overlay').css('display') === 'block') { // right
					prevNext();
				}

			});
		} // End callback function
		
		// Get JSON File
		$.getJSON(bookURL, getBookCovers);
	//} 
});	// End Album & Book API Function