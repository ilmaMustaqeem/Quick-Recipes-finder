# Quick-Recipes-finder
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DishForge Pro - Recipe Manager</title>
    <!-- FontAwesome Icons Link -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- ================= ALWAYS VISIBLE HEADER ================= -->
    <header class="main-header">
        <div class="header-left">
            <button id="menu-toggle-btn" class="icon-btn hidden">
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
            <span class="logo"><i class="fa-solid fa-utensils"></i> DishForge</span>
        </div>
        <div class="header-right">
            <span id="user-display-name">Welcome, Guest</span>
        </div>
    </header>

    <!-- ================= MAIN CONTAINER ================= -->
    <div class="main-wrapper">

        <!-- ================= AUTHENTICATION PAGE ================= -->
        <section id="auth-page" class="page">
            <div class="auth-container">
                <h2>Create Account</h2>
                <p>Join DishForge to manage your favorite recipes</p>
                <form id="signup-form">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="signup-name" required placeholder="John Doe">
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" id="signup-email" required placeholder="name@example.com">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="signup-password" required placeholder="••••••••">
                    </div>
                    <button type="submit" class="btn btn-block">Sign Up</button>
                </form>
            </div>
        </section>

        <!-- ================= APP WRAPPER (MAIN APP AFTER LOGIN) ================= -->
        <div id="app-wrapper" class="hidden">
            
            <!-- SIDEBAR NAVIGATION -->
            <aside id="sidebar" class="sidebar">
                <div class="sidebar-header">
                    <h3>Menu</h3>
                    <button id="close-sidebar-btn" class="icon-btn">&times;</button>
                </div>
                <nav class="sidebar-links">
                    <a href="#" class="nav-link active" data-target="home-section"><i class="fa-solid fa-house"></i> Home</a>
                    <a href="#" class="nav-link" data-target="dashboard-section"><i class="fa-solid fa-chart-pie"></i> Dashboard</a>
                    <a href="#" class="nav-link" data-target="about-section"><i class="fa-solid fa-circle-info"></i> About Us</a>
                </nav>
            </aside>

            <!-- MAIN CONTENT AREA -->
            <main class="content-area">
                
                <!-- ====== HOME SECTION ====== -->
                <section id="home-section" class="app-section">
                    <div class="section-header">
                        <div class="search-box">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="text" id="search-bar" placeholder="Search recipes by name or ingredients...">
                        </div>
                        <button id="open-add-modal-btn" class="btn"><i class="fa-solid fa-plus"></i> Add Recipe</button>
                    </div>

                    <div id="recipes-grid" class="recipes-grid"></div>
                </section>
