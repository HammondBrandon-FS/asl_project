const isAuthenticated = (request, response, next) => {
    if (typeof request.session.access_token !== "undefined") {
        next();
        return;
    }
    response.redirect('/auth/login');
}

module.exports = {
    isAuthenticated
}