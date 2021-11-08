import axios from "axios";

export default axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params:{
        api_key: "2c31c2c139e971adf0adb8f0288258ae"
    }
});