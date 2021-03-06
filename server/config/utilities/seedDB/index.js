const express = require('express');
const mongoose = require('mongoose');

// IMPORT VARIABLES
// import campground model
const Campground = require('../../../models/campground');
// import campground model
const Review = require('../../../models/review');
// import cities
const cities = require('./cities');
// import cities
const { places, descriptors } = require('./seedHelpers');


// receive and array and select a random item from the array
const sample = array => array[Math.floor(Math.random() * array.length)];

module.exports.seedDB = async () => {

    await Campground.deleteMany({})
    .then(console.log('All Campgrounds DELETED'));

    await Review.deleteMany({})
    .then(console.log('All Reviews DELETED'));


    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const campground = new Campground({
            author: '5fdf856a3b87693135468b05',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, possimus! Deleniti corrupti aspernatur eum id blanditiis eius odio magni dolores esse vel exercitationem expedita, ad ipsam tempora. Eius, laborum expedita.',
            price: Math.floor(Math.random() * 20) + 10,
            geometry: { coordinates: [ cities[random1000].longitude, cities[random1000].latitude ], type: 'Point' },
            images: [
                {
                    url: 'https://res.cloudinary.com/dnulc0cuy/image/upload/v1609981757/YELPCAMP/big-one_ynu8dx.jpg',
                    filename: 'YELPCAMP/mlkharlgofxsbowzxoet'
                },
                {
                    url: 'https://res.cloudinary.com/dnulc0cuy/image/upload/v1609981755/YELPCAMP/lighting_yakmjs.jpg',
                    filename: 'YELPCAMP/gdlmdjsz83r1f9exxk5r'
                }
            ]
        })
        await campground.save()
        .then(console.log(`Campground #${i+1}: {${campground.location}} {${campground.title}} - saved.`));
    }
};