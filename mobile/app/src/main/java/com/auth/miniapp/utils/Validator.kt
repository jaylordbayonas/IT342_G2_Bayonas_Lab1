package com.auth.miniapp.utils

import android.util.Patterns

object Validator {
    
    fun isValidEmail(email: String): Boolean {
        return email.isNotEmpty() && Patterns.EMAIL_ADDRESS.matcher(email).matches()
    }
    
    fun isValidUsername(username: String): Boolean {
        return username.isNotEmpty() && username.length >= 3
    }
    
    fun isValidPassword(password: String): Boolean {
        return password.isNotEmpty() && password.length >= 6
    }
    
    fun doPasswordsMatch(password: String, confirmPassword: String): Boolean {
        return password == confirmPassword
    }
}
