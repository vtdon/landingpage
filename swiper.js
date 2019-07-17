
var mySwiper = document.querySelector('.swiper-container').swiper;

var xhr = new XMLHttpRequest();
var products = null;

function addSlide( elementImagepath, elementName, elementPrice ) {

    mySwiper.appendSlide(
        '<div class="swiper-slide">' 
            + '<object type="image/png" data="'+ elementImagepath + '" style="height: 20px;"></object>' + 
            + '<div>'+ elementName + '</div>' + 
            + '<div>'+ elementPrice + '</div>' + 
        '</div>'
    );

}

xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {

        var jsonResponse = JSON.parse(xhr.responseText)
        products = jsonResponse.articles;
        console.log(products)

        var imagePath = "";
        var element;

        for (var i = products.length-1; i >= 0; i--) {

            element = products[i];

            imagePath = "https://image.spreadshirtmedia.com/image-server/v1/mp/products/" 
                        + element.imageId 
                        + "/views/1,width=378,height=378";
                        //+ "/views/1,width=378,height=378,appearanceId=366,backgroundColor=F2F2F2";
        
            console.log("NAME: ", element.name);
            console.log("PRICE: ", element.price.toString())

            mySwiper.appendSlide(
                '<div class="swiper-slide">' 
                    + '<div><object type="image/png" data="' + imagePath + '" style="height: 200px;"></object></div>' 
                    + '<div>'+ element.name + '</div>' 
                    + '<div class="price">$'+ element.price.toString() + '</div>' 
                + '</div>'
            );
            
        };

	} else {
		console.log('Loading of products data failed!');
	}
}

xhr.open('GET', 'https://www.spreadshirt.com/shopData/list?query=K118614&locale=us_US');

xhr.send();


