const express = require('express');

// import campground model
const Campground = require('../models/campground');
// import review model
const Review = require('../models/review');
// import error handler
const { asyncErrorWrapper } = require('../config/utilities/errorHandler');


// CAMPGROUNDS CONTROLLERS
module.exports = {

    // POST reviews
    addReview: asyncErrorWrapper (async (req, res) => {
        const { ...formInput } = req.body;
        const campground = await Campground.findById(req.params.id);
        const newReview = new Review({ review: formInput.review, rating: formInput.rating });
        campground.reviews.push(newReview);
        await newReview.save();
        await campground.save();
        req.flash('success_msg', 'Review added!');
        res.redirect(`/campgrounds/${campground._id}`);
    }),

    // POST delete single review
    deleteReview: asyncErrorWrapper(async (req, res) => {
        const { id, reviewId } = req.params;
        await Campground.findByIdAndUpdate(id, { $pull: {reviews: reviewId } }); // using mongo query to delete an element from an array 
        await Review.findByIdAndDelete(reviewId);
        req.flash('success_msg', 'Review deleted!');
        res.redirect(`/campgrounds/${id}`)
    })
}