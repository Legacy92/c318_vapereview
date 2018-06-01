const api = require('../controllers/juices');
const { requireAuth } = require('../services/passport');

module.exports = app => {
    // Browse button on landing page - returns all juices
    app.get("/api/multiple-results-browse", api.getAllJuices);

    //  Landing page search by query - allows for search by juice name, manufactuer name, flavor name or flavor category 
    app.get("/api/multiple-results", api.searchJuices);

    // Random juice button on landing page - gets single random juice 
    app.get("/api/random-juice", api.getRandomJuice);

    //Get Single Juice Results	
    app.get("/api/single-juice-info", api.getSingleJuice);

    //Get All Reviews for Single Juice
    app.get("/api/single-juice-reviews", api.getSingleJuiceReviews);

    // Flavor chart on single results page - gets flavor breakdown of each juice
    app.get("/api/flavor-chart", api.getFlavorChartData);

    //add product
    app.post('/api/add-product',  requireAuth, api.addJuice);

    //add review
    app.post('/api/add-review',  requireAuth, api.addReview);

    //Get Flavor Categories
    app.get('/api/category-modal', api.getFlavorCategories);

    //Get Flavors by category ID
    app.get("/api/flavor-modal", api.getFlavorsByCategoryId);
}
