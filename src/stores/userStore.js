import { ref } from 'vue'

const state = {
  email: ref(''),
  firstName: ref(''),
  lastName: ref(''),
  isAuthenticated: ref(false),
  initial_assessment_completed: ref(false)
}

export const userStore = {
  state,

  setUser(userData) {
    state.email.value = userData.email
    state.firstName.value = userData.first_name
    state.lastName.value = userData.last_name
    state.isAuthenticated.value = true
    state.initial_assessment_completed.value = Boolean(userData.initial_assessment_completed)
    
    console.log('User store updated:', {
      email: state.email.value,
      firstName: state.firstName.value,
      lastName: state.lastName.value,
      isAuthenticated: state.isAuthenticated.value,
      initial_assessment_completed: state.initial_assessment_completed.value
    })
  },

  clearUser() {
    state.email.value = ''
    state.firstName.value = ''
    state.lastName.value = ''
    state.isAuthenticated.value = false
    state.initial_assessment_completed.value = false
  },

  loadStoredUser() {
    const storedData = localStorage.getItem('user-data')
    if (storedData) {
      try {
        const userData = JSON.parse(storedData)
        this.setUser({
          ...userData,
          initial_assessment_completed: userData.initial_assessment_completed === true
        })
      } catch (error) {
        console.error('Error loading stored user data:', error)
        this.clearUser()
      }
    }
  }
}