// action type(명령어)
const REDIRECTHOME_TRUE = 'REDIRECT_TRUE'
const REDIRECTHOME_FALSE = 'REDIRECTHOME_FALSE'

const redirect_true = () => {
  return {
    type : REDIRECTHOME_TRUE,
    payload: {
      redirectHome : true
    }
  }
}
const redirect_false = () => {
  return {
    type : REDIRECTHOME_FALSE,
    payload: {
      redirectHome : false
    }
  }
}

export { 
  REDIRECTHOME_TRUE,
  redirect_true,
  REDIRECTHOME_FALSE,
  redirect_false
}