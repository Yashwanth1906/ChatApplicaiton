The thing i learnt from this project:


1. Implemented passport.js for google authentication in which github login can also be easily added.

    Steps to make it work:

        1. needed packages passport-google-oauth20 passport-oauth passport express-session.
        
        2. initialize passport with passport.use() googleStrategy by passign the clientID, clientSecret and callbackurl with the function needed to be done with it.

        3. define google authenticate endpoint and googlecallback endpoint.
