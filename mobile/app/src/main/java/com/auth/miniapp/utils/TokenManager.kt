package com.auth.miniapp.utils

import android.content.Context
import android.content.SharedPreferences

class TokenManager(context: Context) {
    
    private val prefs: SharedPreferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    
    companion object {
        private const val PREFS_NAME = "auth_prefs"
        private const val KEY_TOKEN = "jwt_token"
        private const val KEY_USER_ID = "user_id"
        private const val KEY_USERNAME = "username"
        private const val KEY_EMAIL = "email"
    }
    
    fun saveToken(token: String) {
        prefs.edit().putString(KEY_TOKEN, token).apply()
    }
    
    fun getToken(): String? {
        return prefs.getString(KEY_TOKEN, null)
    }
    
    fun saveUserInfo(userId: Long, username: String, email: String) {
        prefs.edit().apply {
            putLong(KEY_USER_ID, userId)
            putString(KEY_USERNAME, username)
            putString(KEY_EMAIL, email)
            apply()
        }
    }
    
    fun getUserId(): Long {
        return prefs.getLong(KEY_USER_ID, -1)
    }
    
    fun getUsername(): String? {
        return prefs.getString(KEY_USERNAME, null)
    }
    
    fun getEmail(): String? {
        return prefs.getString(KEY_EMAIL, null)
    }
    
    fun clearAll() {
        prefs.edit().clear().apply()
    }
    
    fun isLoggedIn(): Boolean {
        return getToken() != null
    }
    
    fun getAuthToken(): String? {
        val token = getToken()
        return if (token != null) "Bearer $token" else null
    }
}
