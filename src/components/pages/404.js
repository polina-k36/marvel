import { Helmet } from "react-helmet";

import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"

function Page404() {
    return (
        <div>
            <Helmet>
                <title>Page doesn't exist</title>
                <meta
                    name="description"
                    content="Error page"
                    />
            </Helmet>
            <ErrorMessage/>
            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '24px'}}>Page doesn't exist</p>
            <Link to='/' style={{display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '24px', marginTop: '300px'}}>Back to main page</Link>
        </div>
    )
}
export default Page404;