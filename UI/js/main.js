let data = [{
        id: 1,
        owner: 1,
        status: "available",
        price: "2,000,000",
        beds: 2,
        baths: 2,
        state: "Rwanda",
        city: "Kigali",
        address: "KN 1 ave",
        type: "Single Family Home",
        created_on: "2019-06-19T17:29:03+02:00",
        image_url: "apartment1.jpg",
        other_images: [
            'apartment1.jpg',
            'apartment2.jpg',
            'apartment5.jpeg',
            'apartment6.jpeg',
        ]
    },
    {
        id: 2,
        owner: 1,
        status: "available",
        price: "2,000,000",
        beds: 2,
        baths: 2,
        state: "Rwanda",
        city: "Kigali",
        address: "KN 1 ave",
        type: "Multi Family Home",
        created_on: "2019-06-19T17:29:03+02:00",
        image_url: "apartment2.jpg",
        other_images: [
            'apartment1.jpg',
            'apartment2.jpg',
            'apartment5.jpeg',
            'apartment6.jpeg',
        ]
    },
    {
        id: 3,
        owner: 1,
        status: "available",
        price: "10,000,000",
        beds: 15,
        baths: 5,
        state: "Rwanda",
        city: "Kigali",
        address: "KN 1 ave",
        type: "Villa",
        created_on: "2019-06-19T17:29:03+02:00",
        image_url: "apartment5.jpeg",
        other_images: [
            'apartment1.jpg',
            'apartment2.jpg',
            'apartment5.jpeg',
            'apartment6.jpeg',
        ]
    }
];

//duplicate my datas to sumulate my properties
let dup = (arr, n) => Array(n).fill([...arr]).reduce((a, b) => a.concat(b));
let datas = window.datas = dup(data, 3);

window.onload = () => {
    let property = '';
    for (let prop of datas) {
        property += `
                <div class="card">
                    <div class="featured" onclick="window.location='html/propertyDetails.html'">
                        <img src="asset/images/${prop.image_url}" alt="property image"/>
                    </div>
                    <div class="card-content">
                        <div class="card-item">
                            <label>Title: </label> House for Sell In ${prop.city}
                        </div>
                        <div class="card-item">
                            <label>Address: </label>${prop.address}
                        </div>
                        <div class="card-item">
                            <label>Price: </label>${prop.price} RWF
                        </div>
                    </div>
                    <div class="card-action">
                        <a href="html/propertyDetails.html">View More</a>
                    </div>
                </div>
                `;
    }
    let main = document.querySelector('.homepage-main');
    if (main) {
        main.innerHTML = property;
    }

    // carousel code
    _carousel_index = 1
    carousel = (n) => {
        //reset index if n != _carousel_index
        if (n != _carousel_index) {
            _carousel_index = n;
        }
        //NodeList of img
        img = document.querySelectorAll('.carousel-img');
        thumbnails = document.querySelectorAll('.carousel-thumbnail-img');
        if (n > img.length) {
            _carousel_index = 1;
        }
        if (n <= 0) {
            _carousel_index = img.length;
        }
        //reset to zero already showed img
        img.forEach(element => {
            element.style.display = "none";
        });
        thumbnails.forEach(el => {
            el.classList.remove('selected');
        });

        if (typeof img[_carousel_index - 1] != "undefined" && img[_carousel_index - 1].style.display != "block") {
            img[_carousel_index - 1].style.display = "block";
            if (typeof thumbnails[_carousel_index - 1] != "undefined") {
                thumbnails[_carousel_index - 1].classList.add('selected');
            }
        }

    }
    //initial call
    carousel(_carousel_index);
    nextCarousel = () => carousel(++_carousel_index)
    prevCarousel = () => carousel(--_carousel_index)

}