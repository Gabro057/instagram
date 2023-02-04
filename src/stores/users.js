import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from "../supabase"

export const useUserStore = defineStore('users', () => {
  const user = ref(null)
  const errorMessage = ref("")
  const successMessage = ref("")
  const loading = ref(false)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = () => {}
  const handleSignup = async (credential) => {
    const { email, password, username } = credential
    
    if(password.length < 6){
      return errorMessage.value = "Password length is too short"
    }
    
    if(username.length < 4){
      return errorMessage.value = "Username length is too short"
    }

    if(!validateEmail(email)) {
      return errorMessage.value = "Email is invalid"
    }
    
    loading.value = true
    // validate if user exists
    const { data: userWithUsername } = await supabase
    .from("users")
    .select()
    .eq('username', username)
    .single()
    
    if(userWithUsername) {
      loading.value = false
      return errorMessage.value = "User alredy registered"
    }
    
    errorMessage.value = ""
    successMessage.value = ""

    // signup user to supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if(error) {
      loading.value = false
      return errorMessage.value = error.message
    }

    await supabase.from("users").insert({
      username,
      email
    })

    const { data: newUser } = await supabase
    .from("users")
    .select()
    .eq('email', email)
    .single()

    console.log("newUser", newUser)
    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }

    successMessage.value = "Successfully Saved"
    loading.value = false
  } // handleSignup
  const handleLogout = () => {}
  const getUser = () => {}
  const clearErrorMessage = () => errorMessage.value = ""
  const clearSuccessMessage = () => successMessage.value = ""

  return { user, loading, errorMessage, successMessage, handleLogin, handleSignup, handleLogout, getUser, clearErrorMessage }
})
