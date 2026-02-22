package com.auth.miniapp.api

import com.auth.miniapp.models.*
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    
    @POST("api/auth/register")
    suspend fun register(@Body request: RegisterRequest): Response<MessageResponse>
    
    @POST("api/auth/login")
    suspend fun login(@Body request: LoginRequest): Response<LoginResponse>
    
    @GET("api/user/me")
    suspend fun getCurrentUser(@Header("Authorization") token: String): Response<UserResponse>
}
