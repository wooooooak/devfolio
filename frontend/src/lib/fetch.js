import config from "jsconfig.json"
import axios from "axios"

export const getUserDataByDisplayName = async (displayName) => {
  const { data } = await axios({
    method: "GET",
    url : config.serverURL+"/user/getUserData",
    params: {
     displayName: displayName
    },
    responseType: 'json'
  })
  console.log(data)
  return data
} 