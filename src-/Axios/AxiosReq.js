import axios from "axios";
let config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',

    },
}
//https://host.generate-nft.xyz/
export const getBasicDetails = () => {
    return axios.post('http://127.0.0.1:8000/getbasicdetails', {}, config)
}
export const createNewProject = async(projectdata) => {
    return axios.post('http://127.0.0.1:8000/create-new-project', { projectdata }, config)
        .then(res => {
            return res
            //setgenerationProgress( (previousestate)=>({...previousestate, current: previousestate.current + 1 }) );
        })
        .catch(err => {
            return err
            //setfailedImages(prevArray => [...prevArray, fd]);
            console.log(err)
        })
}

export const uploadImages = async(fd, images) => {
    return axios.post('http://127.0.0.1:8000/upload-images', fd, {
        headers: {
            'content-type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        }
    }).then(res => {
        return res
        //setgenerationProgress( (previousestate)=>({...previousestate, current: previousestate.current + 1 }) );
    })
        .catch(err => {
            return err
            //setfailedImages(prevArray => [...prevArray, fd]);
            console.log(err)
        })
}


export const addEmailToList = (emailaddress) => {
    return axios.post('http://127.0.0.1:8000/addEmailToList', {emailaddress}, config)
}