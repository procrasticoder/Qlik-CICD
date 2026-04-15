Centralized Axios

Steps to follow:
1. Import api object 
`
import api from "../api/axiosInstance"
`

2. This api object has already 
    - Base Path
    - Headers

3. Use api object like
`
const response = api.METHOD("/leading-url", body);
`

4. ** If you are using GET request then it is the default Axios method no need to write api.GET()
`api.get("leading-url")`