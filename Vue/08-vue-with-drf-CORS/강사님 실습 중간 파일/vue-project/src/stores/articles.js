// store/articles.js

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import axios from 'axios'

export const useArticleStore = defineStore('article', () => {
  
  // === state 영역 ====

  const articles = ref([])
  const API_URL = 'http://127.0.0.1:8000'

  // === action 영역 ===
  
  
  
  
  
  return { }
}, { persist: true })
