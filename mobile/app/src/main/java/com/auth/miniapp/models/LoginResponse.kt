package com.auth.miniapp.models

data class LoginResponse(
    val token: String,
    val user: User
)
