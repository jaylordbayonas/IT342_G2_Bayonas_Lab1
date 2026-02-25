package com.auth.miniapp.models

import com.google.gson.annotations.SerializedName

data class UserResponse(
    val id: Long,
    val username: String,
    val email: String,
    @SerializedName("createdAt")
    val createdAt: String? = null  // Optional field, backend sends this but we don't need to use it
)
