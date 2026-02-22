package com.auth.miniapp.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.auth.miniapp.R
import com.auth.miniapp.api.RetrofitClient
import com.auth.miniapp.databinding.ActivityRegisterBinding
import com.auth.miniapp.models.RegisterRequest
import com.auth.miniapp.utils.Validator
import kotlinx.coroutines.launch

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupClickListeners()
    }

    private fun setupClickListeners() {
        binding.registerButton.setOnClickListener {
            handleRegister()
        }

        binding.loginLink.setOnClickListener {
            finish() // Go back to login
        }
    }

    private fun handleRegister() {
        val username = binding.usernameInput.text.toString().trim()
        val email = binding.emailInput.text.toString().trim()
        val password = binding.passwordInput.text.toString().trim()
        val confirmPassword = binding.confirmPasswordInput.text.toString().trim()

        // Clear previous errors
        binding.usernameLayout.error = null
        binding.emailLayout.error = null
        binding.passwordLayout.error = null
        binding.confirmPasswordLayout.error = null

        // Validate inputs
        if (!Validator.isValidUsername(username)) {
            binding.usernameLayout.error = getString(R.string.error_username_required)
            return
        }

        if (!Validator.isValidEmail(email)) {
            binding.emailLayout.error = getString(R.string.error_invalid_email)
            return
        }

        if (!Validator.isValidPassword(password)) {
            binding.passwordLayout.error = getString(R.string.error_password_required)
            return
        }

        if (!Validator.doPasswordsMatch(password, confirmPassword)) {
            binding.confirmPasswordLayout.error = getString(R.string.error_passwords_dont_match)
            return
        }

        performRegister(username, email, password)
    }

    private fun performRegister(username: String, email: String, password: String) {
        showLoading(true)

        val registerRequest = RegisterRequest(username, email, password)

        lifecycleScope.launch {
            try {
                val response = RetrofitClient.apiService.register(registerRequest)

                if (response.isSuccessful && response.body() != null) {
                    showLoading(false)
                    Toast.makeText(
                        this@RegisterActivity,
                        response.body()!!.message,
                        Toast.LENGTH_SHORT
                    ).show()
                    
                    // Navigate back to login after successful registration
                    finish()
                } else {
                    showLoading(false)
                    val errorMessage = response.errorBody()?.string() ?: "Registration failed"
                    Toast.makeText(this@RegisterActivity, errorMessage, Toast.LENGTH_SHORT).show()
                }
            } catch (e: Exception) {
                showLoading(false)
                Toast.makeText(
                    this@RegisterActivity,
                    "Error: ${e.message ?: "Network error"}",
                    Toast.LENGTH_LONG
                ).show()
            }
        }
    }

    private fun showLoading(show: Boolean) {
        binding.progressBar.visibility = if (show) View.VISIBLE else View.GONE
        binding.registerButton.isEnabled = !show
        binding.usernameInput.isEnabled = !show
        binding.emailInput.isEnabled = !show
        binding.passwordInput.isEnabled = !show
        binding.confirmPasswordInput.isEnabled = !show
    }
}
