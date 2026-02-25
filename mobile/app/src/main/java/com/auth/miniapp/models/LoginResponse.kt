package com.auth.miniapp.models

data class LoginResponse(
    val token: String,
    val username: String,
    val email: String
)
