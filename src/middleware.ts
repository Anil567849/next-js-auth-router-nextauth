// Middleware will run on every time we access any path

/*
// 1. Protect Whole App
// export { default } from "next-auth/middleware"
*/


/*
// 2. Protect only /about route 
export { default } from "next-auth/middleware"
export const config = { matcher: ["/about"] }
*/



// 3. using withAuth: we can access token here as well 
import { withAuth } from 'next-auth/middleware';
export default withAuth({
    callbacks: {

        // this function will run only for paths that mentioned in the matcher 
        // When we access matcher path this function will run 
        authorized: ({ token, req }) => {
            // console.log('token', token);
            // console.log('req', req.nextUrl.pathname);
            if (req.nextUrl.pathname.startsWith('/about')) {
                if(token == null){
                    return false; // it will redirect to auth page auto
                }
            }
            return true;
        },
    },
});

// only /about is protected
export const config = {
    matcher: ['/about'],
};