package com.auth.miniapp.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.auth.miniapp.R
import com.auth.miniapp.api.RetrofitClient
import com.auth.miniapp.databinding.ActivityLoginBinding
import com.auth.miniapp.models.LoginRequest
import com.auth.miniapp.utils.TokenManager
import com.auth.miniapp.utils.Validator
import kotlinx.coroutines.launch

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private lateinit var tokenManager: TokenManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        tokenManager = TokenManager(this)

        // Check if user is already logged in
        if (tokenManager.isLoggedIn()) {
            navigateToDashboard()
            return
        }

        setupClickListeners()
    }

    private fun setupClickListeners() {
        binding.loginButton.setOnClickListener {
            handleLogin()
        }

        binding.registerLink.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
    }

    private fun handleLogin() {
        val username = binding.usernameInput.text.toString().trim()
        val password = binding.passwordInput.text.toString().trim()

        // Clear previous errors
        binding.usernameLayout.error = null
        binding.passwordLayout.error = null

        // Validate inputs
        if (!Validator.isValidUsername(username)) {
            binding.usernameLayout.error = getString(R.string.error_username_required)
            return
        }

        if (!Validator.isValidPassword(password)) {
            binding.passwordLayout.error = getString(R.string.error_password_required)
            return
        }

        performLogin(username, password)
    }

    private fun performLogin(username: String, password: String) {
        showLoading(true)

        val loginRequest = LoginRequest(username, password)

        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.login(loginRequest)

                if (response.isSuccessful && response.body() != null) {
                    val loginResponse = response.body()!!
                    
                    // Save token and user info
                    tokenManager.saveToken(loginResponse.token)
                    // Note: Backend doesn't return user ID in login response, will be fetched from /me endpoint
                    tokenManager.saveUserInfo(
                        -1L, // ID will be updated when dashboard loads
                        loginResponse.username,
                        loginResponse.email
                    )

                    showLoading(false)
                    Toast.makeText(this@LoginActivity, "Login successful!", Toast.LENGTH_SHORT).show()
                    navigateToDashboard()
                } else {
                    showLoading(false)
                    val errorMessage = response.errorBody()?.string() ?: "Login failed"
                    Toast.makeText(this@LoginActivity, errorMessage, Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                showLoading(false)
                Toast.makeText(
                    this@LoginActivity,
                    "Error: ${e.message ?: "Network error"}",
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }

    private fun showLoading(show: Boolean) {
        binding.progressBar.visibility = if (show) View.VISIBLE else View.GONE
        binding.loginButton.isEnabled = !show
        binding.usernameInput.isEnabled = !show
        binding.passwordInput.isEnabled = !show
    }

    private fun navigateToDashboard() {
        startActivity(Intent(this, DashboardActivity::class.java))
        finish()
    }
}
