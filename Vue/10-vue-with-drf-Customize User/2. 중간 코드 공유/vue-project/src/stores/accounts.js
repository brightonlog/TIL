import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useAccountStore = defineStore('account', () => {
  const API_URL = 'http://127.0.0.1:8000'
  const token = ref(null)

  const router = useRouter()

  // 회원가입
  const signUp = function (payload) {
    const username = payload.username
    const password1 = payload.password1
    const password2 = payload.password2
    axios({
      method: 'post',
      url: `${API_URL}/accounts/signup/`,
      data: {
        username: username,
        password1: password1,
        password2: password2,
      }
    })
      .then((res) => {
        console.log('회원가입 완료')
      })
      .catch((err) => {
        console.log(err.response.data)
      })

  }
  
  //로그인

  const logIn = function(payload){
    const username = payload.username
    const password = payload.password
    // 만약 구조분해 할당으로 했다면
    // const {username, password } = payload

    axios ({
      method : 'post',
      url : `${API_URL}/accounts/login/`,
      data : {
        username, password
      }
    })

    .then(res => {
      console.log(res.data)
      token.value = res.data.key 
    })
    .catch(err => console.log(err))
  }
  return { signUp, logIn, token }
}, { persist: true })