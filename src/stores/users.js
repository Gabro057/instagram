import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from "../supabase"

export const useUserStore = defineStore('users', () => {
  const user = ref(null)
  const errorMessage = ref("")
  const successMessage = ref("")
  const loading = ref(false)
  const loadingUser = ref(false)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async (credentials) => {
    const { email, password } = credentials

    if(!validateEmail(email)) {
      return errorMessage.value = "Email is invalid"
    }

    if(!password.length) return errorMessage.value = "Password cannot be empty"

    loading.value = true
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error) {
      loading.value = false
      return errorMessage.value = error.message
    }

    const { data: existingUser } = await supabase
    .from("users")
    .select()
    .eq('email', email)
    .single()

    console.log("existingUser", existingUser)
    user.value = {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username
    }

    successMessage.value = "Successfully Logged"
    errorMessage.value = ""
    loading.value = false
  } // handleLogin

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

  const handleLogout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }
  const getUser = async () => {
    loadingUser.value = true
    const { data } = await supabase.auth.getUser()
    console.log("getUser", data)

    if(!data?.user) {
      loadingUser.value = false
      return 
    }

    const { data: userWithEmail } = await supabase
      .from("users")
      .select()
      .eq("email", data.user.email)
      .single()

    user.value = {
      username: userWithEmail.username,
      email: userWithEmail.email,
      id: userWithEmail.id
    }

    loadingUser.value = false
  }
  const clearErrorMessage = () => errorMessage.value = ""
  const clearSuccessMessage = () => successMessage.value = ""

  return { user, loading, loadingUser, errorMessage, successMessage, handleLogin, handleSignup, handleLogout, getUser, clearErrorMessage, clearSuccessMessage }
})
