import axios from 'axios';
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../utils';
export type ContentItem ={
    title : string,
    link :string,
    type : "youtube"|"twitter"
}
const useContent = () => {
    const [contents, setContents] = useState<ContentItem[]>([]);
    useEffect(() => {
        try {
            async function fetchData() {
                const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
                setContents(response.data.content)
            }
            fetchData()
        } catch (error) {
            alert("error")
        }
    }, [])
    return {contents}
}

export default useContent