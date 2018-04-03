import axios from 'axios'
import config from "jsconfig.json"


export const updateUserData = async (displayName, space, language) => {
  const { data } = await axios({
    method : "POST",
    url : config.serverURL+"/user/getUserData",
    data : {displayName, space, language}
  })
  console.log(data)
  return data
}