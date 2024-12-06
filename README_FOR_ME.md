The thing i learnt from this project:


1. Implemented passport.js for google authentication in which github login can also be easily added.

    Steps to make it work:

        1. needed packages passport-google-oauth20 passport-oauth passport express-session.
        
        2. initialize passport with passport.use() googleStrategy by passign the clientID, clientSecret and callbackurl with the function needed to be done with it.

        3. define google authenticate endpoint and googlecallback endpoint.

2. Use cors like this to allow the crediantials from the frontend

    app.use(cors({
        origin:"http://localhost:5173",
        credentials:true
    }));

3. thambi we did the entire authentication using passport js using the routes:
    api/v1/users/signinWithGoogle, api/v1/users/google/callback,/logout. 
    refer these routes and passport.js file when u further use passport.js