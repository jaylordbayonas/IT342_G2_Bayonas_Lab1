package com.auth.miniapp.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.auth.miniapp.api.RetrofitClient
import com.auth.miniapp.databinding.ActivityDashboardBinding
import com.auth.miniapp.utils.TokenManager
import kotlinx.coroutines.launch

class DashboardActivity : AppCompatActivity() {

    private lateinit var binding: ActivityDashboardBinding
    private lateinit var tokenManager: TokenManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDashboardBinding.inflate(layoutInflater)
        setContentView(binding.root)

        tokenManager = TokenManager(this)

        // Check if user is logged in
        if (!tokenManager.isLoggedIn()) {
            navigateToLogin()
            return
        }

        setupToolbar()
        loadUserData()
        setupClickListeners()
    }

    private fun setupToolbar() {
        setSupportActionBar(binding.toolbar)
    }

    private fun setupClickListeners() {
        binding.logoutButton.setOnClickListener {
            handleLogout()
        }
    }

    private fun loadUserData() {
        showLoading(true)

        // Try to display cached user data first
        displayCachedUserData()

        // Then fetch fresh data from server
        val token = tokenManager.getAuthToken()

        if (token == null) {
            showLoading(false)
            Toast.makeText(this, "Authentication token not found", Toast.LENGTH_SHORT).show()
            navigateToLogin()
            return
        }

        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.getCurrentUser(token)

                if (response.isSuccessful && response.body() != null) {
                    val user = response.body()!!
                    
                    // Update stored user info
                    tokenManager.saveUserInfo(user.id, user.username, user.email)
                    
                    // Display user data
                    displayUserData(user.id, user.username, user.email)
                    showLoading(false)
                } else {
                    showLoading(false)
                    Toast.makeText(this@DashboardActivity, "Failed to load user data", Toast.LENGTH_SHORT).show()
                    
                    // If token is invalid, logout
                    if (response.code() == 401 || response.code() == 403) {
                        handleLogout()
                    }
                }
            } catch (e: Exception) {
                showLoading(false)
                Toast.makeText(
                    this@DashboardActivity,
                    "Error: ${e.message ?: "Network error"}",
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }

    private fun displayCachedUserData() {
        val userId = tokenManager.getUserId()
        val username = tokenManager.getUsername()
        val email = tokenManager.getEmail()

        if (userId != -1L && username != null && email != null) {
            displayUserData(userId, username, email)
        }
    }

    private fun displayUserData(userId: Long, username: String, email: String) {
        binding.userIdText.text = userId.toString()
        binding.usernameText.text = username
        binding.emailText.text = email
    }

    private fun handleLogout() {
        tokenManager.clearAll()
        Toast.makeText(this, "Logged out successfully", Toast.LENGTH_SHORT).show()
        navigateToLogin()
    }

    private fun showLoading(show: Boolean) {
        binding.progressBar.visibility = if (show) View.VISIBLE else View.GONE
    }

    private fun navigateToLogin() {
        startActivity(Intent(this, LoginActivity::class.java))
        finish()
    }
}
