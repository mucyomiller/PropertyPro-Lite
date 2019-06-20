let datas = window.datas = [{
        name: "House for Buy Kimironko",
        beds: 2,
        baths: 2,
        type: "Multi Family Home",
        price: "2,000,000",
        location: "Kicukiro",
        images: [
            'apartment1.jpg',
            'apartment2.jpg',
            'apartment1.jpg',
            'apartment2.jpg',
            'apartment5.jpg',
        ]
    },
    {
        name: "House for Buy Remera",
        beds: 3,
        baths: 1,
        type: "Single Family Home",
        price: "1,500,000",
        location: "Gasabo",
        images: [
            'apartment2.jpg',
            'apartment1.jpg',
            'apartment3.jpeg',
            'apartment4.jpeg',
        ]
    },
    {
        name: "House for Buy Kimironko",
        beds: 2,
        baths: 2,
        type: "Multi Family Home",
        price: "2,000,000",
        location: "Kicukiro",
        images: [
            'apartment6.jpeg',
            'apartment1.jpg',
            'apartment2.jpg',
            'apartment2.jpg',
            'apartment5.jpg',
        ]
    },
    {
        name: "House for Buy Kimironko",
        beds: 2,
        baths: 2,
        type: "Multi Family Home",
        price: "2,000,000",
        location: "Nyarugenge",
        images: [
            'apartment2.jpg',
            'apartment1.jpg',
            'apartment2.jpg',
            'apartment1.jpg',
            'apartment5.jpg',
        ]
    },
    {
        name: "House for Buy Remera",
        beds: 3,
        baths: 1,
        type: "Single Family Home",
        price: "1,500,000",
        location: "Nyarugenge",
        images: [
            'apartment5.jpeg',
            'apartment2.jpg',
            'apartment1.jpg',
            'apartment3.jpeg',
            'apartment4.jpeg',
        ]
    },
    {
        name: "House for Buy Kimironko",
        beds: 2,
        baths: 2,
        type: "Multi Family Home",
        price: "2,000,000",
        location: "Nyarugenge",
        images: [
            'apartment6.jpeg',
            'apartment3.jpeg',
            'apartment1.jpg',
            'apartment2.jpg',
            'apartment2.jpg',
            'apartment5.jpg',
        ]
    },
    {
        name: "House for Buy Kimironko",
        beds: 2,
        baths: 2,
        type: "Multi Family Home",
        price: "2,000,000",
        location: "Nyarugenge",
        images: [
            'apartment1.jpg',
            'apartment2.jpg',
            'apartment1.jpg',
            'apartment2.jpg',
            'apartment5.jpg',
        ]
    },
    {
        name: "House for Buy Remera",
        beds: 3,
        baths: 1,
        type: "Single Family Home",
        price: "1,500,000",
        desc: "",
        images: [
            'apartment2.jpg',
            'apartment1.jpg',
            'apartment3.jpeg',
            'apartment4.jpeg',
        ]
    },
    {
        name: "House for Buy Kimironko",
        beds: 2,
        baths: 2,
        type: "Multi Family Home",
        price: "2,000,000",
        location: "Nyarugenge",
        images: [
            'apartment5.jpeg',
            'apartment1.jpg',
            'apartment2.jpg',
            'apartment2.jpg',
            'apartment5.jpg',
        ]
    },
    {
        name: "House for Buy Kimironko",
        beds: 2,
        baths: 2,
        type: "Multi Family Home",
        price: "2,000,000",
        location: "Nyarugenge",
        images: [
            'apartment1.jpg',
            'apartment2.jpg',
            'apartment1.jpg',
            'apartment5.jpg',
        ]
    },
    {
        name: "House for Buy Remera",
        beds: 3,
        baths: 1,
        type: "Single Family Home",
        price: "1,500,000",
        location: "Nyarugenge",
        images: [
            'apartment5.jpeg',
            'apartment2.jpg',
            'apartment1.jpg',
            'apartment3.jpeg',
            'apartment4.jpeg',
        ]
    },
    {
        name: "House for Buy Kimironko",
        beds: 2,
        baths: 2,
        type: "Multi Family Home",
        price: "2,000,000",
        location: "Nyarugenge",
        images: [
            'apartment6.jpeg',
            'apartment3.jpeg',
            'apartment1.jpg',
            'apartment2.jpg',
            'apartment2.jpg',
            'apartment5.jpg',
        ]
    }
];

window.onload = () => {
    let property = '';
    for (let prop of datas) {
        property += `
                <div class="card">
                    <div class="featured">
                        <img src="asset/images/${prop.images[0]}" />
                    </div>
                    <div class="card-content">
                        <div class="card-item">
                            <label>Name: </label>${prop.name}
                        </div>
                        <div class="card-item">
                            <label>Location: </label>${prop.location}
                        </div>
                        <div class="card-item">
                            <label>Price: </label>${prop.price} RWF
                        </div>
                    </div>
                    <div class="card-action">
                        <a href="propertyDetails.html">View More</a>
                    </div>
                </div>
                `;
    }
    let main = document.querySelector('main');
    main.innerHTML = property;
}